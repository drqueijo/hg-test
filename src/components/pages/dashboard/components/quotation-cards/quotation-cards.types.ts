import type { DashboardTabs } from "@/types/dashboard/dashboard.enums";

export type QuotationCardsProps = React.ComponentProps<"section"> & {
  dashboardTabKey: DashboardTabs;
};

export type UseQuotationCardsProps = {
  dashboardTabKey: DashboardTabs;
};
