import { DealType } from "~~/types/deal";

export interface DealProps {
  deal: DealType;
}

export const Deal = ({ deal }: DealProps) => {
  let color; // TODO: Define button to be clicked for each staus

  switch (deal.status) {
    case "Accepted":
      color = "primary";
      break;
    case "Withdrawn":
      color = "error";
      break;
    case "Pending":
      color = "info";
      break;
    case "Redeemed":
      color = "success";
      break;
    case "Expired":
      color = "warning";
      break;
    default:
      color = "neutral";
      break;
  }
  console.log(color);

  return (
    <div className={`flex flex-col gap-1 py-8 px-12 rounded-2xl border-solid border-2 border-${color}`}>
      <div className={`text-${color}`}> &#9679; {deal.status}</div>
      <a
        className="underline text-info hover:cursor-pointer"
        href={`https://twitter.com/${deal.twitterHandle}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        @{deal.twitterHandle}
      </a>
      <div className="flex flex-row gap-3">
        <div>{deal.timeRemaining}</div>
        <div>|</div>
        <div>{deal.paymentAmount}</div>
      </div>
    </div>
  );
};
