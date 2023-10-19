import React from "react";
import DeadlinePayments from "../../deal-info-field-combinations/DeadlinePayments";
import StatusDeadlinePayments from "../../deal-info-field-combinations/StatusDeadlinePayments";
import RequirementsReadOnlyTextArea from "../../deal-info/RequirementsReadOnlyTextArea";
import { DealStatus } from "~~/components/deals/Status";
import { DealType } from "~~/types/deal";

const CreatorModalBody = ({ deal }: { deal: DealType }) => {
  return (
    <>
      {deal.status === DealStatus.PENDING ? (
        <DeadlinePayments
          deadline={deal.deadline}
          paymentPerThousand={deal.paymentPerThousand.toString()}
          paymentMax={deal.maxPayment.toString()}
        />
      ) : (
        <StatusDeadlinePayments
          status={deal.status}
          deadline={deal.deadline}
          paymentPerThousand={deal.paymentPerThousand.toString()}
          paymentMax={deal.maxPayment.toString()}
        />
      )}
      <RequirementsReadOnlyTextArea content={deal.requirements} />
    </>
  );
};

export default CreatorModalBody;