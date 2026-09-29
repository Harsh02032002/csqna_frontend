import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BarChart2,
  BookOpen,
  Check,
  FileText,
  GraduationCap,
  Handshake,
  Laptop,
  LayoutGrid,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import learnerImage from '../../../pixel-perfect-path-47/src/assets/csqna-learner.png';

export const Services: React.FC = () => {
  const skillGapCards = [
    {
      num: "01",
      title: "Detailed Performance Insights",
      bullets: [
        "Identify strengths and weaknesses.",
        "Understand current skill levels.",
        "Get a clear performance breakdown.",
      ],
      Icon: FileText,
      theme: {
        badgeBg: "bg-[#8B5CF6]",
        iconBg: "bg-[#F3E8FF]",
        iconBorder: "border-[#E9D5FF]",
        iconColor: "text-[#8B5CF6]",
        checkBg: "bg-[#8B5CF6]",
        btnBg: "bg-[#FAF5FF]",
        btnBorder: "border-[#E9D5FF]",
        btnText: "text-[#8B5CF6]",
        btnHover: "hover:bg-[#8B5CF6]",
      },
    },
    {
      num: "02",
      title: "Customized Study Recommendations",
      bullets: [
        "Focus on improvement areas.",
        "Tailored guidance for certifications.",
        "Personalized learning path.",
      ],
      Icon: GraduationCap,
      theme: {
        badgeBg: "bg-[#EC4899]",
        iconBg: "bg-[#FCE7F3]",
        iconBorder: "border-[#FBCFE8]",
        iconColor: "text-[#EC4899]",
        checkBg: "bg-[#EC4899]",
        btnBg: "bg-[#FDF2F8]",
        btnBorder: "border-[#FBCFE8]",
        btnText: "text-[#EC4899]",
        btnHover: "hover:bg-[#EC4899]",
      },
    },
    {
      num: "03",
      title: "Reporting And Progress Tracking",
      bullets: [
        "Track growth over time.",
        "Receive instant feedback after tests.",
        "Visual reports for better clarity.",
      ],
      Icon: TrendingUp,
      theme: {
        badgeBg: "bg-[#F97316]",
        iconBg: "bg-[#FFEDD5]",
        iconBorder: "border-[#FED7AA]",
        iconColor: "text-[#F97316]",
        checkBg: "bg-[#F97316]",
        btnBg: "bg-[#FFF7ED]",
        btnBorder: "border-[#FED7AA]",
        btnText: "text-[#F97316]",
        btnHover: "hover:bg-[#F97316]",
      },
    },
  ];

  const careerGrowthCards = [
    {
      title: "Personalized Career Training Plans",
      desc: "Get customized learning paths tailored to your goals, skill level, and career aspirations.",
      Icon: FileText,
      theme: {
        iconBg: "bg-[#FFF3E0]",
        iconColor: "text-[#F97316]",
        btnBg: "bg-[#FFF7ED]",
        btnBorder: "border-[#FED7AA]",
        btnText: "text-[#F97316]",
      },
    },
    {
      title: "Ensures Industry-Relevant Cybersecurity Skills",
      desc: "Learn in-demand skills aligned with current industry trends and real-world requirements.",
      Icon: Handshake,
      theme: {
        iconBg: "bg-[#E3F2FD]",
        iconColor: "text-[#2563EB]",
        btnBg: "bg-[#EFF6FF]",
        btnBorder: "border-[#BFDBFE]",
        btnText: "text-[#2563EB]",
      },
    },
    {
      title: "Expert-Led Mentorship And Guidance",
      desc: "Get guidance from certified professionals with real-world experience.",
      Icon: UserCheck,
      theme: {
        iconBg: "bg-[#FCE4EC]",
        iconColor: "text-[#E11D48]",
        btnBg: "bg-[#FFF1F2]",
        btnBorder: "border-[#FECDD3]",
        btnText: "text-[#E11D48]",
      },
    },
    {
      title: "Certification Exam Preparation Support",
      desc: "Access structured resources, practice tests, and expert tips to help you pass confidently.",
      Icon: ShieldCheck,
      theme: {
        iconBg: "bg-[#E8F5E9]",
        iconColor: "text-[#16A34A]",
        btnBg: "bg-[#F0FDF4]",
        btnBorder: "border-[#BBF7D0]",
        btnText: "text-[#16A34A]",
      },
    },
    {
      title: "Easy-To-Use Tools And Hassle-Free Test Creation",
      desc: "Build custom practice tests with ease from our extensive question database.",
      Icon: Laptop,
      theme: {
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#9333EA]",
        btnBg: "bg-[#FAF5FF]",
        btnBorder: "border-[#E9D5FF]",
        btnText: "text-[#9333EA]",
      },
    },
    {
      title: "Practical Hands-On Experience",
      desc: "Gain real-world exposure through simulations and hands-on labs.",
      Icon: Settings,
      theme: {
        iconBg: "bg-[#FFF8E1]",
        iconColor: "text-[#D97706]",
        btnBg: "bg-[#FFFBEB]",
        btnBorder: "border-[#FDE68A]",
        btnText: "text-[#D97706]",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden antialiased">
      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF2FF] text-[#6366F1] text-[11px] font-extrabold uppercase tracking-widest border border-[#E0E7FF] shadow-2xs mb-6">
              <LayoutGrid className="h-3.5 w-3.5 text-[#6366F1]" />
              <span>OUR SERVICES</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] leading-[1.08] tracking-tight uppercase mb-5">
              WE BOOST YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                CYBERSECURITY SKILLS.
              </span>
            </h1>
            
            <p className="text-[#64748B] text-xs sm:text-sm font-bold tracking-wider uppercase leading-relaxed max-w-xl mb-8">
              GET TO KNOW YOUR KNOWLEDGE LEVEL AND SKILL PREPAREDNESS, IDENTIFY THE AREAS YOU NEED TO FOCUS ON FOR SKILL BUILDING. USE THE TESTS TO PRACTICE FOR YOUR UPCOMING EXAMS, INTERVIEWS, AND PRESENTATIONS.
            </p>
            
            <div className="mb-10">
              <Link to="/register">
                <Button size="hero" className="bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-sm px-8 py-3.5 rounded-full shadow-lg border-0 flex items-center gap-2">
                  GET STARTED <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0 shadow-2xs">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">Assess</div>
                  <div className="text-[10px] font-semibold text-[#64748B]">Your Skills</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FCE7F3] text-[#EC4899] flex items-center justify-center shrink-0 shadow-2xs">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">Identify</div>
                  <div className="text-[10px] font-semibold text-[#64748B]">Skill Gaps</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0 shadow-2xs">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">Practice</div>
                  <div className="text-[10px] font-semibold text-[#64748B]">&amp; Improve</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FFEDD5] text-[#F97316] flex items-center justify-center shrink-0 shadow-2xs">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">Achieve</div>
                  <div className="text-[10px] font-semibold text-[#64748B]">Your Goals</div>
                </div>
              </div>
            </div>
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

      {/* Skill Gap Analysis Section */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/70">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A]">
              Skill Gap Analysis
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-semibold text-[#64748B] max-w-lg mx-auto leading-relaxed">
              Identify your strengths, uncover growth areas, and get clear guidance to build cybersecurity mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGapCards.map((card) => (
              <div
                key={card.num}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className={`w-11 h-11 rounded-full ${card.theme.badgeBg} text-white font-extrabold text-sm flex items-center justify-center shadow-md`}>
                      {card.num}
                    </span>
                    <div className={`w-14 h-14 rounded-2xl ${card.theme.iconBg} ${card.theme.iconColor} border ${card.theme.iconBorder} flex items-center justify-center shadow-2xs`}>
                      <card.Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-5 leading-tight">
                    {card.title}
                  </h3>

                  <div className="space-y-3 mb-8">
                    {card.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <span className={`w-5 h-5 rounded-full ${card.theme.checkBg} text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}>
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#475569] leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/register">
                  <Button className={`w-full h-11 rounded-full ${card.theme.btnBg} border ${card.theme.btnBorder} ${card.theme.btnText} font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs border-0`}>
                    GET STARTED <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Growth Training Section */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F172A]">
              Career Growth Training
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-semibold text-[#64748B] max-w-lg mx-auto leading-relaxed">
              Accelerate your cybersecurity career with structured training, mentorship, and practical prep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {careerGrowthCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${card.theme.iconBg} ${card.theme.iconColor} flex items-center justify-center mb-6 shadow-2xs`}>
                    <card.Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-black text-[#0F172A] mb-3 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#64748B] leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <Link to="/pricing">
                  <Button className={`w-full h-10 rounded-full ${card.theme.btnBg} border ${card.theme.btnBorder} ${card.theme.btnText} font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs border-0`}>
                    EXPLORE <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
