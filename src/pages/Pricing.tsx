import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Calendar,
  Check,
  Crown,
  FileText,
  Infinity as InfinityIcon,
  Laptop,
  Minus,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Tag,
  UserCheck,
} from 'lucide-react';
import { Button } from '../components/ui/button';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased selection:bg-purple-500 selection:text-white">
      {/* Main Container */}
      <main className="py-10 lg:py-14 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto relative mb-10 sm:mb-14">
          
          {/* Handwritten Overlay Left */}
          <div className="hidden lg:flex absolute -left-36 top-2 text-purple-600 font-extrabold text-xs tracking-wider rotate-[-8deg] items-center gap-1">
            <span>Learn<br />Practice<br />Grow</span>
            <span className="text-xl">⤵</span>
          </div>

          {/* Handwritten Overlay Right */}
          <div className="hidden lg:flex absolute -right-36 top-2 text-purple-600 font-extrabold text-xs tracking-wider rotate-[8deg] items-center gap-1">
            <span>Invest<br />in Your<br />Skills</span>
            <span className="text-xl">⤵</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-2xs mb-4">
            <Tag className="h-3.5 w-3.5 text-[#6366F1]" />
            <span>SIMPLE • FLEXIBLE • VALUE FOR ALL</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] leading-tight">
            Pricing Plans
          </h1>
          <p className="mt-3 text-sm sm:text-base font-medium text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Choose the plan that fits your learning requirements.
          </p>
        </div>

        {/* Pricing Comparison Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="p-6 sm:p-8 w-[32%] bg-slate-50/50 align-bottom">
                    <div className="bg-[#EEF2FF]/60 p-4 rounded-2xl border border-[#E0E7FF]/60">
                      <h3 className="text-xl font-bold text-[#0F172A]">Features</h3>
                      <p className="text-xs font-semibold text-[#64748B] mt-0.5">Everything you need to succeed</p>
                    </div>
                  </th>

                  {/* PREMIUM Header */}
                  <th className="p-6 sm:p-8 w-[22.5%] text-center align-bottom border-l border-slate-100">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100/60 text-cyan-600 mb-3">
                      <span className="text-xl">💎</span>
                    </div>
                    <h3 className="text-xl font-black text-cyan-600 uppercase tracking-tight">PREMIUM</h3>
                    <div className="mt-2">
                      <span className="text-2xl font-black text-[#0F172A]">INR 750/-</span>
                      <p className="text-[11px] font-semibold text-[#64748B] mt-0.5">Billed as one payment for 6 months.</p>
                    </div>
                  </th>

                  {/* PLUS Header (MOST POPULAR) */}
                  <th className="p-6 sm:p-8 w-[23%] text-center align-bottom border-x-2 border-t-2 border-purple-500 bg-purple-50/20 relative shadow-xs">
                    <div className="inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md mb-3 items-center gap-1 whitespace-nowrap">
                      <Sparkles className="h-3 w-3 text-purple-200" /> MOST POPULAR
                    </div>
                    
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 mb-3">
                      <Crown className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-purple-600 uppercase tracking-tight">PLUS</h3>
                    <div className="mt-2">
                      <span className="text-2xl font-black text-[#0F172A]">INR 550/-</span>
                      <p className="text-[11px] font-semibold text-[#64748B] mt-0.5">Billed as one payment for 3 months.</p>
                    </div>
                  </th>

                  {/* BASIC Header */}
                  <th className="p-6 sm:p-8 w-[22.5%] text-center align-bottom border-l border-slate-100">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/60 text-emerald-600 mb-3">
                      <span className="text-xl">🎓</span>
                    </div>
                    <h3 className="text-xl font-black text-emerald-600 uppercase tracking-tight">BASIC</h3>
                    <div className="mt-2">
                      <span className="text-2xl font-black text-[#0F172A]">Free Forever</span>
                      <p className="text-[11px] font-semibold text-[#64748B] mt-0.5">Start practicing without card</p>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                
                {/* Row 1: Unlimited Practice Tests */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <InfinityIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Unlimited Practice Tests</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Practice as many timed tests as you want. Test Your Skills in 23 CyberSec Categories.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg bg-purple-50/20 border-x-2 border-purple-500/50"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                </tr>

                {/* Row 2: Detailed Analytical Reports */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <BarChart2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Detailed Analytical Reports</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Per-test performance breakdown: domain-wise strengths &amp; weaknesses.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg bg-purple-50/20 border-x-2 border-purple-500/50"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                </tr>

                {/* Row 3: Restart Ongoing Assessments */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                        <PlayCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Restart Ongoing Assessments</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Pause &amp; resume tests from where you left off within 24–48hrs.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg bg-purple-50/20 border-x-2 border-purple-500/50"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                </tr>

                {/* Row 4: Saved Reports */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-pink-100/80 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Saved Reports</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Keeps your scoring history for reference.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center text-xs font-semibold text-[#64748B] max-w-[180px] mx-auto">
                    6 months. After that all old reports are archived and shared on request.
                  </td>
                  <td className="p-5 text-center text-xs font-semibold text-[#64748B] max-w-[180px] mx-auto bg-purple-50/20 border-x-2 border-purple-500/50">
                    3 months. After that all old reports are archived and shared on request.
                  </td>
                  <td className="p-5 text-center text-xs font-semibold text-[#64748B] max-w-[180px] mx-auto">
                    1 month. After that all old reports are archived and shared on request.
                  </td>
                </tr>

                {/* Row 5: Certification Simulators */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Laptop className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Certification Simulators</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Mock exams that mimic real certification conditions.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg bg-purple-50/20 border-x-2 border-purple-500/50"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-slate-400 font-bold"><Minus className="h-5 w-5 mx-auto text-slate-300" /></td>
                </tr>

                {/* Row 6: Schedule Your Certification Test */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Schedule Your Certification Test</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Book simulated proctored sessions.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-emerald-600 font-bold text-lg bg-purple-50/20 border-x-2 border-purple-500/50"><Check className="h-5 w-5 mx-auto text-emerald-600 stroke-[3]" /></td>
                  <td className="p-5 text-center text-slate-400 font-bold"><Minus className="h-5 w-5 mx-auto text-slate-300" /></td>
                </tr>

                {/* Row 7: Priority Support & Mentoring */}
                <tr>
                  <td className="p-5 sm:p-6 bg-slate-50/30">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">Priority Support &amp; Mentoring</div>
                        <div className="text-[11px] text-[#64748B] font-medium leading-snug mt-0.5">
                          Faster help and optional mentor guidance.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                      <span>(1-to-1 mentoring is Paid)</span>
                    </div>
                  </td>
                  <td className="p-5 text-center bg-purple-50/20 border-x-2 border-purple-500/50">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                      <span>(1-to-1 mentoring is Paid)</span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                      <span>(1-to-1 mentoring is Paid)</span>
                    </div>
                  </td>
                </tr>

                {/* Row 8: Action Buttons (Get Started) */}
                <tr className="border-t border-slate-200">
                  <td className="p-5 sm:p-6 bg-slate-50/50">
                    <div className="font-extrabold text-[#0F172A]">Get Started</div>
                    <div className="text-xs text-[#64748B] font-medium mt-0.5">
                      Choose your plan and start your preparation today.
                    </div>
                  </td>
                  
                  {/* PREMIUM CTA */}
                  <td className="p-5 text-center">
                    <Link to="/register">
                      <Button variant="outline" className="w-full border-2 border-blue-500 text-blue-600 font-extrabold text-xs rounded-xl h-11 hover:bg-blue-50">
                        REGISTER NOW
                      </Button>
                    </Link>
                  </td>

                  {/* PLUS CTA */}
                  <td className="p-5 text-center bg-purple-50/20 border-x-2 border-b-2 border-purple-500 rounded-b-2xl">
                    <Link to="/register">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs rounded-xl h-11 shadow-md border-0">
                        REGISTER NOW
                      </Button>
                    </Link>
                  </td>

                  {/* BASIC CTA */}
                  <td className="p-5 text-center">
                    <Link to="/register">
                      <Button variant="outline" className="w-full border-2 border-emerald-500 text-emerald-600 font-extrabold text-xs rounded-xl h-11 hover:bg-emerald-50">
                        START FOR FREE
                      </Button>
                    </Link>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Table Footer Bar */}
          <div className="bg-slate-50 p-4 px-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-[#64748B]">
            <div className="flex items-center gap-2 text-indigo-600">
              <ShieldCheck className="h-4 w-4" />
              <span>Trusted by thousands of cybersecurity aspirants</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Practice</span>
              <span>•</span>
              <span>Improve</span>
              <span>•</span>
              <span>Get Certified</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Pricing;
