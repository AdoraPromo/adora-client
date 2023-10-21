export const getDealsTableName = () => process.env.NEXT_PUBLIC_DEALS_TABLE_NAME || "deals_137_132";
export const getMarketplaceContractAddress = () =>
  process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE || "0x520aF48B402F3c5e0dd284d777A09e38831B87Fe";
export const getApeCoinContractAddress = () =>
  process.env.NEXT_PUBLIC_CONTRACT_APECOIN || "0xB7b31a6BC18e48888545CE79e83E06003bE70930";
