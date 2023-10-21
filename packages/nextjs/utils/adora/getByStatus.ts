import { ActionType, DealStatus } from "./enums";
import { SismoConnectResponse } from "@sismo-core/sismo-connect-react";

// Colors
export const getCustomColorByStatus = (property: string, status: string): string => {
  if (!status) {
    return `custom-${property}-primary`;
  }

  return `custom-${property}-${getColorByStatus(status)}`;
};

export const getColorByStatus = (status: string): string => {
  switch (status) {
    case DealStatus.ACCEPTED:
      return "primary";
    case DealStatus.WITHDRAWN:
      return "error";
    case DealStatus.PENDING:
      return "info";
    case DealStatus.REDEEMED:
      return "success";
    case DealStatus.EXPIRED:
      return "warning";
    default:
      return "neutral";
  }
};

// Actions
export const getActionTitleByStatus = (
  isSponsor: boolean,
  status: string,
  sismoProof?: SismoConnectResponse | null,
): ActionType | "" => {
  if (isSponsor) {
    switch (status) {
      case DealStatus.REDEEMED:
        return ActionType.VIEWTWEET;
      case DealStatus.PENDING:
      case DealStatus.EXPIRED:
        return ActionType.WITHDRAW;
      default:
        return "";
    }
  } else {
    switch (status) {
      case DealStatus.ACCEPTED:
        return sismoProof ? ActionType.REDEEM : ActionType.VERIFYTWITTER;
      case DealStatus.PENDING:
        return ActionType.ACCEPT;
      case DealStatus.REDEEMED:
        return ActionType.VIEWTWEET;
      default:
        return "";
    }
  }
};

export const getColorByAction = (status: string): string => {
  switch (status) {
    case ActionType.ACCEPT:
      return "success";
    case ActionType.WITHDRAW:
      return "error";
    default:
      return "primary";
  }
};

export const getCustomColorByAction = (property: string, action: string): string => {
  if (!action) {
    return `custom-${property}-primary`;
  }

  return `custom-${property}-${getColorByAction(action)}`;
};
