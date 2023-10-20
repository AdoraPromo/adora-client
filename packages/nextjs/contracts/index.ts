import { getApeCoinContractAddress, getMarketplaceContractAddress } from "~~/utils/adora/constants";

export * from "./ApeCoin";
export * from "./SponsorshipMarketplace";
export const marketplaceAddress = getMarketplaceContractAddress();
export const apecoinAddress = getApeCoinContractAddress();
