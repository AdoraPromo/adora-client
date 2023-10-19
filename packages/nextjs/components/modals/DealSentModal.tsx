import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import { notification } from "~~/utils/scaffold-eth";

interface DealSentModalProps {
  dealId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DealSentModal = ({ dealId, open, setOpen }: DealSentModalProps) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const pathname = usePathname();

  // ADD: Somehow get the ID of the deal so that the link can be copied
  const copyLinkToClipboard = () => {
    const copyUrl = `${pathname}?id=${dealId}`;
    navigator.clipboard.writeText(copyUrl);

    setLinkCopied(true);

    notification.info("Deal URL has been copied!");
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      footerActions={
        <DealActions
          actionTitle={!linkCopied ? "Copy Link to the Deal" : "Copied!"}
          onAction={() => copyLinkToClipboard()}
        />
      }
      width="1/2"
    >
      <>
        <div className="flex flex-col text-neutral w-full items-center justify-center gap">
          <div className="text-2xl">Your Deal has been</div>
          <div className="text-4xl font-bold">successfully sent!</div>
          <div className="p-6 pb-2">
            <Image src={"/assets/deal-sent-icon.png"} alt="deal-sent-icon" width={400} height={400} />
          </div>
        </div>
      </>
    </Modal>
  );
};

export default DealSentModal;
