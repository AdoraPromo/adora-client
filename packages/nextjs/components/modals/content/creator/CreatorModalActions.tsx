"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import DealActions from "../../deal-info/DealActions";
import { useGlobalState } from "~~/services/store/store";
import { AuthType, SismoConnectConfig, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";
import { ActionType } from "~~/utils/adora/enums";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

interface CreatorModalActionsProps {
  deal: DealType | undefined;
  onClose: () => void;
}

const CreatorModalActions = ({ deal, onClose }: CreatorModalActionsProps) => {
  const [openRedeemModal, setOpenRedeemModal] = useState(false);
  const { sismoProof, setSismoProof } = useGlobalState();

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const creatorAction = getActionTitleByStatus(false, deal?.status || "");
  const config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };
  const { sismoConnect } = useSismoConnect({ config });
  const { sismoProof } = useGlobalState();

  // ADD: Based on the action, add a function to perform upon clicking the action button
  const getCreatorsActionCallback = (action: string) => {
    switch (action) {
      case ActionType.ACCEPT:
        return function () {
          // TODO: Fix this as it requires the user to click the "Accept" button twice.
          // On the first click, they are redirected to Sismo to get the proof, then on the second click they actually accept the deal.
          if (!sismoProof) {
            localStorage.setItem("redirectUrl", window.location.href);
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
          }
        };
      case ActionType.REDEEM:
        return function () {
          const _sismoProofUrl = current.get("sismoProof");
          if (!sismoProof && _sismoProofUrl) {
            setSismoProof(_sismoProofUrl);
          }

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

export default CreatorModalActions;
