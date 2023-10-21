import { ethers, utils } from "ethers";
import { SponsorshipMarketplaceABI, marketplaceAddress } from "~~/contracts";
import { DealType, statusNumberToString } from "~~/types/deal";

const fromBase64 = (str: string) =>
  new Uint8Array(
    atob(str)
      .split("")
      .map(c => c.charCodeAt(0)),
  );

export const fetchEncryptedDeal = async (dealId: string, symKeyHex: string | null) => {
  if (dealId && utils.isBytesLike(dealId)) {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, provider);
    const fetchedDealStruct = await marketplaceContract.getDeal(dealId);
    // If the key is in the URL, attempt to decrypt the deal using that key
    if (symKeyHex) {
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
      return decryptedFetchedDeal;
    }
  } else {
    // TODO Decrypt the deal using Lit Protocol and call setDecryptedDeal
  }
};
