import { create } from "zustand";
import { Partner } from "../apis/models/partner";
import { ReactNode } from "react";
import { PartnerLayoutProps } from "../pages/partner/layout";

interface StoreType {
  partner: Partner | null;
  setPartner: (partner: Partner) => void;
  header: {
    title: string;
    component?: () => ReactNode;
  };
  setHeader: (data: PartnerLayoutProps["header"]) => void;
}

const useStore = create<StoreType>((set) => ({
  partner: null,
  setPartner: (partner) => set({ partner }),
  header: {
    title: "",
  },
  setHeader: (header) => set({ header }),
}));

export default useStore;
