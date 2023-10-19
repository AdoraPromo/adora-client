import { getColorByStatus } from "~~/utils/adora/getByStatus";

const Status = ({ value }: { value: string }) => {
  return <div className={`text-${getColorByStatus(value)}`}> &#9679; {value}</div>;
};

export default Status;
