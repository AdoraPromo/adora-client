import Status from "./Status";
import { DealType } from "~~/types/deal";
import { getCustomColorByStatus } from "~~/utils/adora/getByStatus";

export interface DealProps {
  deal: DealType;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Deal = ({ deal, open, setOpen }: DealProps) => {
  const color = getCustomColorByStatus("border", deal.status);

  return (
    <div
      className={`flex flex-col gap-3 py-8 px-12 rounded-2xl border-solid border-2 ${color} border-info hover:cursor-pointer transition ease-in-out hover:scale-105 duration-300 bg-white bg-opacity-80`}
      onClick={() => setOpen && setOpen(!open)}
    >
      <div className="flex flex-col gap-1">
        <Status value={deal.status} />
        <a
          className="underline text-info hover:cursor-pointer transition ease-in-out hover:opacity-75 duration-100"
          href={`https://twitter.com/${deal.twitterHandle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{deal.twitterHandle}
        </a>
        <div className="flex flex-row gap-3 w-52">
          <div className="flex flex-row w-3/5">{getRemainingTime(deal.deadline)}</div>
          <span>|</span>
          <div className="w-2/5">{deal.maxPayment} APE</div>
        </div>
      </div>
    </div>
  );
};

function getRemainingTime(deadline: Date): string {
  const diff = (deadline.getTime() - Date.now()) / 1000 / 60; // Difference in minutes

  // console.log("~~~~~~~~");
  // console.log(deadline);
  // console.log(new Date(Date.now()));
  // console.log(deadline.getTime());
  // console.log(Date.now());
  // console.log(diff);
  // console.log("~~~~~~~~");

  if (diff < 0) {
    return "Expired";
  } else if (diff < 60) {
    // < 1 hour
    return `${diff.toFixed(0)} minutes left`;
  } else if (diff < 24 * 60) {
    // < 1 day
    return `${(diff / 24).toFixed(0)} hours left`;
  } else if (diff >= 24 * 60) {
    return `${(diff / 24 / 60).toFixed(0)} days left`;
  }

  return "";
}
