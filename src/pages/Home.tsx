import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart2,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  Database,
  FileQuestion,
  FileText,
  Headphones,
  HelpCircle,
  Layout,
  LayoutGrid,
  Lock,
  Mail,
  Minus,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '../components/ui/button';
const learnerImage = "/assets/images/new/cyber-security.png";

const certifications = [
  { code: "CISA", title: "Certified Information\nSystems Auditor", questions: "1,200+ Questions", domains: "5 Domains", mark: "ring-red", path: "/cisa" },
  { code: "CISM", title: "Certified Information\nSecurity Manager", questions: "1,000+ Questions", domains: "4 Domains", mark: "ring-green", path: "/pricing" },
  { code: "CISSP", title: "Certified Information\nSystems Security Professional", questions: "1,800+ Questions", domains: "8 Domains", mark: "badge-green", path: "/pricing" },
  { code: "CEH", title: "Certified Ethical Hacker", questions: "900+ Questions", domains: "5 Domains", mark: "split", path: "/ceh" },
  { code: "CRISC", title: "Certified in Risk and\nInformation Systems Control", questions: "1,000+ Questions", domains: "4 Domains", mark: "ring-gold", path: "/pricing" },
  { code: "AAIA", title: "Artificial Intelligence\nAudit Associate", questions: "500+ Questions", domains: "4 Domains", mark: "word-purple", path: "/aaia" },
  { code: "CIPP", title: "Certified Information\nPrivacy Professional", questions: "800+ Questions", domains: "4 Domains", mark: "ring-purple", path: "/cipp" },
  { code: "DPDP", title: "Data Protection &\nPrivacy Officer", questions: "700+ Questions", domains: "3 Domains", mark: "ring-blue", path: "/dpdp" },
  { code: "ISO 27001", title: "Information Security\nManagement System", questions: "1,100+ Questions", domains: "6 Domains", mark: "badge-purple", path: "/iso" },
];

