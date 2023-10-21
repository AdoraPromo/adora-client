import { Input } from "~~/components/misc/Input";

const deadlineToString = (deadline: Date) => {
  const month = deadline.toLocaleDateString("en-US", { month: "long" });
  const day = deadline.toLocaleDateString("en-US", { day: "numeric" });
  const year = deadline.toLocaleDateString("en-US", { year: "numeric" });

  const hour = deadline.getHours();
  let hourAmPm = hour;
  if (hour > 12) {
    hourAmPm -= 12;
  } else if (hour == 0) {
    hourAmPm = 12; // 12AM == midnight == 00:00
  }

  const amPm = hour < 12 ? "AM" : "PM";

  const minutes = deadline.getMinutes();
  const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

  return `${hourAmPm}:${minutesPadded}${amPm} ${month} ${day}, ${year} `;
};

const DeadlineReadOnlyInput = ({ deadline }: { deadline: Date }) => {
  return (
    <Input
      readOnly
      content={deadlineToString(deadline)}
      type={"string"}
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
