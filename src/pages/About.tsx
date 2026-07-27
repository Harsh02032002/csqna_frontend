import React, { useEffect } from 'react';
import { useCMS } from '../utils/useCMS';

export const About: React.FC = () => {
  const { t } = useCMS();
  useEffect(() => {
    const win = window as any;
    if (win.WOW) {
      new win.WOW().init();
    }
  }, []);

  return (
    <div>
      {/* Breadcrumb Area */}
      <div className="rt-breadcump breaducump-style-2" style={{ position: 'relative', height: '434px', overflow: 'hidden' }}>
        <img
          src={t('about_banner_image', '/marketing-assets/images/banner/About-us-banner.png')}
          alt="About Us Banner"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
        />
        <div style={{ position: 'relative', zIndex: 2 }} className="container">
          <div className="row align-items-left" style={{ paddingTop: '170px' }}>
            <div className="col-lg-8">
              <h1 className="f-size-60 f-size-lg-50 f-size-md-40 f-size-xs-24 rt-strong">{t('about_hero_heading', 'About Us')}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="rt-spacer-150 rt-spae-xs-50"></div>
      <section className="page-content-area bg-elements-parent">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-justified" data-wow-duration="1s">
              <div className="rt-mb-40 rt-light3 f-size-18 line-height-34">

                <h2 className="rt-pb-10" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  {t('about_hero_sub', 'Empowering You to Navigate the Complex World of Cybersecurity')}
                </h2>
                <p>
                  {t('about_mission', "At CSQNA, we believe that knowledge is the most powerful defense in an increasingly complex and dangerous digital world. Our platform is designed to provide a comprehensive and dynamic learning experience for cybersecurity enthusiasts, students, and professionals alike. Whether you're just starting your cybersecurity journey or looking to sharpen your expertise, CSQNA offers the tools you need to test your skills and stay ahead of emerging threats.")}
                </p>

                <br />
                <h2 className="rt-pb-10" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {t('about_who_heading', 'Who We Are')}
                </h2>
                <p>
                  {t('about_who_desc', 'CSQNA was founded by cybersecurity professionals with decades of experience in protecting digital assets, conducting security audits, and responding to cyber incidents. Our mission is to bridge the gap between theoretical knowledge and real-world application, empowering learners across the globe.')}
                </p>

                <br />
                <h2 className="rt-pb-10" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {t('about_offer_heading', 'What We Offer')}
                </h2>
                <p>
                  {t('about_offer_desc', 'Our platform focuses on providing practice tests and self-assessment tools covering a broad range of cybersecurity topics, including:')}
                </p>
                <ul>
                  <li>Network Security</li>
                  <li>Cloud Security</li>
                  <li>Incident Response</li>
                  <li>Vulnerability Assessment &amp; Penetration Testing (VAPT)</li>
                  <li>Security Compliance (ISO, NIST)</li>
                  <li>Risk Management</li>
                  <li>Cryptography, and more.</li>
                </ul>

                <br />
                <h2 className="rt-pb-10" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {t('about_why_heading', 'Why Choose CSQNA?')}
                </h2>
                <ul>
                  <li><strong>Comprehensive Coverage:</strong> From foundational concepts to advanced attack vectors, our tests cover a wide range of cybersecurity topics.</li>
                  <li><strong>Real-World Focus:</strong> Our content is based on real-world scenarios, preparing you for practical challenges, not just theoretical knowledge.</li>
                  <li><strong>Continuous Learning:</strong> Our question bank is regularly updated, ensuring you practice with the most current content.</li>
                  <li><strong>User-Centric Design:</strong> CSQNA offers an intuitive and flexible learning experience, personalized to your goals.</li>
                </ul>

                <br />
                <h2 className="rt-pb-10" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Our Vision
                </h2>
                <p>
                  {t('about_vision', 'We envision a world where every cybersecurity professional is equipped with the knowledge and resilience to tackle evolving threats. By fostering a community of continuous learners, we aim to build a stronger, more secure digital environment.')}
                </p>

                <br />
                <h2 className="rt-pb-10" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Get Involved
                </h2>
                <p className="f-size-18 line-height-34 rt-light3 rt-mb-0">
                  {t('about_get_involved', "At CSQNA, we value our users' feedback. Whether you're a student, a seasoned professional, or an organization, we're here to support your learning journey. If you'd like to contribute or share feedback, feel free to contact us at")}
                  {' '}<a href="mailto:info@csqna.com">info@csqna.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <div className="rt-spacer-100 rt-spae-xs-50"></div>
      <section className="lightpinkbg">
        <div className="container">
          <div className="row lineLeft">
            <div className="col-md-12 mb-5">
              <h2 className="text-white">{t('about_highlights_title', 'CSQNA - Test , Learn , Certify')}</h2>
            </div>
            <div className="col-md-12">
              <ul>
                <li>Track your progress over time with visual analytics.</li>
                <li>Set and achieve career milestones with structured guidance.</li>
                <li>Access personalized certification and career recommendations.</li>
                <li>Enhance your resume with certifications and skill highlights.</li>
                <li>Gain clarity on your current skill level.</li>
                <li>Identify and prioritize areas of improvement.</li>
                <li>Access actionable insights to improve test scores and certification readiness.</li>
                <li>Save time by focusing on the right topics.</li>
              </ul>
              <div className="aboutBtns mt-3">
                <a href="mailto:sales@csqna.com" className="rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2">
                  {t('about_cta_email', 'Connect With Us Now')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="rt-spacer-50"></div>
    </div>
  );
};

export default About;
