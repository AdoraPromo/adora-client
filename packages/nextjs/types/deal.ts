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

const dealStatus = (deal: DatabaseDealType): string => {
  if (deal.redemption_expiration * 1000 < new Date().getTime()) return "Expired";
  if (deal.status == "New") return "Pending";

  return deal.status;
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
