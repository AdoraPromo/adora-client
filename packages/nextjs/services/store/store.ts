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
  twitterHandle: string;

  setAddress: (newAddress: string) => void;
  setSismoProof: (newSismoProof: string) => void;
  // ADD: Set twitter handle using this function when we fetch the proof (?) or however that flow goes.
  setTwitterHandle: (newTwitterHandle: string) => void;
};

export const useGlobalState = create<TGlobalState>(set => ({
  address: "",
  sismoProof: "",
  twitterHandle: "",

  setAddress: (newAddress: string): void => set(() => ({ address: newAddress })),
  setSismoProof: (newSismoProof: string): void => set(() => ({ address: newSismoProof })),
  setTwitterHandle: (newTwitterHandle: string): void => set(() => ({ twitterHandle: newTwitterHandle })),
}));
