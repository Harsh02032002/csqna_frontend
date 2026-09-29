import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import api from '../utils/api';

export const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Verifying your email address...');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        if (res.data && res.data.status) {
          setSuccess(true);
          setMessage('Email verified successfully! Redirecting you to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setSuccess(false);
          setMessage(res.data?.message || 'Verification failed. The link might be invalid or expired.');
        }
      } catch (err: any) {
        setSuccess(false);
        setMessage(err.response?.data?.message || 'Verification failed. The link might be invalid or expired.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verify();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col justify-center items-center px-4 py-12 antialiased selection:bg-purple-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 text-center shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
            <h2 className="text-xl font-black text-[#0F172A]">Verifying Email...</h2>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-black text-emerald-600">Verification Successful!</h2>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <XCircle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-black text-rose-600">Verification Failed</h2>
          </div>
        )}

        <p className="text-sm font-medium text-[#64748B] leading-relaxed">
          {message}
        </p>

        {!loading && (
          <div className="pt-2">
            <Link to="/login">
              <Button size="hero" className="w-full bg-gradient-to-r from-[#FF3B30] to-[#FF9500] hover:opacity-95 text-white font-black text-sm py-3.5 rounded-full shadow-lg shadow-orange-500/25 border-0 flex items-center justify-center gap-2">
                GO TO LOGIN <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
