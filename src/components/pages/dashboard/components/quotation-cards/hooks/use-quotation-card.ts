import { useDashboardContext } from "@/contexts/dashboard-context";
import { api } from "@/utils/api";
import { useMemo } from "react";
import { DashboardTabs } from "@/types/dashboard/dashboard.enums";

export function useQuotationCard() {
  const { currentTab, setCurrentAsset, currentAsset } = useDashboardContext();
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

  const isAssetSelected = (key: string) => {
    return currentAsset === key;
  };

  return {
    data,
    isLoading,
    isError,
    currentAsset,
    setCurrentAsset,
    isAssetSelected,
  };
}
