import { Button } from "~~/components/misc/Button";
import { DealType } from "~~/types/deal";
import { getCustomColorByAction } from "~~/utils/adora/getByStatus";

interface DealActionsProps {
  deal?: DealType;
  onClose?: () => void;
  actionTitle?: string;
  onAction?: () => void;
}

const DealActions = ({ deal, onClose, actionTitle, onAction }: DealActionsProps) => {
  console.log(deal);
  console.log("~~~~~~~~");

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
      )}
    </div>
  );
};

export default DealActions;
