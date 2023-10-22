import { DealStatus } from "../utils/adora/enums";
import { utils } from "ethers";

export interface DealType {
  id: string;
  creator: string;
  sponsor: string;
  status: string;
  twitterHandle: string;
  deadline: Date;
  paymentPerThousand: number;
  maxPayment: number;
  requirements: string;
}

export interface DatabaseDealType {
  id: string;
  status: string;
  sponsor_address: string;
  creator_address: string;
  terms_hash: string;
  encrypted_symmetric_key: string;
  encrypted_terms: string;
  redemption_expiration: number;
  max_payment: string;
  redeemed_amount: string;
  encrypted_tweet_id: string;
}

export const dealStatus = (deal: DatabaseDealType): DealStatus | string => {
  if (deal.status === "Withdrawn") return DealStatus.WITHDRAWN;
  if (deal.redemption_expiration * 1000 < new Date().getTime()) return DealStatus.EXPIRED;
  if (deal.status == "New") return DealStatus.PENDING;

  return deal.status;
};

export const statusNumberToString = (status: number | string): DealStatus => {
  const statusString = status.toString();
  switch (statusString) {
    case "0":
      return DealStatus.PENDING;
    case "1":
      return DealStatus.ACCEPTED;
    case "2":
      return DealStatus.REDEEMED;
    case "3":
      return DealStatus.WITHDRAWN;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

export const fromDatabaseDeal = (deal: any): DealType => {
  const maxPaymentInApeWei = BigInt(deal.max_payment);
  const maxPaymentInApe = Number(utils.formatEther(maxPaymentInApeWei));
  const idInHex = `0x${Buffer.from(deal.id, "base64").toString("hex")}`;
  return {
    id: idInHex,
    creator: deal.creator_address,
    sponsor: deal.sponsor_address,
    status: dealStatus(deal),
    twitterHandle: "",
    deadline: new Date(Number(deal.redemption_expiration * 1000)),
    paymentPerThousand: 0,
    maxPayment: maxPaymentInApe,
    requirements: deal.encrypted_terms,
  };
};
