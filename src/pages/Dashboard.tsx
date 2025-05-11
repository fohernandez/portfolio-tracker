import React from 'react';
import HealthScore from '../components/dashboard/HealthScore';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import { usePortfolio } from '../contexts/PortfolioContext';

const Dashboard: React.FC = () => {
  const { assets, healthScore, totalValue } = usePortfolio();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Monitor your portfolio health and performance at a glance
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioSummary assets={assets} totalValue={totalValue} />
        </div>
        <div>
          <HealthScore healthScore={healthScore} />
        </div>
      </div>
      
      <div className="mt-6">
        <AlertsPanel />
      </div>
    </div>
  );
};

export default Dashboard;