import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 100px)', background: '#f8fafc', paddingTop: '100px' }}>
      <div className="card text-center shadow-lg border-0 p-5" style={{ maxWidth: '500px', width: '100%', borderRadius: '16px', background: '#fff' }}>
        <div className="card-body">
          {loading ? (
            <div className="mb-4">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : success ? (
            <div className="mb-4 text-success" style={{ color: '#22c55e' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>
          ) : (
            <div className="mb-4 text-danger" style={{ color: '#ef4444' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg>
            </div>
          )}

          <h3 className={`mb-3 ${success ? 'text-success' : !loading ? 'text-danger' : 'text-dark'}`} style={{ fontWeight: 'bold' }}>
            {success ? 'Success!' : !loading ? 'Failed!' : 'Verifying...'}
          </h3>
          <p className="text-secondary mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>{message}</p>

          {!loading && (
            <Link to="/login" className="btn text-white w-100 py-3 px-4" style={{ background: 'linear-gradient(to right, #e21b5a, #f2722c)', borderRadius: '50px', fontWeight: 'bold', border: 'none', display: 'block', textDecoration: 'none' }}>
              Go to Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
