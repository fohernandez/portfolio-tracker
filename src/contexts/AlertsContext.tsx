import React, { createContext, useContext, useState } from 'react';
import { Alert } from '../types';

// Sample data
const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'rebalance',
    message: 'Tech sector allocation has exceeded target by 5%',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false
  },
  {
    id: '2',
    type: 'stop-loss',
    message: 'TSLA approaching stop-loss threshold of -5%',
    assetId: '3',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    id: '3',
    type: 'dividend',
    message: 'AAPL dividend payment of $0.24 per share expected in 3 days',
    assetId: '1',
    severity: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true
  },
  {
    id: '4',
    type: 'allocation-drift',
    message: 'Cash allocation below target range of 10-15%',
    assetId: '5',
    severity: 'medium',
    timestamp: new Date(),
    read: false
  }
];

type AlertsContextType = {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => void;
  removeAlert: (id: string) => void;
};

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  
  const unreadCount = alerts.filter(alert => !alert.read).length;

  const markAsRead = (id: string) => {
    setAlerts(prev =>
      prev.map(alert => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp' | 'read'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertsContext.Provider
      value={{ alerts, unreadCount, markAsRead, markAllAsRead, addAlert, removeAlert }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = (): AlertsContextType => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};