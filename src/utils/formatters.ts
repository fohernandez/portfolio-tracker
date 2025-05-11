import { Asset, Alert } from '../types';

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

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};



export const formatAlertTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(date);
};

export const getAlertIcon = (type: Alert['type']): string => {
  switch (type) {
    case 'rebalance': return 'refresh-cw';
    case 'stop-loss': return 'alert-triangle';
    case 'dividend': return 'dollar-sign';
    case 'allocation-drift': return 'pie-chart';
    case 'volatility': return 'trending-up';
    default: return 'bell';
  }
};

export const getAlertColor = (severity: Alert['severity']): string => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

export const getPerformanceColor = (performance: number): string => {
  if (performance > 3) return 'text-green-500 dark:text-green-400';
  if (performance < -3) return 'text-red-500 dark:text-red-400';
  return 'text-amber-500 dark:text-amber-400';
};