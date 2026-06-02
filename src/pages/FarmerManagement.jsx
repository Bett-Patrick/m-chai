import React, { useEffect, useState } from 'react';
import data from '../data/data.json';
import Footer from '../components/Footer';

const initials = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
const PER_PAGE = 8;

export default function FarmerManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [factoryFilter, setFactoryFilter] = useState('All Factories');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [farmers, setFarmers] = useState(data.farmers);
  const [selectedFarmerId, setSelectedFarmerId] = useState('');
  const [deliveryKilos, setDeliveryKilos] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const currentRate = data.exchangeRates.find(r => r.current)?.rate || 20;

  useEffect(() => {
    fetch('/api/farmers')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(result => {
        if (Array.isArray(result.farmers)) {
          setFarmers(result.farmers);
          setSelectedFarmerId(current => current || (result.farmers[0]?.id || ''));
        }
      })
      .catch(() => {
        setFarmers(data.farmers);
      });
  }, []);
  const factories = [...new Set(farmers.map(f => f.factory))];
  const handleRecordDelivery = async () => {
    if (!selectedFarmerId) {
      setError('Please select a farmer');
      return;
    }
    const kilos = parseFloat(deliveryKilos);
    if (Number.isNaN(kilos) || kilos <= 0) {
      setError('Please enter a valid weight');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmerId: selectedFarmerId, kilos, date: deliveryDate })
      });

      const result = await response.json();
      
      if (!response.ok) {
        setError(result.error || 'Failed to save delivery');
        setSaving(false);
        return;
      }

      setFarmers(result.farmers || farmers);
      setShowModal(false);
      setSelectedFarmerId('');
      setDeliveryKilos('');
      setDeliveryDate(new Date().toISOString().slice(0, 10));
      setError('');
      setSaving(false);
    } catch (err) {
      setError('Network error: ' + err.message);
      setSaving(false);
    }
  };

  const filtered = farmers.filter(f => {
    const q = search.toLowerCase();
    const matchQ = f.name.toLowerCase().includes(q) || f.phone.includes(q) || f.id.toLowerCase().includes(q);
    const matchS = statusFilter === 'All Status' || f.status === statusFilter;
    const matchF = factoryFilter === 'All Factories' || f.factory === factoryFilter;
    return matchQ && matchS && matchF;
  });

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="page-wrapper">
      <div className="page">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Farmer Management</h1>
            <p className="page-subtitle">{farmers.length} farmers found</p>
          </div>
          {/*
          <button className="btn-primary" onClick={() => {
            setSelectedFarmerId(farmers[0]?.id || '');
            setDeliveryKilos('');
            setDeliveryDate(new Date().toISOString().slice(0, 10));
            setShowModal(true);
          }}>+ Record Delivery</button>
          */}
        </div>

        <div className="filters">
          <div className="search-bar">
            <span>🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, phone, or ID..."
            />
          </div>
          <select className="select-filter" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
          <select className="select-filter" value={factoryFilter} onChange={e => { setFactoryFilter(e.target.value); setPage(1); }}>
            <option>All Factories</option>
            {factories.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>

        <div className="card no-pad">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>FARMER</th>
                  <th>FACTORY</th>
                  <th>BALANCE (KG)</th>
                  <th>VALUE (KES)</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {shown.map(f => (
                  <tr key={f.id}>
                    <td>
                      <div className="farmer-cell">
                        <div className="farmer-avatar">{initials(f.name)}</div>
                        <div>
                          <div className="farmer-name">{f.name}</div>
                          <div className="farmer-phone">{f.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted">{f.factory}</td>
                    <td className="font-semibold">{f.balance.toFixed(1)}</td>
                    <td>KES {f.value.toLocaleString()}</td>
                    <td>
                      <span className={"badge " + (f.status === 'Active' ? 'badge-active' : 'badge-suspended')}>
                        {f.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">⊘</button>
                      <button className="action-btn">👁</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-wrap">
            <div className="pagination">
              <span>Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}</span>
              <div className="page-btns">
                <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
                {Array.from({ length: pages }, (_, i) => (
                  <button key={i} className={"page-btn" + (page === i + 1 ? " active" : "")} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button className="page-btn" onClick={() => setPage(p => Math.min(pages, p + 1))}>›</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/*
      {showModal && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h3 className="modal-title">Record Delivery</h3>
            <p className="modal-sub">Add a new leaf delivery for a farmer</p>
            <div className="form-group">
              <label className="form-label">Farmer</label>
              <select className="form-input" value={selectedFarmerId} onChange={e => setSelectedFarmerId(e.target.value)}>
                <option value="">Select farmer...</option>
                {farmers.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Kilos</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter kilos delivered"
                value={deliveryKilos}
                onChange={e => setDeliveryKilos(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount (KES)</label>
              <div className="form-input" style={{ background: '#f3f4f6', paddingTop: '10px', paddingBottom: '10px' }}>
                KES {(parseFloat(deliveryKilos || 0) * currentRate).toLocaleString()}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
              />
            </div>
            {error && <div style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>{error}</div>}
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setShowModal(false)} disabled={saving}>Cancel</button>
              <button className="btn-primary" onClick={handleRecordDelivery} disabled={saving}>{saving ? 'Saving...' : 'Record Delivery'}</button>
            </div>
          </div>
        </div>
      )}
      */}
    </div>
  );
}
