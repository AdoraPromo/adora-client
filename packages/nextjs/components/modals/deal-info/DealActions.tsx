import { Button } from "~~/components/misc/Button";

const DealActions = ({
  onClose,
  actionTitle,
  onAction,
}: {
  onClose: () => void;
  actionTitle: string;
  onAction: () => void;
}) => {
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
        text="Close"
        onClick={onClose}
      />
      {actionTitle && (
        <Button
          classes={{
            width: "auto",
            height: "[12px]",
            padding: "5 py-2",
            bgColor: "primary",
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
