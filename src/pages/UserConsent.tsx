import React from 'react';

export const UserConsent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <div className="mx-auto max-w-4xl px-5 py-12 lg:py-16">
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-6">User Consent Statement</h1>
        <div className="space-y-4 text-sm text-[#64748B] leading-relaxed bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <p>
            By using the CSQNA platform, you provide explicit consent to the collection and processing of your test responses, analytics data, and account details as described in our Privacy Policy.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">1. Consent Scope</h2>
          <p>
            Consent covers candidate account creation, progress tracking, simulated test scoring, and service communications related to certification exam preparation.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">2. Revocation of Consent</h2>
          <p>
            You may request deletion of your candidate data at any time by contacting our support team at <strong className="text-purple-600">support@csqna.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserConsent;
