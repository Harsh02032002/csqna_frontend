import React, { useState, useRef } from 'react';
import api from '../../utils/api';

export const UploadQuestions: React.FC = () => {
  const [practiceFile, setPracticeFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [practiceMsg, setPracticeMsg] = useState('');
  const [practiceMsgType, setPracticeMsgType] = useState<'success' | 'error'>('success');
  const [certMsg, setCertMsg] = useState('');
  const [certMsgType, setCertMsgType] = useState<'success' | 'error'>('success');
  const [uploadingPractice, setUploadingPractice] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [practiceDragOver, setPracticeDragOver] = useState(false);
  const [certDragOver, setCertDragOver] = useState(false);
  const practiceInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  const handlePracticeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceFile) return;
    setUploadingPractice(true);
    setPracticeMsg('');
    const formData = new FormData();
    formData.append('files', practiceFile);
    try {
      const res = await api.post('/admin/uploadpractice', formData);
      if (res.data && res.data.status) {
        setPracticeMsgType('success');
        setPracticeMsg(`✅ ${practiceFile.name} uploaded successfully! Questions added to database.`);
        setPracticeFile(null);
        if (practiceInputRef.current) practiceInputRef.current.value = '';
      } else {
        setPracticeMsgType('error');
        setPracticeMsg(res.data?.message || 'Upload failed.');
      }
    } catch (err: any) {
      setPracticeMsgType('error');
      setPracticeMsg(err.response?.data?.message || 'Error uploading practice database.');
    } finally {
      setUploadingPractice(false);
    }
  };

  const handleCertUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certFile) return;
    setUploadingCert(true);
    setCertMsg('');
    const formData = new FormData();
    formData.append('files', certFile);
    try {
      const res = await api.post('/admin/uploadcertification', formData);
      if (res.data && res.data.status) {
        setCertMsgType('success');
        setCertMsg(`✅ ${certFile.name} uploaded successfully! Certification questions added.`);
        setCertFile(null);
        if (certInputRef.current) certInputRef.current.value = '';
      } else {
        setCertMsgType('error');
        setCertMsg(res.data?.message || 'Upload failed.');
      }
    } catch (err: any) {
      setCertMsgType('error');
      setCertMsg(err.response?.data?.message || 'Error uploading certification database.');
    } finally {
      setUploadingCert(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'practice' | 'cert') => {
    e.preventDefault();
    if (type === 'practice') setPracticeDragOver(false);
    else setCertDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      if (type === 'practice') setPracticeFile(file);
      else setCertFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    height: '100%',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const uploadZoneStyle = (isDragOver: boolean, hasFile: boolean): React.CSSProperties => ({
    border: `2px dashed ${isDragOver ? '#3b82f6' : hasFile ? '#10b981' : '#cbd5e1'}`,
    borderRadius: '14px',
    padding: '32px 20px',
    textAlign: 'center',
    background: isDragOver ? '#eff6ff' : hasFile ? '#f0fdf4' : '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontWeight: '800', fontSize: '26px', color: '#0f172a', margin: 0 }}>Upload Database</h2>
        <p style={{ color: '#94a3b8', margin: '6px 0 0', fontSize: '14px' }}>
          Import question banks to power Practice & Certification assessments
        </p>
      </div>

      {/* Required Format Info */}
      <div style={{
        background: 'linear-gradient(135deg, #0f3460, #1a3456)',
        borderRadius: '16px',
        padding: '20px 28px',
        marginBottom: '28px',
        color: '#fff',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div style={{ fontSize: '28px' }}>📋</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 6px', fontWeight: '700', fontSize: '15px' }}>Required Excel Column Format</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['Category', 'Area', 'Question', 'Option1-4', 'CorrectOption1-4', 'Justification1-4', 'QuestionType', 'DifficultyLevel'].map(col => (
              <span key={col} style={{
                fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
                background: 'rgba(255,255,255,0.15)', color: '#e2e8f0', fontFamily: 'monospace'
              }}>{col}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* ─── Practice Questions Card ─── */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0
              }}>📝</div>
              <div>
                <h4 style={{ margin: 0, fontWeight: '700', fontSize: '17px', color: '#0f172a' }}>Practice Questions</h4>
                <p style={{ margin: '2px 0 0', color: '#94a3b8', fontSize: '12px' }}>MCQ & MSQ format questions</p>
              </div>
            </div>

            {practiceMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: practiceMsgType === 'success' ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${practiceMsgType === 'success' ? '#bbf7d0' : '#fecaca'}`,
                color: practiceMsgType === 'success' ? '#166534' : '#991b1b',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {practiceMsg}
              </div>
            )}

            <form onSubmit={handlePracticeUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {/* Drop Zone */}
              <div
                style={uploadZoneStyle(practiceDragOver, !!practiceFile)}
                onClick={() => practiceInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setPracticeDragOver(true); }}
                onDragLeave={() => setPracticeDragOver(false)}
                onDrop={(e) => handleDrop(e, 'practice')}
              >
                <input
                  ref={practiceInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  style={{ display: 'none' }}
                  onChange={(e) => setPracticeFile(e.target.files?.[0] || null)}
                />
                {practiceFile ? (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
                    <p style={{ margin: 0, fontWeight: '700', color: '#166534', fontSize: '14px' }}>{practiceFile.name}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6b7280' }}>
                      {formatFileSize(practiceFile.size)} · Click to change
                    </p>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📂</div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                      Drag & drop or click to select
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>Supports .xlsx files only</p>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={!practiceFile || uploadingPractice}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: practiceFile && !uploadingPractice
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    : '#e2e8f0',
                  color: practiceFile && !uploadingPractice ? '#fff' : '#94a3b8',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: practiceFile && !uploadingPractice ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {uploadingPractice ? (
                  <>
                    <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Uploading...
                  </>
                ) : (
                  <>📤 Publish Practice Questions</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ─── Certification Modules Card ─── */}
        <div className="col-md-6">
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0
              }}>🏆</div>
              <div>
                <h4 style={{ margin: 0, fontWeight: '700', fontSize: '17px', color: '#0f172a' }}>Certification Modules</h4>
                <p style={{ margin: '2px 0 0', color: '#94a3b8', fontSize: '12px' }}>CISA · CEH · DPDP · CIPP · AAIA · ISO 27001</p>
              </div>
            </div>

            {certMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: certMsgType === 'success' ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${certMsgType === 'success' ? '#bbf7d0' : '#fecaca'}`,
                color: certMsgType === 'success' ? '#166534' : '#991b1b',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {certMsg}
              </div>
            )}

            <form onSubmit={handleCertUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {/* Drop Zone */}
              <div
                style={uploadZoneStyle(certDragOver, !!certFile)}
                onClick={() => certInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setCertDragOver(true); }}
                onDragLeave={() => setCertDragOver(false)}
                onDrop={(e) => handleDrop(e, 'cert')}
              >
                <input
                  ref={certInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  style={{ display: 'none' }}
                  onChange={(e) => setCertFile(e.target.files?.[0] || null)}
                />
                {certFile ? (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
                    <p style={{ margin: 0, fontWeight: '700', color: '#166534', fontSize: '14px' }}>{certFile.name}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6b7280' }}>
                      {formatFileSize(certFile.size)} · Click to change
                    </p>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📂</div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                      Drag & drop or click to select
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>Supports .xlsx files only</p>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={!certFile || uploadingCert}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: certFile && !uploadingCert
                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                    : '#e2e8f0',
                  color: certFile && !uploadingCert ? '#fff' : '#94a3b8',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: certFile && !uploadingCert ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {uploadingCert ? (
                  <>
                    <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Uploading...
                  </>
                ) : (
                  <>🏆 Publish Certification Questions</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UploadQuestions;
