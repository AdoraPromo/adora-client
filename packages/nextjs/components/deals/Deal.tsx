import { Button } from "../misc/Button";
import { ButtonIcon } from "../misc/Icon";
import Status from "./Status";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

const basicButtonClasses = {
  padding: "2",
  bgColor: "primary",
  textColor: "accent",
  textSize: "md",
  iconSize: "5",
  hover: "transition ease-in-out hover:opacity-80 duration-200",
};

const DealButton = ({ status }: { status: string }) => {
  if (status === "Accepted") {
    return (
      <Button
        classes={{ ...basicButtonClasses }}
        icon={ButtonIcon.Redeem}
        text="Redeem"
        onClick={() => notification.info("Redeeming...")}
      />
    );
  }

  if (status === "Pending") {
    return (
      <Button
        classes={{ ...basicButtonClasses, bgColor: "error" }}
        icon={ButtonIcon.Withdraw}
        text="Withdraw"
        onClick={() => notification.info("Withdrawing...")}
      />
    );
  }

  return (
    <Button
      classes={{ ...basicButtonClasses, bgColor: "accent-content" }}
      text="View"
      onClick={() => notification.info("Viewing...")}
    />
  );
};

export interface DealProps {
  deal: DealType;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Deal = ({ deal, open, setOpen }: DealProps) => {
  return (
    <div
      className="flex flex-col gap-3 py-8 px-12 rounded-2xl border-solid border-2 hover:cursor-pointer transition ease-in-out hover:scale-105 duration-300 bg-white"
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
          <div>|</div>
          <div className="w-2/5">{deal.maxPayment} APE</div>
        </div>
      </div>
      <DealButton status={deal.status} />
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
