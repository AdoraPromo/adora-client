import { SismoConnectResponse } from "@sismo-core/sismo-connect-react";
import { create } from "zustand";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TGlobalState = {
  address: string;
  dealId: string;
  symmetricKey: string;
  sismoProof: SismoConnectResponse | null;
  twitterHandle: string;
  setAddress: (newAddress: string) => void;
  setDealId: (newDealId: string) => void;
  setSymmetricKey: (newSymmetricKey: string) => void;
  setSismoProof: (newSismoProof: SismoConnectResponse | null) => void;
  // ADD: Set twitter handle using this function when we fetch the proof (?) or however that flow goes.
  setTwitterHandle: (newTwitterHandle: string) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  address: "",
  sismoProof: null,
  twitterHandle: "",
  dealId: "",
  symmetricKey: "",
  setAddress: (newAddress: string): void => set(() => ({ address: newAddress })),
  setDealId: (newDealId: string): void => set(() => ({ dealId: newDealId })),
  setSymmetricKey: (newSymmetricKey: string): void => set(() => ({ symmetricKey: newSymmetricKey })),
  setSismoProof: (newSismoProof: SismoConnectResponse | null): void => set(() => ({ sismoProof: newSismoProof })),
  setTwitterHandle: (newTwitterHandle: string): void => set(() => ({ twitterHandle: newTwitterHandle })),
}));
