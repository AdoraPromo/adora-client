import { useState } from "react";
import { Button } from "../misc/Button";
import { Input } from "../misc/Input";
import { TextArea } from "../misc/TextArea";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import * as ethSigUtil from "@metamask/eth-sig-util";
import { ethers, utils } from "ethers";
import { ApeCoinABI, SponsorshipMarketplaceABI, apecoinAddress, marketplaceAddress } from "~~/contracts";
import { useGlobalState } from "~~/services/store/store";
import type { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

interface CreateDealOpenTriggerProps {
  status: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateDealOpenTrigger = ({ title, open, setOpen }: CreateDealOpenTriggerProps) => {
  return (
    <Button
      classes={{
        width: "auto",
        height: "[12px]",
        padding: "5 py-2",
        textColor: "accent",
        textSize: "lg",
      }}
      text={title}
      onClick={() => setOpen(!open)}
    />
  );
};

interface CreateDealModalProps {
  deal: DealType;
  setDeal: (deal: DealType) => void;
  onSuccess: () => void;
}

export function CreateDealModal({ onSuccess, deal, setDeal }: CreateDealModalProps) {
  const title = "Create Deal";

  const [open, setOpen] = useState(false);

  // Update states
  const updateTwitterHandle = (newHandle: string) => {
    setDeal({ ...deal, twitterHandle: newHandle });
  };
  const updateDeadline = (newDeadline: Date) => {
    setDeal({ ...deal, deadline: newDeadline });
  };
  const updatePaymentPerThousand = (newPaymentPerThousand: number) => {
    setDeal({ ...deal, paymentPerThousand: newPaymentPerThousand });
  };
  const updateMaximumPayment = (newMaximumPayment: number) => {
    setDeal({ ...deal, maxPayment: newMaximumPayment });
  };
  const updateRequirements = (newRequirements: string) => {
    setDeal({ ...deal, requirements: newRequirements });
  };
  const { address, setDealId, setSymmetricKey } = useGlobalState();

  const createDeal = async () => {
    const paymentPerThousandInApeWei =
      (BigInt(Math.round(deal.paymentPerThousand * 10000)) * BigInt(10 ** 18)) / BigInt(10000);

    const privateTerms = {
      twitterUserId: deal.twitterHandle,
      paymentPerLike: (paymentPerThousandInApeWei / BigInt(1000)).toString(),
      sponsorshipCriteria: deal.requirements,
    };

    const symKey = await crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    );
    const exportedSymKey = await crypto.subtle.exportKey("raw", symKey);
    const exportedSymKeyBase64 = btoa(String.fromCodePoint(...new Uint8Array(exportedSymKey)));
    setSymmetricKey(Buffer.from(exportedSymKeyBase64, "base64").toString("hex"));

    const iv = crypto.getRandomValues(new Uint8Array(16));

    const encodedData = new TextEncoder().encode(JSON.stringify(privateTerms));
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      symKey,
      encodedData,
    );
    const ciphertextWithIv = new Uint8Array([...iv, ...new Uint8Array(ciphertext)]);
    const encryptedPrivateTermsBase64 = btoa(String.fromCodePoint(...ciphertextWithIv));

    const loadingEncryptionKey = notification.loading(`Waiting to receive public encryption key from wallet...`);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ethPubKeyBase64 = await window.ethereum!.request({
      method: `eth_getEncryptionPublicKey` as any,
      params: [address as `0x${string}`],
    });
    notification.remove(loadingEncryptionKey);

    const encryptedSymKey = ethSigUtil.encrypt({
      publicKey: ethPubKeyBase64 as any,
      data: exportedSymKeyBase64,
      version: `x25519-xsalsa20-poly1305`,
    });

    // Parameters for createDeal transaction
    const termsHash = utils.keccak256(utils.toUtf8Bytes(JSON.stringify(privateTerms)));
    const encryptedSymmetricKey = exportedSymKeyBase64;
    const encryptedTerms = encryptedPrivateTermsBase64;
    const maxPayment = (BigInt(Math.round(deal.maxPayment * 10000)) / BigInt(10000)) * BigInt(10 ** 18);
    const redemptionExpirationDate = new Date(deal.deadline);
    const redemptionExpiration = Math.floor(redemptionExpirationDate.getTime() / 1000);
    const sponsorEncryptedSymmetricKey = JSON.stringify(encryptedSymKey);

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();

    const apecoinContract = new ethers.Contract(apecoinAddress, ApeCoinABI, signer);
    const allowanceApprovalNote = notification.loading(`Please approve the increase\nallowance transaction 👌`);
    const approveTx = await apecoinContract.increaseAllowance(marketplaceAddress, maxPayment);
    notification.remove(allowanceApprovalNote);
    const allowanceConfirmationNote = notification.loading(`⏳ Waiting for transaction\nconfirmation...`);
    await approveTx.wait();
    notification.remove(allowanceConfirmationNote);

    const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, signer);
    const creationApprovalNote = notification.loading(`Please approve the\ncreate deal transaction 👌`);
    const createTx = await marketplaceContract.createDeal(
      termsHash,
      encryptedSymmetricKey,
      encryptedTerms,
      maxPayment,
      redemptionExpiration,
      sponsorEncryptedSymmetricKey,
    );
    notification.remove(creationApprovalNote);
    const creationConfirmationNote = notification.loading(`⏳ Waiting for transaction\nconfirmation...`);
    const createTxReceipt = await createTx.wait();
    console.log(JSON.stringify(createTxReceipt));
    notification.remove(creationConfirmationNote);
    const dealId = createTxReceipt.events[1].data;
    setDealId(dealId);
    notification.success(`Offer ${dealId} created!`);

    // Decrypting is demonstrated here.  This code will be cut and pasted elsewhere when we need to decrypt.
    // (I just kept it for now as a sanity check, but I will remove it later.)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const decrypted = await window.ethereum!.request({
    //   method: `eth_decrypt` as any,
    //   params: [JSON.stringify(encryptedSymKey), address],
    // });
    // notification.loading(`decrypted: ${decrypted} and expected ${exportedSymKeyBase64}`);

    setOpen(false); // Closes 'Create Deal' modal
    onSuccess(); // Opens 'Deal Sent' modal
  };

  return (
    <Modal
      title={title}
      open={open}
      setOpen={setOpen}
      openTrigger={<CreateDealOpenTrigger status={deal.status} title={title} open={open} setOpen={setOpen} />}
      footerActions={
        <DealActions deal={deal} actionTitle={title} onClose={() => setOpen(false)} onAction={createDeal} />
      }
    >
      <div className="relative p-6 px-10 flex flex-row justify-between items-center w-full gap-5">
        <div className="flex flex-col gap-5 w-1/2">
          <Input
            full
            content={deal?.twitterHandle}
            setContent={updateTwitterHandle}
            placeholder={"Paste the link here..."}
            type={"string"}
            label={"Twitter Account of the Creator"}
            classes={{
              width: "full",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            content={deal?.deadline}
            placeholder="MM/DD/YYYY"
            setContent={updateDeadline}
            type={"date"}
            label={"Deadline"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            readOnly
            placeholder={"APE"}
            type={"string"}
            label={"Currency"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            content={deal?.paymentPerThousand}
            setContent={updatePaymentPerThousand}
            placeholder={"Type here..."}
            type={"number"}
            label={"Payment per 1000 likes"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            content={deal?.maxPayment}
            setContent={updateMaximumPayment}
            placeholder={"Type here..."}
            type={"number"}
            label={"Maximum Payment"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
        </div>
        <div className="flex flex-col w-1/2 h-full">
          <TextArea
            full
            content={deal?.requirements}
            setContent={updateRequirements}
            placeholder={"Write all your requirements here. Try to be very clear and specific..."}
            label={"Requirements"}
            rows={16}
            classes={{
              width: "fit", // TODO: These don't work
              height: "fit",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
