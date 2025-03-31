import { useDashboardContext } from "@/contexts/dashboard-context";
import { api } from "@/utils/api";
import { useMemo } from "react";
import { DashboardTabs } from "@/types/dashboard/dashboard.enums";
import { useAutoInvalidate } from "@/lib/use-auto-invalidate";

export function useQuotationCard() {
  const { currentTab } = useDashboardContext();
  useAutoInvalidate();
  const {
    data: currencies,
    isLoading: isLoadingCurrencies,
    isError: isErrorCurrencies,
  } = api.finance.getAllCurrencies.useQuery();

  const {
    data: stocks,
    isLoading: isLoadingStocks,
    isError: isErrorStocks,
  } = api.finance.getAllStocks.useQuery();

  const {
    data: bitcoinProviders,
    isLoading: isLoadingBitcoinProviders,
    isError: isErrorBitcoinProviders,
  } = api.finance.getAllBitcoinProviders.useQuery();

  const isLoading =
    isLoadingCurrencies || isLoadingStocks || isLoadingBitcoinProviders;
  const isError = isErrorCurrencies || isErrorStocks || isErrorBitcoinProviders;

  const data = useMemo(() => {
    if (currentTab === DashboardTabs.currencies) return currencies;

    if (currentTab === DashboardTabs.stocks) return stocks;

    if (currentTab === DashboardTabs.bitcoin) return bitcoinProviders;
  }, [currentTab, currencies, stocks, bitcoinProviders]);

  return {
    data,
    isLoading,
    isError,
  };
}
