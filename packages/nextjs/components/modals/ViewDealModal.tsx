import React, { useState } from "react";
import { Button } from "../misc/Button";
import { Input } from "../misc/Input";
import { TextArea } from "../misc/TextArea";
import Modal from "./Modal";

const ViewDealActions = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  return (
    <div className="flex items-center justify-center p-6 gap-4">
      <Button
        classes={{
          height: "[12px]",
          padding: "6 py-2",
          borderColor: "primary",
          textColor: "primary",
          textSize: "lg",
        }}
        text="Cancel"
        onClick={() => setOpen(false)}
      />
      <Button
        classes={{
          width: "auto",
          height: "[12px]",
          padding: "5 py-2",
          bgColor: "primary",
          textColor: "accent",
          textSize: "lg",
        }}
        text="View Deal"
        onClick={() => setOpen(false)}
      />
    </div>
  );
};

const ViewDealModal = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      openTrigger={<>{React.cloneElement(children, { open, setOpen })}</>}
      title="View Deal"
      open={open}
      setOpen={setOpen}
      footerActions={<ViewDealActions setOpen={setOpen} />}
    >
      <div className="relative p-6 px-10 flex flex-row justify-between items-center w-full gap-5">
        <div className="flex flex-col gap-5 w-1/2">
          <Input
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
            placeholder="MM/DD/YYYY"
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
            disabled
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
            content={""}
            // TODO: Fix
            setContent={(e: any) => {
              console.log(e);
            }}
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
};

export default ViewDealModal;
