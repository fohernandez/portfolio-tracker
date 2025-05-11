export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

export interface PortfolioItem {
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  name: string;
  currency: string;
  change: number;
  changePercent: number;
}

export interface Alert {
  id: string;
  type: 'rebalance' | 'stop-loss' | 'dividend' | 'allocation-drift' | 'volatility';
  message: string;
  timestamp: Date;
  symbol?: string;
  threshold?: number;
}
