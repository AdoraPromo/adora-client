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

const ViewDealModal = ({ children, deal }: { children: JSX.Element; deal: DealType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const { address } = useGlobalState();
  const [open, setOpen] = useState(false);
  const title = "View Deal";

  const setOpenWithQueryParams = (open: boolean) => {
    setOpen(open);
    if (open) {
      current.set("id", deal.id);
    } else {
      current.delete("id");
    }

    const query = current.toString() ? `?${current.toString()}` : "";

    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    if (!open && current.get("id") === deal.id) {
      setOpenWithQueryParams(true);
    }
  }, [searchParams]);

  return (
    <Modal
      openTrigger={<>{React.cloneElement(children, { open, setOpen: setOpenWithQueryParams })}</>}
      title={title}
      open={open}
      setOpen={setOpenWithQueryParams}
      footerActions={
        deal.sponsor === address ? (
          <SponsorModalActions deal={deal} onClose={() => setOpenWithQueryParams(false)} />
        ) : (
          <CreatorModalActions deal={deal} onClose={() => setOpenWithQueryParams(false)} />
        )
      }
    >
      {deal.sponsor === address ? <SponsorModalBody deal={deal} /> : <CreatorModalBody deal={deal} />}
    </Modal>
  );
};

export default ViewDealModal;
