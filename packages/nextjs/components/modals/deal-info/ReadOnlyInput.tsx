import { Input } from "~~/components/misc/Input";

const ReadOnlyInput = ({ label, content }: { label: string; content: string }) => {
  return (
    <Input
      full
      content={content}
      type={"string"}
      label={label}
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

export default ReadOnlyInput;
