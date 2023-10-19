import { useState } from "react";
import { Button } from "../misc/Button";
import { Input } from "../misc/Input";
import { TextArea } from "../misc/TextArea";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import { DealType } from "~~/types/deal";

const CreateDealOpenTrigger = ({
  title,
  open,
  setOpen,
}: {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Button
      classes={{
        width: "auto",
        height: "[12px]",
        padding: "5 py-2",
        bgColor: "primary",
        textColor: "accent",
        textSize: "lg",
      }}
      text={title}
      onClick={() => setOpen(!open)}
    />
  );
};

export function CreateDealModal({ onSuccess }: { onSuccess: () => void }) {
  const [deal, setDeal] = useState({
    deadline: new Date(Date.now()),
  } as DealType);
  const [open, setOpen] = useState(false);
  const title = "Create Deal";

  const updateTwitterHandle = (newHandle: string) => setDeal({ ...deal, twitterHandle: newHandle });
  const updateDeadline = (newDeadline: Date) => setDeal({ ...deal, deadline: newDeadline });
  const updatePaymentPerThousand = (newPaymentPerThousand: number) =>
    setDeal({ ...deal, paymentPerThousand: newPaymentPerThousand });
  const updateMaximumPayment = (newMaximumPayment: number) => setDeal({ ...deal, maxPayment: newMaximumPayment });

  return (
    <Modal
      title={title}
      open={open}
      setOpen={setOpen}
      openTrigger={<CreateDealOpenTrigger title={title} open={open} setOpen={setOpen} />}
      footerActions={
        <DealActions
          actionTitle={title}
          onClose={() => setOpen(false)}
          onAction={() => {
            setOpen(false);
            onSuccess(); // Open Deal Sent modal
          }}
        />
      }
    >
      <div className="relative p-6 px-10 flex flex-row justify-between items-center w-full gap-5">
        <div className="flex flex-col gap-5 w-1/2">
          <Input
            full
            content={deal.twitterHandle}
            setContent={updateTwitterHandle}
            placeholder={"Paste the link here..."}
            type={"string"}
            label={"Twitter Account of the Creator"}
            classes={{
              width: "full",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            content={deal.deadline}
            placeholder="MM/DD/YYYY"
            setContent={updateDeadline}
            type={"date"}
            label={"Deadline"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            readOnly
            placeholder={"APE"}
            type={"string"}
            label={"Currency"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            content={deal.paymentPerThousand}
            setContent={updatePaymentPerThousand}
            placeholder={"Type here..."}
            type={"number"}
            label={"Payment per 1000 likes"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
          <Input
            full
            content={deal.maxPayment}
            setContent={updateMaximumPayment}
            placeholder={"Type here..."}
            type={"number"}
            label={"Maximum Payment"}
            classes={{
              width: "[50rem]",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
        </div>
        <div className="flex flex-col w-1/2 h-full">
          <TextArea
            full
            content={deal.requirements}
            setContent={(e: any) => setDeal({ ...deal, requirements: e.target.value })}
            placeholder={"Write all your requirements here. Try to be very clear and specific..."}
            label={"Requirements"}
            rows={16}
            classes={{
              width: "fit", // TODO: These don't work
              height: "fit",
              padding: "2 px-4",
              textColor: "neutral",
              textSize: "md",
              borderColor: "accent-focus",
              hover: "transition hover:border-2 hover:border-accent-content duration-300",
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
