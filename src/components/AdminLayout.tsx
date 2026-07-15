import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/admin/users', label: 'Clients', icon: '👥' },
    { to: '/admin/upload', label: 'Upload', icon: '📤' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarCollapsed ? '72px' : '240px',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        transition: 'width 0.3s ease',
        zIndex: 100,
        boxShadow: '3px 0 15px rgba(0,0,0,0.2)',
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
              <div>
                <img
                  src="/marketing-assets/images/logo/FamousDotsLogoWhite.png"
                  alt="CSQNA"
                  style={{ height: '26px', objectFit: 'contain' }}
                />
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginTop: '2px' }}>ADMIN PORTAL</div>
              </div>
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
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid #e94560' : '3px solid transparent',
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

        {/* Sidebar Footer */}
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
              background: 'rgba(233, 69, 96, 0.15)',
              border: '1px solid rgba(233, 69, 96, 0.3)',
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
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', borderRadius: '8px',
                color: '#64748b', fontSize: '20px'
              }}
            >
              ☰
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#1e293b', fontWeight: '600', fontSize: '16px' }}>
                {navLinks.find(l => l.to === location.pathname)?.label || 'Admin'}
              </span>
              <span style={{
                fontSize: '10px', fontWeight: '700', color: '#e94560',
                background: 'rgba(233,69,96,0.1)', padding: '2px 8px',
                borderRadius: '20px', letterSpacing: '1px'
              }}>ADMIN</span>
            </div>
          </div>

          {/* Right: Profile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              style={{
                background: 'linear-gradient(135deg, #e94560, #0f3460)',
                border: 'none', borderRadius: '50%',
                width: '38px', height: '38px', cursor: 'pointer',
                color: '#fff', fontWeight: '700', fontSize: '15px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              title="Profile"
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </button>
            {showProfileDropdown && (
              <div style={{
                position: 'absolute', right: 0, top: '50px',
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: '12px', padding: '16px', minWidth: '220px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 200
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e94560, #0f3460)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: '700', fontSize: '15px', flexShrink: 0
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{user?.name}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#e94560', fontWeight: '600' }}>Administrator</p>
                  </div>
                </div>
                <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                <button onClick={handleLogout}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 4px', fontSize: '13px', color: '#e94560',
                    background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600'
                  }}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Overlay to close dropdown */}
      {showProfileDropdown && (
        <div
          onClick={() => setShowProfileDropdown(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
        />
      )}
    </div>
  );
};

export default AdminLayout;
