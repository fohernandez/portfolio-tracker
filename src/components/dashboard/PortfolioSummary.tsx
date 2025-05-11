import React from 'react';
import { Asset } from '../../types';
import { PieChart, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage, getPerformanceColor } from '../../utils/formatters';

interface PortfolioSummaryProps {
  assets: Asset[];
  totalValue: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ assets, totalValue }) => {
  // Calculate overall performance (weighted by allocation)
  const overallPerformance = assets.reduce(
    (acc, asset) => acc + (asset.performance * (asset.allocation / 100)),
    0
  );
  
  // Find best and worst performing assets
  const sortedByPerformance = [...assets].sort((a, b) => b.performance - a.performance);
  const bestAsset = sortedByPerformance[0];
  const worstAsset = sortedByPerformance[sortedByPerformance.length - 1];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Portfolio Summary
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {assets.length} Assets
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total Value
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {formatCurrency(totalValue)}
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Overall Performance
          </span>
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${getPerformanceColor(overallPerformance)}`}>
              {formatPercentage(overallPerformance)}
            </span>
            {overallPerformance >= 0 ? (
              <TrendingUp size={20} className="ml-2 text-green-500 dark:text-green-400" />
            ) : (
              <TrendingDown size={20} className="ml-2 text-red-500 dark:text-red-400" />
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Asset Allocation
          </span>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            View Details
          </button>
        </div>
        
        <div className="flex items-center">
          <div className="relative h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
            {assets.map((asset, index) => (
              <div
                key={asset.id}
                className="h-full"
                style={{
                  width: `${asset.allocation}%`,
                  background: getAssetColor(index),
                }}
                title={`${asset.name} (${asset.allocation}%)`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="rounded-full p-2 bg-green-100 dark:bg-green-800 mr-3">
              <TrendingUp size={16} className="text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Top Performer</p>
              <p className="text-sm font-medium">{bestAsset.symbol}</p>
              <p className={`text-xs font-bold ${getPerformanceColor(bestAsset.performance)}`}>
                {formatPercentage(bestAsset.performance)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="rounded-full p-2 bg-red-100 dark:bg-red-800 mr-3">
              <TrendingDown size={16} className="text-red-600 dark:text-red-300" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Weakest Performer</p>
              <p className="text-sm font-medium">{worstAsset.symbol}</p>
              <p className={`text-xs font-bold ${getPerformanceColor(worstAsset.performance)}`}>
                {formatPercentage(worstAsset.performance)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate a visually distinct color for each asset
const getAssetColor = (index: number): string => {
  const colors = [
    '#3B82F6', // blue
    '#F59E0B', // amber
    '#10B981', // green
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#F97316', // orange
  ];
  
  return colors[index % colors.length];
};

export default PortfolioSummary;