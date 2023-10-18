import DealActions from "../../deal-info/DealActions";
import { DealStatus } from "~~/components/deals/Status";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

const getActionTitle = (status: string) => {
  switch (status) {
    case DealStatus.EXPIRED:
      return "Withdraw";
    case DealStatus.PENDING:
      return "Withdraw";
    case DealStatus.REDEEMED:
      return "View Tweet";
    default:
      return "";
  }
};

const SponsorModalActions = ({ deal, onClose }: { deal: DealType; onClose: () => void }) => {
  return (
    <DealActions
      onClose={onClose}
      actionTitle={getActionTitle(deal.status)}
      onAction={() => notification.info("Create action for " + getActionTitle(deal.status))}
    />
  );
};

export default SponsorModalActions;
