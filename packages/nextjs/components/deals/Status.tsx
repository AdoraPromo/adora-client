export enum DealStatus {
  ACCEPTED = "Accepted",
  WITHDRAWN = "Withdrawn",
  PENDING = "Pending",
  REDEEMED = "Redeemed",
  EXPIRED = "Expired",
  NEUTRAL = "Neutral",
}

const getColor = (status: string): string => {
  switch (status) {
    case DealStatus.ACCEPTED:
      return "primary";
    case DealStatus.WITHDRAWN:
      return "error";
    case DealStatus.PENDING:
      return "info";
    case DealStatus.REDEEMED:
      return "success";
    case DealStatus.EXPIRED:
      return "warning";
    default:
      return "neutral";
  }
};

const Status = ({ value }: { value: string }) => {
  return <div className={`text-${getColor(value)}`}> &#9679; {value}</div>;
};

export default Status;
