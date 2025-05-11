import React from 'react';
import AlertList from '../components/alerts/AlertList';

const Alerts: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Stay informed about important changes to your portfolio
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AlertList />
      </div>
    </div>
  );
};

export default Alerts;