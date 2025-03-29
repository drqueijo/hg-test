import { DashboardTabs } from "@/types/dashboard/dashboard.enums";
import type { TabsProps } from "./tabs.types";
import { TabsList as UITabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsList({ ...props }: TabsProps) {
  return (
    <UITabsList {...props}>
      <TabsTrigger value={DashboardTabs.currencies}>Currencies</TabsTrigger>
      <TabsTrigger value={DashboardTabs.stocks}>Stocks</TabsTrigger>
      <TabsTrigger value={DashboardTabs.bitcoin}>Bitcoin</TabsTrigger>
      <TabsTrigger value={DashboardTabs.taxes}>Taxes</TabsTrigger>
    </UITabsList>
  );
}
