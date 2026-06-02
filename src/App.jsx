import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FarmerManagement from './pages/FarmerManagement';
import Reports from './pages/Reports';
import ExchangeRates from './pages/ExchangeRates';
import Factories from './pages/Factories';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const PAGES = {
  dashboard: Dashboard,
  farmers: FarmerManagement,
  reports: Reports,
  exchange: ExchangeRates,
  factories: Factories,
};

export default function App() {
  const [auth, setAuth] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  if (!auth) return <LoginPage setAuth={setAuth} />;

  const PageComponent = PAGES[page] || Dashboard;

  return (
    <div className={"app" + (collapsed ? ' collapsed' : '')}>
      <Sidebar page={page} setPage={setPage} setAuth={setAuth} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main">
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <PageComponent />
      </div>
    </div>
  );
}
