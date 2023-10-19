import DealActions from "../../deal-info/DealActions";
import { DealType } from "~~/types/deal";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

const SponsorModalActions = ({ deal, onClose }: { deal: DealType; onClose: () => void }) => {
  // ADD: Based on the action, add a function to perform upon clicking the action button
  const sponsorAction = getActionTitleByStatus(true, deal.status);

  const onActionCallback = () => {
    notification.info("Create action for " + sponsorAction);
  };

  return <DealActions deal={deal} onClose={onClose} actionTitle={sponsorAction} onAction={onActionCallback} />;
};

export default SponsorModalActions;
