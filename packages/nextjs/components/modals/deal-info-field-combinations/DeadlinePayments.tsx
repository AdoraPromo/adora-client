import DeadlineReadOnlyInput from "../deal-info/DeadlineReadOnlyInput";
import ReadOnlyInput from "../deal-info/ReadOnlyInput";

interface DeadlinePaymentsProps {
  deadline: Date;
  paymentPerThousand: string;
  paymentMax: string;
}

const DeadlinePayments = ({ deadline, paymentPerThousand, paymentMax }: DeadlinePaymentsProps) => {
  return (
    <div className="flex flex-col gap-2 w-3/4  pb-2">
      {/* First row */}
      <DeadlineReadOnlyInput deadline={deadline} />

      {/* Second row */}
      <div className="flex flex-row gap-2 w-full">
        <ReadOnlyInput label="Payment per 1000 likes" content={paymentPerThousand} />
        <ReadOnlyInput label="Maximum Payment" content={paymentMax} />
      </div>
    </div>
  );
};

export default DeadlinePayments;
