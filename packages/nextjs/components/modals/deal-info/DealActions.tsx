import { useState } from "react";
import ProgressModal from "../ProgressModal";
import RedeemDealModal from "../RedeemDealModal";
import { Button } from "~~/components/misc/Button";
import { DealType } from "~~/types/deal";
import { ActionType } from "~~/utils/adora/enums";
import { getCustomColorByAction } from "~~/utils/adora/getByStatus";

interface DealActionsProps {
  deal?: DealType;
  onClose?: () => void;
  actionTitle?: string;
  onAction?: any;

  openRedeemModal?: boolean; // Not the cleanest solution, but hey
}

const DealActions = ({ deal, onClose, actionTitle, onAction, openRedeemModal }: DealActionsProps) => {
  const [openProgressModal, setOpenProgressModal] = useState(false);

  return (
    <div className="flex items-center justify-center p-6 gap-4">
      {onClose && (
        <Button
          classes={{
            height: "[12px]",
            padding: "6 py-2",
            borderColor: "border-[1px] border-solid border-primary",
            bgColor: "bg-white",
            textColor: "primary",
            textSize: "lg",
          }}
          text="Close"
          onClick={onClose}
        />
      )}
      {actionTitle && (
        <>
          <Button
            classes={{
              width: "auto",
              height: "[12px]",
              padding: "5 py-2",
              bgColor: getCustomColorByAction("bg", actionTitle),
              textColor: "accent",
              textSize: "lg",
            }}
            text={actionTitle}
            onClick={onAction}
          />
          {actionTitle === ActionType.REDEEM && (
            <>
              <RedeemDealModal
                deal={deal}
                open={openRedeemModal ? openRedeemModal : false}
                setOpen={onAction}
                setOpenProgressModal={setOpenProgressModal}
              />
              <ProgressModal deal={deal} open={openProgressModal} setOpen={setOpenProgressModal} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DealActions;
