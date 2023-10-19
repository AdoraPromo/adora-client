import { Input } from "~~/components/misc/Input";

const DeadlineReadOnlyInput = ({ deadline }: { deadline: Date }) => {
  return (
    <Input
      readOnly
      content={deadline}
      type={"date"}
      label={"Deadline"}
      full
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

export default DeadlineReadOnlyInput;
