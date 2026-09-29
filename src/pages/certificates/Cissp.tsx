import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileQuestion, Globe, Minus, Plus, Shield, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCMS } from '../../utils/useCMS';

export const Cissp: React.FC = () => {
  const { t } = useCMS();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      key_q: 'cissp_faq_q1', key_a: 'cissp_faq_a1',
      question: 'Can I take the CISSP exam without the required experience?',
      answer: 'Yes, you can take the CISSP exam without the experience. If you pass, you will receive the Associate of ISC² designation and will have up to 6 years to gain the necessary 5 years of professional security work experience.'
    },
    {
      key_q: 'cissp_faq_q2', key_a: 'cissp_faq_a2',
      question: 'How difficult is the CISSP exam?',
      answer: 'The CISSP exam is considered highly challenging. It evaluates your security engineering and risk management mindset across 8 domains rather than just testing memorized technical facts. It requires solid analytical skills and extensive preparation.'
    },
    {
      key_q: 'cissp_faq_q3', key_a: 'cissp_faq_a3',
      question: 'What is the total cost of CISSP certification?',
      answer: 'The standard registration fee is $749 USD. To maintain the certification, you must earn 120 CPE credits every 3 years and pay an Annual Maintenance Fee (AMF) of $125 USD.'
    },
    {
      key_q: 'cissp_faq_q4', key_a: 'cissp_faq_a4',
      question: 'How should I prepare for the CISSP exam?',
      answer: 'Recommended preparation includes studying the official ISC² CISSP Study Guide, taking practice exams to assess knowledge, joining peer study groups or review courses, focusing on the 8 CISSP CBK domains, and gaining practical experience in security operations.'
    },
    {
      key_q: 'cissp_faq_q5', key_a: 'cissp_faq_a5',
      question: 'What is the endorsement process?',
      answer: 'After passing the exam, you must complete the endorsement application. This application must be signed by an active, certified ISC² professional who can verify your professional experience in the cybersecurity field.'
    }
  ];

  const domains = [
    { num: "01", title: "Security and Risk Management", weight: "15%", desc: "Governance, risk management, compliance, business continuity, and ethics." },
    { num: "02", title: "Asset Security", weight: "10%", desc: "Information asset classification, ownership, data retention, and privacy controls." },
    { num: "03", title: "Security Architecture & Engineering", weight: "13%", desc: "System engineering principles, security models, cryptography, and vulnerability mitigations." },
    { num: "04", title: "Communication & Network Security", weight: "13%", desc: "Network architecture, secure channels, wireless security, and network attack vectors." },
    { num: "05", title: "Identity & Access Management (IAM)", weight: "13%", desc: "Access control systems, identity federations, MFA, and authorization mechanisms." },
    { num: "06", title: "Security Assessment & Testing", weight: "12%", desc: "Vulnerability scanning, penetration testing, log analysis, and security audits." },
    { num: "07", title: "Security Operations", weight: "13%", desc: "Incident response, threat hunting, disaster recovery, and physical security management." },
    { num: "08", title: "Software Development Security", weight: "11%", desc: "Secure coding practices, software development lifecycle (SDLC), and API security." }
  ];

  const examMetrics = [
    { title: 'Exam Duration', desc: '3 Hours for English CAT format. 6 Hours for non-English linear exams.' },
    { title: 'Questions', desc: '100–150 questions for English CAT format. 250 questions for non-English linear exams.' },
    { title: 'Passing Score', desc: 'Scaled score of 200 to 1000 points. Passing score: 700 points.' },
    { title: 'Testing Format', desc: 'Computer-based testing (CBT) at authorized Pearson VUE testing centers.' },
    { title: 'Question Format', desc: 'Multiple-choice and advanced innovative questions. Evaluates managerial mindset.' },
    { title: 'Registration Fee', desc: 'Standard Registration Fee: $749 USD. Official registration through ISC² portal.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">

      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        <span className="font-bold">⚠️ Disclaimer:</span> We are not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with ISC².
      </div>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[11px] font-extrabold uppercase tracking-widest border border-[#A7F3D0] shadow-xs mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-[#059669]" />
              <span>PREMIER SECURITY CERTIFICATION PREP</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4" data-content-key="cissp_banner_title">
              {t('cissp_banner_title', 'CISSP')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">Information Security</span> Practice Tests
            </h1>
            
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8" data-content-key="cissp_hero_subtitle">
              {t('cissp_hero_subtitle', 'Certified Information Systems Security Professional - World\'s Premier Cybersecurity Certification. Validate your expertise in designing, engineering, and managing an organization\'s overall security posture.')}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button size="hero" className="bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/25 border-0 flex items-center gap-2">
                  START CISSP PRACTICE FREE <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="hero" className="border-slate-200 text-[#0F172A] font-extrabold text-sm px-7 rounded-full hover:bg-slate-50">
                  VIEW PRICING PLANS
                </Button>
              </Link>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>1,800+ Questions</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>8 CBK Domains</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>CAT Adaptive Style</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Managerial Mindset</span>
              </div>
            </div>
          </div>

          {/* Right Column Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 right-2 text-emerald-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>Gold Standard<br />Security Credential</span>
                <span className="text-xl">⤵</span>
              </div>

              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-7 text-white shadow-2xl border border-emerald-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">CISSP CERTIFICATION</span>
                  <Shield className="h-6 w-6 text-emerald-400" />
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-200">CISSP PRACTICE QUESTIONS</div>
                      <div className="text-2xl font-black text-white">1,800+</div>
                    </div>
                    <FileQuestion className="h-8 w-8 text-emerald-300" />
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-200">CBK DOMAINS COVERED</div>
                      <div className="text-2xl font-black text-white">8 Domains</div>
                    </div>
                    <Target className="h-8 w-8 text-teal-300" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-emerald-200">
                  <span>ISC² CBK 2024 Alignment</span>
                  <span className="text-emerald-400">100% Updated</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="py-6 sm:py-10 space-y-12 lg:space-y-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DOMAINS SECTION */}
        <section className="relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[11px] font-extrabold uppercase tracking-widest border border-[#A7F3D0] shadow-xs mb-3">
              <Target className="h-3.5 w-3.5 text-[#059669]" />
              <span>8 COMMON BODY OF KNOWLEDGE DOMAINS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
              CISSP CBK Domains
            </h2>
            <p className="mt-3 text-sm text-[#64748B] font-medium" data-content-key="cissp_domains_intro">
              {t('cissp_domains_intro', 'The CISSP Common Body of Knowledge (CBK) encompasses eight essential domains representing the most comprehensive body of knowledge in information security.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((d) => (
              <div
                key={d.num}
                className="group rounded-3xl bg-white p-6 border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                      {d.num}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-100">{d.weight}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-emerald-600 transition-colors">
                    {d.title}
                  </h3>

                  <p className="text-xs font-medium text-[#64748B] leading-relaxed mb-4">
                    {d.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Domain</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAM METRICS SECTION */}
        <section className="relative bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-extrabold uppercase tracking-widest border border-emerald-100 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>EXAM BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">Exam Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examMetrics.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-600 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-300 text-[11px] font-extrabold uppercase tracking-widest border border-white/10 mb-4">
              <span>PREREQUISITE REQUIREMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Eligibility Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-emerald-300 mb-2">5-Year Requirement</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Minimum 5 years of cumulative paid work experience in 2 or more of the 8 CISSP CBK domains, endorsed by an active credential holder.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-emerald-300 mb-2">Substitutions</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Maximum of 1 year waiver available for candidates holding a 4-year degree or approved security credentials (e.g. CISA, Security+).</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-emerald-300 mb-2">Associate Path</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Pass without required experience to earn Associate of ISC² designation, then gain 5 years experience within 6 years.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-[#64748B] font-medium">Find answers to the most frequently asked questions here</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden transition-all">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:text-emerald-600 transition-colors"
                  >
                    <span data-content-key={faq.key_q}>{t(faq.key_q, faq.question)}</span>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed border-t border-slate-100 pt-4" data-content-key={faq.key_a}>
                      {t(faq.key_a, faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA BOTTOM SECTION */}
        <section className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Pass the CISSP Exam with CSQNA</h2>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto mb-8 font-medium">
            Join thousands of cybersecurity leaders mastering the 8 CBK domains with our exam-realistic practice test engine.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="hero" className="bg-white text-emerald-700 hover:bg-slate-100 font-black text-sm px-8 py-3.5 rounded-full shadow-lg border-0">
                GET STARTED NOW
              </Button>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Cissp;
