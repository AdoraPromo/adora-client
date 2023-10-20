import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import CreatorModalActions from "./content/creator/CreatorModalActions";
import CreatorModalBody from "./content/creator/CreatorModalBody";
import SponsorModalActions from "./content/sponsor/SponsorModalActions";
import SponsorModalBody from "./content/sponsor/SponsorModalBody";
import { SismoConnectConfig, SismoConnectResponse, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";

const ViewDealModal = ({ children, deal }: { children: JSX.Element; deal?: DealType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [open, setOpen] = useState(false);

  const { address, setSismoProof } = useGlobalState();

  // Set initial state to be the encrypted deal
  const [decryptedDeal, setDecryptedDeal] = useState<DealType | undefined>(deal);
  const config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };
  const { sismoConnect } = useSismoConnect({ config });

  const setOpenWithQueryParams = (open: boolean) => {
    if (!deal) return;

    setOpen(open);
    if (open) {
      // TODO: Handle missing ID error
      deal.id && current.set("id", deal.id);
    } else {
      current.delete("id");
    }

    const query = current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    if (open && deal) {
      // ADD: Do the deal decryption here
      const _decryptedDeal: DealType = { ...deal, requirements: "i've decrypted this deal" };
      setDecryptedDeal(_decryptedDeal);
    }
  }, [open, deal]);

  useEffect(() => {
    // If modal isn't open and we have the required deal, open modal
    if (!open && deal && current.get("id") === deal.id) {
      setOpenWithQueryParams(true);
    }
    const sismoConnectResponse = current.get("sismoConnectResponseCompressed");

    const tempVar = window.location.href.split("?");

    if (sismoConnectResponse || (tempVar.length > 1 && tempVar[1].startsWith("sismo"))) {
      const response: SismoConnectResponse | null = sismoConnect.getResponse();
      console.log({ response });
      if (response) {
        setSismoProof(response);
        const url = localStorage.getItem("redirectUrl");
        router.push(url ?? "/");
      }
    }
  }, [searchParams]); // eslint-disable-line

  const isSponsor = deal && deal.sponsor === address;

  return (
    <Modal
      openTrigger={<>{React.cloneElement(children, { open, setOpen: setOpenWithQueryParams })}</>}
      title={"View Deal"}
      open={open}
      setOpen={setOpenWithQueryParams}
      footerActions={
        !deal ? null : isSponsor ? (
          <SponsorModalActions deal={decryptedDeal} onClose={() => setOpenWithQueryParams(false)} />
        ) : (
          <CreatorModalActions deal={decryptedDeal} onClose={() => setOpenWithQueryParams(false)} />
        )
      }
    >
      {!deal ? null : isSponsor ? <SponsorModalBody deal={decryptedDeal} /> : <CreatorModalBody deal={decryptedDeal} />}
    </Modal>
  );
};

export default ViewDealModal;
