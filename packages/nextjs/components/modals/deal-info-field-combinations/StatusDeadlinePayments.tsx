import DeadlineReadOnlyInput from "../deal-info/DeadlineReadOnlyInput";
import ReadOnlyInput from "../deal-info/ReadOnlyInput";
import StatusReadOnlyInput from "../deal-info/StatusReadOnlyInput";

interface StatusDeadlinePaymentsProps {
  status: string;
  deadline: Date;
  paymentPerThousand: string;
  paymentMax: string;
}

const StatusDeadlinePayments = ({ status, deadline, paymentPerThousand, paymentMax }: StatusDeadlinePaymentsProps) => {
  return (
    <div className="flex flex-col gap-2 w-3/4 pb-2">
      {/* First row */}
      <div className="flex gap-2 justify-between items-center">
        <div className="flex flex-row items-center justify-start w-1/2">
          <StatusReadOnlyInput status={status} />
        </div>
        <div className="w-1/2">
          <DeadlineReadOnlyInput deadline={deadline} />
        </div>
      </div>

      {/* Second row */}
      <div className="flex gap-2 w-full justify-center items-center">
        <ReadOnlyInput label="Payment per 1000 likes" content={paymentPerThousand} />
        <ReadOnlyInput label="Maximum Payment" content={paymentMax} />
      </div>
    </div>
  );
};

export default StatusDeadlinePayments;
