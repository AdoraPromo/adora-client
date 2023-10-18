import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DealGrid } from "~~/components/deals/DealGrid";
import { StatusDropdown } from "~~/components/deals/StatusDropdown";
import { Button } from "~~/components/misc/Button";
import { CreateDealModal } from "~~/components/modals/CreateDealModal";
import { DealType } from "~~/types/deal";

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

  // TODO: Sort deals by expiration date
  const [status, setStatus] = useState("");
  const [allDeals] = useState(deals);
  const [filteredDeals, setFilteredDeals] = useState(deals);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    if (!status) {
      setFilteredDeals(allDeals);
      return;
    }

    setFilteredDeals(allDeals.filter((deal: any) => deal?.status === status));
  }, [status, allDeals]);

  // TODO: Add different background image than for root

  return (
    <div>
      <MetaHeader title="Outgoing Deals - Adora.Promo" />
      <div
        style={{ backgroundImage: `url('/assets/background-minimal.png')` }}
        className="flex flex-col items-start w-full h-full p-10 text-neutral gap-8 min-h-screen bg-cover bg-center"
      >
        <div className="text-3xl font-bold w-full flex flex-col items-center">Outgoing Deals</div>
        <div onClick={() => setOpenCreateModal(false)}>
          <CreateDealModal open={openCreateModal} setOpen={setOpenCreateModal} />
        </div>
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
            text="Create Deal"
            onClick={() => setOpenCreateModal(!openCreateModal)}
          />
        </div>
        {filteredDeals.length != 0 && <DealGrid deals={filteredDeals} />}
        {filteredDeals.length == 0 && (
          <div className="flex flex-col justify-center items-center w-full gap-10 p-10">
            <div className="flex flex-col justify-center items-center w-full text-2xl">
              <div>This Page is Empty.</div>
              <div>
                Start with <b>Create Deal</b>!
              </div>
            </div>
            <Image src={"/assets/empty-outgoing.png"} alt="empty-outgoing" width={400} height={400} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Outgoing;
