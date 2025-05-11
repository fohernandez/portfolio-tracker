import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { StockData } from '../../store/portfolioStore';

const StockSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [quantity, setQuantity] = useState('');
  const [averagePrice, setAveragePrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchStocks, searchResults, addStock } = usePortfolioStore();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      try {
        setIsLoading(true);
        setError(null);
        await searchStocks(query);
      } catch (err) {
        setError('Error al buscar acciones. Por favor intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddStock = async () => {
    if (!selectedStock || !quantity || !averagePrice) return;

    try {
      const quantityNum = parseFloat(quantity);
      const priceNum = parseFloat(averagePrice);
      
      if (isNaN(quantityNum) || isNaN(priceNum)) {
        alert('Por favor ingresa valores numéricos válidos para cantidad y precio');
        return;
      }

      await addStock(selectedStock.symbol, quantityNum, priceNum);
      alert(`¡${selectedStock.name} ha sido agregado al portafolio!`);
      setSelectedStock(null);
      setQuantity('');
      setAveragePrice('');
    } catch (error) {
      console.error('Error al agregar la acción:', error);
      alert('Error al agregar la acción. Por favor intenta nuevamente.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar acciones..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 text-black dark:text-white"
        />
      </div>

      {error && (
        <div className="mb-4 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mb-4 text-gray-600 dark:text-gray-300">
          Buscando acciones...
        </div>
      )}

      {searchQuery.length >= 2 && !isLoading && searchResults.length === 0 && (
        <div className="mb-4 text-gray-600 dark:text-gray-300">
          No se encontraron resultados para "{searchQuery}"
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Resultados de búsqueda:</h3>
          <div className="space-y-2">
            {searchResults.map((stock) => (
              <div
                key={stock.symbol}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  selectedStock?.symbol === stock.symbol ? 'bg-blue-50 dark:bg-blue-900' : ''
                }`}
                onClick={() => setSelectedStock(stock)}
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{stock.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stock.symbol}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm ${
                    stock.change >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedStock && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Detalles de la acción seleccionada:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cantidad</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Precio promedio</label>
              <input
                type="number"
                value={averagePrice}
                onChange={(e) => setAveragePrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddStock}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Agregar a portafolio
          </button>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
