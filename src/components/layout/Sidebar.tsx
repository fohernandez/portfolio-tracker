import React from 'react';
import { Home, BarChart2, Bell, Settings, PieChart, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAlerts } from '../../contexts/AlertsContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { unreadCount } = useAlerts();

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <PieChart size={20} />, label: 'Portfolio', path: '/portfolio' },
    { icon: <TrendingUp size={20} />, label: 'Performance', path: '/performance' },
    { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts', badge: unreadCount },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:z-0`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <span className="text-pink-600 dark:text-pink-400 font-bold text-xl">Clau y Fede</span>
            <span className="text-gray-500 dark:text-gray-400 font-light text-lg ml-1">♥</span>
          </div>
        </div>
        
        <nav className="py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-1">
                <Link 
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center pl-6 pr-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 relative ${
                    isActive(item.path) 
                      ? 'text-pink-600 dark:text-pink-400 font-medium bg-pink-50 dark:bg-pink-900/20' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;