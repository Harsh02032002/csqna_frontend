import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isProd = window.location.hostname.includes('csqna.com') && !window.location.hostname.includes('localhost');

  const certs = [
    { name: 'CISA', path: '/cisa', sub: 'cisa' },
    { name: 'CEH', path: '/ceh', sub: 'ceh' },
    { name: 'CIPP', path: '/cipp', sub: 'cipp' },
    { name: 'DPDP', path: '/dpdp', sub: 'dpdp' },
    { name: 'ISO 27001', path: '/iso', sub: 'iso' },
    { name: 'AAIA', path: '/aaia', sub: 'aaia' },
  ];

  return (
    <header className="rt-site-header rt-fixed-top dark-menu" style={{ background: 'var(--footer-bg) !important', boxShadow: '0 2px 3px 0 rgba(0, 0, 0, .1) !important' }}>
      <div className="main-header rt-sticky" style={{ background: 'var(--footer-bg) !important', padding: '4px 0 !important' }}>
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="brand-logo">
              <img src="/marketing-assets/images/logo/FamousDotsLogo.png" alt="CSQNA" style={{ maxWidth: '150px' }} />
            </Link>
            <Link to="/" className="sticky-logo">
              <img src="/marketing-assets/images/logo/Favicon.png" style={{ maxWidth: '40px' }} alt="CSQNA" />
            </Link>

            <div className="ml-auto d-flex align-items-center">
              <div className="main-menu">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li className="menu-item-has-children">
                    <a href="#" onClick={(e) => e.preventDefault()}>Certifications</a>
                    <ul className="sub-menu">
                      {certs.map((cert) => (
                        <li key={cert.sub}>
                          {isProd ? (
                            <a href={`https://${cert.sub}.csqna.com/`}>{cert.name}</a>
                          ) : (
                            <Link to={cert.path}>{cert.name}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li><Link to="/pricing">Pricing</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><a href="https://opportunities.csqna.com/" target="_blank" rel="noopener noreferrer">Jobs</a></li>
                  <li><a href="https://blog.csqna.com" target="_blank" rel="noopener noreferrer">Blogs</a></li>
                </ul>
              </div>

              <div className="rt-nav-tolls d-flex align-items-center">
                {user ? (
                  <div className="d-flex align-items-center gap-3">
                    <Link to={user.role === 'admin' ? '/admin/dashboard' : '/panel/dashboard'}
                          className="rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2 mr-2">
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); }}
                            className="rt-btn pill text-uppercase rt-sm2 bg-secondary text-white"
                            style={{ border: 'none', cursor: 'pointer' }}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2 d-none d-md-block">
                    Get Started
                  </Link>
                )}

                <div className="mobile-menu">
                  <div className="menu-click">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
