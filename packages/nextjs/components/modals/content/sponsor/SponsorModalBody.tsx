import React from "react";
import StatusDeadlinePayments from "../../deal-info-field-combinations/StatusDeadlinePayments";
import StatusDeadlineWithdrawalAmount from "../../deal-info-field-combinations/StatusDeadlineWithdrawalAmount";
import RequirementsReadOnlyTextArea from "../../deal-info/RequirementsReadOnlyTextArea";
import TwitterHandleReadOnlyInput from "../../deal-info/TwitterHandleReadOnlyInput";
import { DealStatus } from "~~/components/deals/Status";
import { DealType } from "~~/types/deal";

const SponsorModalBody = ({ deal }: { deal: DealType }) => {
  return (
    <>
      <TwitterHandleReadOnlyInput twitterHandle={deal.twitterHandle} />
      {deal.status === DealStatus.EXPIRED ? (
        <StatusDeadlineWithdrawalAmount
          status={deal.status}
          deadline={deal.deadline}
          amountForWithdrawal={deal.maxPayment.toString()}
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

export default SponsorModalBody;
