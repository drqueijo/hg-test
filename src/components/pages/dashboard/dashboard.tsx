import { cn } from "@/lib/utils";
import type { DashboardProps } from "./dashboard.types";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "./components/tabs/tabs-list";
import { useDashboardContext } from "@/contexts/dashboard-context";
import type { DashboardTabs } from "@/types/dashboard/dashboard.enums";

export function Dashboard({ className, ...props }: DashboardProps) {
  const { currentTab, setCurrentTab } = useDashboardContext();
  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Tabs
        defaultValue={currentTab}
        onValueChange={(e) => setCurrentTab(e as DashboardTabs)}
      >
        <TabsList />
      </Tabs>
    </div>
  );
}
