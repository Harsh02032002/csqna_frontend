import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  FileQuestion,
  Minus,
  Plus,
  Shield,
  Target,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCMS } from '../../utils/useCMS';

export const Cisa: React.FC = () => {
  const { t } = useCMS();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      key_q: "cisa_faq_q1", key_a: "cisa_faq_a1",
      question: "Can freshers take the CISA exam?",
      answer: "Yes, freshers can take the CISA exam without having the required work experience. You have up to 5 years after passing the exam to gain the necessary 5 years of professional experience in information systems auditing, control, or security work."
    },
    {
      key_q: "cisa_faq_q2", key_a: "cisa_faq_a2",
      question: "How difficult is the CISA exam?",
      answer: "The CISA exam is considered challenging and requires thorough preparation. The passing rate is typically around 50%. Success requires a combination of study, understanding of concepts, and practical experience in IT auditing."
    },
    {
      key_q: "cisa_faq_q3", key_a: "cisa_faq_a3",
      question: "What is the validity of CISA certification?",
      answer: "The CISA certification is valid for 3 years. To maintain certification, you must earn and report a minimum of 120 Continuing Professional Education (CPE) hours during the 3-year period and pay an annual maintenance fee."
    },
    {
      key_q: "cisa_faq_q4", key_a: "cisa_faq_a4",
      question: "How to prepare for the CISA exam?",
      answer: "Recommended preparation includes studying the official CISA Review Manual, practicing with the CISA Question Database, taking mock tests, attending review courses, and gaining hands-on IT audit experience."
    },
    {
      key_q: "cisa_faq_q5", key_a: "cisa_faq_a5",
      question: "What is the exam retake policy?",
      answer: "If you do not pass the CISA exam on your first attempt, you can retake it. You must wait 30 days for the first retake, and 90 days for subsequent retakes. There is a maximum of 4 attempts within a 12-month period, and full exam fees apply to each attempt."
    }
  ];

  const cisaDomains = [
    { num: "01", title: "Information Systems Auditing Process", weight: "21% Exam Weight", desc: "Audit standards, risk-based audit planning, execution, and reporting mechanisms." },
    { num: "02", title: "Governance and Management of IT", weight: "17% Exam Weight", desc: "IT governance structures, enterprise architecture, risk management, and IT strategies." },
    { num: "03", title: "IS Acquisition, Development & Implementation", weight: "12% Exam Weight", desc: "Business case development, project management, system acquisition, and testing." },
    { num: "04", title: "Information Systems Operations & Business Resilience", weight: "23% Exam Weight", desc: "IT operational management, data center controls, business continuity, and disaster recovery." },
    { num: "05", title: "Protection of Information Assets", weight: "27% Exam Weight", desc: "Information security controls, identity management, network security, and incident response." },
  ];

  const examMetrics = [
    { title: 'Exam Duration', desc: 'Candidates will have exactly 4 Hours (240 minutes) to complete the exam.' },
    { title: 'Questions', desc: 'Consists of 150 Multiple-Choice Questions covering IS auditing standards and techniques.' },
    { title: 'Passing Score', desc: 'Scaled score of 450 or above (on a scale of 200 to 800 points) is required to pass.' },
    { title: 'Testing Format', desc: 'Delivered via Computer-Based Testing at Pearson VUE centers or online remote proctoring.' },
    { title: 'Registration Fee', desc: 'Voucher costs $575 USD for ISACA members and $760 USD for non-members.' },
    { title: 'Maintenance', desc: 'Requires reporting at least 20 CPE hours annually and 120 CPE hours triennially.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">

      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        <span className="font-bold">⚠️ Disclaimer:</span> We are not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with ISACA.
      </div>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-sm mb-4">
              <Shield className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>ISACA CISA CERTIFICATION PREP</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              CISA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Practice Tests</span> &amp; Exam Prep
            </h1>

            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8">
              Master the 5 CISA domains with 1,200+ exam-focused practice questions, detailed answer explanations, and real-time performance breakdown aligned with official ISACA guidelines.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button variant="hero" size="hero" className="px-8 shadow-lg">
                  START CISA PRACTICE FREE <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="heroOutline" size="hero" className="px-7">
                  VIEW PRICING PLANS
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              {["1,200+ Questions", "5 Exam Domains", "Detailed Answers", "Timed Simulators"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 right-2 text-purple-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>Master CISA<br />Pass First Try</span>
                <span className="text-xl">⤵</span>
              </div>

              <div className="relative rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 p-7 text-white shadow-2xl border border-purple-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-purple-200 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">ISACA CISA</span>
                  <Award className="h-6 w-6 text-amber-400" />
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-purple-200">TOTAL QUESTIONS</div>
                      <div className="text-2xl font-black text-white">1,200+</div>
                    </div>
                    <FileQuestion className="h-8 w-8 text-purple-300" />
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-purple-200">OFFICIAL DOMAINS</div>
                      <div className="text-2xl font-black text-white">5 Domains</div>
                    </div>
                    <Target className="h-8 w-8 text-indigo-300" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-purple-200">
                  <span>Passing Score: 450/800</span>
                  <span className="text-emerald-400">95% Pass Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="py-6 sm:py-10 space-y-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* DOMAINS SECTION */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-sm mb-3">
              <Target className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>DOMAIN BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
              CISA 5 Official Exam Domains
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-[#64748B]">
              Aligned with the latest official ISACA CISA job practice specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cisaDomains.map((d) => (
              <div key={d.num} className="group rounded-3xl bg-white p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
                      {d.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-extrabold">
                      {d.weight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-purple-600 transition-colors">{d.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed mb-6">{d.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Domain Questions</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAM METRICS SECTION */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-sm mb-3">
              <FileQuestion className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>EXAM METRICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">CISA Exam Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {examMetrics.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-purple-200 hover:bg-purple-50/40 transition-colors">
                <h3 className="text-base font-bold text-purple-700 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-sm mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>ELIGIBILITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">Requirements to Appear</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Experience Requirements",
                items: [
                  "Minimum 5 years of professional information systems auditing, control, or security work experience.",
                  "Experience must be gained within the 10-year period preceding the application date.",
                ]
              },
              {
                title: "Substitutions & Waivers",
                items: [
                  "Maximum of 3 years of substitutions allowed.",
                  "1 year waiver for completed university degree (60-120 semester credits).",
                  "2 years waiver for a Bachelor or Master degree from an ISACA-approved university.",
                ]
              },
              {
                title: "For Freshers",
                items: [
                  "Freshers can take the CISA exam immediately without work experience.",
                  "You have up to 5 years after passing the CISA exam to gain the required work experience.",
                ]
              }
            ].map((path) => (
              <div key={path.title} className="rounded-3xl bg-white border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-purple-700 mb-4">{path.title}</h3>
                <ul className="space-y-3">
                  {path.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight mb-2">Frequently Asked Questions</h2>
            <p className="text-sm font-medium text-[#64748B]">Find answers to the most common questions about the CISA certification</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3" id="accordion">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 ${isOpen ? 'border-purple-200 bg-purple-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span className="font-bold text-sm text-[#0F172A] leading-snug pr-4">{t(faq.key_q, faq.question)}</span>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-purple-100 pt-4">
                      {t(faq.key_a, faq.answer)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Cisa;
