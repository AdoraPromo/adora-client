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
  setAddress: (newAddress: string) => void;
};

// TODO: Keeping fields so that we don't forget how to set up our own state
export const useGlobalState = create<TGlobalState>(set => ({
  address: "",
  setAddress: (newAddress: string): void => set(() => ({ address: newAddress })),
}));
