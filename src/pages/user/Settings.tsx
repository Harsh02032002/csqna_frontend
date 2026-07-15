import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [fullname, setFullname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFullname(user.name);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg('');
    setLoadingProfile(true);
    try {
      const res = await api.post('/user/update-personal-details', { fullname });
      if (res.data && res.data.status) {
        updateUser({ name: fullname });
        setProfileMsg('Personal credentials updated successfully.');
      } else {
        setProfileMsg(res.data?.message || 'Failed to update credentials.');
      }
    } catch (err: any) {
      setProfileMsg(err.response?.data?.message || 'Personal details update failed.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    if (newPassword !== confirmPassword) {
      setPasswordMsg('New passwords do not match.');
      return;
    }
    setLoadingPassword(true);
    try {
      const res = await api.post('/user/update-password', {
        oldpassword: currentPassword,
        newpassword: newPassword,
      });
      if (res.data && res.data.status) {
        setPasswordMsg('Password security keys updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg(res.data?.message || 'Failed to update password.');
      }
    } catch (err: any) {
      setPasswordMsg(err.response?.data?.message || 'Password key updates failed.');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row column_title page_title">
        <div className="col-md-12">
          <h2 className="rt-pt-10 rt-pb-10" style={{ fontWeight: 'bold', fontSize: '24px', color: '#1a3456' }}>Account Settings</h2>
        </div>
      </div>

      <div className="row">
        {/* Personal Details */}
        <div className="col-md-6 mb-4">
          <form onSubmit={handleUpdateProfile} className="white_card p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h4 className="mb-4" style={{ fontWeight: 'bold', color: '#1a3456' }}>Personal Identity</h4>

            {profileMsg && (
              <div className="alert alert-info" style={{ fontSize: '13px' }}>
                {profileMsg}
              </div>
            )}

            <div className="form-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Username</label>
              <input
                type="text"
                disabled
                value={user?.username || ''}
                className="form-control"
                style={{ borderRadius: '8px', fontSize: '14px', background: '#f9f9f9', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Email Address</label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                className="form-control"
                style={{ borderRadius: '8px', fontSize: '14px', background: '#f9f9f9', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group mb-4">
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Full Name</label>
              <input
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="form-control"
                style={{ borderRadius: '8px', fontSize: '14px' }}
              />
            </div>

            <button
              type="submit"
              disabled={loadingProfile}
              className="btn btn-primary w-100 rt-btn rt-gradient pill text-uppercase"
              style={{ border: 'none', fontWeight: 'bold' }}
            >
              {loadingProfile ? 'Updating...' : 'Update Details'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="col-md-6 mb-4">
          <form onSubmit={handleUpdatePassword} className="white_card p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h4 className="mb-4" style={{ fontWeight: 'bold', color: '#1a3456' }}>Access Key Update</h4>

            {passwordMsg && (
              <div className="alert alert-info" style={{ fontSize: '13px' }}>
                {passwordMsg}
              </div>
            )}

            <div className="form-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="form-control"
                style={{ borderRadius: '8px', fontSize: '14px' }}
                placeholder="••••••••"
              />
            </div>

            <div className="form-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                style={{ borderRadius: '8px', fontSize: '14px' }}
                placeholder="••••••••"
              />
            </div>

            <div className="form-group mb-4">
              <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                style={{ borderRadius: '8px', fontSize: '14px' }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loadingPassword}
              className="btn btn-primary w-100 rt-btn rt-gradient pill text-uppercase"
              style={{ border: 'none', fontWeight: 'bold' }}
            >
              {loadingPassword ? 'Confirming...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
