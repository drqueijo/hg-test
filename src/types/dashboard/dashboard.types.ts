import type { Dispatch, SetStateAction } from "react";
import type { DashboardTabs } from "./dashboard.enums";

export interface DashboardContextType {
  currentTab: DashboardTabs;
  setCurrentTab: (tab: DashboardTabs) => void;
  currentAsset: string;
  setCurrentAsset: (asset: string) => void;
}
