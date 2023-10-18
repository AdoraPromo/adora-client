import { TextArea } from "~~/components/misc/TextArea";

const RequirementsReadOnlyTextArea = ({ content }: { content: string }) => {
  return (
    <TextArea
      content={content}
      label={"Requirements"}
      rows={16}
      classes={{
        padding: "2 px-4",
        textColor: "neutral",
        textSize: "md",
        borderColor: "accent-focus",
        hover: "transition hover:border-2 hover:border-accent-content duration-300",
      }}
    />
  );
};

export default RequirementsReadOnlyTextArea;
