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

  setAddress: (newAddress: string) => void;
  setSismoProof: (newAddress: string) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  address: "",
  sismoProof: "",

  setAddress: (newAddress: string): void => set(() => ({ address: newAddress })),
  setSismoProof: (newSismoProof: string): void => set(() => ({ address: newSismoProof })),
}));
