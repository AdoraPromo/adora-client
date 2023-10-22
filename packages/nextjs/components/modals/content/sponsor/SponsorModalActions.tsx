import { useSearchParams } from "next/navigation";
import DealActions from "../../deal-info/DealActions";
import { ethers } from "ethers";
import { SponsorshipMarketplaceABI, marketplaceAddress } from "~~/contracts";
import { DealType } from "~~/types/deal";
import { ActionType } from "~~/utils/adora/enums";
import { getActionTitleByStatus } from "~~/utils/adora/getByStatus";
import { notification } from "~~/utils/scaffold-eth";

interface SponsorModalActionsProps {
  deal: DealType | undefined;
  onClose: () => void;
}

const SponsorModalActions = ({ deal, onClose }: SponsorModalActionsProps) => {
  const sponsorAction = getActionTitleByStatus(true, deal?.status || "");

  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  // ADD: Based on the action, add a function to perform upon clicking the action button
  const getSponsorsActionCallback = (action: string) => {
    switch (action) {
      case ActionType.WITHDRAW:
        return function () {
          withdrawDeal(current.get("id") || "");
        };
      case ActionType.VIEWTWEET:
        return function () {
          notification.info("Create action for View Tweet");
        };
      default:
        return function () {
          notification.info("Default action - should not be reached");
        };
    }
  };

  if (!deal) return null;

  return (
    <DealActions
      deal={deal}
      onClose={onClose}
      actionTitle={sponsorAction}
      onAction={getSponsorsActionCallback(sponsorAction)}
    />
  );
};

const withdrawDeal = async (dealId: string) => {
  if (!dealId) {
    console.error("dealID not present.");
    notification.error(`Deal could not be withdrawn, please try again.`);
    return;
  }

  // setOpen(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();
  const marketplaceContract = new ethers.Contract(marketplaceAddress, SponsorshipMarketplaceABI, signer);

  const withdrawApprovalNote = notification.loading(`Please approve the\nwithdraw deal transaction 👌`);
  const withdrawTx = await marketplaceContract.withdrawDeal(dealId);
  notification.remove(withdrawApprovalNote);
  const withdrawConfirmationNote = notification.loading(`⏳ Waiting for transaction\nconfirmation...`);
  await withdrawTx.wait();
  notification.remove(withdrawConfirmationNote);
  const clfNote = notification.loading(`⏳ Waiting for withdrawal\n to complete...`);
  return new Promise(async resolve => {
    for (let i = 0; i < 10; i++) {
      // sleep for 10 seconds
      await new Promise(resolve => setTimeout(resolve, 10000));
      // If the first call to getDeal fails, try 3 more times
      let fetchedDealStruct;
      for (let i = 0; i < 3; i++) {
        try {
          fetchedDealStruct = await marketplaceContract.getDeal(dealId);
          break;
        } catch (e) {
          console.log(e);
        }
      }
      console.log({ fetchedDealStruct });
      if (fetchedDealStruct?.status === 3) {
        notification.remove(clfNote);
        notification.success(`Deal ${dealId} has been withdrawn!`, { duration: 10000 });
        resolve(dealId);
        marketplaceContract.removeAllListeners();
        return;
      }
    }
    notification.remove(clfNote);
    notification.error(`Could not detect deal withdrawal within last 100 seconds. Please try again.`);
  });
};

export default SponsorModalActions;
