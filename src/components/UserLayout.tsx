import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const UserLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/panel/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/panel/create', label: 'Create Test', icon: '✏️' },
    { to: '/panel/reports', label: 'Reports & Scores', icon: '📊' },
    { to: '/panel/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarCollapsed ? '72px' : '240px',
        background: 'linear-gradient(180deg, #0d1b2e 0%, #1a3456 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        transition: 'width 0.3s ease',
        zIndex: 100,
        boxShadow: '3px 0 15px rgba(0,0,0,0.15)',
        overflow: 'hidden'
      }}>
        {/* Logo Area */}
        <div style={{
          padding: sidebarCollapsed ? '20px 14px' : '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          minHeight: '72px'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img
              src="/marketing-assets/images/logo/Favicon.png"
              alt="CSQNA"
              style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }}
            />
            {!sidebarCollapsed && (
              <img
                src="/marketing-assets/images/logo/FamousDotsLogoWhite.png"
                alt="CSQNA"
                style={{ height: '28px', objectFit: 'contain' }}
              />
            )}
          </Link>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                title={link.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: sidebarCollapsed ? '14px 0' : '13px 24px',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  textDecoration: 'none',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid #e21b5a' : '3px solid transparent',
                  borderRadius: isActive ? '0 8px 8px 0' : '0',
                  transition: 'all 0.2s ease',
                  margin: '2px 0',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{link.icon}</span>
                {!sidebarCollapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Logout */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px' }}>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: sidebarCollapsed ? '10px 0' : '10px 16px',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              background: 'rgba(226, 27, 90, 0.15)',
              border: '1px solid rgba(226, 27, 90, 0.3)',
              borderRadius: '8px',
              color: '#f87171',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '16px' }}>🚪</span>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{
        marginLeft: sidebarCollapsed ? '72px' : '240px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>

        {/* Top Navbar */}
        <header style={{
          height: '64px',
          background: '#fff',
          borderBottom: '1px solid #e8ecf0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 99,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          {/* Left: Hamburger + Page Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: '20px'
              }}
            >
              ☰
            </button>
            <div style={{ color: '#1e293b', fontWeight: '600', fontSize: '16px' }}>
              {navLinks.find(l => l.to === location.pathname)?.label || 'Dashboard'}
            </div>
          </div>

          {/* Right: Support + Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Support Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowSupportDropdown(!showSupportDropdown); setShowProfileDropdown(false); }}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Support"
              >
                🎧
              </button>
              {showSupportDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '48px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  minWidth: '230px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  zIndex: 200
                }}>
                  <p style={{ margin: '0 0 8px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Support</p>
                  <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#64748b' }}>📞 +91 9137273947</p>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#64748b' }}>✉️ support@csqna.com</p>
                  <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                  <a href="https://forms.gle/meNSC4ZkWWPPK6hC6" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '12px', color: '#e21b5a', fontWeight: '500', textDecoration: 'none' }}>
                    🤝 Contribute
                  </a>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowSupportDropdown(false); }}
                style={{
                  background: 'linear-gradient(135deg, #e21b5a, #f2722c)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  cursor: 'pointer',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Profile"
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </button>
              {showProfileDropdown && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '50px',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px',
                  minWidth: '240px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  zIndex: 200
                }}>
                  {/* User Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e21b5a, #f2722c)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: '700', fontSize: '16px', flexShrink: 0
                    }}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{user?.name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{user?.email}</p>
                    </div>
                  </div>
                  <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                  <Link to="/panel/settings" onClick={() => setShowProfileDropdown(false)}
                    style={{ display: 'block', padding: '8px 4px', fontSize: '13px', color: '#475569', textDecoration: 'none' }}>
                    ⚙️ Settings
                  </Link>
                  <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                  <button onClick={handleLogout}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '8px 4px', fontSize: '13px', color: '#e21b5a',
                      background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600'
                    }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Overlay to close dropdowns when clicking outside */}
      {(showProfileDropdown || showSupportDropdown) && (
        <div
          onClick={() => { setShowProfileDropdown(false); setShowSupportDropdown(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
        />
      )}
    </div>
  );
};

export default UserLayout;
