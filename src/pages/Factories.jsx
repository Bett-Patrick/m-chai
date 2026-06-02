import React from 'react';
import data from '../data/data.json';
import Footer from '../components/Footer';

export default function Factories() {
  return (
    <div className="page-wrapper">
      <div className="page">
        <h1 className="page-title">Factories</h1>
        <p className="page-subtitle" style={{ marginBottom: 20 }}>Manage and monitor tea factories</p>
        <div className="factory-grid">
          {data.factories.map(f => (
            <div key={f.id} className="factory-card">
              <span className="factory-active-badge">{f.status}</span>
              <div className="factory-icon">📊</div>
              <div className="factory-name">{f.name}</div>
              <div className="factory-county">📍 {f.county}</div>
              <div className="factory-stats">
                <div>
                  <div className="factory-stat-label">👥 Farmers</div>
                  <div className="factory-stat-val">{f.farmers}</div>
                  <div className="factory-stat-sub">{f.activeFarmers} active</div>
                </div>
                <div>
                  <div className="factory-stat-label">⚖ Balance</div>
                  <div className="factory-stat-val">{f.balance} kg</div>
                  <div className="factory-stat-sub">KES {f.balanceValue.toLocaleString()}</div>
                </div>
              </div>
              <div className="factory-delivered">
                <span className="factory-delivered-label">Total Delivered</span>
                <span className="factory-delivered-val">{f.totalDelivered.toLocaleString()} kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
