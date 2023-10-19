import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Modal from "./Modal";
import CreatorModalActions from "./content/creator/CreatorModalActions";
import CreatorModalBody from "./content/creator/CreatorModalBody";
import SponsorModalActions from "./content/sponsor/SponsorModalActions";
import SponsorModalBody from "./content/sponsor/SponsorModalBody";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";

const ViewDealModal = ({ children, deal }: { children: JSX.Element; deal?: DealType }) => {
  const title = "View Deal";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const { address, setSismoProof } = useGlobalState();
  const [open, setOpen] = useState(false);
  // Set initial state to be the encrypted deal
  const [decryptedDeal, setDecryptedDeal] = useState<DealType | undefined>(deal);

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

    if (current.get("sismoProof")) {
      // ADD: Do something with the Sismo proof
      setSismoProof(current.get("sismoProof") || "");
    }
  }, [searchParams]); // eslint-disable-line

  const isSponsor = deal && deal.sponsor === address;

  return (
    <Modal
      openTrigger={<>{React.cloneElement(children, { open, setOpen: setOpenWithQueryParams })}</>}
      title={title}
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
