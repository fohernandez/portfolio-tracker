import React, { useEffect } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { PortfolioItem } from '../../types';

const PortfolioTable: React.FC = () => {
  const { portfolio, updatePrices } = usePortfolioStore();
  const portfolioItems: PortfolioItem[] = Object.values(portfolio);

  useEffect(() => {
    // Actualizar precios cada 30 segundos
    const interval = setInterval(updatePrices, 30000);
    return () => clearInterval(interval);
  }, [updatePrices]);

  const totalValue = portfolioItems.reduce(
    (sum, item) => sum + item.totalValue,
    0
  );

  if (Object.keys(portfolio).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No hay acciones en el portafolio
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Mi Portafolio
          </h2>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Valor total: {formatCurrency(totalValue)}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Acción
                </th>
                <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Cantidad
                </th>
                <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Precio Actual
                </th>
                <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Cambio
                </th>
                <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Valor Total
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolio).map(([symbol, stock]) => (
                <tr
                  key={symbol}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-sm text-gray-900 dark:text-white">
                    {stock.quantity}
                  </td>
                  <td className="text-right py-4 text-sm text-gray-900 dark:text-white">
                    {formatCurrency(stock.currentPrice)}
                  </td>
                  <td className="text-right py-4">
                    <span className={`text-sm font-medium ${
                      stock.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{formatCurrency(stock.change)}
                      ({formatPercentage(stock.changePercent)})
                    </span>
                  </td>
                  <td className="text-right py-4 text-sm text-gray-900 dark:text-white">
                    {formatCurrency(stock.totalValue)}
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

export default PortfolioTable;
