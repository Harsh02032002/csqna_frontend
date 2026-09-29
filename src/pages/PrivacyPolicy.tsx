import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <div className="mx-auto max-w-4xl px-5 py-12 lg:py-16">
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-sm text-[#64748B] leading-relaxed bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <p>
            At CSQNA, we prioritize your privacy and data security. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our platform.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">1. Information Collection</h2>
          <p>
            We collect personal information such as your name, email address, and practice performance metrics to personalize your certification preparation experience.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">2. Data Security</h2>
          <p>
            Your credentials and test results are protected using modern encryption standards. We do not sell or share your personal data with third-party marketers.
          </p>
          <h2 className="text-lg font-bold text-[#0F172A] mt-6">3. Contact Us</h2>
          <p>
            If you have any questions regarding your personal data or privacy, please reach out to us at <strong className="text-purple-600">support@csqna.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
