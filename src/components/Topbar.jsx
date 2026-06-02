import React from 'react';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <span>🔍</span>
        <input placeholder="Search farmers, transactions..." />
      </div>
      <div className="topbar-right">
        <div className="admin-badge">⚙ Admin</div>
        <button className="notif-btn">🔔</button>
        <div className="user-pill">
          <div className="user-pill-avatar">SA</div>
          <div>
            <div className="user-pill-name">System Admini...</div>
            <div className="user-pill-email">admin@mchai.co.ke</div>
          </div>
          <span>▼</span>
        </div>
      </div>
    </header>
  );
}
