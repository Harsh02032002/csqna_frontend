import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../utils/useCMS';

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface VideoItem {
  id?: string;
  title: string;
  subtitle?: string;
  src: string;
  type: 'file' | 'youtube';
}

export const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { t, tJson } = useCMS();

  useEffect(() => {
    // Initialize Swiper after render
    const win = window as any;
    if (win.Swiper) {
      new win.Swiper(".myBlogSwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1024: { slidesPerView: 3, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          600: {
            slidesPerView: 1,
            spaceBetween: 15,
            autoplay: false,
            loop: false,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
            autoplay: false,
            loop: false,
          },
        },
      });

      new win.Swiper(".myTestimonialSwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: false,
        grabCursor: true,
        centeredSlides: false,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".myTestimonialSwiper .swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".myTestimonialSwiper .swiper-button-next",
          prevEl: ".myTestimonialSwiper .swiper-button-prev",
        },
        breakpoints: {
          1024: { slidesPerView: 2 },
          768: { slidesPerView: 1 },
          0: { slidesPerView: 1 }
        }
      });
    }

    // Initialize WOW.js if available
    if (win.WOW) {
      new win.WOW().init();
    }
  }, []);

  const defaultFaqs: FAQItem[] = [
    { question: "What services does your platform provide?", answer: "We have a database of over 20,000 questions, offering you a resource to create cybersecurity practice tests which help you to understand your knowledge and skill and your preparedness for certification exams like CISA, CISSP, CISM and CEH." },
    { question: "How does the skill assessment work?", answer: "Users can create practice tests to assess their knowledge. Select from 23 domain areas or select the Certification which you want to prepare for. The results provide detailed insights to help improve their skills." },
    { question: "Can I earn certifications on your platform?", answer: "Yes! We can provide a certificate for the tests you have taken on our platform and your overall score. However, for certifications like CISA, CISSP etc you have to give the exam for that certification." },
    { question: "How long is my data stored on the platform?", answer: "Your data is saved for 7 days by default. Paid users have their data stored for up to 6 months." },
    { question: "Can I access my past test results?", answer: "Yes, if you've paid for data retention, you can view all your past results within the 6-month retention period." },
    { question: "Are the practice tests updated regularly?", answer: "Absolutely! Our tests are frequently updated to align with the latest certification standards and industry trends." },
    { question: "Is there a cost for accessing the platform?", answer: "No! There is no cost for accessing the platform. The cost is applied only if you want us to store your test results for more than a week." },
    { question: "What types of tests are available?", answer: "We offer practice tests in 23 cybersecurity domains. Our certification questions cover CISA, CISSP, CEH, CIPP & many other certifications." },
    { question: "Can I retake the tests?", answer: "Yes! You can retake the tests any number of times. You can repeat a previous test within 48 hours. After 48 hours, the test will expire and you will have to re-create it." },
    { question: "Do you offer career assistance?", answer: "Yes, we have highly experienced cybersecurity experts to help and provide guidance. We also have a Jobs Site you can use. Feel free to connect via email to consult@csqna.com." },
  ];

  const faqs: FAQItem[] = tJson<FAQItem[]>('home_faqs_list', defaultFaqs);

  const defaultVideos: VideoItem[] = [
    { id: '1', title: 'CISA Certification Intro', src: '/assets/videos/CISA_Certification_Intro.mp4', type: 'file' },
    { id: '2', title: 'CISSP Cybersecurity Elite', src: '/assets/videos/CISSP_ Cybersecurity Elite-2.mp4', type: 'file' },
  ];
  const cmsVideos: VideoItem[] = tJson<VideoItem[]>('home_videos_list', defaultVideos);



  const blogs = [
    {
      img: "assets/blogs/preparation1.jpg",
      meta: "Preparation • 11 Sept 2025",
      title: "Why Domain-Specific Practice is the Smart Way to Prepare",
      desc: "Discover why domain-specific practice is the smartest way to prepare for cybersecurity...",
      link: "/blogs/preparation/why-domain-specific-practice-is-the-smart-way-to-prepare"
    },
    {
      img: "assets/blogs/preparation2.jpg",
      meta: "Preparation • 11 Sept 2025",
      title: "From Beginner to Expert: A Year-Long Cybersecurity Learning Plan",
      desc: "Follow a structured 12-month cybersecurity learning plan to grow from beginner to expert. Build foundational...",
      link: "/blogs/preparation/from-beginner-to-expert-a-year-long-cybersecurity-learning-plan"
    },
    {
      img: "assets/blogs/trending1.jpg",
      meta: "Trending • 11 Sep 2025",
      title: "The Rise of AI in Cybersecurity Certification Exams",
      desc: "Learn how AI is transforming cybersecurity certification exams like CISSP, CISA...",
      link: "/blogs/trending/the-rise-of-ai-in-cybersecurity-certification-exams"
    },
    {
      img: "assets/blogs/trending2.jpg",
      meta: "Preparation • 11 Sept 2025",
      title: "Why Cybersecurity Professionals Need to Keep Practicing",
      desc: "Cybersecurity professionals must keep practicing to handle evolving threats, stay confident pass certifications, and grow their careers....",
      link: "/blogs/preparation/why-cybersecurity-professionals-need-to-keep-practicing"
    },
    {
      img: "assets/blogs/cert1.jpg",
      meta: "Preparation • 11 Sept 2025",
      title: "How Many Practice Questions Do You Need for the CISSP Exam?",
      desc: "How many practice questions for the CISSP exam? Aim for 3,000–5,000 to master all CISSP domains build confidence, and pass your...",
      link: "/blogs/preparation/how-many-practice-questions-do-you-need-for-the-cissp-exam"
    },
    {
      img: "assets/blogs/cert2.jpg",
      meta: "Preparation • 10 Sept 2025",
      title: "How to Beat Test Anxiety with Practice Tests and Smart Preparation",
      desc: "Beat test anxiety with practice tests and smart preparation! Learn how spaced repetition...",
      link: "/blogs/preparation/how-to-beat-test-anxiety-with-practice-tests-and-smart-preparation"
    }
  ];

  return (
    <div>
      {/* Banner Area */}
      <section className="rt-banner-area default-slider">
        <div className="rt-slider-active d-block">
          <div className="single-rt-banner rt-banner-height rtbgprefix-full"
               style={{ backgroundImage: "url(/marketing-assets/images/banner/banner_01-alt.png)" }}>
            <div className="rt-inner-overlay move-1"
                 style={{ backgroundImage: "url(/marketing-assets/images/banner/slider-overlay.png)" }}>
            </div>
            <div className="container">
              <div className="row rt-banner-height align-items-center">
                <div className="col-lg-6">
                  <div className="rt-banner-content text-dark">
                    <h1>
                      <span className="d-block f-size-24 f-size-xs-18 rt-light1 rt-mb-10" data-duration="1s"
                            data-dealy="0.3s" data-animation="wow fadeInUp">
                        {t('home_hero_tagline', 'Assess YOUR CYBERSECURITY SKILLS - use the Cyber Security Question & Answer platform.')}
                      </span>
                      <span className="f-size-40 f-size-xs-24 rt-strong rt-mb-13 d-block" data-duration="1s"
                            data-dealy="0.3s" data-animation="wow fadeInDown">
                        {t('home_hero_heading', 'CSQNA')}
                      </span>
                    </h1>
                    <h4 className="f-size-20 f-size-xs-16 rt-light1" data-duration="1.5s" data-dealy="0.6s"
                        data-animation="wow fade-in-left">
                      {t('home_hero_subheading', 'BUILD AND USE PRACTICE TESTS TO ASSESS AND SHARPEN YOUR CYBERSECURITY EDGE\n\nTEST, LEARN, CERTIFY').split('\n\n').map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx === 0 && <><br /><br /></>}
                        </React.Fragment>
                      ))}
                    </h4>
                    <Link to="/login" className="mt-4 rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2">
                      {t('home_hero_cta', 'Get Started')}
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 d-lg-block d-none">
                  <div className="banner-add-img">
                    <img src="/marketing-assets/images/banner/pc2.png" alt="pc" draggable="false"
                         className="front-img" data-duration="2s" data-dealy="1s" data-animation="fade-in-bottom" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Area */}
      <div className="rt-spacer-80 rt-spacer-xs-50"></div>
      <section className="feature-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-8 mx-auto text-center wow fade-in-bottom" data-wow-duration="1s">
              <h2 className="rt-section-title">{t('home_features_title', 'Key Features')}</h2>
            </div>
          </div>
          <div className="rt-spacer-25"></div>

          {/* Row 1 */}
          <div className="row">
            <div className="col-md-6">
              <div className="blue-block">
                <h3>{t('home_feature1_title', 'Test Skills')}</h3>
                <p>{t('home_feature1_desc', 'At CSQNA, we understand that just reading theory alone isn\'t enough for you to be ready for the certification exam, or your cybersecurity job interview. You need to continuously test yourself and hone your skills.')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="blue-block">
                <h3>{t('home_feature2_title', 'Easy-to-Use Platform')}</h3>
                <p>{t('home_feature2_desc', 'CSQNA is a trusted global test platform for building and taking practice tests. Our user-friendly interface ensures a seamless experience from start to finish, empowering you to create actual certification test conditions for you to practice in.')}</p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-md-6">
              <div className="blue-block">
                <h3>{t('home_feature3_title', 'Certify')}</h3>
                <p>{t('home_feature3_desc', 'Gain confidence with practice tests that prepare you for certifications like CISA, CISM, CISSP, CEH etc. If you do not find your certification, let us know, we are constantly creating new questions and adding to our database.')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="blue-block">
                <h3>{t('home_feature4_title', 'Free Sign-Up')}</h3>
                <p>{t('home_feature4_desc', 'Experience the benefits of seamless Test management with CSQNA\'s free sign-up. Register effortlessly and gain instant access to Practice Test, Certifications & More.')}</p>
                <Link to="/register" className="rt-btn rt-gradient pill rt-sm4 text-white">Get Started</Link>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="col-md-6">
              <div className="blue-block">
                <h3>{t('home_feature5_title', 'Email Confirmation')}</h3>
                <p>{t('home_feature5_desc', 'CSQNA adds an extra layer of security to the account, ensuring your data stays protected. With this added authentication, users can verify their identity using email confirmation.')}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="blue-block">
                <h3>{t('home_feature6_title', '24/7 Customer Support')}</h3>
                <p>{t('home_feature6_desc', 'Our expert support team is available 24/7 to address your questions and guide you through every aspect of the domain. You must also check our FAQs to see if you get an answer to your questions.')}</p>
                <a href="mailto:support@csqna.com" className="rt-btn rt-gradient pill rt-sm4 text-white">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel Overview */}
      <div className="rt-spacer-100 rt-spacer-lg-100 rt-spacer-xs-80"></div>
      <div className="domian-selldom bg-elements-parent">
        <div className="rt-bg-elemtnts shape-right-3 rtbgprefix-contain"
             style={{ backgroundImage: "url(/marketing-assets/images/banner/pannel-overview-banner.png)" }}></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-8">
              <h2 className="rt-section-title f-size-46">{t('home_panel_title', 'Panel Overview')}</h2>
              <p className="rt-light3 f-size-16 line-height-34 rt-mb-0">
                {t('home_panel_desc', 'Once you sign up, you get your own personal admin panel—a smart and user-friendly platform designed to simplify your test management experience.')}
              </p>
              <div className="rt-spacer-30"></div>
              <ul className="rt-list">
                <li className="f-size-18 rt-semiblod line-height-34 clearfix rt-mb-8">
                  <img src="/marketing-assets/images/all-img/check-icon.png" alt="checkicon" className="rt-mr-5" />
                  Easy Dashboard Management
                </li>
                <li className="f-size-18 rt-semiblod line-height-34 clearfix rt-mb-8">
                  <img src="/marketing-assets/images/all-img/check-icon.png" alt="checkicon" className="rt-mr-5" />
                  Contribute
                </li>
                <li className="f-size-18 rt-semiblod line-height-34 clearfix rt-mb-8">
                  <img src="/marketing-assets/images/all-img/check-icon.png" alt="checkicon" className="rt-mr-5" />
                  Real-Time Reporting & Updates
                </li>
                <li className="f-size-18 rt-semiblod line-height-34 clearfix rt-mb-8">
                  <img src="/marketing-assets/images/all-img/check-icon.png" alt="checkicon" className="rt-mr-5" />
                  Advanced Search & Filters
                </li>
                <li className="f-size-18 rt-semiblod line-height-34 clearfix rt-mb-8">
                  <img src="/marketing-assets/images/all-img/check-icon.png" alt="checkicon" className="rt-mr-5" />
                  Secure & Reliable
                </li>
                <li className="f-size-18 rt-semiblod line-height-34 clearfix rt-mb-8">
                  <img src="/marketing-assets/images/all-img/check-icon.png" alt="checkicon" className="rt-mr-5" />
                  24/7 Support Integration
                </li>
              </ul>
              <p className="rt-light3 f-size-16 line-height-34 rt-mb-0 mt-3">
                This is a user-friendly panel, built to empower you with convenience, control, and
                efficiency, ensuring your domain journey is smooth and hassle-free.
              </p>
              <Link to="/login" className="rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 long rt-mt-30">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rt-spacer-150 rt-spacer-xs-50"></div>
      <section className="faq-area bg-elements-parent">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="rt-section-title">{t('home_faq_title', 'Frequently Asked Questions')}</h2>
              <p className="rt-light3 line-height-34 rt-mb-0 section-p-content">
                {t('home_faq_subtitle', 'Find answers to the most frequently asked questions here')}
              </p>
              <div className="rt-spacer-30"></div>
              <div id="accordion">
                {faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div className="faq-card" key={index}>
                      <div className="faq-header" onClick={() => setActiveFaq(isOpen ? null : index)}>
                        <h5>
                          {faq.question}
                        </h5>
                        <div className="faq-icon">
                          {isOpen ? '−' : '+'}
                        </div>
                      </div>
                      
                      {isOpen && (
                        <div className="faq-body">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Videos) Section */}
      <div className="rt-spacer-100 rt-spacer-xs-60"></div>
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="rt-section-title">{t('home_certs_title', 'Expert Insights & Certification Guidance')}</h2>
            <p className="rt-light3">{t('home_certs_subtitle', 'AI-powered video guidance to help you prepare smarter for cybersecurity certifications.')}</p>
          </div>

          <div className="swiper myTestimonialSwiper">
            <div className="swiper-wrapper">
              {cmsVideos.map((v, idx) => (
                <div className="swiper-slide" key={v.id || idx}>
                  <div className="testimonial-card">
                    <div className="video-wrapper">
                      {v.type === 'youtube' ? (
                        <iframe
                          src={v.src}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: '100%', height: '280px', border: 'none', borderRadius: '10px' }}
                        />
                      ) : (
                        <video controls preload="metadata" playsInline style={{ width: '100%', borderRadius: '10px' }}>
                          <source src={v.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                    {v.title && <p style={{ margin: '10px 0 4px', fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>{v.title}</p>}
                    {v.subtitle && <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{v.subtitle}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <div className="rt-spacer-100 rt-spacer-xs-60"></div>
      <section className="services-area rtbgprefix-contain" style={{ background: '#F6F7FA', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-9 mx-auto text-center rt-mb-50">
              <h2 className="rt-section-title">Training Programs</h2>
              <p className="rt-light3 f-size-16 line-height-30">Expert-led training programs to build your cybersecurity and compliance skills.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { icon: '🛡️', title: 'ISO 27001:2022', desc: 'Information Security Management System implementation, auditing, and certification readiness training.' },
              { icon: '🔄', title: 'BCP / DR', desc: 'Business Continuity Planning and Disaster Recovery strategy, design, and testing frameworks.' },
              { icon: '🏦', title: 'RBI PAPG', desc: 'RBI Payment Aggregator and Payment Gateway compliance training aligned with RBI master directions.' },
              { icon: '🤝', title: 'TPRM', desc: 'Third Party Risk Management — vendor assessment, due diligence, and ongoing monitoring frameworks.' }
            ].map((item, i) => (
              <div className="col-lg-3 col-md-6 rt-mb-30" key={i}>
                <div className="rt-single-icon-box icon-center text-center shdoaw-style3 rt-pt-35 rt-pb-35 rt-pl-20 rt-pr-20" style={{ height: '100%', background: '#fff' }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>{item.icon}</div>
                  <div className="iconbox-content">
                    <h5 className="rt-mb-15" style={{ color: '#854c93', fontWeight: 700 }}>{item.title}</h5>
                    <p className="f-size-14" style={{ color: '#555', lineHeight: '1.7' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center rt-mt-30">
            <a href="mailto:consult@csqna.com" className="rt-btn rt-gradient pill text-uppercase rt-Bshadow-1 rt-sm2">Enquire About Training</a>
          </div>
        </div>
      </section>

      {/* Featured Blogs Slider (inside Footer container area in original html, we render it here) */}
      <div className="rt-spacer-100 rt-spacer-xs-60"></div>
      <section className="blog-section pb-5" style={{ background: '#fcfcfc' }}>
        <div className="container">
          <h2 className="rt-section-title pt-5 mb-4">Featured Blogs</h2>
          <div className="swiper myBlogSwiper">
            <div className="swiper-wrapper">
              {blogs.map((blog, idx) => (
                <div className="swiper-slide" key={idx}>
                  <div className="blog-card" style={{ minHeight: '420px' }}>
                    <img src={blog.img} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div className="blog-content">
                      <div className="meta">{blog.meta}</div>
                      <h4 className="blog-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>{blog.title}</h4>
                      <p className="blog-desc">{blog.desc}</p>
                      <a href={blog.link} className="read-more">Read More →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
