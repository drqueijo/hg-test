import type { FinanceData } from "../finance/finance.types";
import type { DashboardTabs } from "./dashboard.enums";

export interface DashboardContextType {
  currentTab: DashboardTabs;
  setCurrentTab: (tab: DashboardTabs) => void;
  data?: FinanceData;
  isLoading: boolean;
  isError: boolean;
  currencies?: FinanceData["results"]["currencies"];
}
