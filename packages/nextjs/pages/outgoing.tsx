import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DealGrid } from "~~/components/deals/DealGrid";
import { StatusDropdown } from "~~/components/deals/StatusDropdown";
import { CreateDealModal } from "~~/components/modals/CreateDealModal";
import DealSentModal from "~~/components/modals/DealSentModal";
import { DealType } from "~~/types/deal";
import { sponsorDeals as deals, emptyDeal } from "~~/utils/adora/mocks/data";

const Outgoing: NextPage = () => {
  // TODO: Sort deals by expiration date
  const [status, setStatus] = useState("");
  const [dealCreation, setDealCreation] = useState<DealType>(emptyDeal);
  const [allDeals] = useState<DealType[]>(deals);
  const [filteredDeals, setFilteredDeals] = useState<DealType[]>(deals);

  const [dealSentModalOpen, setDealSentModalOpen] = useState(false);

  useEffect(() => {
    if (!status) {
      setFilteredDeals(allDeals);
      return;
    }

    setFilteredDeals(allDeals.filter((deal: any) => deal?.status === status));
  }, [status, allDeals]);

  return (
    <>
      <MetaHeader title="Outgoing Deals - Adora.Promo" />
      <div
        style={{ backgroundImage: `url('/assets/background-minimal.png')` }}
        className="flex flex-col items-start w-full h-full p-10 text-neutral gap-8 min-h-screen bg-cover bg-center"
      >
        <div className="text-3xl font-bold w-full flex flex-col items-center">Outgoing Deals</div>
        <div className="flex flex-row justify-between items-center w-full">
          <StatusDropdown status={status} setStatus={setStatus} />
          <CreateDealModal onSuccess={() => setDealSentModalOpen(true)} deal={dealCreation} setDeal={setDealCreation} />
          <DealSentModal
            open={dealSentModalOpen}
            setOpen={setDealSentModalOpen}
            dealId={dealCreation?.id ? dealCreation?.id : "3"}
          />
        </div>
        {filteredDeals.length ? (
          <DealGrid deals={filteredDeals} />
        ) : (
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
    </>
  );
};

export default Outgoing;
