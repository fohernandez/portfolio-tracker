import React from 'react';
import { Asset } from '../../types';
import { formatCurrency, formatPercentage, getPerformanceColor } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Search, Plus } from 'lucide-react';

interface AssetListProps {
  assets: Asset[];
  totalValue: number;
}

const AssetList: React.FC<AssetListProps> = ({ assets, totalValue }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Your Assets
          </h2>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assets..."
                className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm w-full sm:w-auto"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg text-sm">
              <Plus size={16} className="mr-1" />
              Add Asset
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Allocation</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {assets.map((asset) => (
              <tr 
                key={asset.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {asset.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {asset.symbol}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {asset.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-800 dark:text-gray-200">
                    {formatCurrency(asset.value / asset.quantity)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full"
                        style={{ width: `${asset.allocation}%` }}
                      />
                    </div>
                    <span className="text-gray-800 dark:text-gray-200">
                      {asset.allocation}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {asset.performance >= 0 ? (
                      <TrendingUp size={16} className="text-green-500 dark:text-green-400 mr-1" />
                    ) : (
                      <TrendingDown size={16} className="text-red-500 dark:text-red-400 mr-1" />
                    )}
                    <span className={getPerformanceColor(asset.performance)}>
                      {formatPercentage(asset.performance)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {formatCurrency(asset.value)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;