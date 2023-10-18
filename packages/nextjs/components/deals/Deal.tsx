import { useEffect, useState } from "react";
import { Button } from "../misc/Button";
import { ButtonIcon } from "../misc/Icon";
import { DealType } from "~~/types/deal";
import { classNames } from "~~/utils/adora/cssUtils";
import { notification } from "~~/utils/scaffold-eth";

export interface DealProps {
  deal: DealType;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Deal = ({ deal, open, setOpen }: DealProps) => {
  const [button, setButton] = useState("" as any);
  const [color, setColor] = useState("");
  const [classes, setClasses] = useState("");

  useEffect(() => {
    let color;
    let button = (
      <Button
        classes={{
          padding: "2",
          bgColor: "accent-content",
          textColor: "accent",
          textSize: "md",
          iconSize: "5",
          hover: "transition ease-in-out hover:opacity-80 duration-200",
        }}
        text="View"
        onClick={() => notification.info("Viewing...")}
      />
    );

    switch (deal.status) {
      case "Accepted":
        color = "primary";
        button = (
          <Button
            classes={{
              padding: "2",
              bgColor: "primary",
              textColor: "accent",
              textSize: "md",
              iconSize: "5",
              hover: "transition ease-in-out hover:opacity-80 duration-200",
            }}
            icon={ButtonIcon.Redeem}
            text="Redeem"
            onClick={() => notification.info("Redeeming...")}
          />
        );
        break;
      case "Withdrawn":
        color = "error";
        break;
      case "Pending":
        color = "info";
        button = (
          <Button
            classes={{
              padding: "2",
              bgColor: "error",
              textColor: "accent",
              textSize: "md",
              iconSize: "5",
              hover: "transition ease-in-out hover:opacity-80 duration-200",
            }}
            icon={ButtonIcon.Withdraw}
            text="Withdraw"
            onClick={() => notification.info("Withdrawing...")}
          />
        );
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

    setColor(color);
    setClasses(
      classNames(
        `border-${color}`,
        "flex flex-col gap-2 py-8 px-12 rounded-2xl border-solid border-2 hover:cursor-pointer transition ease-in-out hover:scale-105 duration-300",
      ),
    );
    setButton(button);
  }, [deal.status]);

  return (
    <div className={classes} onClick={() => setOpen && setOpen(!open)}>
      <div className="flex flex-col gap-1">
        <div className={`text-${color}`}> &#9679; {deal.status}</div>
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
      {button}
    </div>
  );
};

function getRemainingTime(deadline: Date): string {
  const diff = (deadline.getTime() - Date.now()) / 1000 / 60; // Difference in minutes

  console.log("~~~~~~~~");
  console.log(deadline);
  console.log(new Date(Date.now()));
  console.log(deadline.getTime());
  console.log(Date.now());
  console.log(diff);
  console.log("~~~~~~~~");

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
