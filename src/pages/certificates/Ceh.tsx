import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileQuestion,
  Minus,
  Plus,
  ShieldAlert,
  Target,
  Terminal,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export const Ceh: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the difference between CEH and CEH Practical?",
      answer: "CEH multiple-choice is a 4-hour conceptual and method-based assessment. CEH Practical is a 6-hour hands-on challenge in a live lab environment where you must exploit hosts, analyze payloads, and solve 20 penetration challenges. Earning both grants the CEH Master title."
    },
    {
      question: "How difficult is the CEH exam?",
      answer: "CEH is moderately challenging. Preparing requires solid networking foundations, knowledge of port scanning metrics, payload design, and command-line usage of key pentesting utilities like Nmap, Metasploit, Wireshark, and Hashcat."
    },
    {
      question: "What is the retake policy?",
      answer: "If you fail, there is no waiting period for the first retake. However, subsequent retakes require a 14-day waiting period. There is a maximum limit of 5 attempts per year, and exam retake fees apply."
    }
  ];

  const cehDomains = [
    { num: "01", title: "Footprinting & Reconnaissance", weight: "18% Exam Weight", desc: "OSINT gathering, DNS enumeration, network scanning, and target profiling." },
    { num: "02", title: "Vulnerability Analysis & Exploitation", weight: "22% Exam Weight", desc: "Nessus analysis, Metasploit payload development, buffer overflows, and privilege escalation." },
    { num: "03", title: "Web App & Wireless Security", weight: "20% Exam Weight", desc: "SQL injection, XSS, CSRF vulnerabilities, WPA3 attacks, and web app firewalls." },
    { num: "04", title: "Malware & Threat Vectors", weight: "20% Exam Weight", desc: "Ransomware mechanics, trojans, rootkits, steganography, and reverse engineering basics." },
    { num: "05", title: "Cryptography & Cloud Security", weight: "20% Exam Weight", desc: "Public key infrastructure, AES encryption, cloud computing threats, and container security." },
  ];

  const examMetrics = [
    { title: 'Exam Duration', desc: 'Candidates will have exactly 4 Hours (240 minutes) to complete the theoretical exam.' },
    { title: 'Questions', desc: 'Consists of 125 Multiple-Choice Questions testing knowledge of security controls and tools.' },
    { title: 'Passing Score', desc: 'Varies dynamically based on exam difficulty, typically ranging between 60% and 85%.' },
    { title: 'Testing Format', desc: 'Delivered online via the ECC Exam Portal or at authorized Pearson VUE testing centers.' },
    { title: 'Exam Version', desc: 'Currently testing version v12, featuring updated modules on OT hacking and cloud threats.' },
    { title: 'Maintenance', desc: 'Requires reporting a minimum of 120 ECE credits every 3 years to maintain active credential.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">
      
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-800">
        <span className="font-bold">⚠️ Disclaimer:</span> We are not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with EC-Council.
      </div>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E0] text-[#F97316] text-[11px] font-extrabold uppercase tracking-widest border border-[#FED7AA] shadow-sm mb-4">
              <Terminal className="h-3.5 w-3.5 text-[#F97316]" />
              <span>EC-COUNCIL CEH CERTIFICATION PREP</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              CEH <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-purple-600">Ethical Hacker</span> Practice Tests
            </h1>
            
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mb-8">
              Prepare for the Certified Ethical Hacker exam with 900+ tactical practice questions covering reconnaissance, vulnerability analysis, exploitation techniques, malware threats, and cloud security.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/register">
                <Button variant="hero" size="hero" className="px-8 shadow-lg">
                  START CEH PRACTICE FREE <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="heroOutline" size="hero" className="px-7">
                  VIEW PRICING PLANS
                </Button>
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
              {["900+ Questions", "5 Hacking Modules", "Real Threat Vectors", "CEH v12 Blueprint"].map((f) => (
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
              <div className="absolute -top-5 right-2 text-orange-600 font-extrabold text-xs tracking-wider rotate-6 flex items-center gap-1 z-20">
                <span>Tactical Prep<br />CEH v12 Ready</span>
                <span className="text-xl">⤵</span>
              </div>

              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-stone-900 to-red-950 p-7 text-white shadow-2xl border border-orange-500/20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-orange-300 text-[10px] font-extrabold uppercase tracking-widest border border-white/10">EC-COUNCIL CEH</span>
                  <Terminal className="h-6 w-6 text-orange-400" />
                </div>

                <div className="space-y-4 my-6">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-orange-200">TACTICAL QUESTIONS</div>
                      <div className="text-2xl font-black text-white">900+</div>
                    </div>
                    <FileQuestion className="h-8 w-8 text-orange-300" />
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-orange-200">MODULE BREAKDOWN</div>
                      <div className="text-2xl font-black text-white">5 Modules</div>
                    </div>
                    <ShieldAlert className="h-8 w-8 text-red-300" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-orange-200">
                  <span>Questions: 125 Mocks</span>
                  <span className="text-emerald-400">CEH v12 Aligned</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E0] text-[#F97316] text-[11px] font-extrabold uppercase tracking-widest border border-[#FED7AA] shadow-sm mb-3">
              <Target className="h-3.5 w-3.5 text-[#F97316]" />
              <span>TACTICAL MODULES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
              CEH 5 Official Exam Modules
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-[#64748B]">
              Master the core modules specified in the EC-Council CEH v12 framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cehDomains.map((d) => (
              <div key={d.num} className="group rounded-3xl bg-white p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 font-black text-sm flex items-center justify-center">
                      {d.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-extrabold">
                      {d.weight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug group-hover:text-orange-600 transition-colors">
                    {d.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed mb-6">
                    {d.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                  <span>Practice Module Questions</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAM METRICS SECTION */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E0] text-[#F97316] text-[11px] font-extrabold uppercase tracking-widest border border-[#FED7AA] shadow-sm mb-3">
              <FileQuestion className="h-3.5 w-3.5 text-[#F97316]" />
              <span>EXAM METRICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">CEH Exam Details</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {examMetrics.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-orange-200 hover:bg-orange-50/40 transition-colors">
                <h3 className="text-base font-bold text-orange-700 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ELIGIBILITY SECTION */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E0] text-[#F97316] text-[11px] font-extrabold uppercase tracking-widest border border-[#FED7AA] shadow-sm mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#F97316]" />
              <span>ELIGIBILITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] leading-tight">Requirements to Appear</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Self-Study Path",
                items: [
                  "Must document a minimum of 2 years of professional work experience in information security.",
                  "Pay a non-refundable eligibility application processing fee of $100 USD.",
                  "EC-Council reviews and verifies credentials before approving voucher purchases.",
                ]
              },
              {
                title: "Training Path",
                items: [
                  "Attend an official EC-Council training course (in-person, online, or self-paced).",
                  "The 2-year work experience prerequisite is fully waived upon course completion.",
                  "Voucher can be purchased immediately after concluding the training modules.",
                ]
              }
            ].map((path) => (
              <div key={path.title} className="rounded-3xl bg-white border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-orange-700 mb-4">{path.title}</h3>
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
            <p className="text-sm font-medium text-[#64748B]">Find answers to the most common questions about the CEH certification</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3" id="accordion">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 ${isOpen ? 'border-orange-200 bg-orange-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span className="font-bold text-sm text-[#0F172A] leading-snug pr-4">{faq.question}</span>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-orange-100 pt-4">
                      {faq.answer}
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

export default Ceh;
