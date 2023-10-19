import DealActions from "../../deal-info/DealActions";
import { DealType } from "~~/types/deal";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

const CreatorModalActions = ({ deal, onClose }: { deal: DealType; onClose: () => void }) => {
  // ADD: Based on the action, add a function to perform upon clicking the action button
  const creatorAction = getActionTitleByStatus(false, deal.status);

  const onActionCallback = () => {
    notification.info("Create action for " + creatorAction);
  };

  return <DealActions deal={deal} onClose={onClose} actionTitle={creatorAction} onAction={onActionCallback} />;
};

export default CreatorModalActions;
