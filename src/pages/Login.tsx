import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(username, password);
      if (res.success) {
        navigate('/panel/dashboard');
      } else {
        setError(res.message || 'Invalid username or password.');
      }
    } catch {
      setError('Connection to security auth gateway failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0" style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', background: '#fff', paddingTop: '100px' }}>
      <div className="row g-0 w-100" style={{ minHeight: '100%' }}>
        {/* Left Column - Illustration */}
        <div className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center" style={{ background: '#f5f8fa', padding: '40px' }}>
          <img 
            src="/marketing-assets/images/login/user-login.png" 
            alt="Login Illustration" 
            style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} 
          />
        </div>

        {/* Right Column - Form */}
        <div className="col-lg-5 d-flex align-items-center justify-content-center" style={{ padding: '60px 40px', background: '#fff' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>Log In</h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '35px' }}>Please Enter Your Login Details</p>

            {error && (
              <div className="alert alert-danger" style={{ fontSize: '13px', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email / Username field */}
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                  Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                  placeholder="Enter email or username"
                />
              </div>

              {/* Password field */}
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                  Password
                </label>
                <div className="d-flex align-items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'transparent', border: 'none', color: '#64748b', outline: 'none', cursor: 'pointer', padding: '0 5px' }}
                  >
                    {showPassword ? (
                      /* Eye Slash Icon */
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      /* Eye Icon */
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Verify As Human Checkbox */}
              <div className="form-check mb-4 text-left d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="verifyAsHuman"
                  required
                  style={{ position: 'relative', marginLeft: '0', cursor: 'pointer', width: '16px', height: '16px', marginRight: '8px', marginTop: '0' }}
                />
                <label className="form-check-label" htmlFor="verifyAsHuman" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer', fontWeight: '500', userSelect: 'none' }}>
                  Verify As Human
                </label>
              </div>

              {/* Links */}
              <div className="text-center mb-4" style={{ fontSize: '14px', color: '#475569' }}>
                <div>
                  Don't have an account yet? <Link to="/register" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>Register Now</Link>
                </div>
                <div className="mt-2">
                  <Link to="#" onClick={(e) => { e.preventDefault(); alert('Password reset link has been sent to your email.'); }} style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>
                    Forgot password? Reset Now
                  </Link>
                </div>
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-100 d-flex align-items-center justify-content-between text-white"
                style={{
                  background: 'linear-gradient(to right, #e21b5a, #f2722c)',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 24px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(226, 27, 90, 0.4)',
                  transition: 'opacity 0.2s'
                }}
              >
                <span style={{ flexGrow: 1, textAlign: 'center', marginLeft: '24px' }}>
                  {loading ? 'LOGGING IN...' : 'LOG IN'}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
