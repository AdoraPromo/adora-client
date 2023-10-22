import { useState } from "react";
import { Input } from "../misc/Input";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers, utils } from "ethers";
import { SponsorshipMarketplaceABI, marketplaceAddress } from "~~/contracts";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

interface RedeemDealModalProps {
  deal: DealType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenProgressModal: (open: boolean) => void;
}

const toBase64 = (arr: Uint8Array) => btoa(String.fromCodePoint(...arr));

const RedeemDealModal = ({ deal, open, setOpen }: RedeemDealModalProps) => {
  const [tweetLink, setTweetLink] = useState("");

  const redeemDeal = async () => {
    setOpen(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, signer);
    // If the first call to getDeal fails, try 3 more times
    let fetchedDealStruct;
    for (let i = 0; i < 3; i++) {
      try {
        fetchedDealStruct = await marketplaceContract.getDeal(deal?.id);
        break;
      } catch (e) {
        console.log(e);
      }
    }
    // Fetch key from Lit Protocol
    const evmContractConditions = [
      {
        contractAddress: marketplaceAddress,
        functionName: "canUserDecrypt",
        functionParams: [":userAddress", deal?.id],
        functionAbi: {
          inputs: [
            {
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              internalType: "bytes32",
              name: "dealId",
              type: "bytes32",
            },
          ],
          name: "canUserDecrypt",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        chain: "polygon",
        returnValueTest: {
          key: "",
          comparator: "=",
          value: "true",
        },
      },
    ];

    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
    });
    await client.connect();
    const authSigNote = notification.loading(`Please provide signature\nto save the key to \nLit Protocol 👌`);
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "polygon" });
    notification.remove(authSigNote);
    const symmetricKey = await client.getEncryptionKey({
      evmContractConditions,
      toDecrypt: fetchedDealStruct.creatorEncryptedSymmetricKey, // Stored as a hex string on chain
      chain: "polygon",
      authSig,
    });
    console.log("Successfully fetched key from Lit Protocol");
    console.log(symmetricKey);
    const importedSymmetricKey = await crypto.subtle.importKey(
      "raw",
      symmetricKey,
      {
        name: "AES-CBC",
        length: 256,
      },
      false,
      ["encrypt"],
    );
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedTweetIdArrayBufferWithoutIv = await crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv,
      },
      importedSymmetricKey,
      new TextEncoder().encode(tweetLink),
    );
    const encryptedTweetIdBase64 = toBase64(
      new Uint8Array([...iv, ...new Uint8Array(encryptedTweetIdArrayBufferWithoutIv)]),
    );
    console.log("Encrypted Tweet ID (base64)");
    console.log(encryptedTweetIdBase64);

    const redeemApprovalNote = notification.loading(`Please approve the\nredeem deal transaction 👌`);
    const redeemTx = await marketplaceContract.redeemDeal(deal?.id, encryptedTweetIdBase64);
    notification.remove(redeemApprovalNote);
    const redeemConfirmationNote = notification.loading(`⏳ Waiting for transaction\nconfirmation...`);
    await redeemTx.wait();
    notification.remove(redeemConfirmationNote);
    const clfNote = notification.loading(`⏳ Waiting for Chainlink\n Functions response...`);
    const id = deal?.id;
    return new Promise(async resolve => {
      for (let i = 0; i < 10; i++) {
        // sleep for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));
        // If the first call to getDeal fails, try 3 more times
        let fetchedDealStruct;
        for (let i = 0; i < 3; i++) {
          try {
            fetchedDealStruct = await marketplaceContract.getDeal(deal?.id);
            break;
          } catch (e) {
            console.log(e);
          }
        }
        console.log({ fetchedDealStruct });
        if (fetchedDealStruct?.status === 2) {
          notification.remove(clfNote);
          notification.success(`Deal ${id} redeemed!`, { duration: 10000 });
          resolve(id);
          marketplaceContract.removeAllListeners();
          return;
        }
      }
      notification.remove(clfNote);
      notification.error(`Could not detect deal acceptance within last 100 seconds. Please try again.`);
      marketplaceContract.on("DealAccepted", (dealId: string) => {
        notification.remove(clfNote);
        notification.success(`Deal ${dealId} accepted!`);
        resolve(dealId);
        marketplaceContract.removeAllListeners();
        return;
      });
      marketplaceContract.on("FunctionError", (error: string) => {
        notification.remove(clfNote);
        const errorBytesAsString = utils.toUtf8String(error);
        notification.error(`Error accepting deal: ${errorBytesAsString}`);
        resolve(error);
        marketplaceContract.removeAllListeners();
        return;
      });
    });
  };

  if (!deal) return null;

  return (
    <Modal
      title="Submit your work?"
      open={open}
      onClose={() => setOpen(false)}
      footerActions={
        <DealActions onClose={() => setOpen(false)} actionTitle={"Submit"} onAction={() => redeemDeal()} />
      }
      width="1/4"
    >
      <>
        <div className="flex flex-col text-neutral w-full items-start justify-start gap-1 mt-3">
          <div className="text-md">All done? In order to submit your work, please paste the Tweet link below:</div>
          <Input
            full
            content={tweetLink}
            setContent={setTweetLink}
            placeholder={"Paste the link here..."}
            type={"string"}
            classes={{
              width: "full",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <div className="text-sm text-accent-content">
            Note: Once you paste Link to Tweet, there is no coming back.
          </div>
        </div>
      </>
    </Modal>
  );
};

export default RedeemDealModal;
