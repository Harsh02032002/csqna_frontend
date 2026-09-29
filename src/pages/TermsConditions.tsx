import React from 'react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <div className="mx-auto max-w-4xl px-5 py-12 lg:py-16">
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-6">Terms &amp; Conditions</h1>
        <div className="space-y-4 text-sm text-[#64748B] leading-relaxed bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <p>
            Welcome to CSQNA. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">1. Usage Rights</h2>
          <p>
            All study materials, questions, and content on CSQNA are provided for personal educational use only. Unauthorized distribution or copying is strictly prohibited.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">2. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">3. Disclaimer</h2>
          <p>
            CSQNA is an independent educational tool and is not affiliated with ISACA, ISC², IAPP, EC-Council, or ISO certification bodies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
