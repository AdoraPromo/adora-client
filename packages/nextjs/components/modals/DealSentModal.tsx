import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";
import { useGlobalState } from "~~/services/store/store";
import { getBaseUrl } from "~~/utils/adora/baseUrl";
import { notification } from "~~/utils/scaffold-eth";

interface DealSentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DealSentModal = ({ open, setOpen }: DealSentModalProps) => {
  const [linkCopied, setLinkCopied] = useState(false);
  const globalState = useGlobalState();

  const copyLinkToClipboard = () => {
    const copyUrl = `${getBaseUrl()}/incoming?id=${globalState.dealId}&key=${globalState.symmetricKey}`;
    navigator.clipboard.writeText(copyUrl);

    setLinkCopied(true);

    notification.info("Deal URL has been copied!");
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      footerActions={
        <DealActions
          onClose={() => setOpen(false)}
          actionTitle={!linkCopied ? "Copy Link to the Deal" : "Copied!"}
          onAction={() => copyLinkToClipboard()}
        />
      }
      width="2/5"
    >
      <>
        <div className="flex flex-col text-neutral w-full items-center justify-center">
          <div className="text-2xl">Your Deal has been</div>
          <div className="text-4xl font-bold mb-5">successfully created!</div>
          <Image src={"/assets/success.svg"} alt="deal-sent-icon" width={150} height={150} />
        </div>
      </>
    </Modal>
  );
};

export default DealSentModal;
