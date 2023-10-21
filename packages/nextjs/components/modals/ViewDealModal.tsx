import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import CreatorModalActions from "./content/creator/CreatorModalActions";
import CreatorModalBody from "./content/creator/CreatorModalBody";
import SponsorModalActions from "./content/sponsor/SponsorModalActions";
import SponsorModalBody from "./content/sponsor/SponsorModalBody";
import { SismoConnectConfig, SismoConnectResponse, useSismoConnect } from "@sismo-core/sismo-connect-react";
import { ethers, utils } from "ethers";
import { SponsorshipMarketplaceABI, marketplaceAddress } from "~~/contracts";
import { useGlobalState } from "~~/services/store/store";
import { DealType } from "~~/types/deal";
import { statusNumberToString } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

const fromBase64 = (str: string) =>
  new Uint8Array(
    atob(str)
      .split("")
      .map(c => c.charCodeAt(0)),
  );

const ViewDealModal = ({ children, deal }: { children: JSX.Element; deal?: DealType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const [decryptedDeal, setDecryptedDeal] = useState<DealType | undefined>(deal);
  const [open, setOpen] = useState(false);
  const { address, setSismoProof } = useGlobalState();

  useEffect(() => {
    (async () => {
      const dealId = current.get("id");
      if (dealId && utils.isBytesLike(dealId)) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, provider);
        const fetchedDealStruct = await marketplaceContract.getDeal(dealId);
        console.log({ fetchedDealStruct });
        // If the key is in the URL, attempt to decrypt the deal using that key
        if (current.get("key")) {
          const symKeyHex = current.get("key");
          if (!symKeyHex) {
            notification.error(`No valid decryption key found`);
            return;
          }
          const symKey = await crypto.subtle.importKey(
            "raw",
            fromBase64(Buffer.from(symKeyHex, "hex").toString("base64")),
            {
              name: "AES-CBC",
              length: 256,
            },
            false,
            ["decrypt"],
          );
          const encryptedOfferTermsUint8Array = fromBase64(fetchedDealStruct.encryptedTerms);
          const recoveredIv = encryptedOfferTermsUint8Array.slice(0, 16).buffer;
          const encryptedZipArrayBuffer = encryptedOfferTermsUint8Array.slice(16).buffer;
          const offerTermsArrayBuffer = await crypto.subtle.decrypt(
            {
              name: "AES-CBC",
              iv: recoveredIv,
            },
            symKey,
            encryptedZipArrayBuffer,
          );
          const offerTermsString = new TextDecoder().decode(offerTermsArrayBuffer);
          const offerTerms = JSON.parse(offerTermsString);
          console.log("Decrypted");
          console.log(offerTermsString);
          const decryptedFetchedDeal: DealType = {
            id: dealId,
            creator: fetchedDealStruct.creator,
            sponsor: fetchedDealStruct.sponsor,
            status: statusNumberToString(fetchedDealStruct.status.toString()),
            twitterHandle: offerTerms.twitterUserId,
            deadline: new Date(Number(fetchedDealStruct.redemptionExpiration.toString()) * 1000),
            paymentPerThousand: Number(utils.formatEther(BigInt(offerTerms.paymentPerLike) * BigInt(1000))), // paymentPerLike is in ApeWei
            maxPayment: Number(utils.formatEther(fetchedDealStruct.maxPayment)),
            requirements: offerTerms.sponsorshipCriteria,
          };
          console.log({ decryptedFetchedDeal });
          setDecryptedDeal(decryptedFetchedDeal);
        }
      } else {
        // TODO Decrypt the deal using Lit Protocol and call setDecryptedDeal
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Set initial state to be the encrypted deal
  const config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };
  const { sismoConnect } = useSismoConnect({ config });

  const setOpenWithQueryParams = (open: boolean) => {
    // if (!deal) return;

    setOpen(open);
    if (open && deal) {
      // TODO: Handle missing ID error
      deal.id && current.set("id", deal.id);
    }
    if (!open) {
      current.delete("id");
      current.delete("key");
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
    // If modal isn't open and we have the dealId in the URL, open the modal
    if (!open && current.get("id")) {
      setOpenWithQueryParams(true);
    }
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

  const isSponsor = deal && deal.sponsor === address;

  return (
    <Modal
      openTrigger={<>{React.cloneElement(children, { open, setOpen: setOpenWithQueryParams })}</>}
      title={"View Deal"}
      open={open}
      setOpen={setOpenWithQueryParams}
      footerActions={
        !deal && !decryptedDeal ? null : isSponsor ? (
          <SponsorModalActions deal={decryptedDeal} onClose={() => setOpenWithQueryParams(false)} />
        ) : (
          <CreatorModalActions deal={decryptedDeal} onClose={() => setOpenWithQueryParams(false)} />
        )
      }
    >
      {!deal && !decryptedDeal ? null : isSponsor ? (
        <SponsorModalBody deal={decryptedDeal} />
      ) : (
        <CreatorModalBody deal={decryptedDeal} />
      )}
    </Modal>
  );
};

export default ViewDealModal;
