import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { AlertsProvider } from './contexts/AlertsContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Performance from './pages/Performance';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import TestApi from './components/TestApi';

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <AlertsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/test" element={<TestApi />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="performance" element={<Performance />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AlertsProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;