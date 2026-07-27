import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../utils/useCMS';

export const Pricing: React.FC = () => {
  const { t } = useCMS();

  return (
    <div className="page-content rtbgprefix-full rt-pt-130 rt-pb-130 rt-pt-lg-0 rt-pb-lg-0 bg-elements-parent" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>{t('pricing_hero_heading', 'Pricing Plans')}</h1>
          <p style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>{t('pricing_hero_sub', 'Choose the plan that fits your learning requirements.')}</p>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-12">
            <br />
            <div className="container-fluid">
              <div className="row justify-content-center no-gutters">
                <table style={{ width: '100%', textAlign: 'left', borderSpacing: 0, borderCollapse: 'collapse' }}>
                  <colgroup>
                    <col style={{ width: '31%' }} />
                    <col style={{ width: '22%', border: '1px solid #ccc' }} />
                    <col style={{ width: '25%', border: '10px solid #59c7fb' }} />
                    <col style={{ width: '22%', border: '1px solid #ccc' }} />
                  </colgroup>

                  <thead>
                    <tr>
                      <th style={{ background: 'transparent' }}>&nbsp;</th>
                      <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: '3em 0 2em', fontWeight: 400, color: '#999' }}>
                        <h2 style={{ fontWeight: 300, fontSize: '2.4em', lineHeight: 1.2, color: '#59c7fb' }}>{t('pricing_plan2_title', 'Premium')}</h2>
                        <p>
                          {t('pricing_plan2_desc', 'INR 750/-\n\nBilled as one payment\nfor 6 months.').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < 3 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </th>
                      <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: '2em 0 5em', fontWeight: 400, color: '#999', position: 'relative' }}>
                        <h2 style={{ fontWeight: 300, fontSize: '3.6em', lineHeight: 1.2, color: '#59c7fb' }}>{t('pricing_plan1_title', 'Plus')}</h2>
                        <p>{t('pricing_plan1_desc', 'INR 550/-')}</p><br /><br />
                        <p className="promo" style={{
                          fontSize: '1em',
                          color: '#fff',
                          position: 'absolute',
                          top: '9em',
                          left: '-17px',
                          zIndex: 1000,
                          width: '100%',
                          margin: 0,
                          padding: '.625em 17px .75em',
                          background: 'linear-gradient(95deg, #f30070 0%, #ff7841 100%)',
                          boxShadow: '0 4px 10px rgba(243,0,112,.3)',
                          borderBottom: 'none'
                        }}>
                          {t('pricing_footer_note', 'Our most valuable package!\nBilled as one payment for 3 months.').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      </th>
                      <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: '3em 0 2em', fontWeight: 400, color: '#999' }}>
                        <h2 style={{ fontWeight: 300, fontSize: '2.4em', lineHeight: 1.2, color: '#59c7fb' }}>{t('pricing_free_title', 'Basic')}</h2>
                        <p>{t('pricing_free_desc', 'Free Forever')}</p>
                      </th>
                    </tr>
                  </thead>

                  <tfoot>
                    <tr>
                      <th style={{ padding: '2em 1em', borderTop: '1px solid #ccc' }}>&nbsp;</th>
                      <td style={{ textAlign: 'center', padding: '2em 1em', borderTop: '1px solid #ccc' }}>
                        <Link to="/register" style={{ fontWeight: 'bold', color: '#fff', textDecoration: 'none', textTransform: 'uppercase', display: 'block', padding: '1.125em 2em', backgroundColor: '#59c7fb', borderRadius: '.5em' }}>Register Now</Link>
                      </td>
                      <td style={{ textAlign: 'center', padding: '2em 1em', borderTop: '1px solid #ccc' }}>
                        <Link to="/register" style={{ fontWeight: 'bold', color: '#fff', textDecoration: 'none', textTransform: 'uppercase', display: 'block', padding: '1.125em 2em', backgroundColor: '#59c7fb', borderRadius: '.5em' }}>Register Now</Link>
                      </td>
                      <td style={{ textAlign: 'center', padding: '2em 1em', borderTop: '1px solid #ccc' }}>
                        <Link to="/register" style={{ fontWeight: 'bold', color: '#fff', textDecoration: 'none', textTransform: 'uppercase', display: 'block', padding: '1.125em 2em', backgroundColor: '#59c7fb', borderRadius: '.5em' }}>Start For Free</Link>
                      </td>
                    </tr>
                  </tfoot>

                  <tbody>
                    <tr>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                        {t('pricing_row1_title', 'Unlimited Practice Tests')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row1_desc', 'Practice as many timed tests as you want. Test Your Skills in 23 CyberSec Categories.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                    </tr>
                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                        {t('pricing_row2_title', 'Detailed Analytical Reports')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row2_desc', 'Per-test performance breakdown: domain-wise strengths & weaknesses.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                    </tr>
                    <tr>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                        {t('pricing_row3_title', 'Restart Ongoing Assessments')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row3_desc', 'Pause & resume tests from where you left off within 24-48hrs.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                    </tr>
                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                        {t('pricing_row4_title', 'Saved Reports')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row4_desc', 'Keeps your scoring history for reference.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee', padding: '1.5em' }}>
                        6 months. After that all old reports are archived and shared on request.
                      </td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee', padding: '1.5em' }}>
                        3 months. After that all old reports are archived and shared on request.
                      </td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee', padding: '1.5em' }}>
                        1 month. After that all old reports are archived and shared on request.
                      </td>
                    </tr>
                    <tr>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                        {t('pricing_row5_title', 'Certification Simulators')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row5_desc', 'Mock exams that mimic real certification conditions.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>&mdash;</td>
                    </tr>
                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #eee' }}>
                        {t('pricing_row6_title', 'Schedule Your Certification Test')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row6_desc', 'Book simulated proctored sessions.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>✓</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #eee' }}>&mdash;</td>
                    </tr>
                    <tr>
                      <th style={{ padding: '1.5em', borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        {t('pricing_row7_title', 'Priority Support & Mentoring')}
                        <span style={{ fontWeight: 'normal', fontSize: '87.5%', color: '#999', display: 'block', marginTop: '4px' }}>
                          {t('pricing_row7_desc', 'Faster help and optional mentor guidance.')}
                        </span>
                      </th>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>✓ (1-to-1 mentoring is Paid)</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>✓ (1-to-1 mentoring is Paid)</td>
                      <td style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>✓ (1-to-1 mentoring is Paid)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
