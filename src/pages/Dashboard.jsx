import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import data from '../data/data.json';
import Footer from '../components/Footer';

const STAT_CARDS = [
  { label: 'TOTAL FARMERS', value: '16', sub: '14 active', trend: '+12% vs last month', up: true, icon: '👥' },
  { label: 'TOTAL KILOS TRANSACTED', value: '6.6K kg', sub: '84 deliveries', trend: '+8.5% vs last month', up: true, icon: '🍃' },
  { label: 'TOTAL CONVERSIONS', value: '128', sub: 'KES 132K value', trend: '+23% vs last month', up: true, icon: '💱' },
  { label: 'AVAILABLE BALANCE', value: '1,667 kg', sub: 'KES 33,340 value', trend: '-3.2% vs last month', up: false, icon: '💰' },
];

const TX_ICONS = { Bank: '🏦', Delivery: '🍃', Mpesa: '📱', Airtime: '📡', Goods: '📦' };
const TX_COLORS = { Bank: '#dbeafe', Delivery: '#dcfce7', Mpesa: '#fef3c7', Airtime: '#f3e8ff', Goods: '#fce7f3' };

const FACTORY_PERF = [
  { name: 'Kericho', value: 5800 }, { name: 'Nandi Hills', value: 4900 },
  { name: 'Limuru', value: 5700 }, { name: 'Kangaita', value: 5400 },
  { name: 'Ragati', value: 5600 }, { name: 'Githongo', value: 4500 },
];

export default function Dashboard() {
  return (
    <div className="page-wrapper">
      <div className="page">
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Overview of M-Chai platform performance</p>
        </div>

        <div className="stat-grid">
          {STAT_CARDS.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
              <div className={"stat-trend " + (s.up ? 'up' : 'down')}>
                {s.up ? '↑' : '↓'} {s.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="chart-grid">
          <div className="card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Monthly Kilos Overview</div>
                <div className="chart-sub">Deliveries vs Conversions (kg)</div>
              </div>
              <div className="legend">
                <span className="legend-item"><span className="legend-dot green" />Deliveries</span>
                <span className="legend-item"><span className="legend-dot amber" />Conversions</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.monthlyOverview} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="deliveries" stroke="#2e7d1e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="conversions" stroke="#c8960c" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div className="chart-title">Conversion Types</div>
            <div className="chart-sub">Distribution by category</div>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={data.conversionTypes} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="percent" stroke="none">
                  {data.conversionTypes.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-legend">
              {data.conversionTypes.map((c, i) => (
                <div key={i} className="donut-legend-row">
                  <div className="donut-legend-left">
                    <span className="legend-dot" style={{ background: c.color }} />
                    {c.type}
                  </div>
                  <div className="donut-pct">{c.percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-grid">
          <div className="card">
            <div className="chart-title" style={{ marginBottom: 16 }}>Factory Performance</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={FACTORY_PERF} layout="vertical" margin={{ left: 20, right: 20, top: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="value" fill="#2e7d1e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div className="chart-header" style={{ marginBottom: 12 }}>
              <div className="chart-title">Recent Transactions</div>
              <button className="view-all">View All</button>
            </div>
            <div className="tx-list">
              {data.transactions.slice(0, 5).map((tx, i) => (
                <div key={i} className="tx-row">
                  <div className="tx-icon" style={{ background: TX_COLORS[tx.type] || '#f3f4f6' }}>
                    {TX_ICONS[tx.type] || '💳'}
                  </div>
                  <div className="tx-info">
                    <div className="tx-name">{tx.farmer}</div>
                    <div className="tx-meta">{tx.type} · {tx.date}</div>
                  </div>
                  <div className="tx-amount">
                    <div className={"tx-kg " + (tx.kilos > 0 ? 'pos' : 'neg')}>
                      {tx.kilos > 0 ? '+' : ''}{tx.kilos} kg
                    </div>
                    <div className="tx-val">KES {Math.abs(tx.value).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
