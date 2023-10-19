export const getBaseUrl = (): string => {
  // TODO: update local port if necesary
  return process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : `http://localhost:3000`;
};
