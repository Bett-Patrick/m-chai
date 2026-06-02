import React, { useState } from 'react';
import data from '../data/data.json';
import Footer from '../components/Footer';

const CONV_KGS = [5, 10, 25, 50, 100];

export default function ExchangeRates() {
  const [rates, setRates] = useState(data.exchangeRates);
  const [newRate, setNewRate] = useState('20');

  const current = rates.find(r => r.current);
  const prev = rates.filter(r => !r.current)[0];
  const pctChange = prev ? ((current.rate - prev.rate) / prev.rate * 100).toFixed(1) : 0;

  const handleUpdate = () => {
    const r = parseFloat(newRate);
    if (!r || r <= 0) return;
    setRates([
      { rate: r, date: '2026-06-02', updatedBy: 'Admin', current: true },
      ...rates.map(x => ({ ...x, current: false })),
    ]);
  };

  return (
    <div className="page-wrapper">
      <div className="page">
        <h1 className="page-title">Exchange Rate Management</h1>
        <p className="page-subtitle" style={{ marginBottom: 20 }}>Set the kilo-to-shilling conversion rate</p>

        <div className="exchange-grid">
          <div className="card">
            <div className="card-section-header">
              <div className="card-icon amber">⚙</div>
              <div>
                <div className="card-section-title">Current Exchange Rate</div>
                <div className="card-section-sub">Last updated: {current.date}</div>
              </div>
            </div>
            <div className="rate-display">
              <div className="rate-label">1 Kilogram of Green Leaf =</div>
              <div className="rate-value">KES {current.rate}</div>
              <div className="rate-trend">↑ +{pctChange}% from last rate</div>
            </div>
            <div className="form-group">
              <label className="form-label">Set New Rate (KES per kg)</label>
              <div className="rate-input-row">
                <div className="rate-input-prefix">KES</div>
                <input className="rate-input" type="number" value={newRate} onChange={e => setNewRate(e.target.value)} />
                <button className="btn-primary" onClick={handleUpdate}>⚙ Update</button>
              </div>
            </div>
            <div>
              <div className="form-label" style={{ marginBottom: 8 }}>Conversion Preview</div>
              <div className="conv-preview">
                {CONV_KGS.map(kg => (
                  <div key={kg} className="conv-item">
                    <div className="conv-kg">{kg} kg</div>
                    <div className="conv-kes">KES {(kg * (parseFloat(newRate) || 0)).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-section-header">
              <div className="card-icon blue">🕐</div>
              <div>
                <div className="card-section-title">Rate History</div>
                <div className="card-section-sub">Previous exchange rate changes</div>
              </div>
            </div>
            {rates.map((r, i) => (
              <div key={i} className="rate-hist-item">
                <div className={"rate-hist-icon" + (r.current ? " current" : "")}>⚙</div>
                <div className="rate-hist-info">
                  <div className="rate-hist-val">KES {r.rate}/kg</div>
                  <div className="rate-hist-date">{r.date}</div>
                </div>
                <div className="rate-hist-right">
                  <div className="text-sm-muted">{r.updatedBy}</div>
                  {r.current && <span className="current-badge">Current</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
