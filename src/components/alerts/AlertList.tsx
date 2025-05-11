import React from 'react';
import { Alert as AlertType } from '../../types';
import { formatAlertTimestamp, getAlertIcon, getAlertColor } from '../../utils/formatters';
import { Bell, CheckCircle, XCircle, Filter } from 'lucide-react';
import { useAlerts } from '../../contexts/AlertsContext';
import * as Icons from 'lucide-react';

const AlertList: React.FC = () => {
  const { alerts, markAsRead, markAllAsRead, removeAlert } = useAlerts();
  
  const getIcon = (iconName: string) => {
    const LucideIcon = Icons[iconName as keyof typeof Icons] || Bell;
    return <LucideIcon size={18} />;
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 mb-4">
            <Bell size={28} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            No alerts
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            You're all caught up! Alerts about your portfolio will appear here when they occur.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Alerts & Notifications
          </h2>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
            
            <button 
              onClick={markAllAsRead}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg text-sm"
            >
              <CheckCircle size={16} className="mr-1" />
              Mark All as Read
            </button>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 sm:px-6 sm:py-4 ${
              alert.read 
                ? 'bg-white dark:bg-gray-800' 
                : 'bg-blue-50 dark:bg-blue-900/10'
            }`}
          >
            <div className="flex items-start">
              <div className={`shrink-0 rounded-full p-2 mr-3 ${
                getAlertSeverityBg(alert.severity)
              }`}>
                {getIcon(getAlertIcon(alert.type))}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      alert.read 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatAlertTimestamp(alert.timestamp)}
                    </p>
                  </div>
                  
                  <div className="flex items-center ml-4">
                    {!alert.read && (
                      <button 
                        onClick={() => markAsRead(alert.id)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mr-3"
                      >
                        Mark as read
                      </button>
                    )}
                    <button 
                      onClick={() => removeAlert(alert.id)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
                
                {alert.assetId && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Asset Related
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getAlertSeverityBg = (severity: AlertType['severity']): string => {
  switch (severity) {
    case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300';
    case 'medium': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300';
    case 'low': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
  }
};

export default AlertList;