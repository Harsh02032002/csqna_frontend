import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileCheck, FileQuestion, Globe, Minus, Plus, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCMS } from '../../utils/useCMS';

export const Iso: React.FC = () => {
  const { t } = useCMS();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      key_q: 'iso_faq_q1', key_a: 'iso_faq_a1',
      question: 'What is the difference between ISO 27001:2013 and ISO 27001:2022?',
      answer: 'The 2022 version consolidates the control structure from 14 domains (114 controls) to 4 themes (93 controls). It introduces 11 new controls (e.g. threat intelligence, cloud services, data leakage prevention) to align with modern threat landscapes.'
    },
    {
      key_q: 'iso_faq_q2', key_a: 'iso_faq_a2',
      question: 'How long does ISO 27001 certification take and what does it cost?',
      answer: 'Typically 6 to 12 months from planning to certificate. Costs range from $15,000 to $100,000+ depending on organization size, complexity of processes, and if external consultancy is hired to help build the ISMS.'
    },
    {
      key_q: 'iso_faq_q3', key_a: 'iso_faq_a3',
      question: 'Is ISO 27001 certification mandatory or voluntary?',
      answer: 'It is voluntary, but highly demanded by clients, partners, and regulators. Many software tenders, RFPs, and regulated industries require it as a baseline to prove information security capability.'
    },
    {
      key_q: 'iso_faq_q4', key_a: 'iso_faq_a4',
      question: 'What is the Statement of Applicability (SoA) in ISO 27001?',
      answer: 'The Statement of Applicability (SoA) is a mandatory document that lists which of the 93 Annex A controls apply to your organization, the justification for including or excluding them, and their current implementation status.'
    },
    {
      key_q: 'iso_faq_q5', key_a: 'iso_faq_a5',
      question: 'How does ISO 27001 relate to GDPR compliance?',
      answer: 'While GDPR focuses on personal data protection, ISO 27001 secures all information assets. Implementing ISO 27001 provides the technical and organizational security controls required under GDPR Article 32.'
    }
  ];

  const isoDomains = [
    { num: "01", title: "Context & Leadership (Clauses 4-5)", desc: "Understanding organizational context, interested parties, ISMS scope, top management commitment, and security policy." },
    { num: "02", title: "Risk Assessment & Planning (Clause 6)", desc: "Information security risk assessment process, risk treatment planning, and Statement of Applicability (SoA)." },
    { num: "03", title: "Support & Operation (Clauses 7-8)", desc: "Resource allocation, competence management, documented information controls, and operational risk execution." },
    { num: "04", title: "Annex A Controls (93 Controls)", desc: "Organizational controls, People controls, Physical controls, and Technological security controls (2022 update)." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">

      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        <span className="font-bold">⚠️ Disclaimer:</span> We are not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with ISO or IEC.
      </div>

      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] text-[#16A34A] text-[11px] font-extrabold uppercase tracking-widest border border-[#BBF7D0] shadow-sm mb-4">
              <FileCheck className="h-3.5 w-3.5 text-[#16A34A]" />
              <span>ISMS COMPLIANCE STANDARD PREP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              ISO 27001:2022 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">ISMS Auditor</span> Practice Tests
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8">
              Prepare for ISO 27001 Lead Auditor &amp; Lead Implementer certification exams with 1,100+ Annex A control &amp; ISMS clause scenario questions aligned with the 2022 framework.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button variant="hero" size="hero" className="px-8 shadow-lg">START ISO 27001 PRACTICE FREE <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link to="/pricing">
                <Button variant="heroOutline" size="hero" className="px-7">VIEW PRICING PLANS</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              {["1,100+ Questions", "93 Annex A Controls", "Lead Auditor Aligned", "2022 Updated"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 right-2 text-emerald-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>ISMS Certified<br />Lead Auditor Ready</span><span className="text-xl">⤵</span>
              </div>
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 p-7 text-white shadow-2xl border border-emerald-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">ISO 27001:2022</span>
                  <FileCheck className="h-6 w-6 text-emerald-300" />
                </div>
                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div><div className="text-[10px] font-bold text-emerald-200">AUDIT QUESTIONS</div><div className="text-2xl font-black text-white">1,100+</div></div>
                    <FileQuestion className="h-8 w-8 text-emerald-300" />
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div><div className="text-[10px] font-bold text-emerald-200">CLAUSES &amp; CONTROLS</div><div className="text-2xl font-black text-white">93 Controls</div></div>
                    <Globe className="h-8 w-8 text-teal-300" />
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-emerald-200">
                  <span>Statement of Applicability (SoA)</span><span className="text-emerald-400">2022 Standard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-6 sm:py-10 space-y-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">

        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] text-[#16A34A] text-[11px] font-extrabold uppercase tracking-widest border border-[#BBF7D0] shadow-sm mb-3">
              <Target className="h-3.5 w-3.5 text-[#16A34A]" /><span>ISMS CLAUSES &amp; CONTROLS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">ISMS Core Auditing Modules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isoDomains.map((d) => (
              <div key={d.num} className="group rounded-3xl bg-white p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black text-sm flex items-center justify-center mb-5">{d.num}</div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-emerald-600 transition-colors">{d.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed mb-6">{d.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Module</span><ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight mb-2">Frequently Asked Questions</h2>
            <p className="text-sm font-medium text-[#64748B]">Find answers to the most common questions about ISO 27001</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3" id="accordion">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`rounded-2xl border transition-all duration-200 ${isOpen ? 'border-emerald-200 bg-emerald-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setActiveFaq(isOpen ? null : index)}>
                    <span className="font-bold text-sm text-[#0F172A] leading-snug pr-4">{t(faq.key_q, faq.question)}</span>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-emerald-100 pt-4">
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

export default Iso;
