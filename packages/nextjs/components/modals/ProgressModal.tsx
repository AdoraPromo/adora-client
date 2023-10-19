import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import { Transition } from "@headlessui/react";
import { Step, Stepper } from "react-form-stepper";
import { ConnectorStyleProps } from "react-form-stepper/dist/components/Connector/ConnectorTypes";
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import { DealType } from "~~/types/deal";

interface ProgressModalProps {
  deal: DealType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const greenSuccessColor = "#5BB85F";

const _stepStyleConfig = {
  activeBgColor: greenSuccessColor,
  completedBgColor: greenSuccessColor,
  circleFontSize: "0",
  completedTextColor: greenSuccessColor,
  activeTextColor: greenSuccessColor,
  size: "1.5rem",
} as StepStyleDTO;

const _connectorStyleConfig = {
  activeColor: greenSuccessColor,
  completedColor: greenSuccessColor,
} as ConnectorStyleProps;

const StepOne = ({ isShowing }: { isShowing: boolean }) => {
  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-0"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col items-center justify-center text-neutral gap-8">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-4xl font-bold">Waiting</div>
          <div className="text-xl">for transaction confirmation</div>
        </div>
        <Image src={"/assets/wait.svg"} height={200} width={350} alt="waiting" />
      </div>
    </Transition>
  );
};

const StepTwo = ({ isShowing }: { isShowing: boolean }) => {
  return (
    <Transition
      show={isShowing}
      enter="delay-200 transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-0"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col items-center justify-center text-neutral gap-8">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-4xl font-bold">Processing</div>
          <div className="text-xl">your request</div>
        </div>
        <Image src={"/assets/wait.svg"} height={200} width={350} alt="waiting" />
      </div>
    </Transition>
  );
};

const StepThree = ({ isShowing }: { isShowing: boolean }) => {
  return (
    <Transition
      show={isShowing}
      enter="delay-200 transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex flex-col items-center justify-center text-neutral gap-8 transition-opacity ease-in-out duration-500">
        <div className="text-4xl font-bold">Completed!</div>
        <Image src={"/assets/success.svg"} height={200} width={350} alt="waiting" />
      </div>
    </Transition>
  );
};

const ProgressModal = ({ open, setOpen }: ProgressModalProps) => {
  const maxSteps = 2;
  const [activeStep, setActiveStep] = useState<number>(0);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // ADD: track blockchain events here and update active step accordingly.
    setTimeout(() => {
      if (activeStep < maxSteps) {
        setActiveStep(activeStep + 1);
      }
    }, 3000);

    // Re-route to the deals page
    setTimeout(() => {
      if (activeStep === maxSteps) {
        router.push(pathname);
        router.reload();
      }
    }, 6000);
  }, [activeStep, router, pathname]);

  return (
    <Modal open={open} setOpen={setOpen} footerActions={<DealActions onClose={() => setOpen(false)} />} width="1/2">
      <>
        <div className="flex flex-col text-neutral w-full items-center justify-center gap transition ease-in-out duration-300">
          <Stepper activeStep={activeStep} connectorStyleConfig={_connectorStyleConfig} className="w-full">
            <Step styleConfig={_stepStyleConfig} />
            <Step styleConfig={_stepStyleConfig} />
            <Step styleConfig={_stepStyleConfig} />
          </Stepper>
          <StepOne isShowing={activeStep === 0} />
          <StepTwo isShowing={activeStep === 1} />
          <StepThree isShowing={activeStep === 2} />
        </div>
      </>
    </Modal>
  );
};

export default ProgressModal;
