import { useState } from "react";
import DealActions from "../../deal-info/DealActions";
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
  const creatorAction = getActionTitleByStatus(false, deal?.status || "");

  // ADD: Based on the action, add a function to perform upon clicking the action button
  const getCreatorsActionCallback = (action: string) => {
    switch (action) {
      case ActionType.ACCEPT:
        return function () {
          notification.info("Create action for Accept");
        };
      case ActionType.REDEEM:
        return function () {
          setOpenRedeemModal(!openRedeemModal);
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
