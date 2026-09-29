import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, CheckCircle2, Cpu, FileQuestion, Minus, Plus, Sparkles, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCMS } from '../../utils/useCMS';

export const Aaia: React.FC = () => {
  const { t } = useCMS();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      key_q: 'aaia_faq_q1', key_a: 'aaia_faq_a1',
      question: 'What is the difference between AAIA and other certifications?',
      answer: 'Unlike technical certifications that focus on building AI models, AAIA is a governance, risk, and compliance certification focused on auditing and overseeing AI systems to ensure transparency, fairness, and compliance.'
    },
    {
      key_q: 'aaia_faq_q2', key_a: 'aaia_faq_a2',
      question: 'What are the prerequisites for the AAIA certification?',
      answer: 'Candidates must hold an active CISA certification or another qualified auditing/accounting designation (such as CIA or CPA) to satisfy the prerequisite requirement.'
    },
    {
      key_q: 'aaia_faq_q3', key_a: 'aaia_faq_a3',
      question: 'How long is the AAIA exam and how many questions does it have?',
      answer: 'The exam is 2.5 hours long and consists of 90 multiple-choice questions.'
    },
    {
      key_q: 'aaia_faq_q4', key_a: 'aaia_faq_a4',
      question: 'What is the cost of the AAIA exam?',
      answer: 'The exam fee is $459 USD for ISACA members and $599 USD for non-members.'
    },
    {
      key_q: 'aaia_faq_q5', key_a: 'aaia_faq_a5',
      question: 'How do I maintain the AAIA certification?',
      answer: 'You must earn and report 10 Continuing Professional Education (CPE) hours specifically in Artificial Intelligence (AI) domains annually and pay the maintenance fee.'
    }
  ];

  const aaiaDomains = [
    { num: "01", title: "AI Governance and Risk", weight: "33% Exam Weight", desc: "Policy alignment, algorithmic bias identification, accountability, and EU AI Act regulatory compliance." },
    { num: "02", title: "AI Operations & Control", weight: "46% Exam Weight", desc: "Data ingestion, pipeline integrity, training/testing controls, model deployment, and monitoring." },
    { num: "03", title: "AI Auditing Tools & Techniques", weight: "21% Exam Weight", desc: "Independent assurance methodologies, audit trail verification, and explainability checks." },
  ];

  const examMetrics = [
    { title: 'Exam Duration', desc: '2.5 Hours (150 minutes) to complete the exam in a secure, timed environment.' },
    { title: 'Questions', desc: '90 Questions total. Evaluates auditing principles applied to AI models.' },
    { title: 'Passing Score', desc: 'Scaled score of 200 to 800 points. Passing score: 450 points.' },
    { title: 'Testing Format', desc: 'Computer-based testing. Online proctored option or authorized testing centers.' },
    { title: 'Question Format', desc: 'Multiple-choice format. Includes scenario-based evaluations of AI governance.' },
    { title: 'Registration Fee', desc: 'ISACA Member Fee: $459 USD. Non-Member Fee: $599 USD.' }
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-xs mb-4">
              <Bot className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>AI GOVERNANCE &amp; AUDIT CERTIFICATION PREP</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4" data-content-key="aaia_banner_title">
              {t('aaia_banner_title', 'AAIA')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600">Artificial Intelligence Audit</span> Practice Tests
            </h1>
            
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8" data-content-key="aaia_hero_subtitle">
              {t('aaia_hero_subtitle', 'Advanced in AI Audit (AAIA) - Governance, Risk, and Compliance for Artificial Intelligence. ISACA\'s specialized credential validating your ability to audit operational risk, establish robust governance, and verify regulatory compliance.')}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button size="hero" className="bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/25 border-0 flex items-center gap-2">
                  START AAIA PRACTICE FREE <ArrowRight className="h-4 w-4" />
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
                <span>500+ Questions</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>EU AI Act Aligned</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>LLM Security</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>NIST AI RMF</span>
              </div>
            </div>
          </div>

          {/* Right Column Visual Graphic */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 right-2 text-indigo-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>AI Governance<br />Audit Ready</span>
                <span className="text-xl">⤵</span>
              </div>

              <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-7 text-white shadow-2xl border border-indigo-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">AAIA CERTIFICATION</span>
                  <Bot className="h-6 w-6 text-indigo-300" />
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-indigo-200">AI AUDIT QUESTIONS</div>
                      <div className="text-2xl font-black text-white">500+</div>
                    </div>
                    <FileQuestion className="h-8 w-8 text-indigo-300" />
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-indigo-200">RISK MODULES</div>
                      <div className="text-2xl font-black text-white">3 Frameworks</div>
                    </div>
                    <Cpu className="h-8 w-8 text-purple-300" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-indigo-200">
                  <span>EU AI Act &amp; LLM Security</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-xs mb-3">
              <Target className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>AI AUDIT DOMAIN BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
              AAIA Exam Domains
            </h2>
            <p className="mt-3 text-sm text-[#64748B] font-medium" data-content-key="aaia_domains_intro">
              {t('aaia_domains_intro', 'The AAIA exam blueprint evaluates skills across three comprehensive governance and auditing areas developed by ISACA.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aaiaDomains.map((d) => (
              <div
                key={d.num}
                className="group rounded-3xl bg-white p-7 border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">
                      {d.num}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold border border-indigo-100">{d.weight}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                    {d.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed mb-6">
                    {d.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Module</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAM METRICS SECTION */}
        <section className="relative bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-extrabold uppercase tracking-widest border border-indigo-100 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>KEY SPECIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">Exam Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examMetrics.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-indigo-600 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-300 text-[11px] font-extrabold uppercase tracking-widest border border-white/10 mb-4">
              <span>PREREQUISITE REQUIREMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Eligibility &amp; Prerequisites</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-indigo-300 mb-2">Active Prerequisite</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Must hold an active CISA certification or other qualified auditing/accounting designation (CIA, CPA, ACCA).</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-indigo-300 mb-2">Code of Ethics</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Agree to and comply with the ISACA Code of Professional Ethics and Professional Standards.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-indigo-300 mb-2">AI CPE Maintenance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Earn and report a minimum of 10 CPE hours specifically in AI annually and pay the maintenance fee.</p>
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
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:text-indigo-600 transition-colors"
                  >
                    <span data-content-key={faq.key_q}>{t(faq.key_q, faq.question)}</span>
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
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
        <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Master AI Auditing with CSQNA</h2>
          <p className="text-indigo-100 text-sm max-w-xl mx-auto mb-8 font-medium">
            Join thousands of professionals mastering AI risk management, LLM security, and governance standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="hero" className="bg-white text-indigo-600 hover:bg-slate-100 font-black text-sm px-8 py-3.5 rounded-full shadow-lg border-0">
                GET STARTED NOW
              </Button>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Aaia;
