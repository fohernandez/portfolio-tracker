import React from 'react';
import { Alert as AlertType } from '../../types';
import { formatAlertTimestamp, getAlertIcon, getAlertColor } from '../../utils/formatters';
import { Bell } from 'lucide-react';
import { useAlerts } from '../../contexts/AlertsContext';
import * as Icons from 'lucide-react';

const AlertsPanel: React.FC = () => {
  const { alerts, markAsRead, markAllAsRead } = useAlerts();
  const recentAlerts = alerts.slice(0, 4);
  
  const getIcon = (iconName: string) => {
    const LucideIcon = Icons[iconName as keyof typeof Icons] || Bell;
    return <LucideIcon size={16} />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Recent Alerts
        </h2>
        {alerts.length > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {recentAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-3">
            <Bell size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No recent alerts
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Your notifications will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-3 rounded-lg flex items-start ${
                alert.read 
                  ? 'bg-gray-50 dark:bg-gray-800/80' 
                  : getAlertColor(alert.severity)
              }`}
            >
              <div className="shrink-0 mr-3">
                {getIcon(getAlertIcon(alert.type))}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${
                  alert.read ? 'text-gray-600 dark:text-gray-400' : ''
                }`}>
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formatAlertTimestamp(alert.timestamp)}
                </p>
              </div>
              {!alert.read && (
                <button 
                  onClick={() => markAsRead(alert.id)}
                  className="ml-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
          
          {alerts.length > 4 && (
            <div className="text-center pt-2">
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View all ({alerts.length}) alerts
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;