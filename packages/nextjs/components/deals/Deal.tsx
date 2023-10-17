import { useEffect, useState } from "react";
import { DealType } from "~~/types/deal";
import { classNames } from "~~/utils/adora/cssUtils";
import { notification } from "~~/utils/scaffold-eth";

export interface DealProps {
  deal: DealType;
}

export const Deal = ({ deal }: DealProps) => {
  const [color, setColor] = useState("");
  const [classes, setClasses] = useState("");

  useEffect(() => {
    let color;

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

    setColor(color);
    setClasses(
      classNames(
        `border-${color}`,
        "flex flex-col gap-1 py-8 px-12 rounded-2xl border-solid border-2 hover:cursor-pointer transiton ease-in-out hover:scale-105 duration-300",
      ),
    );
  }, [deal.status]);

  return (
    <div className={classes} onClick={() => notification.info(Object.values(deal).join("\n"))}>
      <div className={`text-${color}`}> &#9679; {deal.status}</div>
      <a
        className="underline text-info hover:cursor-pointer transiton ease-in-out  hover:opacity-75 duration-100"
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
