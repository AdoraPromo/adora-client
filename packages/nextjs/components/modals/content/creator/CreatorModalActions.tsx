import DealActions from "../../deal-info/DealActions";
import { DealStatus } from "~~/components/deals/Status";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

const getActionTitle = (status: string) => {
  switch (status) {
    case DealStatus.ACCEPTED:
      return "Redeem";
    case DealStatus.PENDING:
      return "Accept";
    case DealStatus.REDEEMED:
      return "View Tweet";
    default:
      return "";
  }
};

const CreatorModalActions = ({ deal, onClose }: { deal: DealType; onClose: () => void }) => {
  return (
    <DealActions
      onClose={onClose}
      actionTitle={getActionTitle(deal.status || "")}
      onAction={() => notification.info("Create action for " + getActionTitle(deal.status || ""))}
    />
  );
};

export default CreatorModalActions;
