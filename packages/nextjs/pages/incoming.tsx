import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { DealGrid } from "~~/components/deals/DealGrid";
import { StatusDropdown } from "~~/components/deals/StatusDropdown";
import { Button } from "~~/components/misc/Button";
import { Input } from "~~/components/misc/Input";
import ViewDealModal from "~~/components/modals/ViewDealModal";
import { useGlobalState } from "~~/services/store/store";
import { DealType, fromDatabaseDeal } from "~~/types/deal";
import { getDealsTableName } from "~~/utils/adora/constants";
import db from "~~/utils/adora/database";
// import { creatorDeals as deals } from "~~/utils/adora/mocks/data";
import { notification } from "~~/utils/scaffold-eth";

const Incoming: NextPage = () => {
  // const DB_TABLE_NAME = "deals_137_126"; //await databaseContract.s_tableName();

  // TODO: Sort deals by expiration date
  const [viewDealUrl, setViewDealUrl] = useState("");
  const [status, setStatus] = useState("");
  const [viewDeal, setViewDeal] = useState<DealType>();
  const [allDeals, setAllDeals] = useState<DealType[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<DealType[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const { address } = useGlobalState();

  useEffect(() => {
    if (!allDeals.length) {
      db.prepare(`SELECT * FROM ${getDealsTableName()} WHERE creator_address='${address.toLowerCase()}'`)
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

  const onClickViewDeal = () => {
    if (!viewDealUrl) {
      notification.warning("Please insert deal's URL.");
      return;
    }

    // Get ID from the URL
    const dealId = getDealIdFromQueryParams(viewDealUrl);

    // ADD: Add deal lookup logic.
    // Note: user could also input a link to the deal that's not present in the `allDeals` state variable.
    // If ID exists, move on
    if (dealId) {
      const _dealCheck = allDeals.find(d => d.id === dealId);

      // Deal could not be found
      if (!_dealCheck) {
        notification.error("Deal with ID '" + dealId + "' does not exist!");
        return;
      } else {
        // Deal is found
        setViewDeal(_dealCheck);
      }

      current.set("id", dealId);
      router.push(`${pathname}?${current.toString()}`);
    }
  };

  return (
    <>
      <MetaHeader title="Incoming Deals - Adora.Promo" />
      <div
        style={{ backgroundImage: `url('/assets/background-minimal.svg')` }}
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
              cssSpecialId="viewDealButton"
              classes={{
                width: "1/2",
                padding: "2 px-4",
                textColor: "neutral",
                textSize: "md",
                borderColor: "accent-focus",
                hover: "transition hover:border-2 hover:border-accent-content duration-300",
              }}
            />
            <ViewDealModal deal={viewDeal}>
              <></>
            </ViewDealModal>
            <Button
              classes={{
                width: "auto",
                height: "[12px]",
                padding: "5 py-2",
                textColor: "accent",
                textSize: "lg",
              }}
              text="View Deal"
              onClick={onClickViewDeal}
            />
          </div>
        </div>
        {filteredDeals.length != 0 && <DealGrid deals={filteredDeals} />}
        {filteredDeals.length == 0 && (
          <div className="flex flex-col justify-center items-center w-full gap-3 p-10">
            <div className="flex flex-col justify-center items-center w-full text-2xl">
              <div>This Page is Empty.</div>
              <div>
                Start with <b>View Deal</b>!
              </div>
            </div>
            <Image src={"/assets/empty-incoming.svg"} alt="empty-incoming" width={550} height={300} />
          </div>
        )}
      </div>
    </>
  );
};

const getDealIdFromQueryParams = (url: string): string => {
  const urlParts = url.split("?"); // Extract path + query params

  if (urlParts.length >= 2) {
    const dealIdParts = urlParts[1].split("="); // Get first query param
    if (dealIdParts.length >= 2) {
      return dealIdParts[1]; // Get ID
    }
  } else {
    notification.error("Invalid deal URL.");
  }

  return "";
};

export default Incoming;
