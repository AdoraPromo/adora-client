import Modal from "./Modal";
import DealActions from "./deal-info/DealActions";

interface DealSentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DealSentModal = ({ open, setOpen }: DealSentModalProps) => {
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText("TODO");
  };

  return (
    <Modal
      title={"Deal has been successfully sent!"}
      open={open}
      setOpen={setOpen}
      footerActions={<DealActions actionTitle={"Copy Link to Deal"} onAction={() => copyLinkToClipboard()} />}
    >
      <div>Hey man</div>
    </Modal>
  );
};

export default DealSentModal;
