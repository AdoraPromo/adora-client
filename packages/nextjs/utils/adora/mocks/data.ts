import { DealStatus } from "../enums";
import { DealType } from "~~/types/deal";

// ADD: For mock purposes, add your wallet address here
const yourAddress = "0x69ddB6f5Bd2d92C397Db173b98FF6dEEF204A3bB";

const now = Date.now();
const getDate = (increment: number): Date => {
  return new Date(now + increment * 100000);
};

export const sponsorDeals: DealType[] = [
  {
    id: "1",
    creator: "0x123",
    sponsor: yourAddress,
    status: "Accepted",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(10),
    requirements: "",
  },
  {
    id: "2",
    creator: "0x123",
    sponsor: yourAddress,
    status: "Withdrawn",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(11),
    requirements: "",
  },
  {
    id: "3",
    creator: "0x123",
    sponsor: yourAddress,
    status: "Pending",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(12),
    requirements: "",
  },
  {
    id: "4",
    creator: "0x123",
    sponsor: yourAddress,
    status: "Expired",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(13),
    requirements: "",
  },
  {
    id: "5",
    creator: "0x123",
    sponsor: yourAddress,
    status: "Redeemed",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(150),
    requirements: "",
  },
  {
    id: "6",
    creator: "0x123",
    sponsor: yourAddress,
    status: "Accepted",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(1000),
    requirements: "",
  },
];

export const creatorDeals: DealType[] = [
  {
    id: "1",
    sponsor: "0x123",
    creator: yourAddress,
    status: "Accepted",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(10),
    requirements: "",
  },
  {
    id: "2",
    sponsor: "0x123",
    creator: yourAddress,
    status: "Withdrawn",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(110),
    requirements: "",
  },
  {
    id: "3",
    sponsor: "0x123",
    creator: yourAddress,
    status: "Pending",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(120),
    requirements: "",
  },
  {
    id: "4",
    sponsor: "0x123",
    creator: yourAddress,
    status: "Expired",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(130),
    requirements: "",
  },
  {
    id: "5",
    sponsor: "0x123",
    creator: yourAddress,
    status: "Redeemed",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(14),
    requirements: "",
  },
  {
    id: "6",
    sponsor: "0x123",
    creator: yourAddress,
    status: "Accepted",
    twitterHandle: "twitteraccount",
    paymentPerThousand: 10,
    maxPayment: 1000,
    deadline: getDate(50),
    requirements: "",
  },
];

export const emptyDeal = {
  id: "",
  creator: "1",
  sponsor: "1",
  status: DealStatus.PENDING,
  twitterHandle: "",
  deadline: new Date(Date.now()),
  paymentPerThousand: 1,
  maxPayment: 1,
  requirements: "",
} as DealType;
