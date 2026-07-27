import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../utils/useCMS';

export const Footer: React.FC = () => {
  const { t } = useCMS();
  return (
    <section className="rt-site-footer deafult-footer has-callto-action">
      <div className="container-fluid rt-mb-0 rt-p-0">
        <div className="row rt-mb-0 rt-p-0">
          <div className="col-12 rt-mb-0 rt-p-0">
            <div className="footer-calltoaction buyDomain rt-p-50 rt-p-md-40 rt-p-xs-30 d-flex flex-lg-row flex-column align-items-center rtbgprefix-cover text-white justify-content-start"
                 style={{ backgroundImage: "url(/marketing-assets/images/banner/buyDomainCTA.png)" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cta-content">
                      <h4 className="wow fade-in-top f-size-40 f-size-lg-40 f-size-md-32 f-size-xs-24 rt-strong rt-mb-15 text-white"
                          data-wow-duration="1s" data-wow-delay="0.2s">
                        24/7 Human-Led Tech Support
                      </h4>
                      <a href="mailto:support@csqna.com"
                         className="rt-pt-10 rt-btn rt-sm2 rt-gradient text-uppercase rt-Bshadow-2 wow fade-in-left pill"
                         data-wow-duration="1s" data-wow-delay="0.6s">
                        Connect with an Expert
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="rt-single-widget wow fade-in-bottom">
                <a href="https://csqna.com" className="d-block rt-mb-25">
                  <img src="/marketing-assets/images/logo/FamousDotsLogo.png" alt="CSQNA" draggable="false" className="rt-footer-logo" />
                </a>
                <p className="f-size-18 rt-light2 f-size-lg-18">{t('footer_tagline', 'Test , Learn , Certify')}</p>
                <ul className="rt-list rt-mt-15">
                  <li className="d-inline-block">
                    <a href="https://www.youtube.com/@opensecurityalliance" target="_blank" rel="noopener noreferrer" className="rt-hw-40 text-center icon-white-secondary d-block rt-circle rt-mr-4">
                      <i className="fab fa-youtube" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="d-inline-block">
                    <a href="https://www.linkedin.com/in/dineshbareja" target="_blank" rel="noopener noreferrer" className="rt-hw-40 text-center icon-white-secondary d-block rt-circle rt-mr-4">
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="d-inline-block">
                    <a href="https://x.com/bizsprite" target="_blank" rel="noopener noreferrer" className="rt-hw-40 text-center icon-white-secondary d-block rt-circle rt-mr-4">
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="d-inline-block">
                    <a href="https://www.facebook.com/groups/1086339578554034" target="_blank" rel="noopener noreferrer" className="rt-hw-40 text-center icon-white-secondary d-block rt-circle rt-mr-4">
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="rt-single-widget wow fade-in-bottom" data-wow-duration="1s" data-wow-delay="0.1s">
                <h3 className="rt-footer-title">Our Services</h3>
                <ul className="rt-usefulllinks2">
                  <li><Link to="/services"> <i className="icofont-thin-double-right"></i>Skill Gap Analysis</Link></li>
                  <li><Link to="/services"><i className="icofont-thin-double-right"></i>Career Growth Training</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="rt-single-widget wow fade-in-bottom" data-wow-duration="1.3s" data-wow-delay="0.3s">
                <h3 className="rt-footer-title">Quick Links</h3>
                <ul className="rt-usefulllinks2">
                  <li><Link to="/about"> <i className="icofont-thin-double-right"></i>About Us</Link></li>
                  <li><a href="https://blog.csqna.com" target="_blank" rel="noopener noreferrer"><i className="icofont-thin-double-right"></i>Blogs</a></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="rt-single-widget wow fade-in-bottom" data-wow-duration="1.6s" data-wow-delay="0.6s">
                <h3 className="rt-footer-title">Legal</h3>
                <ul className="rt-usefulllinks2">
                  <li><Link to="/privacy-policy"> <i className="icofont-thin-double-right"></i>Privacy Policy</Link></li>
                  <li><Link to="/terms-and-conditions"><i className="icofont-thin-double-right"></i>Terms Of Service</Link></li>
                  <li><Link to="/user-consent-agreement"><i className="icofont-thin-double-right"></i>User Consent Statement</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="rt-single-icon-box rt-rounded-10 border-style-1 align-items-center rt-pt-15 rt-pb-15 rt-mt-50 rt-pl-20 rt-pr-20 rt-mb-50">
                <div className="icon-thumb">
                  <img src="/marketing-assets/images/all-img/email_contact_us_FamousDots.png" alt="box-icon" draggable="false" />
                </div>
                <div className="iconbox-content">
                  <h5 className="f-size-24 rt-normal rt-mb-10">Email For Assistance</h5>
                  <p className="f-size-18 line-height-34 rt-light3 rt-mb-0">
                    <a href="mailto:sales@csqna.com">sales@csqna.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="rt-single-icon-box rt-rounded-10 border-style-1 align-items-center rt-pt-15 rt-pb-15 rt-mt-50 rt-pl-20 rt-pr-20 rt-mb-50">
                <div className="icon-thumb">
                  <img src="/marketing-assets/images/all-img/Contact_FamousDots.png" alt="box-icon" draggable="false" />
                </div>
                <div className="iconbox-content">
                  <h5 className="f-size-24 rt-normal rt-mb-10">Contact For Queries</h5>
                  <p className="f-size-18 line-height-34 rt-light3 rt-mb-0">
                    <a href={`mailto:${t('footer_email', 'support@csqna.com')}`}>{t('footer_email', 'support@csqna.com')}</a>
                    &nbsp;&bull;&nbsp;
                    <a href={`tel:${t('footer_phone', '+91 91372 73947').replace(/\s+/g, '')}`}>{t('footer_phone', '+91 91372 73947')}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center copy-right-text">
              <div className="disclaimer-box text-center rt-mb-20" style={{ fontSize: '13px', opacity: 0.8, color: '#94A3B8', maxWidth: '800px', margin: '0 auto 15px auto', lineHeight: '1.6' }}>
                <strong>Disclaimer:</strong> CSQNA is an independent educational provider of practice tests and study materials. CISA, CISSP, CIPP, CEH, and other certification names/registered trademarks are properties of their respective owners (such as ISACA, ISC², IAPP, EC-Council). CSQNA is not affiliated with, authorized, sponsored, or endorsed by any of these certification owners.
              </div>
              {t('footer_copyright', 'Copyright © 2026-2030. All Rights Reserved By')} <a href="https://csqna.com" className="primary-color">CSQNA</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
