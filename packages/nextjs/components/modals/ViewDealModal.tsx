import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import CreatorModalActions from "./content/creator/CreatorModalActions";
import CreatorModalBody from "./content/creator/CreatorModalBody";
import SponsorModalActions from "./content/sponsor/SponsorModalActions";
import SponsorModalBody from "./content/sponsor/SponsorModalBody";
import { SismoConnectConfig, SismoConnectResponse, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";
import { fetchEncryptedDeal } from "~~/utils/adora/fetchEncryptedDeal";
import { notification } from "~~/utils/scaffold-eth";

const ViewDealModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const [deal, setDeal] = useState<DealType>();
  const { address, setSismoProof } = useGlobalState();

  const getEncryptedDeal = (dealId: string) => {
    fetchEncryptedDeal(dealId, current.get("key"))
      .then((decryptedFetchedDeal: DealType | undefined) => {
        console.log(decryptedFetchedDeal);
        setDeal(decryptedFetchedDeal);
      })
      .catch(() => {
        notification.error("Deal with ID '" + dealId + "' does not exist!");
        return;
      });
  };

  useEffect(() => {
    const dealId = current.get("id");
    if (dealId) {
      getEncryptedDeal(dealId);
    }
  }, [searchParams]); // eslint-disable-line

  // Set initial state to be the encrypted deal
  const config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };
  const { sismoConnect } = useSismoConnect({ config });
  useEffect(() => {
    const sismoConnectResponse = current.get("sismoConnectResponseCompressed");

    const tempVar = window.location.href.split("?");

    if (sismoConnectResponse || (tempVar.length > 1 && tempVar[1].startsWith("sismo"))) {
      const response: SismoConnectResponse | null = sismoConnect.getResponse();
      if (response) {
        setSismoProof(response);
        const url = localStorage.getItem("redirectUrl");
        router.push(url ?? "/");
      }
    }
  }, [searchParams]); // eslint-disable-line

  const isSponsor = deal?.sponsor === address;

  const onClose = () => {
    setDeal(undefined);
    current.delete("id");
    current.delete("key");
    const query = current.toString() ? `?${current.toString()}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <Modal
      title={"View Deal"}
      open={!!deal}
      onClose={onClose}
      footerActions={
        !deal && !deal ? null : isSponsor ? (
          <SponsorModalActions deal={deal} onClose={onClose} />
        ) : (
          <CreatorModalActions deal={deal} onClose={onClose} />
        )
      }
    >
      {!deal && !deal ? null : isSponsor ? <SponsorModalBody deal={deal} /> : <CreatorModalBody deal={deal} />}
    </Modal>
  );
};

export default ViewDealModal;
