import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DealGrid } from "~~/components/deals/DealGrid";
import { StatusDropdown } from "~~/components/deals/StatusDropdown";
import { Button } from "~~/components/misc/Button";
import { Input } from "~~/components/misc/Input";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

const Incoming: NextPage = () => {
  const deals: DealType[] = [
    {
      id: "1",
      sponsor: "0x123",
      creator: "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB",
      status: "Accepted",
      twitterHandle: "twitteraccount",
      paymentPerThousand: 10,
      maxPayment: 1000,
      deadline: new Date(),
      requirements: "",
    },
    {
      id: "2",
      sponsor: "0x123",
      creator: "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB",
      status: "Withdrawn",
      twitterHandle: "twitteraccount",
      paymentPerThousand: 10,
      maxPayment: 1000,
      deadline: new Date(),
      requirements: "",
    },
    {
      id: "3",
      sponsor: "0x123",
      creator: "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB",
      status: "Pending",
      twitterHandle: "twitteraccount",
      paymentPerThousand: 10,
      maxPayment: 1000,
      deadline: new Date(),
      requirements: "",
    },
    {
      id: "4",
      sponsor: "0x123",
      creator: "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB",
      status: "Expired",
      twitterHandle: "twitteraccount",
      paymentPerThousand: 10,
      maxPayment: 1000,
      deadline: new Date(),
      requirements: "",
    },
    {
      id: "5",
      sponsor: "0x123",
      creator: "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB",
      status: "Redeemed",
      twitterHandle: "twitteraccount",
      paymentPerThousand: 10,
      maxPayment: 1000,
      deadline: new Date(),
      requirements: "",
    },
    {
      id: "6",
      sponsor: "0x123",
      creator: "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB",
      status: "Accepted",
      twitterHandle: "twitteraccount",
      paymentPerThousand: 10,
      maxPayment: 1000,
      deadline: new Date(),
      requirements: "",
    },
  ];

  // TODO: Sort deals by expiration date
  const [viewDealUrl, setViewDealUrl] = useState("");
  const [status, setStatus] = useState("");
  const [allDeals] = useState(deals);
  const [filteredDeals, setFilteredDeals] = useState(deals);

  useEffect(() => {
    if (!status) {
      setFilteredDeals(allDeals);
      return;
    }

    setFilteredDeals(allDeals.filter((deal: any) => deal?.status === status));
  }, [status, allDeals]);

  return (
    <div>
      <MetaHeader title="Incoming Deals - Adora.Promo" />
      <div
        style={{ backgroundImage: `url('/assets/background-minimal.png')` }}
        className="flex flex-col items-start w-full h-full p-10 text-neutral gap-8 min-h-screen bg-cover bg-center"
      >
        <div className="text-3xl font-bold w-full flex flex-col items-center">Incoming Deals</div>
        <div className="flex flex-row justify-between items- w-full">
          <StatusDropdown status={status} setStatus={setStatus} />
          <div className="flex flex-row justify-end items-center w-1/2 gap-2">
            <Input
              content={viewDealUrl}
              setContent={setViewDealUrl}
              placeholder={"Enter deal's URL"}
              type={"string"}
              classes={{
                width: "auto",
                padding: "2 px-4",
                textColor: "neutral",
                textSize: "md",
                borderColor: "accent-focus",
                hover: "transition hover:border-2 hover:border-accent-content duration-300",
              }}
            />
            <Button
              classes={{
                width: "auto",
                height: "[12px]",
                padding: "5 py-2",
                bgColor: "primary",
                textColor: "accent",
                textSize: "lg",
              }}
              text="View Deal"
              onClick={() => notification.info("View Deal")}
            />
          </div>
        </div>
        {filteredDeals.length != 0 && <DealGrid deals={filteredDeals} />}
        {filteredDeals.length == 0 && (
          <div className="flex flex-col justify-center items-center w-full gap-10 p-10">
            <div className="flex flex-col justify-center items-center w-full text-2xl">
              <div>This Page is Empty.</div>
              <div>Expect new deals soon!</div>
            </div>
            <Image src={"/assets/empty-incoming.png"} alt="empty-incoming" width={548} height={400} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Incoming;
