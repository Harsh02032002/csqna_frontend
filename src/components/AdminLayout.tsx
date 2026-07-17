import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const IconDashboard = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconUsers = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconUpload = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconQuestions = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconCMS = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
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

const ACCENT = '#7c3aed';
const ACCENT_LIGHT = '#ede9fe';

const navLinks = [
  { to: '/admin/dashboard', label: 'Dashboard',        icon: <IconDashboard /> },
  { to: '/admin/users',     label: 'Clients',          icon: <IconUsers />    },
  { to: '/admin/questions', label: 'Questions',        icon: <IconQuestions />},
  { to: '/admin/upload',    label: 'Upload Excel',     icon: <IconUpload />   },
  { to: '/admin/content',   label: 'Content Manager',  icon: <IconCMS />      },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [collapsed,   setCollapsed]   = useState(false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); logout(); navigate('/');
  };

  const W = collapsed ? '68px' : '248px';
  const currentLabel = navLinks.find(l => l.to === location.pathname)?.label || 'Admin';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes alFadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .al-nav-link { transition: all .18s ease !important; }
        .al-nav-link:hover { background: ${ACCENT_LIGHT} !important; color: ${ACCENT} !important; }
        .al-logout-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; border-color: #fca5a5 !important; }
        .al-icon-btn:hover { background: #f1f5f9 !important; color: #334155 !important; }
        .al-dropdown { animation: alFadeIn .16s ease; }
        .al-dd-item:hover { background: #f8fafc !important; }
        .al-profile-btn:hover { box-shadow: 0 4px 16px rgba(124,58,237,0.35) !important; transform: scale(1.04) !important; }
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
              <div>
                <img src="/marketing-assets/images/logo/FamousDotsLogo.png" alt="CSQNA"
                  style={{ height: '22px', objectFit: 'contain', display: 'block' }} />
                <span style={{ fontSize: '9px', color: ACCENT, fontWeight: '700', letterSpacing: '2px' }}>ADMIN</span>
              </div>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} title={link.label} className="al-nav-link"
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
                  margin: '2px 0', position: 'relative',
                }}>
                {active && (
                  <div style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: '3px', height: '60%', borderRadius: '0 3px 3px 0', background: ACCENT,
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
            background: '#faf9ff', borderRadius: '10px', border: '1px solid #ede9fe',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: '700', fontSize: '13px',
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'Admin'}
                </p>
                <p style={{ margin: 0, fontSize: '10px', color: ACCENT, fontWeight: '700', letterSpacing: '0.5px' }}>
                  ADMINISTRATOR
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div style={{ borderTop: '1px solid #f0f2f8', padding: '10px' }}>
          <button onClick={handleLogout} title="Logout" className="al-logout-btn"
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
            <button onClick={() => setCollapsed(c => !c)} className="al-icon-btn"
              style={{
                background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer',
                padding: '7px', borderRadius: '8px', color: '#64748b',
                display: 'flex', alignItems: 'center', transition: 'all .18s ease',
              }}>
              <IconMenu />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '600', fontSize: '15px', color: '#1e293b' }}>{currentLabel}</span>
              <span style={{
                fontSize: '9px', fontWeight: '700', color: ACCENT,
                background: ACCENT_LIGHT, padding: '2px 8px',
                borderRadius: '20px', letterSpacing: '1.5px', border: `1px solid #ddd6fe`,
              }}>ADMIN</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowProfile(s => !s)} className="al-profile-btn"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
                border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', cursor: 'pointer',
                color: '#fff', fontWeight: '700', fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .18s ease',
                boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
              }} title="Profile">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </button>
            {showProfile && (
              <div className="al-dropdown" style={{
                position: 'absolute', right: 0, top: '48px',
                background: '#fff', border: '1px solid #e2e8f0',
                borderRadius: '14px', padding: '16px', minWidth: '220px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)', zIndex: 200,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${ACCENT}, #a78bfa)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: '700', fontSize: '15px', flexShrink: 0,
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{user?.name}</p>
                    <p style={{ margin: 0, fontSize: '10px', color: ACCENT, fontWeight: '700' }}>ADMINISTRATOR</p>
                  </div>
                </div>
                <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />
                <button onClick={handleLogout} className="al-dd-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    textAlign: 'left', padding: '9px 8px', fontSize: '13px', color: '#ef4444',
                    background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500',
                    borderRadius: '8px', transition: 'all .18s ease',
                  }}>
                  <IconLogout /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: '28px 28px', overflowY: 'auto', background: '#f5f6fa' }}>
          <Outlet />
        </main>
      </div>

      {showProfile && (
        <div onClick={() => setShowProfile(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
      )}
    </div>
  );
};

export default AdminLayout;
