export type Asset = {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  value: number;
  allocation: number;
  performance: number;
  lastUpdated: Date;
};

export type Alert = {
  id: string;
  type: 'rebalance' | 'stop-loss' | 'dividend' | 'allocation-drift' | 'volatility';
  message: string;
  assetId?: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
};

export type HealthScore = {
  overall: number;
  diversification: number;
  performance: number;
  risk: number;
  cash: number;
};

export type ThemeMode = 'light' | 'dark';