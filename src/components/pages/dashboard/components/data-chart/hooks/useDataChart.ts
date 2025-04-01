import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useFinanceDataContext } from "@/contexts/finance-data.context";
import { useDashboardContext } from "@/contexts/dashboard-context";

import { type FinanceDataHistory } from "@/types/finance/finance.types";
import type {
  BitcoinProviderKey,
  CurrencyKey,
  StockKey,
} from "@/types/finance/finance.enum";
import { DashboardTabs } from "@/types/dashboard/dashboard.enums";

export type ChartDataPoint = {
  time: string;
  value: number;
  timestamp: string;
};

export function useDataChart() {
  const { dataHistory } = useFinanceDataContext();
  const { currentTab, currentAsset } = useDashboardContext();

  // Type narrowing for selectedAsset based on the current tab
  const typedAsset = useMemo(() => {
    switch (currentTab) {
      case DashboardTabs.currencies:
        return currentAsset as CurrencyKey;
      case DashboardTabs.stocks:
        return currentAsset as StockKey;
      case DashboardTabs.bitcoin:
        return currentAsset as BitcoinProviderKey;
      default:
        return null;
    }
  }, [currentTab, currentAsset]);

  // Extract value from data based on current tab and selected asset
  const extractValue = useCallback(
    (entry: FinanceDataHistory): number | undefined => {
      const { data } = entry;

      if (!data?.results) return undefined;

      switch (currentTab) {
        case DashboardTabs.currencies:
          return data.results.currencies?.[typedAsset as CurrencyKey]?.buy;

        case DashboardTabs.stocks:
          return data.results.stocks?.[typedAsset as StockKey]?.points;

        case DashboardTabs.bitcoin:
          return data.results.bitcoin?.[typedAsset as BitcoinProviderKey]?.last;

        default:
          return undefined;
      }
    },
    [currentTab, typedAsset],
  );

  // Generate chart data from history
  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!dataHistory?.length || !typedAsset) return [];

    return dataHistory.map((entry) => {
      const timestamp = new Date(entry.timestamp);
      const formattedTime = format(timestamp, "HH:mm:ss");

      return {
        time: formattedTime,
        value: extractValue(entry) ?? 0,
        timestamp: entry.timestamp,
      };
    });
  }, [dataHistory, typedAsset, extractValue]);

  // Get the name of the currently selected asset
  const currentAssetName = useMemo<string>(() => {
    if (!dataHistory.length || !typedAsset) return "";

    const latestData = dataHistory[dataHistory.length - 1]?.data;

    if (!latestData?.results) return String(typedAsset);

    switch (currentTab) {
      case DashboardTabs.currencies:
        return (
          latestData.results.currencies?.[typedAsset as CurrencyKey]?.name ||
          String(typedAsset)
        );

      case DashboardTabs.stocks:
        return (
          latestData.results.stocks?.[typedAsset as StockKey]?.name ||
          String(typedAsset)
        );

      case DashboardTabs.bitcoin:
        return (
          latestData.results.bitcoin?.[typedAsset as BitcoinProviderKey]
            ?.name || String(typedAsset)
        );

      default:
        return String(typedAsset);
    }
  }, [dataHistory, currentTab, typedAsset]);

  // Get all available options for the current tab
  const availableOptions = useMemo(() => {
    if (!dataHistory?.length) return [];

    const latestData = dataHistory[dataHistory.length - 1]?.data?.results;

    if (!latestData) return [];

    switch (currentTab) {
      case DashboardTabs.currencies:
        return Object.keys(latestData.currencies || {})
          .filter((key) => key !== "source") // Filter out the source property
          .map((key) => ({
            value: key,
            label: latestData.currencies[key as CurrencyKey]?.name || key,
          }));

      case DashboardTabs.stocks:
        return Object.keys(latestData.stocks || {}).map((key) => ({
          value: key,
          label: latestData.stocks[key as StockKey]?.name || key,
        }));

      case DashboardTabs.bitcoin:
        return Object.keys(latestData.bitcoin || {}).map((key) => ({
          value: key,
          label: latestData.bitcoin[key as BitcoinProviderKey]?.name || key,
        }));

      default:
        return [];
    }
  }, [dataHistory, currentTab]);

  // Get current value label format
  const valueFormat = useMemo(() => {
    if (!dataHistory?.length || !typedAsset) return "";

    const latestData = dataHistory[dataHistory.length - 1]?.data?.results;

    if (!latestData) return "";

    if (currentTab === DashboardTabs.bitcoin) {
      const format =
        latestData.bitcoin?.[typedAsset as BitcoinProviderKey]?.format;
      return format ? format[0] : "";
    }

    return "";
  }, [dataHistory, currentTab, typedAsset]);

  return {
    chartData,
    currentAssetName,
    availableOptions,
    valueFormat,
    hasData: chartData.length > 0,
    currentTab,
    selectedAsset: typedAsset,
  };
}
