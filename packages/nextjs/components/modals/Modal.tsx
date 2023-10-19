import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  children: JSX.Element | JSX.Element[] | null;
  openTrigger?: JSX.Element;
  footerActions: JSX.Element | JSX.Element[] | null;
  title?: string;
  open: boolean;
  width?: string;
  setOpen: (open: boolean) => void;
}

const Modal = ({ children, openTrigger, footerActions, title, open, width, setOpen }: ModalProps) => {
  const setWidth = width || "2/3";

  return (
    <>
      {openTrigger}
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
                <Dialog.Panel
                  className={`flex flex-col justify-center items-center w-${setWidth} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {title && (
                    <Dialog.Title as="h1" className="text-2xl text-neutral font-bold">
                      {title}
                    </Dialog.Title>
                  )}
                  {/*body*/}
                  {children}
                  {/*footer*/}
                  {footerActions}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
