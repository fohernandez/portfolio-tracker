import axios from 'axios';
import { API_CONFIG } from '../config/api';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export class StockService {
  private static readonly ALPHA_VANTAGE_API = API_CONFIG.alphaVantage.baseUrl;
  private static readonly API_KEY = API_CONFIG.alphaVantage.apiKey;

  static async getStockData(symbol: string): Promise<StockData> {
    try {
      const response = await axios.get(this.ALPHA_VANTAGE_API, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: this.API_KEY
        }
      });

      const quote = response.data['Global Quote'];
      if (!quote) {
        throw new Error(`No data found for symbol ${symbol}`);
      }

      return {
        symbol: quote['01. symbol'],
        name: symbol, // Alpha Vantage no proporciona el nombre completo en esta API
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        currency: 'USD'
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
  }

  static async getMultipleStocks(symbols: string[]): Promise<StockData[]> {
    try {
      const promises = symbols.map(symbol => this.getStockData(symbol));
      return Promise.all(promises);
    } catch (error) {
      console.error('Error fetching multiple stocks:', error);
      throw new Error('Failed to fetch multiple stocks');
    }
  }

  static async searchStocks(query: string): Promise<StockData[]> {
    try {
      const response = await axios.get(this.ALPHA_VANTAGE_API, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: query,
          apikey: this.API_KEY
        }
      });

      const bestMatches = response.data['bestMatches'] || [];
      return bestMatches.map(stock => ({
        symbol: stock['1. symbol'],
        name: stock['2. name'],
        price: 0, // No disponible en la búsqueda
        change: 0, // No disponible en la búsqueda
        changePercent: 0, // No disponible en la búsqueda
        currency: 'USD'
      }));
    } catch (error) {
      console.error('Error searching for stocks:', error);
      throw new Error('Failed to search for stocks');
    }
  }
}
