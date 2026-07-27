import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../utils/useCMS';

export const Services: React.FC = () => {
  const { t } = useCMS();
  useEffect(() => {
    const win = window as any;
    if (win.WOW) {
      new win.WOW().init();
    }
  }, []);

  return (
    <div>
      {/* Services Banner Area */}
      <section className="rt-banner-area default-slider">
        <div className="rt-slider-active owl-carousel d-block">
          <div className="single-rt-banner rtbgprefix-full"
               style={{ backgroundImage: `url('${t('services_banner_image', '/marketing-assets/images/banner/FamousDots-Buy Domains-Banner.png')}')` }}>
            <div className="rt-inner-overlay move-1"
                 style={{ backgroundImage: "url(/marketing-assets/images/banner/slider-overlay.png)" }}>
            </div>
            <div className="container">
              <div className="row rt-banner-height align-items-center">
                <div className="col-lg-7">
                  <div className="rt-banner-content text-dark">
                    <h1>
                      <span className="f-size-40 f-size-xs-24 rt-strong rt-mb-13 d-block" data-duration="1s"
                            data-dealy="0.3s" data-animation="wow fadeInDown">
                        {t('services_hero_heading', 'We Boost Your Cybersecurity Skills.')}
                      </span>
                      <span className="d-block f-size-24 f-size-xs-18 rt-light1 rt-mb-10" data-duration="1s"
                            data-dealy="0.3s" data-animation="wow fadeInUp">
                        {t('services_hero_sub', 'Get to know your knowledge level and skill preparedness, identify the areas you need to focus on for skill building.\nUse the tests to practice for your upcoming exams, interviews, and presentations.')}
                      </span>
                    </h1>
                    <Link to="/login" className="mt-4 rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2">
                      Get Started
                    </Link>
                  </div>
                </div>
                <div className="col-lg-5 d-lg-block d-none">
                  <div className="banner-add-img">
                    <img src="/marketing-assets/images/banner/buy-domain-vector.png" alt="vector"
                         draggable="false" className="front-img" data-duration="2s" data-dealy="1s"
                         data-animation="fade-in-bottom" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Content: Skill Gap Analysis */}
      <div className="rt-spacer-60"></div>
      <section className="page-content-area buySteps">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-10 mx-auto text-center wow fade-in-bottom" data-wow-duration="1s">
              <h2 className="rt-section-title">{t('services_skills_title', 'Skill Gap Analysis')}</h2>
            </div>
          </div>
          <div className="rt-spacer-60"></div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mx-auto rt-mb-30">
              <div className="rt-single-icon-box wow fade-in-bottom icon-center shdoaw-style2 rt-pt-35 rt-pb-35">
                <span className="circleSteps">01</span>
                <span className="arrowImg">
                  <img src="/marketing-assets/images/all-img/dot-arrow.png" alt="box-icon" draggable="false" />
                </span>
                <div className="iconbox-content">
                  <h5 className="f-size-28 rt-pt-25 f-size-lg-28 rt-normal rt-mb-25 text-center">
                    {t('services_practice_title', 'Detailed Performance Insights')}
                  </h5>
                  <ul className="stepsContent">
                    {t('services_practice_desc', 'Identify strengths and weaknesses. / Understand current skill levels.').split(' / ').map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mx-auto rt-mb-30">
              <div className="rt-single-icon-box wow fade-in-bottom icon-center shdoaw-style2 rt-pt-35 rt-pb-35">
                <span className="circleSteps">02</span>
                <span className="arrowImg">
                  <img src="/marketing-assets/images/all-img/dot-arrow.png" alt="box-icon" draggable="false" />
                </span>
                <div className="iconbox-content">
                  <h5 className="f-size-28 rt-pt-25 f-size-lg-28 rt-normal rt-mb-25 text-center">
                    {t('services_cert_title', 'Customized Study Recommendations')}
                  </h5>
                  <ul className="stepsContent">
                    {t('services_cert_desc', 'Focus on improvement areas. / Tailored guidance for certifications.').split(' / ').map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mx-auto rt-mb-30">
              <div className="rt-single-icon-box wow fade-in-bottom icon-center shdoaw-style2 rt-pt-35 rt-pb-35">
                <span className="circleSteps">03</span>
                <span className="arrowImg">
                  <img src="/marketing-assets/images/all-img/dot-arrow.png" alt="box-icon" draggable="false" />
                </span>
                <div className="iconbox-content">
                  <h5 className="f-size-28 rt-pt-25 f-size-lg-28 rt-normal rt-mb-25 text-center">
                    {t('services_track_title', 'Reporting and Progress Tracking')}
                  </h5>
                  <ul className="stepsContent">
                    {t('services_track_desc', 'Track growth over time. / Receive instant feedback after tests.').split(' / ').map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Growth Training */}
      <div className="rt-spacer-80 rt-spacer-xs-50"></div>
      <section className="services-area rtbgprefix-contain whyChoose">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-9 mx-auto text-center wow fade-in-bottom rt-mb-50" data-wow-duration="1s">
              <h2 className="rt-section-title">{t('services_career_title', 'Career Growth Training')}</h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-md-4 mx-auto rt-mb-30">
                  <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20">
                    <div className="icon-thumb thumb_1">
                      <img src="/marketing-assets/images/all-img/whyChoose1.png" alt="icon" draggable="false" />
                    </div>
                    <div className="iconbox-content">
                      <h5 className="rt-mb-0">Personalized Career Training Plans</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mx-auto rt-mb-30">
                  <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20">
                    <div className="icon-thumb thumb_1">
                      <img src="/marketing-assets/images/all-img/whyChoose2.png" alt="icon" draggable="false" />
                    </div>
                    <div className="iconbox-content">
                      <h5 className="rt-mb-0">Ensures Industry-Relevant Cybersecurity Skills</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mx-auto rt-mb-30">
                  <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20">
                    <div className="icon-thumb thumb_1">
                      <img src="/marketing-assets/images/all-img/whyChoose3.png" alt="icon" draggable="false" />
                    </div>
                    <div className="iconbox-content">
                      <h5 className="rt-mb-0">Expert-Led Mentorship and Guidance</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-md-4 mx-auto rt-mb-30">
                  <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20">
                    <div className="icon-thumb thumb_1">
                      <img src="/marketing-assets/images/all-img/whyChoose4.png" alt="icon" draggable="false" />
                    </div>
                    <div className="iconbox-content">
                      <h5 className="rt-mb-0">Certification Exam Preparation Support</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mx-auto rt-mb-30">
                  <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20">
                    <div className="icon-thumb thumb_1">
                      <img src="/marketing-assets/images/all-img/whyChoose5.png" alt="icon" draggable="false" />
                    </div>
                    <div className="iconbox-content">
                      <h5 className="rt-mb-0">Easy-to-use tools and hassle-free Test Creation</h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mx-auto rt-mb-30">
                  <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20">
                    <div className="icon-thumb thumb_1">
                      <img src="/marketing-assets/images/all-img/whyChoose6.png" alt="icon" draggable="false" />
                    </div>
                    <div className="iconbox-content">
                      <h5 className="rt-mb-0">Practical Hands-On Experience</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="rt-spacer-80"></div>
    </div>
  );
};

export default Services;
