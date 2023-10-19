import DealActions from "../../deal-info/DealActions";
import { DealType } from "~~/types/deal";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

const CreatorModalActions = ({
  deal,
  isSponsor,
  onClose,
}: {
  deal: DealType;
  isSponsor: boolean;
  onClose: () => void;
}) => {
  return (
    <DealActions
      deal={deal}
      onClose={onClose}
      actionTitle={getActionTitleByStatus(isSponsor, deal.status)}
      onAction={() => notification.info("Create action for " + getActionTitleByStatus(isSponsor, deal.status))}
    />
  );
};

export default CreatorModalActions;
