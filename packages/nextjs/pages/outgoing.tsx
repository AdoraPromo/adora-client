import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DealGrid } from "~~/components/deals/DealGrid";
import { StatusDropdown } from "~~/components/deals/StatusDropdown";
import { CreateDealModal } from "~~/components/modals/CreateDealModal";
import DealSentModal from "~~/components/modals/DealSentModal";
import ViewDealModal from "~~/components/modals/ViewDealModal";
import { useGlobalState } from "~~/services/store/store";
import { DealType, fromDatabaseDeal } from "~~/types/deal";
import { getDealsTableName } from "~~/utils/adora/constants";
import db from "~~/utils/adora/database";
// import { creatorDeals as deals } from "~~/utils/adora/mocks/data";
import { emptyDeal } from "~~/utils/adora/mocks/data";

const Outgoing: NextPage = () => {
  // TODO: Sort deals by expiration date
  const [status, setStatus] = useState("");
  const [dealCreation, setDealCreation] = useState<DealType>(emptyDeal);
  const [allDeals, setAllDeals] = useState<DealType[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<DealType[]>([]);

  const [dealSentModalOpen, setDealSentModalOpen] = useState(false);
  const { address } = useGlobalState();

  useEffect(() => {
    if (!allDeals.length) {
      db.prepare(`SELECT * FROM ${getDealsTableName()} WHERE sponsor_address='${address.toLowerCase()}'`)
        .all()
        .then(data => {
          if (data?.results?.length) {
            const mappedDeals: DealType[] = data.results.map(d => fromDatabaseDeal(d));
            setAllDeals(mappedDeals);
          }
        });
    }
  }, [address]); // eslint-disable-line

  useEffect(() => {
    if (!status) {
      setFilteredDeals(allDeals);
      return;
    }

    setFilteredDeals(allDeals.filter((deal: any) => deal?.status === status));
  }, [status, allDeals]);

  return (
    <>
      <ViewDealModal />
      <MetaHeader title="Outgoing Deals - Adora.Promo" />
      <div
        style={{ backgroundImage: `url('/assets/background-minimal.svg')` }}
        className="flex flex-col items-start w-full h-full p-10 text-neutral gap-8 min-h-screen bg-cover bg-center"
      >
        <div className="text-3xl font-bold w-full flex flex-col items-center">Outgoing Deals</div>
        <div className="flex flex-row justify-between items-center w-full">
          <StatusDropdown status={status} setStatus={setStatus} />
          <CreateDealModal onSuccess={() => setDealSentModalOpen(true)} deal={dealCreation} setDeal={setDealCreation} />
          <DealSentModal open={dealSentModalOpen} setOpen={setDealSentModalOpen} />
        </div>
        {filteredDeals.length ? (
          <DealGrid deals={filteredDeals} />
        ) : (
          <div className="flex flex-col justify-center items-center w-full gap-5 p-10">
            <div className="flex flex-col justify-center items-center w-full text-2xl">
              <div>This Page is Empty.</div>
              <div>
                Start with <b>Create Deal</b>!
              </div>
            </div>
            <Image src={"/assets/empty-outgoing.svg"} alt="empty-outgoing" width={600} height={350} />
          </div>
        )}
      </div>
    </>
  );
};

export default Outgoing;
