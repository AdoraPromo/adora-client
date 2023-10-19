import DealActions from "../../deal-info/DealActions";
import { DealType } from "~~/types/deal";
import { ActionType } from "~~/utils/adora/enums";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

interface SponsorModalActionsProps {
  deal: DealType | undefined;
  onClose: () => void;
}

// ADD: Based on the action, add a function to perform upon clicking the action button
const getSponsorsActionCallback = (action: string) => {
  switch (action) {
    case ActionType.WITHDRAW:
      return function () {
        notification.info("Create action for Withdraw");
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

const SponsorModalActions = ({ deal, onClose }: SponsorModalActionsProps) => {
  if (!deal) return null;

  const sponsorAction = getActionTitleByStatus(true, deal.status);

  return (
    <DealActions
      deal={deal}
      onClose={onClose}
      actionTitle={sponsorAction}
      onAction={getSponsorsActionCallback(sponsorAction)}
    />
  );
};

export default SponsorModalActions;
