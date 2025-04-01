import type { BitcoinProviderKey, CurrencyKey, StockKey } from "./finance.enum";

export type CurrencyData = {
  name: string;
  buy: number;
  sell: number | null;
  variation: number;
};

export type StockData = {
  name: string;
  location: string;
  points: number;
  variation: number;
};

export type BitcoinProviderData = {
  name: string;
  format: [string, string];
  last: number;
  buy?: number;
  sell?: number;
  variation: number;
};

export type TaxData = {
  date: string;
  cdi: number;
  selic: number;
  daily_factor: number;
  selic_daily: number;
  cdi_daily: number;
};

export type FinanceData = {
  by: string;
  valid_key: boolean;
  results: {
    currencies: {
      source: string;
    } & Record<CurrencyKey, CurrencyData>;
    stocks: Record<StockKey, StockData>;
    available_sources: string[];
    bitcoin: Record<BitcoinProviderKey, BitcoinProviderData>;
    taxes: TaxData[];
  };
  execution_time: number;
  from_cache: boolean;
  timestamp: string;
};

export type FinanceDataHistory = {
  timestamp: string;
  data: FinanceData;
};

export interface FinanceDataContextType {
  data?: FinanceData;
  isLoading: boolean;
  isError: boolean;
  dataHistory: FinanceDataHistory[];
}
