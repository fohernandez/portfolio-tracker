import React from 'react';
import { HealthScore as HealthScoreType } from '../../types';
import { Activity, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';

interface HealthScoreProps {
  healthScore: HealthScoreType;
}

const HealthScore: React.FC<HealthScoreProps> = ({ healthScore }) => {
  const { overall, diversification, performance, risk, cash } = healthScore;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 dark:text-green-400';
    if (score >= 60) return 'text-blue-500 dark:text-blue-400';
    if (score >= 40) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Portfolio Health Score
      </h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative h-40 w-40 flex items-center justify-center">
          <svg className="absolute" width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
              className="dark:stroke-gray-700"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray="439.8"
              strokeDashoffset={439.8 - (439.8 * overall) / 100}
              strokeLinecap="round"
              className={getScoreColor(overall)}
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div className="flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(overall)}`}>
              {overall}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {getScoreLabel(overall)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Activity size={16} className="text-purple-500 dark:text-purple-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Diversification</span>
          </div>
          <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 dark:bg-purple-400 rounded-full" 
              style={{ width: `${diversification}%` }}
            />
          </div>
          <span className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">{diversification}%</span>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center">
            <TrendingUp size={16} className="text-blue-500 dark:text-blue-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Performance</span>
          </div>
          <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" 
              style={{ width: `${performance}%` }}
            />
          </div>
          <span className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">{performance}%</span>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center">
            <ShieldCheck size={16} className="text-green-500 dark:text-green-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Risk</span>
          </div>
          <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 dark:bg-green-400 rounded-full" 
              style={{ width: `${risk}%` }}
            />
          </div>
          <span className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">{risk}%</span>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center">
            <DollarSign size={16} className="text-amber-500 dark:text-amber-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Cash</span>
          </div>
          <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 dark:bg-amber-400 rounded-full" 
              style={{ width: `${cash}%` }}
            />
          </div>
          <span className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">{cash}%</span>
        </div>
      </div>
    </div>
  );
};

export default HealthScore;