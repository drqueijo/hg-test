import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  forceRefreshFinanceData,
  formatBitcoinProviders,
  formatCurrencies,
  formatStocks,
  getFinanceData,
} from "@/server/service/finance-service";

export const financeRouter = createTRPCRouter({
  getAllData: publicProcedure.query(async () => {
    return getFinanceData();
  }),

  getAllCurrencies: publicProcedure.query(async () => {
    const data = await getFinanceData();
    return formatCurrencies(data);
  }),

  getAllStocks: publicProcedure.query(async () => {
    const data = await getFinanceData();
    return formatStocks(data);
  }),

  getAllBitcoinProviders: publicProcedure.query(async () => {
    const data = await getFinanceData();
    return formatBitcoinProviders(data);
  }),

  refreshData: publicProcedure.mutation(async () => {
    await forceRefreshFinanceData();
    return { success: true, timestamp: new Date().toISOString() };
  }),
});
