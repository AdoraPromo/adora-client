import { Input } from "~~/components/misc/Input";

const TwitterHandleReadOnlyInput = ({ twitterHandle }: { twitterHandle: string }) => {
  return (
    <Input
      content={twitterHandle}
      type={"string"}
      label={"Twitter Account of the Creator"}
      classes={{
        width: "full",
        padding: "2 px-4 mb-2",
        textColor: "neutral",
        textSize: "md",
        borderColor: "accent-focus",
        hover: "transition hover:border-2 hover:border-accent-content duration-300",
      }}
    />
  );
};

export default TwitterHandleReadOnlyInput;
