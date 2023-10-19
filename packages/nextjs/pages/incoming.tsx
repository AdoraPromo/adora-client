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
import { DealType } from "~~/types/deal";
import { creatorDeals as deals } from "~~/utils/adora/mocks/data";
import { notification } from "~~/utils/scaffold-eth";

const Incoming: NextPage = () => {
  // TODO: Sort deals by expiration date
  const [viewDealUrl, setViewDealUrl] = useState("");
  const [status, setStatus] = useState("");
  const [viewDeal, setViewDeal] = useState<DealType>();
  const [allDeals] = useState<DealType[]>(deals);
  const [filteredDeals, setFilteredDeals] = useState<DealType[]>(deals);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

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
    const urlParts = viewDealUrl.split("id=");

    let dealId = "";
    if (urlParts.length >= 2) {
      dealId = urlParts[1];
    } else {
      notification.error("Invalid deal URL.");
      return;
    }

    // If ID exists, move on
    if (dealId) {
      // Find the deal
      const _dealCheck = deals.find(d => d.id === dealId);

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
          <div className="flex flex-col justify-center items-center w-full gap-10 p-10">
            <div className="flex flex-col justify-center items-center w-full text-2xl">
              <div>This Page is Empty.</div>
              <div>Expect new deals soon!</div>
            </div>
            <Image src={"/assets/empty-incoming.png"} alt="empty-incoming" width={548} height={400} />
          </div>
        )}
      </div>
    </>
  );
};

export default Incoming;
