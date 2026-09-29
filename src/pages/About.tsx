import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Cloud,
  FileCheck,
  Info,
  Key,
  Network,
  Shield,
  ShieldAlert,
  Target,
  Terminal,
  Users,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import learnerImage from '../assets/csqna-learner.png';

export const About: React.FC = () => {
  const offerItems = [
    { title: "Network Security", Icon: Network, color: "text-blue-500 bg-blue-50 border-blue-100" },
    { title: "Cloud Security", Icon: Cloud, color: "text-cyan-500 bg-cyan-50 border-cyan-100" },
    { title: "Incident Response", Icon: ShieldAlert, color: "text-purple-500 bg-purple-50 border-purple-100" },
    { title: "Vulnerability Assessment & Pen Testing (VAPT)", Icon: Terminal, color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
    { title: "Security Compliance (ISO, NIST)", Icon: FileCheck, color: "text-emerald-500 bg-emerald-50 border-emerald-100" },
    { title: "Risk Management", Icon: BarChart2, color: "text-pink-500 bg-pink-50 border-pink-100" },
    { title: "Cryptography & More", Icon: Key, color: "text-amber-500 bg-amber-50 border-amber-100" },
  ];

  const whyChooseCards = [
    {
      title: "Comprehensive Coverage",
      desc: "From foundational concepts to advanced attack vectors, our tests cover a wide range of cybersecurity topics.",
      Icon: BookOpen,
      theme: "bg-[#F3E8FF] text-[#8B5CF6] border-[#E9D5FF]",
    },
    {
      title: "Real-World Focus",
      desc: "Our content is based on real-world scenarios, preparing you for practical challenges, not just theoretical knowledge.",
      Icon: Target,
      theme: "bg-[#E3F2FD] text-[#2563EB] border-[#BFDBFE]",
    },
    {
      title: "Continuous Learning",
      desc: "Our question bank is regularly updated, ensuring you practice with the most current content.",
      Icon: BarChart2,
      theme: "bg-[#F3E8FF] text-[#9333EA] border-[#E9D5FF]",
    },
    {
      title: "User-Centric Design",
      desc: "CSQNA offers an intuitive and flexible learning experience, personalized to your goals.",
      Icon: Users,
      theme: "bg-[#FCE4EC] text-[#E11D48] border-[#FECDD3]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-2xs mb-4">
              <Info className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>ABOUT CSQNA</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              Empowering You to Navigate the Complex World of Cybersecurity
            </h1>
            
            <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              At CSQNA, we believe that knowledge is the most powerful defense in an increasingly complex and dangerous digital world. Our platform is designed to provide a comprehensive and dynamic learning experience for cybersecurity enthusiasts, students, and professionals alike. Whether you&apos;re just starting your cybersecurity journey or looking to sharpen your expertise, CSQNA offers the tools you need to test your skills and stay ahead of emerging threats.
            </p>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative z-10 w-full max-w-[500px]">
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-purple-50 via-indigo-50/60 to-purple-100/50 p-2 border border-purple-100 shadow-xl flex items-center justify-center">
                <img
                  src={learnerImage}
                  alt="CSQNA Cybersecurity Student"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="py-6 sm:py-10 space-y-12 lg:space-y-16 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WHO WE ARE & OUR MISSION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-[#F5F3FF] border border-purple-100/80 rounded-3xl p-7 sm:p-8 flex items-start gap-5 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-200/80 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-3">Who We Are</h2>
              <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed">
                CSQNA was founded by cybersecurity professionals with decades of experience in protecting digital assets, conducting security audits, and responding to cyber incidents. Our mission is to bridge the gap between theoretical knowledge and real-world application, empowering learners across the globe.
              </p>
            </div>
          </div>

          <div className="bg-[#FDF2F8] border border-pink-100/80 rounded-3xl p-7 sm:p-8 flex items-start gap-5 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-pink-200/80 text-pink-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-3">Our Mission</h2>
              <p className="text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed">
                To make cybersecurity learning accessible, practical, and effective for everyone — from beginners to experienced professionals.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="bg-white rounded-3xl border border-slate-100 p-7 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A]">What We Offer</h2>
            <p className="mt-2 text-xs sm:text-sm font-medium text-[#64748B] leading-relaxed">
              Our platform focuses on providing practice tests and self-assessment tools covering a broad range of cybersecurity topics, including:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {offerItems.map((item) => (
              <div
                key={item.title}
                className="bg-slate-50/80 hover:bg-white border border-slate-100 p-4 rounded-2xl text-center flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md group cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <item.Icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-bold text-[#0F172A] leading-tight">{item.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE CSQNA? */}
        <section className="relative">
          <div className="text-center max-w-2xl mx-auto relative mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-2xs mb-3">
              <Shield className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>WHY CHOOSE US</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] uppercase">
              WHY CHOOSE CSQNA?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${card.theme} flex items-center justify-center mb-4 border`}>
                    <card.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#0F172A] mb-2">{card.title}</h3>
                  <p className="text-xs font-medium text-[#64748B] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN US CTA */}
        <section className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">Join Us on Your Cybersecurity Journey</h2>
          <p className="text-xs sm:text-sm font-medium text-purple-100/80 max-w-xl mx-auto leading-relaxed mb-6">
            Whether preparing for a certification, enhancing skills, or exploring cybersecurity, CSQNA is here to support you.
          </p>
          <Link to="/register">
            <Button size="hero" className="bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-xs px-8 shadow-md border-0">
              GET STARTED NOW <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </section>

      </main>
    </div>
  );
};

export default About;
