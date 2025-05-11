import React from 'react';
import PortfolioTable from '../components/portfolio/PortfolioTable';
import StockSearch from '../components/portfolio/StockSearch';


const Portfolio: React.FC = () => {
  

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Gestionar tus inversiones y rastrear la asignación
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <StockSearch />
        <PortfolioTable />
      </div>
    </div>
  );
};

export default Portfolio;