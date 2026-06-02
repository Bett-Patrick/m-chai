import React, { useState, useRef } from 'react';
import data from '../data/data.json';

export default function LoginPage({ setAuth }) {
  const [role, setRole] = useState('Farmer');
  const [pin, setPin] = useState(['', '', '', '']);
  const [phone, setPhone] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const pinRefs = [useRef(), useRef(), useRef(), useRef()];

  const handlePin = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const p = [...pin];
    p[i] = v;
    setPin(p);
    if (v && i < 3) pinRefs[i + 1].current.focus();
  };

  const handleLogin = () => {
    if (role === 'Admin') { setAuth(true); return; }
    if (phone === '0712345678' && pin.join('') === '1234') { setAuth(true); }
    else { alert('Invalid credentials. Demo: 0712345678 / 1234'); }
  };

  const LeftPanel = () => (
    <div className="login-left">
      <div className="login-brand">
        <div className="login-logo-icon">🍃</div>
        <div>
          <div className="login-logo-text">M-Chai</div>
          <div className="login-logo-sub">TURNING LEAVES INTO MONEY</div>
        </div>
      </div>
      <div className="login-left-content">
        <h1 className="login-headline">Your green leaf,<br />your digital wallet.</h1>
        <p className="login-desc">
          Convert your tea factory kilo balance into M-Pesa, bank transfers, airtime, and more. Instant, secure, and transparent.
        </p>
        <div className="login-features">
          <div className="login-feature"><div className="login-feature-icon">📱</div>Send money to M-Pesa instantly</div>
          <div className="login-feature"><div className="login-feature-icon">🔒</div>Secure PIN-based authentication</div>
          <div className="login-feature"><div className="login-feature-icon">🍃</div>Real-time kilo balance tracking</div>
        </div>
      </div>
      <div className="login-left-footer">© 2026 M-Chai. All rights reserved.</div>
    </div>
  );

  if (showRegister) {
    return (
      <div className="login-page">
        <LeftPanel />
        <div className="login-right">
          <div className="login-form">
            <button className="back-btn" onClick={() => setShowRegister(false)}>‹ Back to Login</button>
            <h2 className="login-title">Create Account</h2>
            <p className="login-sub">Register as a new farmer on M-Chai</p>
            <div className="step-bar">
              <div className="step-circle active">1</div>
              <div className="step-line active" />
              <div className="step-circle inactive">2</div>
            </div>
            {[
              { label: 'Full Name', ph: 'Enter your full name', icon: '👤' },
              { label: 'Phone Number', ph: '0712 345 678', icon: '📞' },
              { label: 'National ID Number', ph: 'Enter National ID', icon: '🪪' },
            ].map((f, i) => (
              <div key={i} className="form-group">
                <label className="form-label">{f.label}</label>
                <div className="input-wrap">
                  <span>{f.icon}</span>
                  <input placeholder={f.ph} />
                </div>
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Tea Factory</label>
              <div className="input-wrap">
                <span>🏭</span>
                <select>
                  <option>Select your factory</option>
                  {data.factories.map(f => <option key={f.id}>{f.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <div className="input-wrap">
                <span>📍</span>
                <input placeholder="Your location / town" />
              </div>
            </div>
            <button className="btn-primary full-width">Continue →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <LeftPanel />
      <div className="login-right">
        <div className="login-form">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-sub">Sign in to access your M-Chai account</p>
          <div className="role-tabs">
            {['Farmer', 'Admin'].map(r => (
              <button key={r} className={"role-tab" + (role === r ? " active" : "")} onClick={() => setRole(r)}>
                {r === 'Farmer' ? '🍃' : '⚙'} {r}
              </button>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-wrap">
              <span>📞</span>
              <input placeholder="0712 345 678" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Enter 4-Digit PIN</label>
            <div className="pin-row">
              {pin.map((v, i) => (
                <input
                  key={i} ref={pinRefs[i]} className="pin-box"
                  type="password" maxLength={1} value={v}
                  onChange={e => handlePin(i, e.target.value)}
                />
              ))}
            </div>
          </div>
          <button className="btn-primary full-width" onClick={handleLogin}>→ Sign In</button>
          <div className="login-links">
            <span>Forgot PIN?</span>
            <span className="create-link" onClick={() => setShowRegister(true)}>✦ Create Account</span>
          </div>
          <div className="demo-box">
            <div className="demo-title">Demo Login:</div>
            <div>Phone: 0712345678 (Brian Kipchoge)</div>
            <div>PIN: 1234</div>
          </div>
        </div>
      </div>
    </div>
  );
}
