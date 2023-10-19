import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobalState } from "~~/services/store/store";

export default function useAuth() {
  const router = useRouter();
  const { address } = useGlobalState();

  useEffect(() => {
    if (router.isReady && !address) {
      router.push("/");
      return;
    }
  }, [router.isReady, address]); // eslint-disable-line
}
