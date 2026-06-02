import React from 'react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'farmers', label: 'Farmer Management', icon: '👥' },
  { id: 'reports', label: 'Reports', icon: '📊' },
  { id: 'exchange', label: 'Exchange Rates', icon: '💱' },
  { id: 'factories', label: 'Factories', icon: '🏭' },
];

export default function Sidebar({ page, setPage, setAuth, collapsed, setCollapsed }) {
  return (
    <aside className={"sidebar" + (collapsed ? ' collapsed' : '')}>
      <div className="sidebar-logo">
        <div className="logo-brand">
          <div className="logo-icon">🍃</div>
          <div>
            <div className="logo-text">M-Chai</div>
            <div className="logo-sub">TURNING LEAVES INTO MONEY</div>
          </div>
        </div>
      </div>
      <button className="sidebar-portal-btn">Admin Portal</button>
      <div className="sidebar-user">
        <div className="user-avatar">SA</div>
        <div className="user-info">
          <div className="user-name">System Administrator</div>
          <div className="user-email">admin@mchai.co.ke</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((n) => (
          <button
            key={n.id}
            className={"nav-item" + (page === n.id ? " active" : "")}
            onClick={() => setPage(n.id)}
          >
            <span className="nav-icon">{n.icon}</span>
            <span className="nav-label">{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="signout-btn" onClick={() => setAuth(false)}>
          <span>↩</span> Sign Out
        </button>
        <div className="collapse-btn" onClick={() => setCollapsed && setCollapsed(c => !c)}>{collapsed ? '› Expand' : '‹ Collapse'}</div>
      </div>
    </aside>
  );
}
