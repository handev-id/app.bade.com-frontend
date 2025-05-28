import { create } from "zustand";
import { Partner } from "../apis/models/partner";

interface StoreType {
  partner: Partner | null;
  setPartner: (partner: Partner) => void;
}

const useStore = create<StoreType>((set) => ({
  partner: null,
  setPartner: (partner) => set({ partner }),
}));

export default useStore;
