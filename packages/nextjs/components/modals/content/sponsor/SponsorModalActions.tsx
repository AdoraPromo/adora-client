import DealActions from "../../deal-info/DealActions";
import { DealType } from "~~/types/deal";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

const SponsorModalActions = ({
  deal,
  isSponsor,
  onClose,
}: {
  deal: DealType;
  isSponsor: boolean;
  onClose: () => void;
}) => {
  console.log("sponsor actions");
  console.log(deal);

  return (
    <DealActions
      deal={deal}
      onClose={onClose}
      actionTitle={getActionTitleByStatus(isSponsor, deal.status)}
      onAction={() => notification.info("Create action for " + getActionTitleByStatus(isSponsor, deal.status))}
    />
  );
};

export default SponsorModalActions;
