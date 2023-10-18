import DeadlineReadOnlyInput from "../deal-info/DeadlineReadOnlyInput";
import ReadOnlyInput from "../deal-info/ReadOnlyInput";
import StatusReadOnlyInput from "../deal-info/StatusReadOnlyInput";
import { DealStatus } from "~~/components/deals/Status";

interface StatusDeadlineWithdrawalAmountProps {
  status: DealStatus;
  deadline: Date;
  amountForWithdrawal: string;
}

const StatusDeadlineWithdrawalAmount = ({
  status,
  deadline,
  amountForWithdrawal,
}: StatusDeadlineWithdrawalAmountProps) => {
  return (
    <div className="flex flex-col gap-2 w-3/4  pb-2">
      {/* First row */}
      <div className="flex flex-row gap-2 w-full">
        <StatusReadOnlyInput status={status} />
        <DeadlineReadOnlyInput deadline={deadline} />
      </div>

      {/* Second row */}
      <ReadOnlyInput label="Amount for Withdrawal" content={amountForWithdrawal} />
    </div>
  );
};

export default StatusDeadlineWithdrawalAmount;
