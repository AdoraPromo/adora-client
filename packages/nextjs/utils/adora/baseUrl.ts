export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_DOMAIN_NAME
    ? "https://adora.promo"
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `http://localhost:3000`; // TODO: update local port if necesary
};
