import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import {
  BitcoinProviderKey,
  CurrencyKey,
  StockKey,
} from "@/types/finance/finance.enum"; // Make sure path is correct
import type { CurrencyData, FinanceData } from "@/types/finance/finance.types";

export const mockFinanceData = {
  by: "default",
  valid_key: true,
  results: {
    currencies: {
      source: "BRL",
      USD: {
        name: "Dollar",
        buy: 5.7344,
        sell: 5.7339,
        variation: 0.596,
      },
      EUR: {
        name: "Euro",
        buy: 6.162,
        sell: 6.1614,
        variation: 0.179,
      },
      GBP: {
        name: "Pound Sterling",
        buy: 7.3869,
        sell: null,
        variation: 0.13,
      },
      ARS: {
        name: "Argentine Peso",
        buy: 0.0051,
        sell: null,
        variation: 0.0,
      },
      CAD: {
        name: "Canadian Dollar",
        buy: 4.011,
        sell: null,
        variation: 0.476,
      },
      AUD: {
        name: "Australian Dollar",
        buy: 3.6029,
        sell: null,
        variation: 0.368,
      },
      JPY: {
        name: "Japanese Yen",
        buy: 0.038,
        sell: null,
        variation: 0.264,
      },
      CNY: {
        name: "Renminbi",
        buy: 0.7889,
        sell: null,
        variation: 0.356,
      },
      BTC: {
        name: "Bitcoin",
        buy: 523344.748,
        sell: 523344.748,
        variation: -2.312,
      },
    },
    stocks: {
      IBOVESPA: {
        name: "BM&F BOVESPA",
        location: "Sao Paulo, Brazil",
        points: 132389.58,
        variation: 0.24,
      },
      IFIX: {
        name: "Índice de Fundos de Investimentos Imobiliários B3",
        location: "Sao Paulo, Brazil",
        points: 3271.02,
        variation: 0.16,
      },
      NASDAQ: {
        name: "NASDAQ Stock Market",
        location: "New York City, United States",
        points: 17876.16,
        variation: -2.17,
      },
      DOWJONES: {
        name: "Dow Jones Industrial Average",
        location: "New York City, United States",
        points: 42388.99,
        variation: -0.47,
      },
      CAC: {
        name: "CAC 40",
        location: "Paris, French",
        points: 8030.68,
        variation: -0.96,
      },
      NIKKEI: {
        name: "Nikkei 225",
        location: "Tokyo, Japan",
        points: 38027.29,
        variation: 0.65,
      },
    },
    available_sources: ["BRL"],
    bitcoin: {
      blockchain_info: {
        name: "Blockchain.info",
        format: ["USD", "en_US"],
        last: 86296.94,
        buy: 86296.94,
        sell: 86296.94,
        variation: -2.087,
      },
      bitstamp: {
        name: "BitStamp",
        format: ["USD", "en_US"],
        last: 86265.0,
        buy: 86347.0,
        sell: 86339.0,
        variation: -2.014,
      },
      foxbit: {
        name: "FoxBit",
        format: ["BRL", "pt_BR"],
        last: 495964.0,
        variation: -1.293,
      },
      mercadobitcoin: {
        name: "Mercado Bitcoin",
        format: ["BRL", "pt_BR"],
        last: 496445.3,
        buy: 496334.85372326,
        sell: 496445.29999999,
        variation: -1.278,
      },
    },
    taxes: [
      {
        date: "2025-03-24",
        cdi: 14.25,
        selic: 14.25,
        daily_factor: 1.00052531,
        selic_daily: 14.15,
        cdi_daily: 14.15,
      },
    ],
  },
  execution_time: 0.0,
  from_cache: true,
};

export const financeRouter = createTRPCRouter({
  getAllData: publicProcedure.query(() => {
    return mockFinanceData as FinanceData;
  }),

  getAllCurrencies: publicProcedure.query(() => {
    const currencies = mockFinanceData.results
      .currencies as FinanceData["results"]["currencies"];

    const onlyCurrencies = Object.entries(currencies).filter(
      ([key]) => key !== "source",
    ) as [CurrencyKey, CurrencyData][];

    return onlyCurrencies.map(([key, value]) => ({
      key,
      ...value,
    }));
  }),

  getAllStocks: publicProcedure.query(() => {
    const stocks = mockFinanceData.results
      .stocks as FinanceData["results"]["stocks"];
    return Object.entries(stocks).map(([key, value]) => ({
      key,
      buy: value.points,
      sell: null,
      ...value,
    }));
  }),

  getAllBitcoinProviders: publicProcedure.query(() => {
    const bitcoinProviders = mockFinanceData.results
      .bitcoin as FinanceData["results"]["bitcoin"];
    return Object.entries(bitcoinProviders).map(([key, value]) => ({
      key,
      ...value,
    }));
  }),
});
