import { createContext, useContext, type ReactNode } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { DashboardContextType } from "@/types/dashboard/dashboard.types";
import { DashboardTabs } from "@/types/dashboard/dashboard.enums";
import { api } from "@/utils/api";

const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data, isLoading, isError } = api.finance.getAllData.useQuery();

  const currentTab = useMemo(() => {
    return (
      (searchParams.get("tab") as DashboardTabs) || DashboardTabs.currencies
    );
  }, [searchParams]);

  const setCurrentTab = useCallback(
    (tab: DashboardTabs) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);

      const search = params.toString();
      const url = search ? `${pathname}?${search}` : pathname;

      router.push(url, { scroll: false });
    },
    [router, searchParams, pathname],
  );

  const currentTabValue = useMemo(
    () => ({
      currentTab,
      setCurrentTab,
    }),
    [currentTab, setCurrentTab],
  );

  return (
    <DashboardContext.Provider
      value={{
        ...currentTabValue,
        data,
        isLoading,
        isError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within an DashboardProvider",
    );
  }
  return context;
}
