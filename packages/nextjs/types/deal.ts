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

// const fromBlockchainToFrontendType = () => {};
