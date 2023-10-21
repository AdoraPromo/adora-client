import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers, utils } from "ethers";
import { SponsorshipMarketplaceABI, marketplaceAddress } from "~~/contracts";
import { DealType, statusNumberToString } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

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
    } else {
      // Fetch key from Lit Protocol
      const evmContractConditions = [
        {
          contractAddress: marketplaceAddress,
          functionName: "canUserDecrypt",
          functionParams: [":userAddress", dealId],
          functionAbi: {
            inputs: [
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "dealId",
                type: "bytes32",
              },
            ],
            name: "canUserDecrypt",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          chain: "polygon",
          returnValueTest: {
            key: "",
            comparator: "=",
            value: "true",
          },
        },
      ];

      const client = new LitJsSdk.LitNodeClient({
        alertWhenUnauthorized: false,
      });
      await client.connect();
      const authSigNote = notification.loading(`Please provide signature\nto save the key to \nLit Protocol 👌`);
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "polygon" });
      notification.remove(authSigNote);
      const symmetricKey = await client.getEncryptionKey({
        evmContractConditions,
        toDecrypt: fetchedDealStruct.creatorEncryptedSymmetricKey, // Stored as a hex string on chain
        chain: "polygon",
        authSig,
      });
      console.log("Successfully fetched key from Lit Protocol");
      console.log(symmetricKey);
      const encryptedDealTermsBase64 = fetchedDealStruct.encryptedTerms;
      const encryptedDealTermsBlob = new Blob([fromBase64(encryptedDealTermsBase64)]);
      const decryptedDealTerms = await LitJsSdk.decryptString(encryptedDealTermsBlob, symmetricKey);
      console.log("Decrypted deal terms");
      console.log(decryptedDealTerms);
      const offerTerms = JSON.parse(decryptedDealTerms);
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
      return decryptedFetchedDeal;
    }
  }
};
