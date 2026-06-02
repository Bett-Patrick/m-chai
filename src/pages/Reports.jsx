import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import data from '../data/data.json';
import Footer from '../components/Footer';

const TABS = [
  { id: 'overview', label: 'Overview Report', icon: '📈' },
  { id: 'factory', label: 'Factory Report', icon: '🏭' },
  { id: 'transaction', label: 'Transaction Report', icon: '💱' },
];

const OVERVIEW_STATS = [
  { icon: '👥', label: 'Total Farmers', value: '16', sub: '14 active' },
  { icon: '🍃', label: 'Total Delivered', value: '43.5K kg', sub: 'KES 870K' },
  { icon: '💱', label: 'Total Converted', value: '41.8K kg', sub: 'KES 836K' },
  { icon: '📈', label: 'Avg Balance', value: '104.2 kg', sub: 'KES 2084' },
];

export default function Reports() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="page-wrapper">
      <div className="page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Reports</h1>
            <p className="page-subtitle">Comprehensive platform analytics and exports</p>
          </div>
          <button className="btn-outline">⬇ Export CSV</button>
        </div>

        <div className="tab-bar">
          {TABS.map(t => (
            <button key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            <div className="stat-grid" style={{ marginBottom: 16 }}>
              {OVERVIEW_STATS.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon-sm">{s.icon}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value sm">{s.value}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="chart-title" style={{ marginBottom: 16 }}>Weekly Conversion Trend</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.weeklyConversions} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="value" fill="#2e7d1e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="chart-title" style={{ marginBottom: 16 }}>Transaction Type Breakdown</div>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>TYPE</th><th>COUNT</th><th>TOTAL KILOS</th><th className="right">TOTAL VALUE (KES)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transactionBreakdown.map((r, i) => (
                    <tr key={i}>
                      <td>{r.type}</td>
                      <td>{r.count}</td>
                      <td>{r.kilos.toLocaleString()} kg</td>
                      <td className="right">KES {r.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'factory' && (
          <div className="card">
            <div className="chart-title" style={{ marginBottom: 16 }}>Factory Performance Breakdown</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={data.factories.map(f => ({
                  name: f.name.replace(' Factory', '').replace(' Tea', ''),
                  delivered: f.totalDelivered,
                  balance: f.balance,
                }))}
                margin={{ top: 0, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="delivered" name="Total Delivered" fill="#2e7d1e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="balance" name="Balance" fill="#c8960c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === 'transaction' && (
          <div className="card">
            <div className="chart-title" style={{ marginBottom: 16 }}>All Transactions</div>
            <table className="report-table">
              <thead>
                <tr>
                  <th>FARMER</th><th>TYPE</th><th>DATE</th><th>KILOS</th><th className="right">VALUE</th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.farmer}</td>
                    <td>{tx.type}</td>
                    <td className="text-muted">{tx.date}</td>
                    <td className={tx.kilos > 0 ? 'text-green font-semibold' : 'text-red font-semibold'}>
                      {tx.kilos > 0 ? '+' : ''}{tx.kilos} kg
                    </td>
                    <td className="right">KES {Math.abs(tx.value).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
