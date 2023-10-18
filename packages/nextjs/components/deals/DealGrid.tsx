import ViewDealModal from "../modals/ViewDealModal";
import { Deal } from "./Deal";
import { DealType } from "~~/types/deal";

export interface DealGridProps {
  deals: DealType[];
}

export const DealGrid = ({ deals }: DealGridProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-5 justify-items-start">
      {deals?.map(deal => (
        <ViewDealModal key={deal.id}>
          <Deal deal={deal} />
        </ViewDealModal>
      ))}
    </div>
  );
};
