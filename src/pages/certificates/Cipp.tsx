import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileQuestion, Globe, Lock, Minus, Plus, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCMS } from '../../utils/useCMS';

export const Cipp: React.FC = () => {
  const { t } = useCMS();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      key_q: 'cipp_faq_q1', key_a: 'cipp_faq_a1',
      question: 'Which CIPP certification should I choose?',
      answer: 'The choice depends on your region of focus. CIPP/E covers European GDPR and is the global benchmark for international compliance. CIPP/US covers U.S. federal and state private-sector privacy laws. Many professionals pursue both.'
    },
    {
      key_q: 'cipp_faq_q2', key_a: 'cipp_faq_a2',
      question: 'How difficult is the CIPP exam and what is the passing rate?',
      answer: 'The CIPP exam is moderately challenging, with an estimated passing rate of 50-60%. It requires a thorough understanding of legal texts, compliance directives, and how they apply to operational business scenarios.'
    },
    {
      key_q: 'cipp_faq_q3', key_a: 'cipp_faq_a3',
      question: 'What is the total cost of CIPP certification?',
      answer: 'The standard exam fee is $550 USD. Certification renewal costs include maintaining an active IAPP membership ($275/yr) or paying a $250 USD biennial maintenance fee, along with submitting the necessary CPE credits.'
    },
    {
      key_q: 'cipp_faq_q4', key_a: 'cipp_faq_a4',
      question: 'How do I maintain my CIPP certification?',
      answer: 'To maintain CIPP status, you must earn and submit 20 Continuing Privacy Education (CPE) credits every 2 years, agree to the IAPP Code of Ethics, and maintain active membership status.'
    },
    {
      key_q: 'cipp_faq_q5', key_a: 'cipp_faq_a5',
      question: 'Is CIPP certification worth it for non-lawyers?',
      answer: 'Yes, privacy compliance is highly operational. IT professionals, software engineers, database administrators, security analysts, and project managers benefit greatly from CIPP to build privacy-by-design into systems.'
    }
  ];

  const cippDomains = [
    { num: "01", title: "Introduction to Privacy & Laws", desc: "Origins of privacy, legal frameworks, regulatory enforcement bodies, and data protection concepts." },
    { num: "02", title: "GDPR & European Privacy Framework", desc: "General Data Protection Regulation principles, data subject rights, lawful processing, and DPO duties." },
    { num: "03", title: "International Data Transfers", desc: "Cross-border transfers, SCCs, adequacy decisions, binding corporate rules, and Privacy Shield history." },
    { num: "04", title: "Privacy Operations & Governance", desc: "Privacy by design, DPIAs, breach notification obligations, and vendor risk assessments." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">

      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        <span className="font-bold">⚠️ Disclaimer:</span> We are not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with IAPP.
      </div>

      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E8FF] text-[#9333EA] text-[11px] font-extrabold uppercase tracking-widest border border-[#E9D5FF] shadow-sm mb-4">
              <Lock className="h-3.5 w-3.5 text-[#9333EA]" />
              <span>IAPP PRIVACY CERTIFICATION PREP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              CIPP <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">Information Privacy</span> Practice Tests
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8">
              Sharpen your knowledge of global privacy laws, data protection frameworks, GDPR, and cross-border data transfer requirements with 800+ exam-focused questions.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button variant="hero" size="hero" className="px-8 shadow-lg">START CIPP PRACTICE FREE <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link to="/pricing">
                <Button variant="heroOutline" size="hero" className="px-7">VIEW PRICING PLANS</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              {["800+ Questions", "GDPR Aligned", "DPIA Scenarios", "IAPP Exam Format"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 right-2 text-purple-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>Privacy Elite<br />CIPP Ready</span><span className="text-xl">⤵</span>
              </div>
              <div className="relative rounded-3xl bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 p-7 text-white shadow-2xl border border-purple-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-purple-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">IAPP CIPP</span>
                  <Lock className="h-6 w-6 text-purple-300" />
                </div>
                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div><div className="text-[10px] font-bold text-purple-200">PRIVACY QUESTIONS</div><div className="text-2xl font-black text-white">800+</div></div>
                    <FileQuestion className="h-8 w-8 text-purple-300" />
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div><div className="text-[10px] font-bold text-purple-200">PRIVACY DOMAINS</div><div className="text-2xl font-black text-white">4 Frameworks</div></div>
                    <Globe className="h-8 w-8 text-indigo-300" />
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-purple-200">
                  <span>GDPR &amp; Global Compliance</span><span className="text-emerald-400">92% Pass Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-6 sm:py-10 space-y-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">

        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E8FF] text-[#9333EA] text-[11px] font-extrabold uppercase tracking-widest border border-[#E9D5FF] shadow-sm mb-3">
              <Target className="h-3.5 w-3.5 text-[#9333EA]" /><span>PRIVACY DOMAINS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">Core Privacy Framework Domains</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cippDomains.map((d) => (
              <div key={d.num} className="group rounded-3xl bg-white p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center mb-5">{d.num}</div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-purple-600 transition-colors">{d.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed mb-6">{d.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Domain</span><ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight mb-2">Frequently Asked Questions</h2>
            <p className="text-sm font-medium text-[#64748B]">Find answers to the most common questions about the CIPP certification</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3" id="accordion">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`rounded-2xl border transition-all duration-200 ${isOpen ? 'border-purple-200 bg-purple-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setActiveFaq(isOpen ? null : index)}>
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

export default Cipp;
