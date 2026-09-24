import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  ShieldCheck,
  Shield
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [fullname, setFullname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFullname(user.name || user.email || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setLoadingProfile(true);
    try {
      const res = await api.post('/user/update-personal-details', { fullname });
      if (res.data && res.data.status) {
        updateUser({ name: fullname });
        setProfileMsg({ type: 'success', text: 'Personal credentials updated successfully.' });
      } else {
        setProfileMsg({ type: 'error', text: res.data?.message || 'Failed to update credentials.' });
      }
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.response?.data?.message || 'Personal details update failed.' });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setLoadingPassword(true);
    try {
      const res = await api.post('/user/update-password', {
        oldpassword: currentPassword,
        newpassword: newPassword,
      });
      if (res.data && res.data.status) {
        setPasswordMsg({ type: 'success', text: 'Password security keys updated successfully.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: res.data?.message || 'Failed to update password.' });
      }
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.response?.data?.message || 'Password update failed.' });
    } finally {
      setLoadingPassword(false);
    }
  };

  const rawUser = user?.name || user?.email || 'harshdeepbca503@gmail.com';
  const displayEmail = user?.email || (rawUser.includes('@') ? rawUser : `${rawUser}@gmail.com`);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", color: '#0f172a' }}>
      
      {/* ── 1. HERO TOP BANNER (Exact Screenshot Header) ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eefc 45%, #f5eefd 100%)',
        borderRadius: '26px', padding: '24px 30px', marginBottom: '24px',
        border: '1px solid #e0e7ff', boxShadow: '0 8px 30px rgba(124,58,237,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px'
      }}>
        
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '18px',
            background: '#ffffff', color: '#7c3aed', display: 'grid', placeItems: 'center',
            boxShadow: '0 4px 16px rgba(124,58,237,0.12)', flexShrink: 0
          }}>
            <SettingsIcon size={28} />
          </div>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.8px' }}>
              Account Settings
            </h1>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b', fontWeight: '500' }}>
              Manage your account information and keep your profile secure.
            </p>
          </div>
        </div>

        {/* Right Section: 3D Gear & Shield Graphic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '24px',
            background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
            display: 'grid', placeItems: 'center', color: '#ffffff',
            boxShadow: '0 12px 30px rgba(124,58,237,0.35)', border: '4px solid #ffffff'
          }}>
            <Shield size={38} fill="#ffffff" color="#6366f1" />
          </div>
        </div>

      </div>

      {/* ── 2. MAIN 2-COLUMN GRID (Personal Info vs Change Password) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* ── LEFT CARD: Personal Information ── */}
        <div style={{
          background: '#ffffff', borderRadius: '24px', padding: '28px',
          border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center', flexShrink: 0
            }}>
              <User size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: '#0f172a' }}>
                Personal Information
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748b', fontWeight: '500' }}>
                Update your account details and personal information.
              </p>
            </div>
          </div>

          {profileMsg && (
            <div style={{
              padding: '12px 16px', borderRadius: '12px', marginBottom: '18px',
              background: profileMsg.type === 'success' ? '#dcfce7' : '#ffe4e6',
              color: profileMsg.type === 'success' ? '#16a34a' : '#dc2626',
              fontSize: '12.5px', fontWeight: '700'
            }}>
              {profileMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Username */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type="text"
                  readOnly
                  disabled
                  value={displayEmail}
                  style={{
                    width: '100%', padding: '10px 14px 10px 40px', borderRadius: '14px',
                    background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '13.5px',
                    color: '#64748b', fontWeight: '500', outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type="email"
                  readOnly
                  disabled
                  value={displayEmail}
                  style={{
                    width: '100%', padding: '10px 14px 10px 40px', borderRadius: '14px',
                    background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '13.5px',
                    color: '#64748b', fontWeight: '500', outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type="text"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px 10px 40px', borderRadius: '14px',
                    background: '#ffffff', border: '1.5px solid #cbd5e1', fontSize: '13.5px',
                    color: '#0f172a', fontWeight: '600', outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loadingProfile}
              style={{
                width: '100%', padding: '12px', marginTop: '6px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                color: '#ffffff', border: 'none', borderRadius: '14px', cursor: 'pointer',
                fontWeight: '800', fontSize: '13.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 6px 20px rgba(124,58,237,0.25)', transition: 'all 0.2s ease'
              }}
            >
              <Save size={16} /> {loadingProfile ? 'Updating...' : 'Update Details'}
            </button>
          </form>
        </div>

        {/* ── RIGHT CARD: Change Password ── */}
        <div style={{
          background: '#ffffff', borderRadius: '24px', padding: '28px',
          border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center', flexShrink: 0
            }}>
              <Lock size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: '#0f172a' }}>
                Change Password
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748b', fontWeight: '500' }}>
                Keep your account secure with a strong password.
              </p>
            </div>
          </div>

          {passwordMsg && (
            <div style={{
              padding: '12px 16px', borderRadius: '12px', marginBottom: '18px',
              background: passwordMsg.type === 'success' ? '#dcfce7' : '#ffe4e6',
              color: passwordMsg.type === 'success' ? '#16a34a' : '#dc2626',
              fontSize: '12.5px', fontWeight: '700'
            }}>
              {passwordMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Current Password */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Current Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••"
                  style={{
                    width: '100%', padding: '10px 40px 10px 40px', borderRadius: '14px',
                    background: '#ffffff', border: '1.5px solid #cbd5e1', fontSize: '13.5px',
                    color: '#0f172a', fontWeight: '600', outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  style={{ position: 'absolute', right: '14px', top: '10px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••"
                  style={{
                    width: '100%', padding: '10px 40px 10px 40px', borderRadius: '14px',
                    background: '#ffffff', border: '1.5px solid #cbd5e1', fontSize: '13.5px',
                    color: '#0f172a', fontWeight: '600', outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  style={{ position: 'absolute', right: '14px', top: '10px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Confirm New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••"
                  style={{
                    width: '100%', padding: '10px 40px 10px 40px', borderRadius: '14px',
                    background: '#ffffff', border: '1.5px solid #cbd5e1', fontSize: '13.5px',
                    color: '#0f172a', fontWeight: '600', outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  style={{ position: 'absolute', right: '14px', top: '10px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loadingPassword}
              style={{
                width: '100%', padding: '12px', marginTop: '6px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                color: '#ffffff', border: 'none', borderRadius: '14px', cursor: 'pointer',
                fontWeight: '800', fontSize: '13.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 6px 20px rgba(124,58,237,0.25)', transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={16} /> {loadingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Settings;
