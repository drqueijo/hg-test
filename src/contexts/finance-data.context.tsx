"use client";
import { getValue, removeValue, setValue } from "@/lib/local-storage";
import type {
  FinanceDataContextType,
  FinanceDataHistory,
} from "@/types/finance/finance.types";
import { api } from "@/utils/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

// Local storage key for financial data history
const FINANCE_DATA_HISTORY_KEY = "finance_data_history";

const isBrowser = typeof window !== "undefined";

const FinanceDataContext = createContext<FinanceDataContextType>(
  {} as FinanceDataContextType,
);

interface FinanceDataProviderProps {
  children: ReactNode;
}

export function FinanceDataProvider({ children }: FinanceDataProviderProps) {
  const { data, isLoading, isError } = api.finance.getAllData.useQuery();

  const utils = api.useUtils();

  useEffect(() => {
    if (isBrowser) removeValue(FINANCE_DATA_HISTORY_KEY);
  }, []);

  const getDataHistory = useCallback(() => {
    if (!isBrowser) return [];

    const dataHistoryString = getValue(FINANCE_DATA_HISTORY_KEY);
    const parsedDataHistory = JSON.parse(
      dataHistoryString ?? "[]",
    ) as FinanceDataHistory[];

    if (!data) return parsedDataHistory;

    const dataWithTimestamp = {
      timestamp: new Date().toISOString(),
      data: data,
    };

    const newHistory = [...parsedDataHistory, dataWithTimestamp];

    setValue(FINANCE_DATA_HISTORY_KEY, JSON.stringify(newHistory));

    return newHistory;
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      utils.invalidate();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [utils]);

  return (
    <FinanceDataContext.Provider
      value={{
        data,
        isLoading,
        isError,
        dataHistory: getDataHistory(),
      }}
    >
      {children}
    </FinanceDataContext.Provider>
  );
}

export function useFinanceDataContext() {
  const context = useContext(FinanceDataContext);
  if (!context) {
    throw new Error(
      "useFinanceDataContext must be used within an FinanceDataProvider",
    );
  }
  return context;
}
