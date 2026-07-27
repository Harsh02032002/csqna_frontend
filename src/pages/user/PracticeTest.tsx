import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

/* ─── helpers ────────────────────────────────────────────────────────────────── */
const getOptionsArray = (options: any): { key: string; text: string }[] => {
  if (!options) return [];
  if (Array.isArray(options)) return options.map((o: any) => ({ key: o.id || o.text, text: o.text || o.id }));
  return Object.entries(options)
    .filter(([, val]) => val && String(val).trim() !== '')
    .map(([key, val]) => ({ key, text: String(val) }));
};

const formatTime = (s: number) =>
  `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

/* ─── Circular progress ring ─────────────────────────────────────────────────── */
const ScoreRing: React.FC<{ pct: number; passed: boolean }> = ({ pct, passed }) => {
  const r = 68, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = passed ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#f87171';
  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
      <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="12"
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)', filter: `drop-shadow(0 0 8px ${color}88)` }} />
    </svg>
  );
};

/* ─── SVG Icons ──────────────────────────────────────────────────────────────── */
const IconCheck = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconX     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconArrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconFlag  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;

const LABELS = ['A', 'B', 'C', 'D', 'E'];

export const PracticeTest: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [testData, setTestData]             = useState<any>(null);
  const [currentIdx, setCurrentIdx]         = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [remainingTime, setRemainingTime]   = useState(0);
  const [loading, setLoading]               = useState(true);
  const [submitting, setSubmitting]         = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [reportData, setReportData]         = useState<any>(null);
  const [errorMessage, setErrorMessage]     = useState('');
  const [showReview, setShowReview]         = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.patch('/user/practice/start', { testid: testId });
        if (res.data?.status && res.data?.data) {
          setTestData(res.data.data);
          setRemainingTime((res.data.data.duration || 40) * 60);
          const init: Record<string, string[]> = {};
          res.data.data.testQuestions?.forEach((q: any) => {
            if (q.userAnswer) init[q._id] = Array.isArray(q.userAnswer) ? q.userAnswer : [q.userAnswer];
          });
          setSelectedAnswers(init);
        } else {
          setErrorMessage('Failed to start test session.');
        }
      } catch (err: any) {
        setErrorMessage(err.response?.data?.message || 'Error starting test.');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [testId]);

  useEffect(() => {
    if (remainingTime > 0 && !reportData) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) { clearInterval(timerRef.current!); handleSubmitTest(); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [remainingTime, reportData]);

  const handleOptionSelect = async (qId: string, optText: string, isMulti = false) => {
    let cur = selectedAnswers[qId] || [];
    if (isMulti) {
      cur = cur.includes(optText) ? cur.filter(a => a !== optText) : [...cur, optText];
    } else {
      cur = [optText];
    }
    setSelectedAnswers({ ...selectedAnswers, [qId]: cur });
    try {
      await api.post('/user/practice/saveresponse', { testId, questionId: qId, answer: cur });
    } catch { /* silent */ }
  };

  const handleSubmitTest = async () => {
    setSubmitting(true);
    setShowConfirm(false);
    try {
      const res = await api.post('/user/practice/submittest', { testId });
      if (res.data?.status && res.data?.data) {
        setReportData(res.data.data);
      } else {
        setErrorMessage('Failed to submit test.');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Error submitting test.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading ─────────────────────────────────────────────────────────── */
  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '20px' }}>
      <style>{`@keyframes ptSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes ptPulse{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      <div style={{ width: '52px', height: '52px', border: '4px solid #ede9fe', borderTop: '4px solid #7c3aed', borderRadius: '50%', animation: 'ptSpin 0.9s linear infinite' }} />
      <p style={{ color: '#7c3aed', fontWeight: '600', fontSize: '14px', animation: 'ptPulse 1.4s ease infinite' }}>Preparing your test session…</p>
    </div>
  );

  if (errorMessage && !reportData) return (
    <div style={{ maxWidth: '500px', margin: '60px auto', background: '#fff', borderRadius: '20px', padding: '40px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Something went wrong</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>{errorMessage}</p>
      <button onClick={() => navigate('/panel/create')}
        style={{ padding: '12px 28px', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
        ← Back to Create Test
      </button>
    </div>
  );

  /* ══ SCORE REPORT ════════════════════════════════════════════════════════ */
  if (reportData) {
    const totalQ     = testData?.testQuestions?.length || 0;
    const correct    = reportData.correctAnswers || 0;
    const wrong      = totalQ - correct;
    const scoreVal   = parseFloat(reportData.score?.toFixed(1) || '0.0');
    const passed     = scoreVal >= 70;
    const statusColor = passed ? '#4ade80' : scoreVal >= 50 ? '#fbbf24' : '#f87171';
    const statusBg   = passed ? 'rgba(74,222,128,0.15)' : scoreVal >= 50 ? 'rgba(251,191,36,0.15)' : 'rgba(248,113,113,0.15)';

    return (
      <div style={{ maxWidth: '860px', margin: '0 auto', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
        <style>{`
          @keyframes ptFadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes ptSpin    { from{transform:rotate(0)} to{transform:rotate(360deg)} }
          @keyframes ptPop     { 0%{transform:scale(.8);opacity:0} 70%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
          @keyframes ptShine   { from{left:-100%} to{left:200%} }
          .pt-result-card      { animation: ptFadeUp .5s ease both; }
          .pt-stat-box         { transition: transform .2s ease, box-shadow .2s ease; }
          .pt-stat-box:hover   { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.12) !important; }
          .pt-btn-primary      { transition: all .2s ease; }
          .pt-btn-primary:hover{ transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.4) !important; }
          .pt-btn-ghost:hover  { background: #f1f5f9 !important; }
          .pt-review-row       { transition: background .15s ease; }
          .pt-review-row:hover { background: #f8fafc !important; }
        `}</style>

        {/* ── Hero Score Card ── */}
        <div className="pt-result-card" style={{
          background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#1a1035 100%)',
          borderRadius: '24px', padding: '40px', color: '#fff',
          marginBottom: '20px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(15,23,42,0.4)',
          animationDelay: '0s',
        }}>
          {/* bg glows */}
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,.35) 0%,transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '60px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%)', pointerEvents: 'none' }} />

          {/* header */}
          <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2.5px', fontWeight: '700' }}>ASSESSMENT COMPLETE</p>
          <h2 style={{ margin: '0 0 32px', fontSize: '20px', fontWeight: '800', color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.3px' }}>
            {testData?.testname}
          </h2>

          {/* ring + stats row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px', flexWrap: 'wrap' }}>
            {/* Ring */}
            <div style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
              <ScoreRing pct={scoreVal} passed={passed} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '38px', fontWeight: '900', color: statusColor, lineHeight: 1, letterSpacing: '-2px', animation: 'ptPop .6s ease .3s both' }}>
                  {scoreVal}%
                </span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', fontWeight: '600', marginTop: '4px' }}>FINAL SCORE</span>
              </div>
            </div>

            {/* stat boxes */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', flex: 1 }}>
              {[
                { label: 'Total Questions', value: totalQ, icon: '📋', color: '#c4b5fd', bg: 'rgba(196,181,253,0.12)' },
                { label: 'Correct', value: correct, icon: '✅', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
                { label: 'Incorrect', value: wrong, icon: '❌', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
                { label: 'Accuracy', value: `${totalQ > 0 ? Math.round((correct/totalQ)*100) : 0}%`, icon: '🎯', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
              ].map((s, i) => (
                <div key={i} className="pt-stat-box" style={{ background: s.bg, border: `1px solid ${s.color}33`, borderRadius: '16px', padding: '16px 20px', minWidth: '110px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', animation: `ptFadeUp .4s ease ${0.1 + i * 0.08}s both` }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{s.icon}</div>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: s.color, letterSpacing: '-0.5px' }}>{s.value}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: '0.8px' }}>{s.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status badge */}
          <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '8px 20px', borderRadius: '40px',
              background: statusBg, border: `1px solid ${statusColor}55`,
              color: statusColor, fontWeight: '800', fontSize: '13px', letterSpacing: '1px',
            }}>
              {passed ? <IconCheck /> : <IconX />}
              {passed ? 'PASSED' : scoreVal >= 50 ? 'AVERAGE' : 'NEEDS IMPROVEMENT'}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
              {passed ? 'Great work! You passed this assessment.' : 'Keep practicing — you\'ll get there!'}
            </span>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="pt-result-card" style={{ display: 'flex', gap: '12px', marginBottom: '20px', animationDelay: '.15s' }}>
          <button onClick={() => navigate('/panel/reports')} className="pt-btn-ghost"
            style={{ flex: 1, padding: '14px', background: '#fff', border: '2px solid #e2e8f0', borderRadius: '14px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', color: '#475569', transition: 'all .2s ease' }}>
            📊 View All Reports
          </button>
          <button onClick={() => setShowReview(r => !r)} className="pt-btn-ghost"
            style={{ flex: 1, padding: '14px', background: '#fff', border: '2px solid #e2e8f0', borderRadius: '14px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', color: '#475569', transition: 'all .2s ease' }}>
            {showReview ? '▲ Hide Review' : '📝 Question Review'}
          </button>
          <button onClick={() => navigate('/panel/create')} className="pt-btn-primary"
            style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', border: 'none', borderRadius: '14px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>
            ⚡ New Test →
          </button>
        </div>

        {/* ── Question Review ── */}
        {showReview && (
          <div className="pt-result-card" style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', animationDelay: '.2s' }}>
            <h4 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📝 Question Review
              <span style={{ background: '#ede9fe', color: '#7c3aed', fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>
                {testData?.testQuestions?.length} questions
              </span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {testData?.testQuestions?.map((q: any, idx: number) => {
                const uAns = selectedAnswers[q._id] || [];
                const opts = getOptionsArray(q.options);
                return (
                  <div key={q._id} className="pt-review-row" style={{ padding: '16px', background: '#fafafa', borderRadius: '14px', border: '1px solid #f0f2f8' }}>
                    <p style={{ margin: '0 0 10px', fontSize: '13.5px', fontWeight: '600', color: '#1e293b', lineHeight: 1.6 }}>
                      <span style={{ color: '#7c3aed', marginRight: '6px', fontWeight: '700' }}>Q{idx + 1}.</span>
                      {q.question}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                      {opts.map(opt => {
                        const sel = uAns.includes(opt.text);
                        return (
                          <span key={opt.key} style={{
                            padding: '5px 12px', borderRadius: '8px', fontSize: '12px',
                            background: sel ? '#ede9fe' : '#f1f5f9',
                            border: `1px solid ${sel ? '#c4b5fd' : '#e2e8f0'}`,
                            color: sel ? '#7c3aed' : '#94a3b8',
                            fontWeight: sel ? '700' : '400',
                          }}>
                            {sel && '✓ '}{opt.text}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ══ ACTIVE TEST ═════════════════════════════════════════════════════════ */
  const cq       = testData?.testQuestions?.[currentIdx];
  if (!cq) return null;

  const isMulti       = cq.questionType === 'MSQ';
  const userAns       = selectedAnswers[cq._id] || [];
  const opts          = getOptionsArray(cq.options);
  const totalQ        = testData.testQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).filter(k => selectedAnswers[k]?.length > 0).length;
  const progress      = Math.round((answeredCount / totalQ) * 100);
  const timerUrgent   = remainingTime < 300;
  const timerWarn     = remainingTime < 600;
  const timerColor    = timerUrgent ? '#ef4444' : timerWarn ? '#f59e0b' : '#10b981';
  const timerBg       = timerUrgent ? '#fff1f2' : timerWarn ? '#fffbeb' : '#f0fdf4';
  const timerBorder   = timerUrgent ? '#fecaca' : timerWarn ? '#fde68a' : '#bbf7d0';

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <style>{`
        @keyframes ptSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes ptSlide{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ptPulseRed{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 6px rgba(239,68,68,0)}}
        .pt-option-btn { transition: all .15s ease !important; }
        .pt-option-btn:hover { transform: translateX(4px) !important; border-color: #7c3aed !important; background: #faf8ff !important; }
        .pt-nav-btn    { transition: all .15s ease !important; }
        .pt-nav-btn:hover { transform: translateY(-2px) !important; }
        .pt-q-dot      { transition: all .15s ease; cursor: pointer; }
        .pt-q-dot:hover{ transform: scale(1.15); }
      `}</style>

      {/* ── Top Status Bar ── */}
      <div style={{
        background: '#fff', borderRadius: '18px', padding: '14px 22px',
        marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f2f8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconFlag />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{testData.testname}</p>
            <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
              Question <strong style={{ color: '#7c3aed' }}>{currentIdx + 1}</strong> of {totalQ} &nbsp;·&nbsp;
              <span style={{ color: '#10b981', fontWeight: '600' }}>{answeredCount} answered</span>
            </p>
          </div>
        </div>
        {/* Timer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: timerBg, padding: '10px 16px', borderRadius: '12px',
          border: `1px solid ${timerBorder}`,
          animation: timerUrgent ? 'ptPulseRed 1.2s ease infinite' : 'none',
        }}>
          <span style={{ fontSize: '18px' }}>{timerUrgent ? '🔴' : timerWarn ? '🟡' : '🟢'}</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: timerColor, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            {formatTime(remainingTime)}
          </span>
        </div>
      </div>

      {/* ── Progress ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>PROGRESS</span>
          <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '700' }}>{progress}%</span>
        </div>
        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#7c3aed,#a78bfa)', borderRadius: '6px', transition: 'width .5s ease', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)', animation: 'ptShine 1.8s ease infinite' }} />
          </div>
        </div>
      </div>

      {/* ── Question Card ── */}
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '32px 36px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: '16px',
        border: '1px solid #f0f2f8', animation: 'ptSlide .2s ease',
        key: currentIdx,
      }}>
        {/* Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', padding: '4px 10px', borderRadius: '20px', background: '#ede9fe', color: '#7c3aed' }}>
            {cq.questionType || 'MCQ'}
          </span>
          {cq.difficultyLevel && (
            <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', padding: '4px 10px', borderRadius: '20px',
              background: cq.difficultyLevel === 'Hard' ? '#fff1f2' : cq.difficultyLevel === 'Easy' ? '#f0fdf4' : '#fffbeb',
              color: cq.difficultyLevel === 'Hard' ? '#e11d48' : cq.difficultyLevel === 'Easy' ? '#16a34a' : '#d97706',
            }}>
              {cq.difficultyLevel}
            </span>
          )}
          {isMulti && (
            <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', fontWeight: '500' }}>
              ✦ Select all that apply
            </span>
          )}
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#cbd5e1', fontWeight: '600' }}>
            {currentIdx + 1} / {totalQ}
          </span>
        </div>

        {/* Question text */}
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', lineHeight: '1.75', marginBottom: '28px', letterSpacing: '-0.1px' }}>
          {cq.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {opts.map((opt, i) => {
            const sel = userAns.includes(opt.text);
            return (
              <button key={opt.key} type="button" onClick={() => handleOptionSelect(cq._id, opt.text, isMulti)}
                className="pt-option-btn"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  padding: '15px 18px',
                  border: `2px solid ${sel ? '#7c3aed' : '#e8edf3'}`,
                  borderRadius: '14px',
                  background: sel ? 'linear-gradient(135deg,#faf8ff,#f3f0ff)' : '#fafbfc',
                  cursor: 'pointer', textAlign: 'left', outline: 'none', width: '100%',
                  boxShadow: sel ? '0 2px 12px rgba(124,58,237,0.12)' : 'none',
                }}>
                <span style={{
                  width: '30px', height: '30px', borderRadius: sel ? '10px' : '50%', flexShrink: 0,
                  background: sel ? 'linear-gradient(135deg,#7c3aed,#a78bfa)' : '#f1f5f9',
                  color: sel ? '#fff' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '800', transition: 'all .15s ease',
                }}>
                  {sel ? <IconCheck /> : LABELS[i] || i + 1}
                </span>
                <span style={{ fontSize: '14px', color: sel ? '#4c1d95' : '#374151', lineHeight: '1.65', fontWeight: sel ? '600' : '400', flex: 1 }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button type="button" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}
          className="pt-nav-btn"
          style={{
            padding: '12px 22px', borderRadius: '12px', border: '2px solid #e2e8f0',
            background: '#fff', color: '#64748b', fontWeight: '600', fontSize: '14px',
            cursor: currentIdx === 0 ? 'not-allowed' : 'pointer', opacity: currentIdx === 0 ? 0.45 : 1,
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
          ← Prev
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {currentIdx !== totalQ - 1 && (
            <button type="button" onClick={() => setShowConfirm(true)} className="pt-nav-btn"
              style={{ padding: '12px 18px', borderRadius: '12px', border: '2px solid #fca5a5', background: '#fff5f5', color: '#ef4444', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              Submit Early
            </button>
          )}
          {currentIdx === totalQ - 1 ? (
            <button type="button" onClick={() => setShowConfirm(true)} className="pt-nav-btn"
              style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}>
              ✓ Submit Test
            </button>
          ) : (
            <button type="button" onClick={() => setCurrentIdx(currentIdx + 1)} className="pt-nav-btn"
              style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(124,58,237,0.35)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Next <IconArrow />
            </button>
          )}
        </div>
      </div>

      {/* ── Question Nav Dots ── */}
      <div style={{ background: '#fff', borderRadius: '16px', padding: '16px 18px', border: '1px solid #f0f2f8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px' }}>QUESTION NAVIGATOR</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {testData.testQuestions.map((_: any, idx: number) => {
            const answered = selectedAnswers[testData.testQuestions[idx]._id]?.length > 0;
            const isCur    = currentIdx === idx;
            return (
              <button key={idx} className="pt-q-dot" onClick={() => setCurrentIdx(idx)}
                style={{
                  width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                  background: isCur ? 'linear-gradient(135deg,#7c3aed,#a78bfa)' : answered ? '#ede9fe' : '#f1f5f9',
                  color: isCur ? '#fff' : answered ? '#7c3aed' : '#94a3b8',
                  fontSize: '11px', fontWeight: '700',
                  boxShadow: isCur ? '0 2px 8px rgba(124,58,237,0.4)' : 'none',
                }}>
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
          {[
            { color: 'linear-gradient(135deg,#7c3aed,#a78bfa)', label: 'Current' },
            { color: '#ede9fe', label: 'Answered', textColor: '#7c3aed' },
            { color: '#f1f5f9', label: 'Unanswered' },
          ].map((leg, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: leg.color }} />
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>{leg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 30px 80px rgba(0,0,0,0.25)', animation: 'ptFadeUp .2s ease' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(16,185,129,0.3)', fontSize: '28px' }}>
              📋
            </div>
            <h4 style={{ fontWeight: '800', color: '#0f172a', marginBottom: '8px', fontSize: '18px' }}>Submit Assessment?</h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '6px', lineHeight: 1.6 }}>
              You've answered <strong style={{ color: '#7c3aed' }}>{answeredCount}</strong> of <strong>{totalQ}</strong> questions.
            </p>
            {answeredCount < totalQ && (
              <p style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '24px', background: '#fffbeb', padding: '8px 14px', borderRadius: '8px', border: '1px solid #fde68a' }}>
                ⚠️ {totalQ - answeredCount} questions are unanswered
              </p>
            )}
            <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '24px' }}>Once submitted, your answers cannot be changed.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                Cancel
              </button>
              <button onClick={handleSubmitTest} disabled={submitting}
                style={{ flex: 1, padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 14px rgba(16,185,129,0.35)', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? '⏳ Grading…' : 'Yes, Submit →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeTest;
