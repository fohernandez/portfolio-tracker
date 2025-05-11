import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { formatCurrency, formatPercentage, getPerformanceColor } from '../utils/formatters';
import { TrendingUp, Calendar, BarChart2 } from 'lucide-react';

const Performance: React.FC = () => {
  const { assets, totalValue } = usePortfolio();
  
  // Calculate performance metrics
  const totalPerformance = assets.reduce(
    (sum, asset) => sum + (asset.performance * (asset.allocation / 100)),
    0
  );
  
  // Calculate performance for time periods (mock data)
  const performanceData = {
    daily: 0.8,
    weekly: 2.1,
    monthly: -1.2,
    quarterly: 4.5,
    yearly: 9.3
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Performance</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Track your investment returns across different time periods
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {Object.entries(performanceData).map(([period, value]) => (
          <div 
            key={period} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize mb-1">
              {period} Return
            </h3>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${getPerformanceColor(value)}`}>
                {formatPercentage(value)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Performance Overview
          </h2>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg">
              1M
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              3M
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              6M
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              1Y
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              All
            </button>
          </div>
        </div>
        
        {/* Chart Placeholder */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart2 size={32} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              Performance chart would be displayed here
            </p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 mr-3">
                <TrendingUp size={16} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Return</p>
                <p className={`text-lg font-bold ${getPerformanceColor(totalPerformance)}`}>
                  {formatPercentage(totalPerformance)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-800 mr-3">
                <Calendar size={16} className="text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Portfolio Age</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  83 days
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800 mr-3">
                <BarChart2 size={16} className="text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Value</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Asset Performance
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  1 Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  1 Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  1 Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  3 Months
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Overall
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {asset.symbol}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPerformanceColor(Math.random() * 2 - 1)}>
                      {formatPercentage(Math.random() * 2 - 1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPerformanceColor(Math.random() * 4 - 2)}>
                      {formatPercentage(Math.random() * 4 - 2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPerformanceColor(Math.random() * 6 - 3)}>
                      {formatPercentage(Math.random() * 6 - 3)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPerformanceColor(Math.random() * 10 - 3)}>
                      {formatPercentage(Math.random() * 10 - 3)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getPerformanceColor(asset.performance)}>
                      {formatPercentage(asset.performance)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;