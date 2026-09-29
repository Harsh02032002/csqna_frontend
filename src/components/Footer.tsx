import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-slate-200/60 bg-[#F8FAFC] text-foreground font-sans">
      {/* 24/7 Support Banner */}
      <div className="bg-gradient-to-r from-purple-50/70 via-slate-50 to-blue-50/70 border-b border-slate-200/50 py-10 px-5">
        <div className="mx-auto max-w-[1370px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">Always Here To Help</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">24/7 Human-Led Tech Support</h3>
            <p className="text-sm text-muted-foreground mt-1">Have questions or need guidance on certification practice? Our experts are online.</p>
          </div>
          <a href="mailto:support@csqna.com">
            <Button variant="hero" size="hero" className="shrink-0">
              Connect with an Expert <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1370px] px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="relative grid h-9 w-7 place-items-center text-brand-blue">
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

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Assess your cybersecurity skills using the Cyber Security Question &amp; Answer platform. Build, test, and certify.
            </p>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Our Services</h4>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">Skill Gap Analysis</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Career Growth Training</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Certification Practice Tests</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li>
                <a href="https://blog.csqna.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  Blogs <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://opportunities.csqna.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  Jobs <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Legal &amp; Compliance</h4>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/user-consent-agreement" className="hover:text-primary transition-colors">User Consent Statement</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="border-t border-slate-200 bg-white py-5 px-5">
        <div className="mx-auto max-w-[1370px] text-center space-y-2">
          <p className="text-[10px] text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> CSQNA is an independent educational provider of practice tests and study materials. CISA, CISSP, CIPP, CEH, and other certification names/registered trademarks are properties of their respective owners (such as ISACA, ISC², IAPP, EC-Council). CSQNA is not affiliated with, authorized, sponsored, or endorsed by any of these certification owners.
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            Copyright © 2026-2030. All Rights Reserved By <Link to="/" className="text-brand-purple font-bold">CSQNA</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
