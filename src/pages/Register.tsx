import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTnc) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone,
        countryCode,
        istncaggreed: agreeTnc,
      });
      if (res.data && res.data.status) {
        setSuccess('Registration successful! Please check your email to verify your account.');
        setTimeout(() => navigate('/login'), 5000);
      } else {
        setError(res.data?.message || 'Registration failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration request failed.');
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
            alt="Register Illustration" 
            style={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }} 
          />
        </div>

        {/* Right Column - Form */}
        <div className="col-lg-5 d-flex align-items-center justify-content-center" style={{ padding: '60px 40px', background: '#fff' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>Register</h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '30px' }}>Create your CSQNA assessment account</p>

            {error && (
              <div className="alert alert-danger" style={{ fontSize: '13px', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" style={{ fontSize: '13px', borderRadius: '8px' }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Username field */}
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                  placeholder="e.g. john_doe"
                />
              </div>

              {/* First Name and Last Name fields */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px' }}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                      placeholder="e.g. John"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px' }}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                      placeholder="e.g. Doe"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address field */}
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                  placeholder="e.g. john@example.com"
                />
              </div>

              {/* Password and Confirm Password fields */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', position: 'relative' }}>
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px', position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                      Confirm Password
                    </label>
                    <div className="d-flex align-items-center">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ background: 'transparent', border: 'none', color: '#64748b', outline: 'none', cursor: 'pointer', padding: '0 5px' }}
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone and Country Code fields */}
              <div className="row g-2 mb-3">
                <div className="col-4">
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px' }}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                      Code
                    </label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', paddingRight: '20px', cursor: 'pointer' }}
                    >
                      <option value="91">+91 (IN)</option>
                      <option value="1">+1 (US/CA)</option>
                      <option value="44">+44 (UK)</option>
                      <option value="971">+971 (AE)</option>
                      <option value="61">+61 (AU)</option>
                      <option value="65">+65 (SG)</option>
                      <option value="93">+93 (AF)</option>
                      <option value="355">+355 (AL)</option>
                      <option value="213">+213 (DZ)</option>
                      <option value="254">+254 (KE)</option>
                      <option value="234">+234 (NG)</option>
                      <option value="92">+92 (PK)</option>
                      <option value="27">+27 (ZA)</option>
                      <option value="64">+64 (NZ)</option>
                      <option value="60">+60 (MY)</option>
                      <option value="86">+86 (CN)</option>
                      <option value="81">+81 (JP)</option>
                      <option value="82">+82 (KR)</option>
                      <option value="49">+49 (DE)</option>
                      <option value="33">+33 (FR)</option>
                      <option value="39">+39 (IT)</option>
                      <option value="34">+34 (ES)</option>
                      <option value="7">+7 (RU)</option>
                      <option value="55">+55 (BR)</option>
                      <option value="54">+54 (AR)</option>
                      <option value="52">+52 (MX)</option>
                      <option value="966">+966 (SA)</option>
                      <option value="20">+20 (EG)</option>
                      <option value="233">+233 (GH)</option>
                      <option value="255">+255 (TZ)</option>
                      <option value="256">+256 (UG)</option>
                      <option value="30">+30 (GR)</option>
                      <option value="31">+31 (NL)</option>
                      <option value="46">+46 (SE)</option>
                      <option value="47">+47 (NO)</option>
                      <option value="358">+358 (FI)</option>
                      <option value="45">+45 (DK)</option>
                      <option value="41">+41 (CH)</option>
                      <option value="43">+43 (AT)</option>
                      <option value="32">+32 (BE)</option>
                      <option value="351">+351 (PT)</option>
                      <option value="353">+353 (IE)</option>
                      <option value="90">+90 (TR)</option>
                      <option value="62">+62 (ID)</option>
                      <option value="63">+63 (PH)</option>
                      <option value="84">+84 (VN)</option>
                      <option value="66">+66 (TH)</option>
                    </select>
                  </div>
                </div>
                <div className="col-8">
                  <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px 16px' }}>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '2px', fontWeight: '500', textTransform: 'none' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      style={{ background: 'transparent', border: 'none', width: '100%', outline: 'none', color: '#0f172a', fontSize: '14px', padding: '0' }}
                      placeholder="Enter 10-digit number"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="form-check mb-4 text-left d-flex align-items-start">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTnc"
                  required
                  checked={agreeTnc}
                  onChange={(e) => setAgreeTnc(e.target.checked)}
                  style={{ position: 'relative', marginLeft: '0', cursor: 'pointer', width: '16px', height: '16px', marginRight: '8px', marginTop: '4px' }}
                />
                <label className="form-check-label" htmlFor="agreeTnc" style={{ fontSize: '12px', color: '#475569', cursor: 'pointer', fontWeight: '500', userSelect: 'none', lineHeight: '1.4' }}>
                  I have read and accept the CSQNA{' '}
                  <a href="https://csqna.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>Terms & Conditions</a>,{' '}
                  <a href="https://csqna.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>Privacy Policy</a> and the{' '}
                  <a href="https://csqna.com/user-consent-agreement" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>User Consent Agreement</a>.
                  I grant my consent for my data to be electronically processed and securely stored. My data will not be shared with third parties without my explicit authorization.
                </label>
              </div>

              {/* Already have an account link */}
              <div className="text-center mb-4" style={{ fontSize: '14px', color: '#475569' }}>
                <div>
                  Already have an account? <Link to="/login" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>Log in</Link>
                </div>
              </div>

              {/* Register Button */}
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
                  {loading ? 'PROCESSING...' : 'REGISTER'}
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

export default Register;
