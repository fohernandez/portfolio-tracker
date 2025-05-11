import { create } from 'zustand';
import { StockService } from '../services/stockService';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

interface PortfolioStore {
  portfolio: {
    [symbol: string]: {
      quantity: number;
      averagePrice: number;
      currentPrice: number;
      totalValue: number;
      name: string;
      currency: string;
      change: number;
      changePercent: number;
    };
  };
  addStock: (symbol: string, quantity: number, price: number) => Promise<void>;
  updatePrices: () => Promise<void>;
  removeStock: (symbol: string) => void;
  searchStocks: (query: string) => Promise<void>;
  searchResults: StockData[];
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  portfolio: {},
  searchResults: [],

  addStock: async (symbol: string, quantity: number, price: number) => {
    try {
      const stockData = await StockService.getStockData(symbol);
      set((state) => ({
        portfolio: {
          ...state.portfolio,
          [symbol]: {
            quantity,
            averagePrice: price,
            currentPrice: stockData.price,
            totalValue: quantity * stockData.price,
            name: stockData.name,
            currency: stockData.currency,
            change: stockData.change,
            changePercent: stockData.changePercent,
          },
        },
      }));
    } catch (error) {
      console.error(`Error adding stock ${symbol}:`, error);
      throw error;
    }
  },

  updatePrices: async () => {
    const symbols = Object.keys(usePortfolioStore.getState().portfolio);
    if (symbols.length === 0) return;

    try {
      const stockData = await StockService.getMultipleStocks(symbols);
      
      set((state) => ({
        portfolio: stockData.reduce((portfolio, data) => ({
          ...portfolio,
          [data.symbol]: {
            ...state.portfolio[data.symbol],
            currentPrice: data.price,
            totalValue: state.portfolio[data.symbol].quantity * data.price,
            change: data.change,
            changePercent: data.changePercent,
          },
        }), {})
      }));
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  },

  removeStock: (symbol: string) => {
    set((state) => ({
      portfolio: Object.entries(state.portfolio)
        .filter(([key]) => key !== symbol)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
    }));
  },

  searchStocks: async (query: string) => {
    try {
      const results = await StockService.searchStocks(query);
      set({ searchResults: results });
    } catch (error) {
      console.error('Error searching stocks:', error);
      set({ searchResults: [] });
    }
  },
}));
