import { useState } from "react";
import { Input } from "../misc/Input";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import { DealType } from "~~/types/deal";
import { notification } from "~~/utils/scaffold-eth";

interface RedeemDealModalProps {
  deal: DealType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const RedeemDealModal = ({ deal, open, setOpen }: RedeemDealModalProps) => {
  const [tweetLink, setTweetLink] = useState("");

  // ADD: Deal redemption logic
  const redeemDeal = () => {
    notification.info("Deal redeem logic: " + tweetLink);
  };

  if (!deal) return null;

  return (
    <Modal
      title="Submit your work?"
      open={open}
      setOpen={setOpen}
      footerActions={
        <DealActions onClose={() => setOpen(false)} actionTitle={"Submit"} onAction={() => redeemDeal()} />
      }
      width="1/4"
    >
      <>
        <div className="flex flex-col text-neutral w-full items-start justify-start gap-1 mt-3">
          <div className="text-md">All done? In order to submit your work, please paste the Tweet link below:</div>
          <Input
            full
            content={tweetLink}
            setContent={setTweetLink}
            placeholder={"Paste the link here..."}
            type={"string"}
            classes={{
              width: "full",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <div className="text-sm text-accent-content">
            Note: Once you paste Link to Tweet, there is no coming back.
          </div>
        </div>
      </>
    </Modal>
  );
};

export default RedeemDealModal;
