import { Asset, HealthScore } from '../types';

export const calculateHealthScore = (assets: Asset[]): HealthScore => {
  // Calculate diversification score (0-100)
  const diversification = calculateDiversificationScore(assets);
  
  // Calculate performance score (0-100)
  const performance = calculatePerformanceScore(assets);
  
  // Calculate risk score (0-100)
  const risk = calculateRiskScore(assets);
  
  // Calculate cash balance score (0-100)
  const cash = calculateCashScore(assets);
  
  // Calculate overall health (weighted average)
  const overall = Math.round(
    (diversification * 0.3) + (performance * 0.3) + (risk * 0.25) + (cash * 0.15)
  );
  
  return {
    overall,
    diversification,
    performance,
    risk,
    cash
  };
};

const calculateDiversificationScore = (assets: Asset[]): number => {
  if (assets.length <= 1) return 30;
  
  // More assets = better diversification, with diminishing returns
  const assetCountScore = Math.min(70, assets.length * 10);
  
  // Calculate allocation concentration (lower is better)
  const allocations = assets.map(a => a.allocation);
  const maxAllocation = Math.max(...allocations);
  const concentrationPenalty = maxAllocation > 30 ? (maxAllocation - 30) * 2 : 0;
  
  return Math.max(0, Math.min(100, assetCountScore - concentrationPenalty));
};

const calculatePerformanceScore = (assets: Asset[]): number => {
  // Weight performance by allocation
  const weightedPerformance = assets.reduce(
    (acc, asset) => acc + (asset.performance * (asset.allocation / 100)),
    0
  );
  
  // Convert to a 0-100 scale where:
  // -10% or worse = 0, 0% = 50, +20% or better = 100
  const score = 50 + (weightedPerformance * 2.5);
  
  return Math.max(0, Math.min(100, score));
};

const calculateRiskScore = (assets: Asset[]): number => {
  // This would be more sophisticated in a real application
  // For this demo, we'll use a simplified approach
  
  // More assets generally means less risk
  const assetCountFactor = Math.min(50, assets.length * 8);
  
  // Negative performance assets increase risk
  const negativeAssets = assets.filter(a => a.performance < 0);
  const negativeRiskFactor = negativeAssets.length * 10;
  
  return Math.max(0, Math.min(100, 100 - negativeRiskFactor + assetCountFactor));
};

const calculateCashScore = (assets: Asset[]): number => {
  // Find cash allocation
  const cashAsset = assets.find(a => a.symbol === 'USD');
  const cashAllocation = cashAsset?.allocation || 0;
  
  // Ideal cash is 10-15%
  if (cashAllocation >= 10 && cashAllocation <= 15) {
    return 100;
  } else if (cashAllocation < 5 || cashAllocation > 25) {
    return 40;
  } else if (cashAllocation < 10) {
    return 70 + ((cashAllocation - 5) * 6); // Scales from 70 to 100 as it approaches 10%
  } else { // cashAllocation > 15
    return 100 - ((cashAllocation - 15) * 4); // Scales from 100 to 40 as it approaches 25%
  }
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

export const getPerformanceColor = (performance: number): string => {
  if (performance > 3) return 'text-green-500 dark:text-green-400';
  if (performance < -3) return 'text-red-500 dark:text-red-400';
  return 'text-amber-500 dark:text-amber-400';
};