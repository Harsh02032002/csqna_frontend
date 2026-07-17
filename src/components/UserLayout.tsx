import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ─── SVG Icons ─────────────────────────────────────────────────────────────
const IconHome = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconPencil = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconChart = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconSettings = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconHeadphone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="16" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l1.88-1.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const ACCENT = '#7c3aed';
const ACCENT_LIGHT = '#ede9fe';

const navLinks = [
  { to: '/panel/dashboard', label: 'Dashboard',       icon: <IconHome />     },
  { to: '/panel/create',    label: 'Create Test',     icon: <IconPencil />   },
  { to: '/panel/reports',   label: 'Reports & Scores',icon: <IconChart />    },
  { to: '/panel/settings',  label: 'Settings',        icon: <IconSettings /> },
];

export const UserLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [collapsed,   setCollapsed]   = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); logout(); navigate('/');
  };

  const W = collapsed ? '68px' : '248px';
  const currentLabel = navLinks.find(l => l.to === location.pathname)?.label || 'Dashboard';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes ulFadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .ul-nav-link { transition: all .18s ease !important; }
        .ul-nav-link:hover { background: ${ACCENT_LIGHT} !important; color: ${ACCENT} !important; }
        .ul-logout-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; border-color: #fca5a5 !important; }
        .ul-icon-btn:hover { background: #f1f5f9 !important; color: #334155 !important; }
        .ul-dropdown { animation: ulFadeIn .16s ease; }
        .ul-dd-item:hover { background: #f8fafc !important; }
        .ul-profile-btn:hover { box-shadow: 0 4px 16px rgba(124,58,237,0.35) !important; transform: scale(1.04) !important; }
      `}</style>

      {/* ══ SIDEBAR ══ */}
      <aside style={{
        width: W, flexShrink: 0,
        background: '#ffffff',
        borderRight: '1px solid #e8eaf0',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        transition: 'width .3s cubic-bezier(.4,0,.2,1)',
        zIndex: 100, overflow: 'hidden',
        boxShadow: '2px 0 12px rgba(0,0,0,0.04)',
      }}>

        {/* Logo */}
        <div style={{
          padding: collapsed ? '18px 0' : '18px 20px',
          borderBottom: '1px solid #f0f2f8',
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: '68px', gap: '10px',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124,58,237,0.25)',
            }}>
              <img src="/marketing-assets/images/logo/Favicon.png" alt="CSQNA"
                style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            </div>
            {!collapsed && (
              <img src="/marketing-assets/images/logo/FamousDotsLogo.png" alt="CSQNA"
                style={{ height: '24px', objectFit: 'contain' }} />
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} title={link.label} className="ul-nav-link"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: collapsed ? '11px 0' : '10px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  textDecoration: 'none',
                  color: active ? ACCENT : '#64748b',
                  background: active ? ACCENT_LIGHT : 'transparent',
                  borderRadius: '10px',
                  fontWeight: active ? '600' : '500',
                  fontSize: '13.5px',
                  margin: '2px 0',
                  position: 'relative',
                }}>
                {active && (
                  <div style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: '3px', height: '60%', borderRadius: '0 3px 3px 0',
                    background: ACCENT,
                  }} />
                )}
                <span style={{ flexShrink: 0, display: 'flex', opacity: active ? 1 : 0.7 }}>{link.icon}</span>
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User strip */}
        {!collapsed && (
          <div style={{
            margin: '0 10px 8px', padding: '12px',
            background: '#faf9ff', borderRadius: '10px',
            border: '1px solid #ede9fe',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: '700', fontSize: '13px',
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'User'}
                </p>
                <p style={{ margin: 0, fontSize: '10px', color: ACCENT, fontWeight: '600', letterSpacing: '0.5px' }}>
                  {user?.planDetails?.planName?.toUpperCase() || 'FREE PLAN'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div style={{ borderTop: '1px solid #f0f2f8', padding: '10px' }}>
          <button onClick={handleLogout} title="Logout" className="ul-logout-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
              padding: collapsed ? '10px 0' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: '#fff5f5', border: '1px solid #fecaca',
              borderRadius: '10px', color: '#ef4444',
              cursor: 'pointer', fontSize: '13.5px', fontWeight: '500',
              transition: 'all .18s ease',
            }}>
            <IconLogout />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div style={{
        marginLeft: W, flex: 1, display: 'flex', flexDirection: 'column',
        transition: 'margin-left .3s cubic-bezier(.4,0,.2,1)', minHeight: '100vh',
      }}>

        {/* Topbar */}
        <header style={{
          height: '60px', background: '#ffffff',
          borderBottom: '1px solid #e8eaf0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', position: 'sticky', top: 0, zIndex: 99,
          boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setCollapsed(c => !c)} className="ul-icon-btn"
              style={{
                background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer',
                padding: '7px', borderRadius: '8px', color: '#64748b',
                display: 'flex', alignItems: 'center', transition: 'all .18s ease',
              }}>
              <IconMenu />
            </button>
            <span style={{ fontWeight: '600', fontSize: '15px', color: '#1e293b' }}>
              {currentLabel}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Support */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowSupport(s => !s); setShowProfile(false); }}
                className="ul-icon-btn"
                style={{
                  background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50%',
                  width: '36px', height: '36px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#64748b', transition: 'all .18s ease',
                }} title="Support">
                <IconHeadphone />
              </button>
              {showSupport && (
                <div className="ul-dropdown" style={{
                  position: 'absolute', right: 0, top: '48px',
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: '14px', padding: '16px', minWidth: '240px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 200,
                }}>
                  <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>Support</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: ACCENT, display: 'flex' }}><IconPhone /></span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>+91 9137273947</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: ACCENT, display: 'flex' }}><IconMail /></span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>support@csqna.com</span>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: '#f1f5f9', margin: '12px 0' }} />
                  <a href="https://forms.gle/meNSC4ZkWWPPK6hC6" target="_blank" rel="noopener noreferrer"
                    className="ul-dd-item"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '12px', color: ACCENT, fontWeight: '500', textDecoration: 'none',
                      padding: '7px 8px', borderRadius: '8px', transition: 'all .18s ease',
                    }}>
                    <IconLink /> Contribute to CSQNA
                  </a>
                </div>
              )}
            </div>

            {/* Profile */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowProfile(s => !s); setShowSupport(false); }}
                className="ul-profile-btn"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
                  border: 'none', borderRadius: '50%',
                  width: '36px', height: '36px', cursor: 'pointer',
                  color: '#fff', fontWeight: '700', fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .18s ease',
                  boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
                }} title="Profile">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </button>
              {showProfile && (
                <div className="ul-dropdown" style={{
                  position: 'absolute', right: 0, top: '48px',
                  background: '#fff', border: '1px solid #e2e8f0',
                  borderRadius: '14px', padding: '16px', minWidth: '240px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 200,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: '700', fontSize: '15px', flexShrink: 0,
                    }}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{user?.name}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />
                  <Link to="/panel/settings" onClick={() => setShowProfile(false)} className="ul-dd-item"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 8px', fontSize: '13px', color: '#475569', textDecoration: 'none', borderRadius: '8px', transition: 'all .18s ease' }}>
                    <IconSettings /> Settings
                  </Link>
                  <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />
                  <button onClick={handleLogout} className="ul-dd-item"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', padding: '9px 8px', fontSize: '13px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', borderRadius: '8px', transition: 'all .18s ease' }}>
                    <IconLogout /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '28px 28px', overflowY: 'auto', background: '#f5f6fa' }}>
          <Outlet />
        </main>
      </div>

      {(showProfile || showSupport) && (
        <div onClick={() => { setShowProfile(false); setShowSupport(false); }}
          style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
      )}
    </div>
  );
};

export default UserLayout;
