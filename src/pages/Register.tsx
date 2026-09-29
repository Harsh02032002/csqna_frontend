import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Toast, ToastType } from '../components/ui/Toast';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ type: ToastType; title?: string; message: string } | null>(null);

  const triggerToast = (type: ToastType, title: string, message: string) => {
    setToast({ type, title, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Pre-validations
    if (!firstName.trim() || !lastName.trim()) {
      const msg = 'Please enter both your First Name and Last Name.';
      setError(msg);
      triggerToast('error', 'Validation Error', msg);
      return;
    }

    if (!username.trim()) {
      const msg = 'Please enter a valid username.';
      setError(msg);
      triggerToast('error', 'Validation Error', msg);
      return;
    }

    if (password.length < 8) {
      const msg = 'Password must be at least 8 characters long (up to 25 characters).';
      setError(msg);
      triggerToast('error', 'Password Too Short', msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match. Please re-check.';
      setError(msg);
      triggerToast('error', 'Password Mismatch', msg);
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      const msg = 'Phone number must be exactly 10 digits.';
      setError(msg);
      triggerToast('error', 'Invalid Phone Number', msg);
      return;
    }

    if (!agreeTnc) {
      const msg = 'You must agree to the Terms & Conditions and Privacy Policy.';
      setError(msg);
      triggerToast('warning', 'Agreement Required', msg);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
        phone: cleanPhone,
        countryCode,
        istncaggreed: agreeTnc,
      });

      if (res.data && res.data.status) {
        const successMsg = 'Registration successful! Please check your email to verify your account.';
        setSuccess(successMsg);
        triggerToast('success', 'Account Created!', successMsg);
        setTimeout(() => navigate('/login'), 4000);
      } else {
        // Backend validation or error message parsing
        let backendErrorMsg = res.data?.message || 'Registration failed.';
        if (res.data?.data && typeof res.data.data === 'object') {
          const fieldErrors = Object.entries(res.data.data)
            .map(([field, msg]) => `${field.replace('_', ' ')}: ${msg}`)
            .join(' | ');
          if (fieldErrors) {
            backendErrorMsg = fieldErrors;
          }
        }
        setError(backendErrorMsg);
        triggerToast('error', 'Registration Failed', backendErrorMsg);
      }
    } catch (err: any) {
      let catchMsg = 'Registration request failed. Please try again.';
      if (err.response?.data?.data && typeof err.response.data.data === 'object') {
        const fieldErrors = Object.entries(err.response.data.data)
          .map(([field, msg]) => `${field.replace('_', ' ')}: ${msg}`)
          .join(' | ');
        if (fieldErrors) catchMsg = fieldErrors;
      } else if (err.response?.data?.message) {
        catchMsg = err.response.data.message;
      }
      setError(catchMsg);
      triggerToast('error', 'Registration Failed', catchMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden flex flex-col justify-between antialiased selection:bg-purple-500 selection:text-white relative">
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={6000}
        />
      )}

      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-2">
          
          {/* Left Artwork */}
          <div className="lg:col-span-5 bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 p-8 sm:p-10 flex flex-col justify-between border-r border-slate-100 text-white">
            <div className="relative z-10">
              <Link to="/" className="flex items-center gap-2">
                <span className="relative grid h-9 w-7 place-items-center text-blue-400">
                  <ShieldCheck className="h-8 w-8" strokeWidth={1.8} />
                  <span className="absolute text-[7px] font-extrabold text-blue-300">Q</span>
                </span>
                <span>
                  <span className="block text-[28px] font-extrabold leading-[0.85] tracking-normal text-red-500">CSQNA</span>
                  <span className="block pt-1 text-[6px] font-extrabold uppercase leading-none text-purple-200">
                    Certification practice made simple
                  </span>
                </span>
              </Link>

              <div className="mt-10">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-purple-200 border border-white/20 mb-3">
                  Free Registration
                </span>
                <h1 className="text-3xl font-black tracking-tight text-white">Create Candidate Account</h1>
                <p className="mt-3 text-xs sm:text-sm text-purple-100/80 font-medium leading-relaxed">
                  Gain instant access to cybersecurity practice tests across 23 domain areas and track your scoring progress.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 text-[11px] text-purple-200/70 font-semibold border-t border-white/10">
              Join thousands of cybersecurity candidates practicing on CSQNA.
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            <div className="max-w-xl mx-auto w-full">
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Register Candidate Account</h2>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Fill in your details below to get started.</p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" autoComplete="off">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="johndoe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1">Phone Number (10 Digits)</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50/50 px-2 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none"
                    >
                      <option value="91">+91 (IN)</option>
                      <option value="1">+1 (US)</option>
                      <option value="44">+44 (UK)</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Password (Min 8 Chars)</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-8 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-3 text-[#64748B] hover:text-[#0F172A]"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-8 py-2.5 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-3 text-[#64748B] hover:text-[#0F172A]"
                      >
                        {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="agreeTnc"
                    required
                    checked={agreeTnc}
                    onChange={(e) => setAgreeTnc(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 cursor-pointer accent-purple-600"
                  />
                  <label htmlFor="agreeTnc" className="text-xs font-semibold text-[#64748B] cursor-pointer select-none">
                    I agree to the{" "}
                    <Link to="/terms-and-conditions" className="text-purple-600 font-bold hover:underline">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="text-purple-600 font-bold hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="hero"
                  className="w-full h-11 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-xs shadow-md mt-2 border-0"
                >
                  {loading ? 'REGISTERING...' : 'CREATE ACCOUNT'} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>

                <div className="pt-3 text-center text-xs font-semibold text-[#64748B] border-t border-slate-100 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-purple-600 font-bold hover:underline">
                    Log In
                  </Link>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Register;
