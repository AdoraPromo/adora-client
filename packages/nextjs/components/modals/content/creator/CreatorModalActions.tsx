"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import DealActions from "../../deal-info/DealActions";
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
  console.log("Current full URL");
  console.log(currentFullUrl);

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
          console.log("SISMO PROOF OBJ");
          console.log(sismoProof);
          // TODO: Fix this as it requires the user to click the "Accept" button twice.
          // On the first click, they are redirected to Sismo to get the proof, then on the second click they actually accept the deal.
          if (!sismoProof) {
            console.log("Current URL to redirect back to");
            console.log(currentFullUrl);
            localStorage.setItem("redirectUrl", currentFullUrl);
            sismoConnect.request({
              auths: [
                {
                  authType: AuthType.TWITTER,
                },
              ],
            });
          } else {
            console.log("Accepting deal");
            console.log(`Sismo proof data: ${JSON.stringify(sismoProof)}`);
            console.log(`Symmetric key: ${current.get("key")}`);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            acceptDealOnChain(current.get("id")!, current.get("key")!, sismoProof);
          }
        };
      case ActionType.REDEEM:
        return function () {
          if (sismoProof) {
            setOpenRedeemModal(!openRedeemModal);
          }
        };
      case ActionType.VERIFYTWITTER:
        return function () {
          // ADD: Redirect to Sismo and do your thing
          notification.info("Verify Twitter action");
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
  const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, signer);
  const acceptApprovalNote = notification.loading(`Please approve the\naccept deal transaction 👌`);
  const acceptTx = await marketplaceContract.acceptDeal(id, encryptedSismoProofBase64, "");
  notification.remove(acceptApprovalNote);
  const acceptConfirmationNote = notification.loading(`⏳ Waiting for transaction\nconfirmation...`);
  await acceptTx.wait();
  notification.remove(acceptConfirmationNote);
  const clfNote = notification.loading(`⏳ Waiting for Chainlink\n Functions response...`);
  return new Promise(resolve => {
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