function DashboardVisual() {
  return (
    <div className="absolute right-[11%] top-1 z-10 w-[50%] rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-float backdrop-blur-md sm:w-[48%] lg:right-[11%] lg:top-1">
      <div className="grid grid-cols-[0.95fr_1.45fr] gap-2.5">
        <div className="rounded-xl bg-white/90 p-3 shadow-xs border border-slate-200/40">
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">Overall Readiness</p>
          <div className="mx-auto mt-2 grid aspect-square w-20 place-items-center rounded-full bg-[conic-gradient(#14B8A6_0_40%,#2563EB_40%_78%,#EFF6FF_78%)] p-2 shadow-inner">
            <div className="grid h-full w-full place-items-center rounded-full bg-white text-xl font-extrabold text-foreground">78%</div>
          </div>
        </div>
        <div className="rounded-xl bg-white/90 p-3 shadow-xs border border-slate-200/40">
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">Domain Performance</p>
          <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-1.5">
            <svg viewBox="0 0 130 100" className="w-full" aria-label="Domain performance radar chart">
              <g fill="none" stroke="currentColor" className="text-slate-200" strokeWidth="1"><polygon points="65,5 119,38 102,91 28,91 11,38"/><polygon points="65,20 101,42 89,77 41,77 29,42"/><line x1="65" y1="5" x2="65" y2="91"/><line x1="11" y1="38" x2="102" y2="91"/><line x1="119" y1="38" x2="28" y2="91"/></g>
              <polygon points="65,15 103,40 88,78 40,70 30,42" fill="rgba(37, 99, 235, 0.22)" stroke="#2563EB" strokeWidth="2.5"/>
            </svg>
            <div className="space-y-1 text-[5.5px] font-bold text-muted-foreground">{["Governance","Risk Mgmt","Architecture","Operations","Incident Resp"].map((label, i) => <div key={label} className="flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-teal" : "bg-brand-blue"}`}/>{label}</div>)}</div>
          </div>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2.5 rounded-xl bg-white/90 p-2.5 shadow-xs border border-slate-200/40"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-brand-blue shrink-0"><FileQuestion className="h-4 w-4" /></span><span><small className="block text-[7px] font-bold uppercase tracking-wider text-muted-foreground">Questions Practiced</small><b className="text-sm font-extrabold text-foreground">1,250</b></span></div>
        <div className="flex items-center gap-2.5 rounded-xl bg-white/90 p-2.5 shadow-xs border border-slate-200/40"><span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange/15 text-brand-orange shrink-0"><Trophy className="h-4 w-4" /></span><span><small className="block text-[7px] font-bold uppercase tracking-wider text-muted-foreground">Tests Completed</small><b className="text-sm font-extrabold text-foreground">28</b></span></div>
      </div>
    </div>
  );
}

function HeroArtwork() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[720px] lg:h-[512px]">
      <DashboardVisual />
      <p className="absolute left-[2%] top-[14%] z-20 -rotate-6 font-hand text-[26px] font-semibold leading-[0.9] text-brand-blue">Practice<br/>Learn<br/>Grow<br/>Succeed</p>
      <svg className="absolute left-[8%] top-[38%] z-20 h-14 w-14 -rotate-12 text-brand-blue" viewBox="0 0 60 60" fill="none"><path d="M55 5C40 9 22 20 17 42m0 0 12-8M17 42l-2-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      <p className="absolute right-[0px] sm:right-[-10px] lg:right-[-25px] xl:right-[-35px] top-[14%] z-30 hidden rotate-[-4deg] font-hand text-[20px] lg:text-[22px] font-semibold leading-[0.95] text-brand-blue sm:block">Your<br/>Certification<br/>Journey<br/>Starts Here</p>
      <svg className="absolute right-[20px] sm:right-[10px] lg:right-[0px] xl:right-[-10px] top-[34%] z-30 hidden h-14 w-14 lg:h-16 lg:w-16 rotate-12 text-brand-blue sm:block" viewBox="0 0 80 80" fill="none"><path d="M68 8C64 34 46 55 14 60m0 0 11-10M14 60l13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      <div className="absolute bottom-12 right-[1%] z-30 rounded-full border border-white/90 bg-white/95 px-4 py-2 shadow-card backdrop-blur"><div className="flex items-center gap-2.5"><ShieldCheck className="h-6 w-6 text-brand-blue shrink-0"/><span className="text-[8.5px] font-extrabold leading-tight text-foreground">Better<br/>Professionals<br/>A Safer World</span></div></div>
      <img src={learnerImage} alt="Cybersecurity learner studying on a laptop with certification books and a coffee cup" width={1408} height={1104} className="absolute bottom-0 left-[6%] z-20 w-[72%] object-contain sm:left-[7%] sm:w-[70%]" />
      <span className="absolute bottom-[25%] left-[51%] z-30 text-base font-extrabold text-slate-700/60">CSQNA</span>
      <div className="absolute bottom-[12.5%] right-[26.3%] z-40 rotate-[-2deg] flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[7.5px] font-extrabold tracking-tighter text-slate-800 text-center leading-[1.0] uppercase">KEEP<br/>LEARNING</span>
      </div>
      <div className="absolute bottom-0 left-[7%] h-[55%] w-[92%] rounded-[50%] bg-brand-purple/10 blur-2xl" />
    </div>
  );
}

const benefits = ["Real Exam Style Questions", "Detailed Explanations", "Track Your Progress"];

function Hero() {
  return (
    <section id="top" className="hero-surface relative min-h-[540px] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-[radial-gradient(ellipse_at_66%_100%,rgba(139,92,246,0.3),transparent_55%)]" />
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full" viewBox="0 0 1536 220" preserveAspectRatio="none"><path d="M0 107C180 194 320 188 500 131C710 64 856 193 1061 126C1254 63 1376 43 1536 94V220H0Z" fill="rgba(37,99,235,0.1)"/><path d="M0 148C192 215 340 213 535 164C716 118 828 205 1043 156C1260 107 1366 63 1536 117V220H0Z" fill="rgba(139,92,246,0.15)"/></svg>
      <div className="relative z-10 mx-auto grid max-w-[1370px] grid-cols-1 px-5 pb-16 pt-10 lg:grid-cols-[46%_54%] lg:px-8 lg:pb-0 lg:pt-12">
        <div className="z-30 pt-2 lg:pt-3">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-purple/20 bg-white/80 px-3.5 py-1.5 shadow-xs backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-brand-purple animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-brand-purple">THE #1 CYBERSECURITY CERTIFICATION ENGINE</span>
          </div>
          <h1 className="max-w-[650px] text-[43px] font-extrabold leading-[1.07] tracking-normal text-foreground sm:text-[52px] lg:text-[54px] xl:text-[58px]">
            Assess Your<br/><span className="logo-gradient">Cybersecurity Skills</span><br/>with CSQNA
          </h1>
          <p className="mt-4 max-w-[580px] text-[16px] font-medium leading-7 text-foreground/85">Use the Cyber Security Question &amp; Answer platform to build,<br className="hidden sm:block"/> test and sharpen your cybersecurity edge.</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link to="/register"><Button variant="hero" size="hero" className="px-8 shadow-lg">Get Started Free <ArrowRight className="ml-1.5 h-4 w-4" /></Button></Link>
            <a href="#certifications"><Button variant="heroOutline" size="hero" className="px-7"><BookOpen className="mr-1.5 h-4 w-4" /> Explore Certifications</Button></a>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">{benefits.map((benefit) => <span key={benefit} className="flex items-center gap-2 text-[12px] font-bold text-foreground/90"><span className="grid h-5 w-5 place-items-center rounded-full bg-brand-blue text-white shadow-xs"><Check className="h-3 w-3" strokeWidth={3}/></span>{benefit}</span>)}</div>
        </div>
        <HeroArtwork />
      </div>
    </section>
  );
}

const stats = [
  { value: "6,000+", label: "Practice Questions", Icon: BookOpen },
  { value: "9+", label: "Certifications", Icon: Award },
  { value: "10,000+", label: "Learners Target", Icon: Users },
  { value: "95%", label: "Users Recommend Us", Icon: BarChart3 },
];

function Stats() {
  return (
    <div className="relative z-30 mx-auto -mt-12 grid w-[calc(100%-40px)] max-w-[1400px] grid-cols-2 rounded-3xl border border-slate-200/80 bg-white/95 px-4 py-6 shadow-float backdrop-blur-md md:grid-cols-4 md:px-8">
      {stats.map(({ value, label, Icon }, index) => (
        <div key={label} className={`flex min-h-16 items-center justify-center gap-4 px-3 ${index % 2 ? "" : "border-r border-slate-200 md:border-r"} ${index === 1 ? "md:border-r" : ""} ${index === 2 ? "border-r md:border-r" : ""}`}>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue shrink-0 shadow-xs">
            <Icon className="h-6 w-6" strokeWidth={2}/>
          </div>
          <span>
            <strong className="block text-[24px] font-black leading-none text-foreground">{value}</strong>
            <small className="mt-1 block text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{label}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

function CertificationLogo({ code, mark }: { code: string; mark: string }) {
  if (mark === "ring-red") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-[#DC2626] bg-white shadow-xs">
        <span className="text-[12px] font-black tracking-tight text-slate-900">{code}</span>
      </div>
    );
  }
  if (mark === "ring-green") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-[#16A34A] bg-white shadow-xs">
        <span className="text-[12px] font-black tracking-tight text-slate-900">{code}</span>
      </div>
    );
  }
  if (mark === "ring-gold") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-[#EA580C] bg-white shadow-xs">
        <span className="text-[11px] font-black tracking-tighter text-slate-900">{code}</span>
      </div>
    );
  }
  if (mark === "ring-purple") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-[#7C3AED] bg-white shadow-xs">
        <span className="text-[12px] font-black tracking-tight text-slate-900">{code}</span>
      </div>
    );
  }
  if (mark === "ring-blue") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-[#2563EB] bg-white shadow-xs">
        <span className="text-[11px] font-black tracking-tighter text-slate-900">{code}</span>
      </div>
    );
  }
  if (mark === "badge-green") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0D652D] text-[12px] font-black uppercase tracking-wider text-white shadow-md">
        CISSP
      </div>
    );
  }
  if (mark === "badge-purple") {
    return (
      <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-[#6D28D9] text-center text-[10px] font-black uppercase leading-tight text-white shadow-md">
        ISO<br/>27001
      </div>
    );
  }
  if (mark === "split") {
    return (
      <div className="flex h-16 items-center justify-center text-[32px] font-black tracking-tighter leading-none">
        <span className="font-black text-slate-900">C</span>
        <span className="mx-0.5 font-light text-[#DC2626]">|</span>
        <span className="font-black text-slate-900">EH</span>
      </div>
    );
  }
  return (
    <div className="flex h-16 items-center justify-center text-[32px] font-black tracking-tighter leading-none text-[#6D28D9]">
      AAIA
    </div>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="relative overflow-hidden pt-10 pb-14 bg-[#F8FAFC]">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-100/30 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-[1480px] px-5 text-center lg:px-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[11px] font-extrabold uppercase tracking-widest border border-brand-purple/20">
          <Award className="h-3.5 w-3.5" /> OUR CERTIFICATIONS
        </span>
        <h2 className="mt-3 text-[28px] font-extrabold tracking-tight sm:text-[34px] text-foreground">
          Choose Your Certification. Start Practicing Today.
        </h2>
        <p className="mt-2 text-[14px] font-medium text-muted-foreground max-w-2xl mx-auto">
          Practice with high-quality, exam-focused questions and detailed explanations for every answer.
        </p>
        
        <div className="no-scrollbar mt-10 flex snap-x gap-6 overflow-x-auto pb-4 text-left">
          {certifications.map((cert) => (
            <article key={cert.code} className="group flex min-h-[320px] w-[calc((100%-100px)/6)] min-w-[230px] snap-start flex-col items-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-card backdrop-blur-md transition-all duration-300 hover:shadow-float hover:-translate-y-1.5 hover:border-brand-purple/40">
              <div className="flex h-20 w-full items-center justify-center transition-transform group-hover:scale-105 duration-300">
                <CertificationLogo code={cert.code} mark={cert.mark}/>
              </div>
              <h3 className="mt-3 text-[16px] font-extrabold text-foreground group-hover:text-brand-purple transition-colors">{cert.code}</h3>
              <p className="mt-1 min-h-[36px] whitespace-pre-line text-[11.5px] font-medium leading-[1.35] text-muted-foreground">{cert.title}</p>
              
              <div className="mt-4 w-full space-y-2 rounded-2xl border border-slate-200/60 bg-slate-50 p-3 text-left text-[11px] font-bold text-foreground/85">
                <p className="flex items-center gap-2"><FileQuestion className="h-4 w-4 shrink-0 text-brand-purple"/>{cert.questions}</p>
                <p className="flex items-center gap-2"><Trophy className="h-4 w-4 shrink-0 text-brand-purple"/>{cert.domains}</p>
              </div>

              <Link to={cert.path} className="mt-5 w-full">
                <Button variant="hero" className="h-10 w-full text-xs font-bold shadow-md group-hover:shadow-lg transition-all">Start Practicing <ArrowRight className="ml-1 h-3.5 w-3.5"/></Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function KeyFeatures() {
  const features = [
    {
      num: "01",
      title: "Test Skills",
      desc: "Reading theory alone isn't enough. Continuously challenge yourself with exam-simulated questions to sharpen your cybersecurity job readiness.",
      Icon: Target,
      color: "from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]",
      pills: [
        { label: "Exam Simulation", Icon: Sparkles, color: "bg-[#EFF6FF] text-[#3B82F6]" },
        { label: "Instant Analytics", Icon: Check, color: "bg-[#E6FFFA] text-[#0D9488]" }
      ]
    },
    {
      num: "02",
      title: "Easy-to-Use Platform",
      desc: "CSQNA is a trusted global test platform. Our user-friendly interface ensures a seamless, distraction-free practice experience from start to finish.",
      Icon: Layout,
      color: "from-[#A855F7] via-[#D946EF] to-[#EC4899]",
      pills: [
        { label: "Zero Latency", Icon: Zap, color: "bg-[#F5F3FF] text-[#8B5CF6]" },
        { label: "Distraction Free", Icon: Layout, color: "bg-[#FFF7ED] text-[#EA580C]" }
      ]
    },
    {
      num: "03",
      title: "Certify",
      desc: "Build complete mastery for certifications like CISA, CISM, CISSP, CEH, DPDP & ISO 27001 with domain-focused question banks.",
      Icon: Award,
      color: "from-[#EA580C] via-[#F97316] to-[#F59E0B]",
      pills: [
        { label: "9+ Pathways", Icon: Award, color: "bg-[#FFF7ED] text-[#EA580C]" },
        { label: "Domain Focus", Icon: Target, color: "bg-[#FDF2F8] text-[#EC4899]" }
      ]
    },
    {
      num: "04",
      title: "Free Sign-Up",
      desc: "Experience seamless test management with CSQNA's free tier. Gain instant access to practice tests, domain metrics, and score cards.",
      Icon: UserCheck,
      color: "from-[#0D9488] via-[#10B981] to-[#059669]",
      pills: [
        { label: "Instant Access", Icon: UserCheck, color: "bg-[#E0F2FE] text-[#0284C7]" },
        { label: "Free Scorecards", Icon: BarChart3, color: "bg-[#EEF2FF] text-[#6366F1]" }
      ]
    },
    {
      num: "05",
      title: "Email Confirmation",
      desc: "CSQNA adds robust account authentication and encryption to ensure your candidate profile, performance data, and test analytics remain 100% secure.",
      Icon: Lock,
      color: "from-[#0284C7] via-[#06B6D4] to-[#10B981]",
      pills: [
        { label: "Encrypted Profile", Icon: Lock, color: "bg-[#ECFDF5] text-[#10B981]" },
        { label: "Privacy First", Icon: ShieldCheck, color: "bg-[#F5F3FF] text-[#8B5CF6]" }
      ]
    },
    {
      num: "06",
      title: "24/7 Customer Support",
      desc: "Our expert support team is available 24/7 to guide you through certification prep. Connect directly via email or our dedicated live helpdesk.",
      Icon: Headphones,
      color: "from-[#E11D48] via-[#F43F5E] to-[#EC4899]",
      pills: [
        { label: "Human Support", Icon: Headphones, color: "bg-[#FFF1F2] text-[#F43F5E]" },
        { label: "Rapid Helpdesk", Icon: Mail, color: "bg-[#EFF6FF] text-[#3B82F6]" }
      ]
    }
  ];

  return (
    <section className="relative py-14 bg-[#F8FAFC] overflow-hidden">
      <div className="pointer-events-none absolute -right-28 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-[1370px] px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-[#F3E8FF] text-[#9333EA] text-[11px] font-extrabold uppercase tracking-widest border border-[#E9D5FF] mb-4">
            PLATFORM STRENGTHS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Key Features
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
            Designed specifically for cybersecurity candidates preparing for certification success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.num}
              className="group rounded-[28px] border border-slate-100 bg-white p-7 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <f.Icon className="h-7 w-7" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-[#EDF2F7] text-[#64748B] text-[11px] font-black tracking-widest uppercase">
                    FEATURE {f.num}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-2.5 leading-snug">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-[1.65]">
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-2">
                {f.pills.map((pill) => (
                  <span key={pill.label} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${pill.color}`}>
                    <pill.Icon className="h-3.5 w-3.5" /> {pill.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelOverview() {
  const panelFeatures = [
    { title: "Easy Dashboard Management", Icon: LayoutGrid, bg: "bg-[#EFF6FF]", color: "text-[#2563EB]" },
    { title: "Contribute Question Bank", Icon: FileText, bg: "bg-[#FFE4E6]", color: "text-[#F43F5E]" },
    { title: "Real-Time Reporting & Updates", Icon: BarChart2, bg: "bg-[#DCFCE7]", color: "text-[#16A34A]" },
    { title: "Advanced Search & Filters", Icon: Search, bg: "bg-[#FFEDD5]", color: "text-[#EA580C]" },
    { title: "Secure & Reliable", Icon: Database, bg: "bg-[#F3E8FF]", color: "text-[#9333EA]" },
    { title: "24/7 Support Integration", Icon: Headphones, bg: "bg-[#CCFBF1]", color: "text-[#0D9488]" },
  ];

  return (
    <section className="py-14 bg-[#F8FAFC] relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-purple-100/30 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-10 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-12 lg:gap-14 items-center">
          
          <div>
            <h2 className="text-4xl sm:text-[52px] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-4">
              Panel Overview
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-lg mb-8">
              Once you sign up, you get your own personal candidate panel—a smart and user-friendly platform designed to simplify your practice test management.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
              {panelFeatures.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3.5 p-4 rounded-[20px] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`h-11 w-11 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-xs`}>
                    <item.Icon className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <Link to="/register">
                <Button
                  className="h-13 px-9 rounded-full bg-gradient-to-r from-[#9333EA] via-[#E11D48] to-[#F97316] text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center gap-2.5 group"
                >
                  Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative pt-4 lg:pt-0">
            <div className="relative rounded-[32px] bg-gradient-to-br from-slate-50/80 via-purple-50/20 to-blue-50/40 p-4 sm:p-6 border border-slate-100 shadow-sm overflow-hidden min-h-[520px] flex flex-col justify-between">
              
              <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] p-4 sm:p-5 w-full">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600 fill-blue-600/20" />
                    <span className="text-sm font-black tracking-tight text-slate-900">CSQNA</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200/60 px-3 py-1.5 text-xs text-slate-400 w-full max-w-[240px]">
                    <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Search tests, certifications, or topics...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative grid h-8 w-8 place-items-center rounded-full bg-slate-50 text-slate-600 border border-slate-200/60">
                      <Bell className="h-4 w-4" />
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white font-bold text-xs shadow-xs">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[130px_1fr] gap-4">
                  <div className="space-y-1 pr-2 border-r border-slate-100">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-100/70 text-purple-700 font-extrabold text-[11px]">
                      <LayoutGrid className="h-3.5 w-3.5" /> Dashboard
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-900 font-bold text-[11px]">
                      <FileText className="h-3.5 w-3.5" /> Practice Tests
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-900 font-bold text-[11px]">
                      <BarChart2 className="h-3.5 w-3.5" /> Performance
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-900 font-bold text-[11px]">
                      <Database className="h-3.5 w-3.5" /> Question Bank
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-blue-50 p-3 border border-purple-100/60">
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Welcome Back!</h4>
                        <p className="text-[10px] font-medium text-slate-500">Keep practicing. You&apos;re on the right track!</p>
                      </div>
                      <div className="h-8 w-10 rounded-lg bg-purple-600/10 flex items-center justify-center text-purple-600">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <div className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-lg bg-blue-100 text-blue-600">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">Practice Tests</span>
                        <strong className="text-sm font-black text-slate-900 block leading-tight">42</strong>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <div className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
                          <TrendingUp className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">Average Score</span>
                        <strong className="text-sm font-black text-slate-900 block leading-tight">89.4%</strong>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <div className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-lg bg-pink-100 text-pink-600">
                          <Target className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">Current Streak</span>
                        <strong className="text-sm font-black text-slate-900 block leading-tight">15 Days</strong>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
                        <div className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-lg bg-amber-100 text-amber-600">
                          <Trophy className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 block">Certifications</span>
                        <strong className="text-sm font-black text-slate-900 block leading-tight">9+</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-2 flex items-end justify-between">
                <div className="relative w-[78%] sm:w-[72%] shrink-0 -mb-6 ml-2">
                  <img
                    src={learnerImage}
                    alt="CSQNA Candidate Student studying with laptop and books"
                    className="w-full object-contain filter drop-shadow-md"
                  />
                </div>

                <div className="relative pb-6 pr-2 sm:pr-4 text-right">
                  <p className="font-hand text-xl sm:text-2xl font-bold leading-[0.95] text-blue-600 tracking-tight">
                    Practice<br/>
                    Learn<br/>
                    Grow<br/>
                    Succeed
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const faqsList = [
  { question: "What services does your platform provide?", answer: "We have a database of over 20,000 questions, offering you a resource to create cybersecurity practice tests which help you to understand your knowledge and skill and your preparedness for certification exams like CISA, CISSP, CISM and CEH." },
  { question: "How does the skill assessment work?", answer: "Users can create practice tests to assess their knowledge. Select from 23 domain areas or select the Certification which you want to prepare for. The results provide detailed insights to help improve their skills." },
  { question: "Can I earn certifications on your platform?", answer: "Yes! We can provide a certificate for the tests you have taken on our platform and your overall score. However, for certifications like CISA, CISSP etc you have to give the official exam for that certification." },
  { question: "How long is my data stored on the platform?", answer: "Your data is saved for 7 days by default. Paid users have their data stored for up to 6 months." },
  { question: "Can I access my past test results?", answer: "Yes, if you've paid for data retention, you can view all your past results within the 6-month retention period." },
  { question: "Are the practice tests updated regularly?", answer: "Absolutely! Our tests are frequently updated to align with the latest certification standards and industry trends." },
  { question: "Is there a cost for accessing the platform?", answer: "No! There is no cost for accessing the platform. The cost is applied only if you want us to store your test results for more than a week." },
  { question: "What types of tests are available?", answer: "We offer practice tests in 23 cybersecurity domains. Our certification questions cover CISA, CISSP, CEH, CIPP & many other certifications." },
  { question: "Can I retake the tests?", answer: "Yes! You can retake the tests any number of times. You can repeat a previous test within 48 hours. After 48 hours, the test will expire and you will have to re-create it." },
  { question: "Do you offer career assistance?", answer: "Yes, we have highly experienced cybersecurity experts to help and provide guidance. We also have a Jobs Site you can use. Feel free to connect via email to consult@csqna.com." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 bg-[#F8FAFC] relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-100/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1380px] px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[55%_45%] gap-8 lg:gap-14 items-start">
          
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] text-[#9333EA] text-[11px] font-extrabold uppercase tracking-widest border border-[#E9D5FF] mb-4 shadow-xs">
              <HelpCircle className="h-3.5 w-3.5" /> HELP &amp; FAQS
            </span>
            
            <h2 className="text-4xl sm:text-[50px] font-[900] tracking-tight text-slate-900 leading-[1.1] mb-3">
              Frequently Asked Questions
            </h2>
            
            <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-xl mb-8">
              Find detailed answers to common queries regarding test practice, score reports, and data retention.
            </p>

            <div className="space-y-3">
              {faqsList.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const qNum = idx + 1 < 10 ? `Q0${idx + 1}` : `Q${idx + 1}`;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-200 overflow-hidden hover:shadow-md"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer gap-4 group"
                    >
                      <div className="flex items-center gap-3 pr-2">
                        <span className="text-xs font-black tracking-wider text-[#9333EA] shrink-0">
                          {qNum}
                        </span>
                        <span className="text-sm sm:text-[15px] font-extrabold text-slate-900 group-hover:text-[#9333EA] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isOpen
                            ? "bg-gradient-to-r from-[#9333EA] to-[#E11D48] text-white shadow-xs"
                            : "bg-purple-50 text-purple-600 group-hover:bg-purple-100"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" strokeWidth={3} />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={3} />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100/70 bg-slate-50/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative pt-4 lg:pt-0">
            <div className="sticky top-24 rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl border border-purple-800/40">
              <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-purple-200 border border-white/20 mb-4">
                Got Questions?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Need Help Selecting the Right Practice Test?
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-purple-100/80 font-medium leading-relaxed">
                Contact our cybersecurity experts to get guidance on certification paths, exam domain coverage, and practice strategies.
              </p>
              <div className="mt-8 space-y-4">
                <a href="mailto:support@csqna.com" className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10">
                  <Mail className="h-5 w-5 text-purple-300" />
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-200">Email Support</span>
                    <strong className="text-xs text-white font-bold">support@csqna.com</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased">
      <Hero />
      <Stats />
      <Certifications />
      <KeyFeatures />
      <PanelOverview />
      <FAQSection />
    </div>
  );
};

export default Home;
