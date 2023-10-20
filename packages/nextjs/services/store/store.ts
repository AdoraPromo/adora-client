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
  sismoProof: string;
  dealId: string;
  symmetricKey: string;
  setAddress: (newAddress: string) => void;
  setSismoProof: (newAddress: string) => void;
  setDealId: (newDealId: string) => void;
  setSymmetricKey: (newSymmetricKey: string) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  address: "",
  sismoProof: "",
  dealId: "",
  symmetricKey: "",
  setAddress: (newAddress: string): void => set(() => ({ address: newAddress })),
  setSismoProof: (newSismoProof: string): void => set(() => ({ sismoProof: newSismoProof })),
  setDealId: (newDealId: string): void => set(() => ({ dealId: newDealId })),
  setSymmetricKey: (newSymmetricKey: string): void => set(() => ({ symmetricKey: newSymmetricKey })),
}));
