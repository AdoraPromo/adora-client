"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DealActions from "../../deal-info/DealActions";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { AuthType, SismoConnectConfig, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { ethers, utils } from "ethers";
import { SponsorshipMarketplaceABI, marketplaceAddress } from "~~/contracts";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";
import { getBaseUrl } from "~~/utils/adora/baseUrl";
import { ActionType } from "~~/utils/adora/enums";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

interface CreatorModalActionsProps {
  deal: DealType | undefined;
  onClose: () => void;
}

const CreatorModalActions = ({ deal, onClose }: CreatorModalActionsProps) => {
  const [openRedeemModal, setOpenRedeemModal] = useState(false);
  const { sismoProof } = useGlobalState();

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const pathName = usePathname();
  const currentFullUrl = `${getBaseUrl()}${pathName}?${current.toString()}`;

  const creatorAction = getActionTitleByStatus(false, deal?.status || "", sismoProof);
  const config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };
  const { sismoConnect } = useSismoConnect({ config });

  // ADD: Based on the action, add a function to perform upon clicking the action button
  const getCreatorsActionCallback = (action: string) => {
    switch (action) {
      case ActionType.ACCEPT:
        return function () {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          acceptDealOnChain(current.get("id")!, current.get("key")!, sismoProof);
        };
      case ActionType.REDEEM:
        return function () {
          if (sismoProof) {
            setOpenRedeemModal(!openRedeemModal);
          }
        };
      case ActionType.VERIFYTWITTER:
        return function () {
          localStorage.setItem("redirectUrl", currentFullUrl);
          sismoConnect.request({
            auths: [
              {
                authType: AuthType.TWITTER,
              },
            ],
          });
        };
      case ActionType.VIEWTWEET:
        return function () {
          notification.info("Create action for View Tweet");
        };
      default:
        return function () {
          notification.info("Default action - should not be reached");
        };
    }
  };

  if (!deal) return null;

  return (
    <DealActions
      deal={deal}
      onClose={onClose}
      actionTitle={creatorAction}
      onAction={getCreatorsActionCallback(creatorAction)}
      openRedeemModal={openRedeemModal}
    />
  );
};

const acceptDealOnChain = async (id: string, key: string, simoProof: any) => {
  const symKey = await crypto.subtle.importKey(
    "raw",
    fromBase64(Buffer.from(key, "hex").toString("base64")),
    {
      name: "AES-CBC",
      length: 256,
    },
    false,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(16));
  // Encrypt sismoProof with symmetricKey
  const encryptedSismoProof = await crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    symKey,
    new TextEncoder().encode(JSON.stringify(simoProof)),
  );
  const encryptedSismoProofWithIv = new Uint8Array([...iv, ...new Uint8Array(encryptedSismoProof)]);
  const encryptedSismoProofBase64 = Buffer.from(encryptedSismoProofWithIv).toString("base64");

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();

  // Upload key to Lit Protocol
  const evmContractConditions = [
    {
      contractAddress: marketplaceAddress,
      functionName: "canUserDecrypt",
      functionParams: [":userAddress", id],
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
  const encryptedSymmetricKey = await client.saveEncryptionKey({
    evmContractConditions,
    symmetricKey: fromBase64(Buffer.from(key, "hex").toString("base64")),
    authSig,
    chain: "polygon",
    permanant: true,
  });
  console.log("Successfully uploaded to Lit Protocol");
  console.log(encryptedSymmetricKey);
  const encryptedSymmetricKeyAsHex = Buffer.from(encryptedSymmetricKey).toString("hex");

  const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, signer);
  const acceptApprovalNote = notification.loading(`Please approve the\naccept deal transaction 👌`);
  const acceptTx = await marketplaceContract.acceptDeal(id, encryptedSismoProofBase64, encryptedSymmetricKeyAsHex);
  notification.remove(acceptApprovalNote);
  const acceptConfirmationNote = notification.loading(`⏳ Waiting for transaction\nconfirmation...`);
  await acceptTx.wait();
  notification.remove(acceptConfirmationNote);
  const clfNote = notification.loading(`⏳ Waiting for Chainlink\n Functions response...`);
  return new Promise(async resolve => {
    for (let i = 0; i < 10; i++) {
      // sleep for 10 seconds
      await new Promise(resolve => setTimeout(resolve, 10000));
      const fetchedDealStruct = await marketplaceContract.getDeal(id);
      console.log({ fetchedDealStruct });
      if (fetchedDealStruct.status === 1) {
        notification.remove(clfNote);
        notification.success(`Deal ${id} accepted!`, { duration: 10000 });
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

const fromBase64 = (str: string) =>
  new Uint8Array(
    atob(str)
      .split("")
      .map(c => c.charCodeAt(0)),
  );

export default CreatorModalActions;
