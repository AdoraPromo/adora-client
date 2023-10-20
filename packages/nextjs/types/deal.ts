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
  if (deal.redemption_expiration < new Date().getTime()) return "Expired";
  if (deal.status == "New") return "Pending";

  return deal.status;
};

export const fromDatabaseDeal = (deal: any): DealType => {
  return {
    id: deal.id,
    creator: deal.creator_address,
    sponsor: deal.sponsor_address,
    status: dealStatus(deal),
    twitterHandle: "",
    deadline: new Date(Number(deal.redemption_expiration)),
    paymentPerThousand: 0,
    maxPayment: deal.max_payment,
    requirements: deal.encrypted_terms,
  };
};
