import { create } from "zustand";

type TabsStore = {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
};

const useTabsStore = create<TabsStore>((set) => ({
  // set initial selectedTab value to the first tab from your list
  selectedTab: "front",
  setSelectedTab: (value) => set({ selectedTab: value }),
}));

export default useTabsStore;