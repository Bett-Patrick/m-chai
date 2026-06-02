import React, { useState, useRef, useEffect } from 'react';

export default function Topbar({ collapsed, setCollapsed }) {
  const [open, setOpen] = useState(false);
  const pillRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (pillRef.current && !pillRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const handleSignOut = (e) => {
    e.stopPropagation();
    // simple sign-out - navigate to login
    window.location.href = '/login';
  };

  return (
    <header className="topbar">
      <button className="sidebar-toggle" onClick={() => setCollapsed && setCollapsed(c => !c)}>☰</button>
      <div className="topbar-search">
        <span>🔍</span>
        <input placeholder="Search farmers, transactions..." />
      </div>
      <div className="topbar-right">
        <div className="admin-badge">⚙ Admin</div>
        <button className="notif-btn">🔔</button>
        <div className="user-pill" ref={pillRef} onClick={() => setOpen(o => !o)} tabIndex={0}>
          <div className="user-pill-avatar">SA</div>
          <div>
            <div className="user-pill-name">System Administrator</div>
            <div className="user-pill-email">admin@mchai.co.ke</div>
          </div>
          <span className="user-pill-arrow">▼</span>

          {open && (
            <div className="user-dropdown" onClick={e => e.stopPropagation()}>
              <div className="ud-top">
                <div className="ud-avatar">SA</div>
                <div>
                  <div className="ud-name">System Administrator</div>
                  <div className="ud-email">admin@mchai.co.ke</div>
                </div>
              </div>
              <div className="ud-actions">
                <button className="ud-signout" onClick={handleSignOut}>
                  <span className="ud-signout-icon">🔓</span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
