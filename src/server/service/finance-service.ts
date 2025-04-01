import { type CurrencyKey } from "@/types/finance/finance.enum";
import type { CurrencyData, FinanceData } from "@/types/finance/finance.types";
import { hgHttpService } from "@/server/service/http";

// Cache state
type CacheState = {
  data: FinanceData | null;
  lastFetchTime: number;
  fetchPromise: Promise<FinanceData> | null;
};

// Initial cache state
const cacheState: CacheState = {
  data: null,
  lastFetchTime: 0,
  fetchPromise: null,
};

// Refresh interval in milliseconds (5 minutes)
const REFRESH_INTERVAL = 60 * 1000;

/**
 * Get finance data with automatic caching and periodic refresh
 */
const getFinanceData = async (): Promise<FinanceData> => {
  const now = Date.now();

  if (cacheState.data && now - cacheState.lastFetchTime <= REFRESH_INTERVAL) {
    return cacheState.data;
  }

  if (cacheState.fetchPromise) {
    return cacheState.fetchPromise;
  }

  try {
    cacheState.fetchPromise = hgHttpService.get<FinanceData>("/");
    const freshData = await cacheState.fetchPromise;

    const data = {
      ...freshData,
      timestamp: new Date().toISOString(),
    };
    cacheState.data = data;
    cacheState.lastFetchTime = Date.now();

    console.log(
      `[Finance Router] Data refreshed at ${new Date().toISOString()}`,
    );
    return data;
  } catch (error) {
    console.error("[Finance Router] Error fetching data:", error);

    // Return existing data if available, otherwise rethrow
    if (cacheState.data) {
      return cacheState.data;
    }
    throw error;
  } finally {
    cacheState.fetchPromise = null;
  }
};

/**
 * Force refresh the finance data
 */
const forceRefreshFinanceData = async (): Promise<FinanceData> => {
  // Invalidate the cache timestamp
  cacheState.lastFetchTime = 0;
  // Get fresh data
  return getFinanceData();
};

/**
 * Extract and format currency data
 */
const formatCurrencies = (data: FinanceData) => {
  const currencies = data.results.currencies;

  const onlyCurrencies = Object.entries(currencies).filter(
    ([key]) => key !== "source",
  ) as [CurrencyKey, CurrencyData][];

  return onlyCurrencies.map(([key, value]) => ({
    key,
    ...value,
  }));
};

/**
 * Extract and format stock data
 */
const formatStocks = (data: FinanceData) => {
  const stocks = data.results.stocks;

  return Object.entries(stocks).map(([key, value]) => ({
    key,
    buy: value.points,
    sell: null,
    ...value,
  }));
};

/**
 * Extract and format bitcoin provider data
 */
const formatBitcoinProviders = (data: FinanceData) => {
  const bitcoinProviders = data.results.bitcoin;

  return Object.entries(bitcoinProviders).map(([key, value]) => ({
    key,
    ...value,
  }));
};

export {
  getFinanceData,
  forceRefreshFinanceData,
  formatCurrencies,
  formatStocks,
  formatBitcoinProviders,
  cacheState,
};
