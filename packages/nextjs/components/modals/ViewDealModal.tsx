import React, { useState } from "react";
import Modal from "./Modal";
import CreatorModalActions from "./content/creator/CreatorModalActions";
import CreatorModalBody from "./content/creator/CreatorModalBody";
import SponsorModalActions from "./content/sponsor/SponsorModalActions";
import SponsorModalBody from "./content/sponsor/SponsorModalBody";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";

const ViewDealModal = ({ children, deal }: { children: JSX.Element; deal: DealType }) => {
  const { address } = useGlobalState();

  const [open, setOpen] = useState(false);
  const title = "View Deal";

  return (
    <Modal
      openTrigger={<>{React.cloneElement(children, { open, setOpen })}</>}
      title={title}
      open={open}
      setOpen={setOpen}
      footerActions={
        deal.sponsor === address ? (
          <SponsorModalActions deal={deal} onClose={() => setOpen(false)} />
        ) : (
          <CreatorModalActions deal={deal} onClose={() => setOpen(false)} />
        )
      }
    >
      {deal.sponsor === address ? <SponsorModalBody deal={deal} /> : <CreatorModalBody deal={deal} />}
    </Modal>
  );
};

export default ViewDealModal;
