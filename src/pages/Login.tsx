import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Toast, ToastType } from '../components/ui/Toast';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verifyHuman, setVerifyHuman] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; title?: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      const msg = 'Please enter both your username and password.';
      setError(msg);
      setToast({ type: 'error', title: 'Missing Credentials', message: msg });
      return;
    }

    setLoading(true);
    try {
      const res = await login(username, password);
      if (res.success) {
        setToast({ type: 'success', title: 'Login Successful', message: 'Welcome back!' });
        navigate('/panel/dashboard');
      } else {
        const msg = res.message || 'Invalid username or password.';
        setError(msg);
        setToast({ type: 'error', title: 'Authentication Failed', message: msg });
      }
    } catch {
      const msg = 'Connection to security auth gateway failed.';
      setError(msg);
      setToast({ type: 'error', title: 'Network Error', message: msg });
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
          duration={5000}
        />
      )}

      <main className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Artwork */}
          <div className="lg:col-span-6 bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-r border-slate-100 text-white">
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

              <div className="mt-12">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-purple-200 border border-white/20 mb-3">
                  Candidate Gateway
                </span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Assess Your Cybersecurity Edge</h1>
                <p className="mt-4 text-xs sm:text-sm text-purple-100/80 font-medium leading-relaxed max-w-md">
                  Sign in to access your practice tests, track domain readiness, review explanations, and prepare for official certification exams.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 text-xs font-semibold text-purple-200/70">
              Trusted by 10,000+ cybersecurity professionals worldwide.
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Candidate Login</h2>
              <p className="mt-1 text-xs font-semibold text-[#64748B]">Enter your credentials to access your dashboard.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Username or Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#64748B]" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username or email@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-[#0F172A]">Password</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#64748B]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-3 text-xs font-semibold focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#64748B] hover:text-[#0F172A]"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="verifyHuman"
                    required
                    checked={verifyHuman}
                    onChange={(e) => setVerifyHuman(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 cursor-pointer accent-purple-600"
                  />
                  <label htmlFor="verifyHuman" className="text-xs font-semibold text-[#64748B] cursor-pointer select-none">
                    I verify that I am human
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="hero"
                  className="w-full h-12 bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-xs shadow-md mt-2 border-0"
                >
                  {loading ? 'LOGGING IN...' : 'LOG IN TO ACCOUNT'} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>

                <div className="pt-4 text-center text-xs font-semibold text-[#64748B] border-t border-slate-100 mt-6">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-purple-600 font-bold hover:underline">
                    Create free account
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

export default Login;
