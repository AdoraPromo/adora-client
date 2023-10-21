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

const fromBase64 = (str: string) =>
  new Uint8Array(
    atob(str)
      .split("")
      .map(c => c.charCodeAt(0)),
  );

const ViewDealModal = ({ children, deal }: { children: JSX.Element; deal?: DealType }) => {
  deal = undefined;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const [decryptedDeal, setDecryptedDeal] = useState<DealType | undefined>(deal); // TODO: Check if we can remove this inital state.
  const [open, setOpen] = useState(false);
  const { address, setSismoProof } = useGlobalState();
  const [isDecryptedDealLoaded, setIsDecryptedDealLoaded] = useState(false);

  // TODO: Leave comments and remove console.log()
  const fetchEncryptedDeal = async () => {
    console.log("fetchEncryptedDeal is running");
    if (!open) return;

    const dealId = current.get("id");
    if (dealId && utils.isBytesLike(dealId)) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, provider);
      const fetchedDealStruct = await marketplaceContract.getDeal(dealId);
      console.log({ fetchedDealStruct });
      // If the key is in the URL, attempt to decrypt the deal using that key
      if (current.get("key")) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const symKeyHex = current.get("key")!;
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
        console.log("Sym Key Hex");
        console.log(symKeyHex);
        const encryptedOfferTermsUint8Array = fromBase64(fetchedDealStruct.encryptedTerms);
        console.log("Encrypted");
        console.log(encryptedOfferTermsUint8Array);
        const recoveredIv = encryptedOfferTermsUint8Array.slice(0, 16).buffer;
        console.log("Recovered IV");
        console.log(recoveredIv);
        const encryptedZipArrayBuffer = encryptedOfferTermsUint8Array.slice(16).buffer;
        const offerTermsArrayBuffer = await crypto.subtle.decrypt(
          {
            name: "AES-CBC",
            iv: recoveredIv,
          },
          symKey,
          encryptedZipArrayBuffer,
        );
        console.log("After decrypt");
        console.log(offerTermsArrayBuffer);
        const offerTermsString = new TextDecoder().decode(offerTermsArrayBuffer);
        console.log("After decode");
        const offerTerms = JSON.parse(offerTermsString);
        console.log("Decrypted");
        console.log(offerTermsString);

        const deadlineTimestamp = Number(fetchedDealStruct.redemptionExpiration.toString()) * 1000;
        const deadline = new Date(deadlineTimestamp);

        const decryptedFetchedDeal: DealType = {
          id: dealId,
          creator: fetchedDealStruct.creator,
          sponsor: fetchedDealStruct.sponsor,
          status: statusNumberToString(fetchedDealStruct.status.toString(), deadline),
          twitterHandle: offerTerms.twitterUserId,
          deadline,
          paymentPerThousand: Number(utils.formatEther(BigInt(offerTerms.paymentPerLike) * BigInt(1000))), // paymentPerLike is in ApeWei
          maxPayment: Number(utils.formatEther(fetchedDealStruct.maxPayment)),
          requirements: offerTerms.sponsorshipCriteria,
        };
        console.log({ decryptedFetchedDeal });
        setDecryptedDeal(decryptedFetchedDeal);
        setIsDecryptedDealLoaded(true);
      }
    } else {
      // TODO Decrypt the deal using Lit Protocol and call setDecryptedDeal
    }
  };

  useEffect(() => {
    if (isDecryptedDealLoaded) {
      return;
    }

    // TODO: Test this out - only if we open modal for the deal that's in the URL, fetch it
    if (current.get("id")) {
      fetchEncryptedDeal().catch(err => console.error(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Set initial state to be the encrypted deal
  const config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };
  const { sismoConnect } = useSismoConnect({ config });

  const setOpenWithQueryParams = (open: boolean) => {
    // if (!deal) return; // TODO: Is this okay to remove? Perhaps check for decryptedDeal

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

  const isSponsor = deal && (deal as any).sponsor === address;

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
