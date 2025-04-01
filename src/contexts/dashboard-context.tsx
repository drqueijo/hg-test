import { DashboardTabs } from "@/types/dashboard/dashboard.enums";
import type { DashboardContextType } from "@/types/dashboard/dashboard.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

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

  const currentTab = useMemo(() => {
    return (
      (searchParams.get("tab") as DashboardTabs) || DashboardTabs.currencies
    );
  }, [searchParams]);

  const currentAsset = useMemo(() => {
    return searchParams.get("asset") ?? "";
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

  const setCurrentAsset = useCallback(
    (asset: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("asset", asset);

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

  const currentAssetValue = useMemo(
    () => ({
      currentAsset,
      setCurrentAsset,
    }),
    [currentAsset, setCurrentAsset],
  );

  return (
    <DashboardContext.Provider
      value={{
        ...currentTabValue,
        ...currentAssetValue,
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
