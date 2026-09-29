import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ChevronDown, Menu, Search, ShieldCheck, X, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function BrandLogo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2 group" aria-label="CSQNA home">
      <span className="relative grid h-9 w-7 place-items-center text-brand-blue transition-transform duration-200 group-hover:scale-105">
        <ShieldCheck className="h-8 w-8" strokeWidth={1.8} />
        <span className="absolute text-[7px] font-extrabold text-brand-blue">Q</span>
      </span>
      <span>
        <span className="block text-[28px] font-extrabold leading-[0.85] tracking-normal text-brand-red">CSQNA</span>
        <span className="block pt-1 text-[6px] font-extrabold uppercase leading-none text-foreground">
          Certification practice made simple
        </span>
      </span>
    </Link>
  );
}

const certs = [
  { name: 'CISA', path: '/cisa', sub: 'cisa', desc: 'Certified Information Systems Auditor' },
  { name: 'CEH', path: '/ceh', sub: 'ceh', desc: 'Certified Ethical Hacker' },
  { name: 'CIPP', path: '/cipp', sub: 'cipp', desc: 'Certified Information Privacy Professional' },
  { name: 'DPDP', path: '/dpdp', sub: 'dpdp', desc: 'Data Protection & Privacy Officer' },
  { name: 'ISO 27001', path: '/iso', sub: 'iso', desc: 'Information Security Management System' },
  { name: 'AAIA', path: '/aaia', sub: 'aaia', desc: 'Artificial Intelligence Audit Associate' },
];

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [certDropdown, setCertDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isProd = window.location.hostname.includes('csqna.com') && !window.location.hostname.includes('localhost');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchedCert = certs.find(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
      if (matchedCert) {
        navigate(matchedCert.path);
      } else {
        navigate('/pricing');
      }
    }
    setSearchOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-200/60 bg-[#F8FAFC]/90 shadow-[0_4px_18px_rgba(0,0,0,0.02)] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1370px] items-center justify-between px-5 lg:px-8">
        <BrandLogo />
        
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          <Link
            to="/"
            className={`relative flex items-center px-3.5 py-2 text-[13px] font-semibold transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary font-bold border-b-2 border-brand-purple' : 'text-foreground/85'
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`relative flex items-center px-3.5 py-2 text-[13px] font-semibold transition-colors hover:text-primary ${
              isActive('/services') ? 'text-primary font-bold border-b-2 border-brand-purple' : 'text-foreground/85'
            }`}
          >
            Services
          </Link>

          {/* Certifications Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCertDropdown(true)}
            onMouseLeave={() => setCertDropdown(false)}
          >
            <button className="flex items-center px-3.5 py-2 text-[13px] font-semibold text-foreground/85 transition-colors hover:text-primary cursor-pointer">
              Certifications <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </button>
            {certDropdown && (
              <div className="absolute left-0 top-full pt-2 w-64 z-50">
                <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-card backdrop-blur animate-in fade-in slide-in-from-top-2 duration-150">
                  {certs.map((cert) => (
                    isProd ? (
                      <a
                        key={cert.sub}
                        href={`https://${cert.sub}.csqna.com/`}
                        className="block rounded-lg px-3 py-2 text-xs transition-colors hover:bg-slate-100"
                        onClick={() => setCertDropdown(false)}
                      >
                        <div className="font-bold text-foreground">{cert.name}</div>
                        <div className="text-[10px] text-muted-foreground">{cert.desc}</div>
                      </a>
                    ) : (
                      <Link
                        key={cert.sub}
                        to={cert.path}
                        className="block rounded-lg px-3 py-2 text-xs transition-colors hover:bg-slate-100"
                        onClick={() => setCertDropdown(false)}
                      >
                        <div className="font-bold text-foreground">{cert.name}</div>
                        <div className="text-[10px] text-muted-foreground">{cert.desc}</div>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className={`relative flex items-center px-3.5 py-2 text-[13px] font-semibold transition-colors hover:text-primary ${
              isActive('/pricing') ? 'text-primary font-bold border-b-2 border-brand-purple' : 'text-foreground/85'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={`relative flex items-center px-3.5 py-2 text-[13px] font-semibold transition-colors hover:text-primary ${
              isActive('/about') ? 'text-primary font-bold border-b-2 border-brand-purple' : 'text-foreground/85'
            }`}
          >
            About Us
          </Link>
          <a
            href="https://opportunities.csqna.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center px-3.5 py-2 text-[13px] font-semibold text-foreground/85 transition-colors hover:text-primary"
          >
            Jobs
          </a>
          <a
            href="https://blog.csqna.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center px-3.5 py-2 text-[13px] font-semibold text-foreground/85 transition-colors hover:text-primary"
          >
            Blogs
          </a>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-slate-200 bg-white shadow-xs hover:bg-slate-100"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/panel/dashboard'}>
                <Button variant="hero" className="h-10 px-5 text-xs">
                  <UserIcon className="mr-1.5 h-3.5 w-3.5" /> Dashboard
                </Button>
              </Link>
              <Button
                variant="heroOutline"
                className="h-10 px-4 text-xs"
                onClick={() => { logout(); navigate('/'); }}
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" /> Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="heroOutline" className="h-10 min-w-24 px-5">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="nav" className="h-10 px-6">Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
              </Link>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-float animate-in zoom-in-95 duration-150">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search certifications, practice tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm font-medium focus:outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-1 text-muted-foreground hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {open && (
        <nav className="absolute inset-x-0 top-16 grid border-b border-slate-200 bg-white p-4 shadow-card lg:hidden z-50" aria-label="Mobile navigation">
          <Link to="/" className="border-b border-slate-100 px-3 py-3 text-sm font-semibold" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/services" className="border-b border-slate-100 px-3 py-3 text-sm font-semibold" onClick={() => setOpen(false)}>Services</Link>
          <div className="border-b border-slate-100 py-2">
            <div className="px-3 text-xs font-bold uppercase text-brand-purple">Certifications</div>
            <div className="grid grid-cols-2 gap-1 px-3 pt-1">
              {certs.map((c) => (
                isProd ? (
                  <a key={c.name} href={`https://${c.sub}.csqna.com/`} className="py-1 text-xs font-medium" onClick={() => setOpen(false)}>{c.name}</a>
                ) : (
                  <Link key={c.name} to={c.path} className="py-1 text-xs font-medium" onClick={() => setOpen(false)}>{c.name}</Link>
                )
              ))}
            </div>
          </div>
          <Link to="/pricing" className="border-b border-slate-100 px-3 py-3 text-sm font-semibold" onClick={() => setOpen(false)}>Pricing</Link>
          <Link to="/about" className="border-b border-slate-100 px-3 py-3 text-sm font-semibold" onClick={() => setOpen(false)}>About Us</Link>
          <a href="https://opportunities.csqna.com/" target="_blank" rel="noopener noreferrer" className="border-b border-slate-100 px-3 py-3 text-sm font-semibold">Jobs</a>
          <a href="https://blog.csqna.com" target="_blank" rel="noopener noreferrer" className="border-b border-slate-100 px-3 py-3 text-sm font-semibold">Blogs</a>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/panel/dashboard'} onClick={() => setOpen(false)}>
                  <Button variant="hero" className="w-full">Dashboard</Button>
                </Link>
                <Button variant="heroOutline" className="w-full" onClick={() => { logout(); setOpen(false); navigate('/'); }}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}><Button variant="heroOutline" className="w-full">Login</Button></Link>
                <Link to="/register" onClick={() => setOpen(false)}><Button variant="nav" className="w-full">Get Started</Button></Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
