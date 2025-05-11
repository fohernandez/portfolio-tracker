import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Bell, Smartphone, ShieldCheck, Mail, Moon, Sun } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Mock settings
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      rebalancing: true,
      stopLoss: true,
      dividends: true,
      allocationDrift: true
    },
    appearance: {
      compactView: false,
      showPerformance: true
    },
    security: {
      twoFactor: false
    }
  });
  
  const handleToggle = (section: keyof typeof settings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: !prev[section][setting as keyof typeof prev[section]]
      }
    }));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Customize your experience and notification preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Bell size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Notifications
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Email Notifications
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Receive alerts via email
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-email"
                    className="sr-only"
                    checked={settings.notifications.email}
                    onChange={() => handleToggle('notifications', 'email')}
                  />
                  <label
                    htmlFor="toggle-email"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.notifications.email
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        settings.notifications.email ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Push Notifications
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Receive alerts on your device
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-push"
                    className="sr-only"
                    checked={settings.notifications.push}
                    onChange={() => handleToggle('notifications', 'push')}
                  />
                  <label
                    htmlFor="toggle-push"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.notifications.push
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        settings.notifications.push ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
                  Alert Types
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'rebalancing', label: 'Rebalancing Alerts' },
                    { key: 'stopLoss', label: 'Stop-Loss Triggers' },
                    { key: 'dividends', label: 'Dividend Events' },
                    { key: 'allocationDrift', label: 'Allocation Drift' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`check-${key}`}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={settings.notifications[key as keyof typeof settings.notifications]}
                        onChange={() => handleToggle('notifications', key)}
                      />
                      <label
                        htmlFor={`check-${key}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Smartphone size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Appearance
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Theme Mode
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Choose between light and dark mode
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={16} className="mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun size={16} className="mr-2" />
                      Light Mode
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Compact View
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Show more data in less space
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-compact"
                    className="sr-only"
                    checked={settings.appearance.compactView}
                    onChange={() => handleToggle('appearance', 'compactView')}
                  />
                  <label
                    htmlFor="toggle-compact"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.appearance.compactView
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        settings.appearance.compactView ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Show Performance
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Display performance metrics in dashboard
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-performance"
                    className="sr-only"
                    checked={settings.appearance.showPerformance}
                    onChange={() => handleToggle('appearance', 'showPerformance')}
                  />
                  <label
                    htmlFor="toggle-performance"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.appearance.showPerformance
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        settings.appearance.showPerformance ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Security
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Add an extra layer of security
                  </p>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-2fa"
                    className="sr-only"
                    checked={settings.security.twoFactor}
                    onChange={() => handleToggle('security', 'twoFactor')}
                  />
                  <label
                    htmlFor="toggle-2fa"
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      settings.security.twoFactor
                        ? 'bg-blue-600 dark:bg-blue-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        settings.security.twoFactor ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {/* Profile Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">JP</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">John Portfolio</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">john@example.com</p>
              
              <div className="mt-4 w-full pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Account Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">
              Account Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">April 12, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Premium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Data Usage</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">28%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;