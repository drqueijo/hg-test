import type { DashboardTabs } from "./dashboard.enums";

export interface DashboardContextType {
  currentTab: DashboardTabs;
  setCurrentTab: (tab: DashboardTabs) => void;
}
