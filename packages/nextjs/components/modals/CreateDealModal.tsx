import { Fragment, useState } from "react";
import { Button } from "../misc/Button";
import { Input } from "../misc/Input";
import { TextArea } from "../misc/TextArea";
import { Dialog, Transition } from "@headlessui/react";
import { DealType } from "~~/types/deal";

export interface CreateDealModalProps {
  open: boolean;
  setOpen: any;
}

export function CreateDealModal({ open, setOpen }: CreateDealModalProps) {
  const [deal, setDeal] = useState({
    deadline: new Date(Date.now()),
  } as DealType);

  const updateTwitterHandle = (newHandle: string) => setDeal({ ...deal, twitterHandle: newHandle });
  const updateDeadline = (newDeadline: Date) => setDeal({ ...deal, deadline: newDeadline });
  const updatePaymentPerThousand = (newPaymentPerThousand: number) =>
    setDeal({ ...deal, paymentPerThousand: newPaymentPerThousand });
  const updateMaximumPayment = (newMaximumPayment: number) => setDeal({ ...deal, maxPayment: newMaximumPayment });

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col justify-center items-center w-2/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h1" className="text-2xl text-neutral font-bold">
                  Create Deal
                </Dialog.Title>
                {/*body*/}
                <div className="relative p-6 px-10 flex flex-row justify-between items-center w-full gap-5">
                  <div className="flex flex-col gap-5 w-1/2">
                    <Input
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
                {/*footer*/}
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
                    text="Create Deal"
                    onClick={() => setOpen(false)}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
