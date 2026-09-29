import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileQuestion, Globe, Lock, Minus, Plus, Shield, Target } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useCMS } from '../../utils/useCMS';

export const Dpdp: React.FC = () => {
  const { t } = useCMS();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      key_q: 'dpdp_faq_q1', key_a: 'dpdp_faq_a1',
      question: 'When does the DPDP Act come into effect?',
      answer: 'The DPDP Act was passed by Parliament and received Presidential Assent on August 11, 2023. The rules are being drafted by MeitY, and compliance enforcement will begin as per the officially notified timeline.'
    },
    {
      key_q: 'dpdp_faq_q2', key_a: 'dpdp_faq_a2',
      question: 'Which organizations need to comply with the DPDP Act?',
      answer: 'All organizations (domestic or international) processing digital personal data of individuals located within India, or offering goods/services to individuals in India, must comply.'
    },
    {
      key_q: 'dpdp_faq_q3', key_a: 'dpdp_faq_a3',
      question: 'What are the key differences between DPDP and GDPR?',
      answer: 'DPDP is simpler, has no distinct "sensitive personal data" categories, places duties on the Data Principal (e.g. no false complaints), requires notices in local Indian languages, and relies on the DPBI for enforcement with high structural penalties.'
    },
    {
      key_q: 'dpdp_faq_q4', key_a: 'dpdp_faq_a4',
      question: 'What are the consent requirements under DPDP?',
      answer: 'Consent must be free, specific, informed, unconditional, and unambiguous. It must be accompanied by a notice explaining what data is collected, why it is processed, and how the principal can withdraw consent or raise grievances.'
    },
    {
      key_q: 'dpdp_faq_q5', key_a: 'dpdp_faq_a5',
      question: 'What are the penalties for non-compliance?',
      answer: 'Penalties are structural, capping at ₹250 crores (~$30 million USD) for failure to take reasonable security safeguards to prevent data breaches, and ₹150 crores for violating rules regarding processing children\'s data.'
    }
  ];

  const dpdpDomains = [
    { num: "01", title: "Data Principal Rights & Consent", desc: "Notice requirements, verifiable parental consent, right to correction, erasure, and grievance redressal." },
    { num: "02", title: "Data Fiduciary Obligations", desc: "Lawful processing, data accuracy maintenance, technical safeguards, and breach notification to Data Protection Board." },
    { num: "03", title: "Significant Data Fiduciaries", desc: "Data Protection Officer (DPO) mandate, independent data audits, and periodic privacy impact evaluations." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">

      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        <span className="font-bold">⚠️ Disclaimer:</span> We are not affiliated with MeitY or any Indian government body. This content is for educational and exam preparation purposes only.
      </div>

      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3F2FD] text-[#2563EB] text-[11px] font-extrabold uppercase tracking-widest border border-[#BFDBFE] shadow-sm mb-4">
              <Shield className="h-3.5 w-3.5 text-[#2563EB]" />
              <span>INDIA DPDP ACT 2023 COMPLIANCE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              DPDP <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Data Protection</span> Practice Tests
            </h1>
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8">
              Practice test sets for Data Protection Fiduciaries, Data Processors, Data Principal rights, and DPDP compliance obligations aligned with official 2023 regulatory rules.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button variant="hero" size="hero" className="px-8 shadow-lg">START DPDP PRACTICE FREE <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link to="/pricing">
                <Button variant="heroOutline" size="hero" className="px-7">VIEW PRICING PLANS</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              {["700+ Questions", "DPDP Act 2023", "DPO Mandate", "Compliance Ready"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /><span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -top-5 right-2 text-blue-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>Data Privacy<br />Officer Prep</span><span className="text-xl">⤵</span>
              </div>
              <div className="relative rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 p-7 text-white shadow-2xl border border-blue-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-blue-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">DPDP ACT 2023</span>
                  <Lock className="h-6 w-6 text-blue-300" />
                </div>
                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div><div className="text-[10px] font-bold text-blue-200">DPDP QUESTIONS</div><div className="text-2xl font-black text-white">700+</div></div>
                    <FileQuestion className="h-8 w-8 text-blue-300" />
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div><div className="text-[10px] font-bold text-blue-200">COMPLIANCE DOMAINS</div><div className="text-2xl font-black text-white">3 Modules</div></div>
                    <Globe className="h-8 w-8 text-indigo-300" />
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-blue-200">
                  <span>Data Fiduciary Obligations</span><span className="text-emerald-400">100% Updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="py-6 sm:py-10 space-y-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">

        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3F2FD] text-[#2563EB] text-[11px] font-extrabold uppercase tracking-widest border border-[#BFDBFE] shadow-sm mb-3">
              <Target className="h-3.5 w-3.5 text-[#2563EB]" /><span>DPDP ACT COMPLIANCE MODULES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">Data Principal &amp; Fiduciary Obligations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dpdpDomains.map((d) => (
              <div key={d.num} className="group rounded-3xl bg-white p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mb-5">{d.num}</div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-blue-600 transition-colors">{d.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed mb-6">{d.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Module</span><ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight mb-2">Frequently Asked Questions</h2>
            <p className="text-sm font-medium text-[#64748B]">Find answers to the most common questions about the DPDP Act</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3" id="accordion">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`rounded-2xl border transition-all duration-200 ${isOpen ? 'border-blue-200 bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setActiveFaq(isOpen ? null : index)}>
                    <span className="font-bold text-sm text-[#0F172A] leading-snug pr-4">{t(faq.key_q, faq.question)}</span>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-blue-100 pt-4">
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

export default Dpdp;
