import { cn } from "@/lib/utils";
import type { DashboardProps } from "./dashboard.types";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "./components/tabs/tabs-list";
import { useDashboardContext } from "@/contexts/dashboard-context";
import {
  DashboardTabsList,
  type DashboardTabs,
} from "@/types/dashboard/dashboard.enums";
import { TabsContent } from "@radix-ui/react-tabs";
import { QuotationCards } from "./components/quotation-cards/quotation-cards";

export function Dashboard({ className, ...props }: DashboardProps) {
  const { currentTab, setCurrentTab } = useDashboardContext();
  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <Tabs
        value={currentTab}
        onValueChange={(e) => setCurrentTab(e as DashboardTabs)}
      >
        <TabsList />
        {DashboardTabsList.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <QuotationCards dashboardTabKey={tab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
