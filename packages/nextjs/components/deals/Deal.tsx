import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Status from "./Status";
import { DealType } from "~~/types/deal";
import { getCustomColorByStatus } from "~~/utils/adora/getByStatus";

export interface DealProps {
  deal: DealType;
}

export const Deal = ({ deal }: DealProps) => {
  const color = getCustomColorByStatus("border", deal.status);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const onDealClick = (deal: DealType) => {
    current.set("id", deal.id);
    router.push(`${pathname}?${current.toString()}`);
  };

  return (
    <div
      className={`flex flex-col gap-3 py-8 px-12 rounded-2xl border-solid border-2 ${color} border-info hover:cursor-pointer transition ease-in-out hover:scale-105 duration-300 bg-white bg-opacity-80`}
      onClick={() => {
        onDealClick(deal);
      }}
    >
      <div className="flex flex-col gap-1">
        <Status value={deal.status} />
        <div>
          <b>Deal ID:</b>
          <span>{`${deal.id.slice(0, 8)}...${deal.id.slice(-6)}`}</span>
        </div>
        <div className="flex flex-row gap-3 w-60">
          <div className="flex flex-row w-3/5 gap-1 items-center justify-start">
            <Image src="/assets/hourglass.svg" alt="hourglass" height={18} width={12} />
            {getRemainingTime(deal.deadline)}
          </div>
          <span>|</span>
          <div className="w-2/5">{deal.maxPayment} APE</div>
        </div>
      </div>
    </div>
  );
};

function getRemainingTime(deadline: Date): string {
  const diff = (deadline.getTime() - Date.now()) / 1000 / 60; // Difference in minutes

  if (diff < 0) {
    return "Expired";
  } else if (diff < 60) {
    // < 1 hour
    return `${diff.toFixed(0)} minutes left`;
  } else if (diff < 24 * 60) {
    // < 1 day
    return `${(diff / 60).toFixed(0)} hours left`;
  } else if (diff >= 24 * 60) {
    return `${(diff / 24 / 60).toFixed(0)} days left`;
  }

  return "";
}
