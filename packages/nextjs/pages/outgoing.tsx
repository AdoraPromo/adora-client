import { useEffect, useState } from "react";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DealGrid } from "~~/components/deals/DealGrid";
import { StatusDropdown } from "~~/components/deals/StatusDropdown";
import { Button } from "~~/components/misc/Button";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

const Outgoing: NextPage = () => {
  const deals: DealType[] = [
    {
      id: "1",
      status: "Accepted",
      twitterHandle: "twitteraccount",
      timeRemaining: "5 days",
      paymentAmount: "2083 APE",
    },
    {
      id: "2",
      status: "Withdrawn",
      twitterHandle: "twitteraccount",
      timeRemaining: "5 days",
      paymentAmount: "2083 APE",
    },
    {
      id: "3",
      status: "Pending",
      twitterHandle: "twitteraccount",
      timeRemaining: "5 days",
      paymentAmount: "2083 APE",
    },
    {
      id: "4",
      status: "Expired",
      twitterHandle: "twitteraccount",
      timeRemaining: "5 days",
      paymentAmount: "2083 APE",
    },
    {
      id: "5",
      status: "Redeemed",
      twitterHandle: "twitteraccount",
      timeRemaining: "5 days",
      paymentAmount: "2083 APE",
    },
    {
      id: "6",
      status: "Accepted",
      twitterHandle: "twitteraccount",
      timeRemaining: "5 days",
      paymentAmount: "2083 APE",
    },
  ];

  const [status, setStatus] = useState("");
  const [allDeals] = useState(deals);
  const [filteredDeals, setFilteredDeals] = useState(deals);

  useEffect(() => {
    if (!status) {
      setFilteredDeals(allDeals);
      return;
    }

    setFilteredDeals(allDeals.filter(deal => deal.status === status));
  }, [status]);

  return (
    <div>
      <MetaHeader title="Outgoing Deals - Adora.Promo" />
      <div className="flex flex-col items-start w-full p-10 text-neutral gap-10">
        <div className="text-3xl font-bold w-full flex flex-col items-center">Outgoing Deals</div>
        <div className="flex flex-row justify-between items-center w-full">
          <StatusDropdown status={status} setStatus={setStatus} />
          <Button
            classes={{
              width: "1/4",
              height: "[12px]",
              padding: "5 py-2",
              bgColor: "primary",
              textColor: "accent",
              textSize: "lg",
              fontWeight: "bold",
            }}
            text="Create Offer"
            onClick={() => notification.info("Create offer")}
          />
        </div>
        <DealGrid deals={filteredDeals} />
      </div>
    </div>
  );
};

export default Outgoing;
