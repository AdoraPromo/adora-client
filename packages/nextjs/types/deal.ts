export interface DealType {
  id: string;
  status: string;
  twitterHandle: string;
  deadline: Date;
  paymentPerThousand: number;
  maxPayment: number;
  requirements: string;
}
