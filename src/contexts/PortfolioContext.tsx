import React, { createContext, useContext, useState } from 'react';
import { Asset, HealthScore } from '../types';
import { calculateHealthScore } from '../utils/calculations';

// Sample data
const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    quantity: 10,
    value: 1750,
    allocation: 25,
    performance: 12.5,
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    quantity: 8,
    value: 2400,
    allocation: 35,
    performance: 8.2,
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Tesla, Inc.',
    symbol: 'TSLA',
    quantity: 5,
    value: 1250,
    allocation: 18,
    performance: -4.3,
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Amazon.com, Inc.',
    symbol: 'AMZN',
    quantity: 3,
    value: 950,
    allocation: 14,
    performance: 6.7,
    lastUpdated: new Date()
  },
  {
    id: '5',
    name: 'Cash',
    symbol: 'USD',
    quantity: 550,
    value: 550,
    allocation: 8,
    performance: 0,
    lastUpdated: new Date()
  }
];

type PortfolioContextType = {
  assets: Asset[];
  healthScore: HealthScore;
  totalValue: number;
  addAsset: (asset: Omit<Asset, 'id' | 'lastUpdated'>) => void;
  updateAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  const healthScore = calculateHealthScore(assets);

  const addAsset = (asset: Omit<Asset, 'id' | 'lastUpdated'>) => {
    const newAsset: Asset = {
      ...asset,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date()
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const updateAsset = (updatedAsset: Asset) => {
    setAssets(prev =>
      prev.map(asset => (asset.id === updatedAsset.id ? updatedAsset : asset))
    );
  };

  const removeAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  return (
    <PortfolioContext.Provider
      value={{ assets, healthScore, totalValue, addAsset, updateAsset, removeAsset }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};