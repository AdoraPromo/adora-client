import { useEffect, useState } from "react";
import { Button } from "../misc/Button";
import { ButtonIcon } from "../misc/Icon";
import { DealType } from "~~/types/deal";
import { classNames } from "~~/utils/adora/cssUtils";
import { notification } from "~~/utils/scaffold-eth";

export interface DealProps {
  deal: DealType;
}

export const Deal = ({ deal }: DealProps) => {
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
          hover: "transiton ease-in-out hover:opacity-80 duration-200",
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
              hover: "transiton ease-in-out hover:opacity-80 duration-200",
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
              hover: "transiton ease-in-out hover:opacity-80 duration-200",
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
        "flex flex-col gap-2 py-8 px-12 rounded-2xl border-solid border-2 hover:cursor-pointer transiton ease-in-out hover:scale-105 duration-300",
      ),
    );
    setButton(button);
  }, [deal.status]);

  return (
    <div className={classes}>
      <div className="flex flex-col gap-1" onClick={() => notification.info(Object.values(deal).join("\n"))}>
        <div className={`text-${color}`}> &#9679; {deal.status}</div>
        <a
          className="underline text-info hover:cursor-pointer transiton ease-in-out hover:opacity-75 duration-100"
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
      {button}
    </div>
  );
};
