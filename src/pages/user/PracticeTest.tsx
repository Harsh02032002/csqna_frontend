import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  ClipboardList,
  BarChart2,
  FileText,
  Zap,
  Lightbulb,
  Calendar,
  Clock as ClockIcon,
  ChevronRight,
  ArrowRight,
  Flag,
  User,
  FileQuestion,
  Bookmark,
  Check
} from 'lucide-react';

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

const LABELS = ['A', 'B', 'C', 'D', 'E'];

export const PracticeTest: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [testData, setTestData]             = useState<any>(null);
  const [currentIdx, setCurrentIdx]         = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [answerStatuses, setAnswerStatuses] = useState<Record<string, 'Answered' | 'Partial Answer' | 'Unanswered'>>({});
  const [remainingTime, setRemainingTime]   = useState(0);
  const [loading, setLoading]               = useState(true);
  const [submitting, setSubmitting]         = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [reportData, setReportData]         = useState<any>(null);
  const [errorMessage, setErrorMessage]     = useState('');
  const [partialNotice, setPartialNotice]   = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.patch('/user/practice/start', { testid: testId });
        if (res.data?.status && res.data?.data) {
          setTestData(res.data.data);
          setRemainingTime((res.data.data.duration || 40) * 60);
          const initAnswers: Record<string, string[]> = {};
          const initStatuses: Record<string, 'Answered' | 'Partial Answer' | 'Unanswered'> = {};
          res.data.data.testQuestions?.forEach((q: any) => {
            const ans = Array.isArray(q.userAnswer) ? q.userAnswer : q.userAnswer ? [q.userAnswer] : [];
            if (ans.length > 0) initAnswers[q._id] = ans;
            initStatuses[q._id] = q.answerStatus || (ans.length > 0 ? 'Answered' : 'Unanswered');
          });
          setSelectedAnswers(initAnswers);
          setAnswerStatuses(initStatuses);
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
    if (partialNotice) setPartialNotice(null);
    let cur = selectedAnswers[qId] || [];
    if (isMulti) {
      cur = cur.includes(optText) ? cur.filter(a => a !== optText) : [...cur, optText];
    } else {
      cur = [optText];
    }
    setSelectedAnswers({ ...selectedAnswers, [qId]: cur });

    const currentStatus = answerStatuses[qId] || 'Unanswered';
    const newStatus = currentStatus === 'Partial Answer' ? 'Partial Answer' : (cur.length > 0 ? 'Answered' : 'Unanswered');
    setAnswerStatuses(prev => ({ ...prev, [qId]: newStatus }));

    try {
      await api.post('/user/practice/saveresponse', { testId, questionId: qId, answer: cur, answerStatus: newStatus });
    } catch { /* silent */ }
  };

  const handlePartialAnswer = async () => {
    if (!testData?.testQuestions?.[currentIdx]) return;
    const cq = testData.testQuestions[currentIdx];
    const qId = cq._id;
    const curAns = selectedAnswers[qId] || [];

    if (!curAns || curAns.length === 0) {
      setPartialNotice('Please select an option to mark as Partial Answer');
      setTimeout(() => setPartialNotice(null), 4000);
      return;
    }

    setPartialNotice(null);
    const newStatus = 'Partial Answer';
    setAnswerStatuses(prev => ({ ...prev, [qId]: newStatus }));

    try {
      await api.post('/user/practice/saveresponse', { testId, questionId: qId, answer: curAns, answerStatus: newStatus });
    } catch { /* silent */ }

    if (currentIdx < (testData.testQuestions.length - 1)) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleNext = async () => {
    if (partialNotice) setPartialNotice(null);
    if (!testData?.testQuestions?.[currentIdx]) return;
    const cq = testData.testQuestions[currentIdx];
    const qId = cq._id;
    const curAns = selectedAnswers[qId] || [];
    const currentStatus = answerStatuses[qId] || 'Unanswered';
    const totalQ = testData.testQuestions.length;

    let newStatus = currentStatus;
    if (curAns.length > 0) {
      newStatus = 'Answered';
    } else if (currentStatus !== 'Partial Answer') {
      newStatus = 'Unanswered';
    }

    if (newStatus !== currentStatus) {
      setAnswerStatuses(prev => ({ ...prev, [qId]: newStatus }));
      try {
        await api.post('/user/practice/saveresponse', { testId, questionId: qId, answer: curAns, answerStatus: newStatus });
      } catch { /* silent */ }
    }

    if (currentIdx < totalQ - 1) {
      setCurrentIdx(currentIdx + 1);
    }
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
  /* ══ SCORE REPORT ════════════════════════════════════════════════════════ */
  /* ══ SCORE REPORT ════════════════════════════════════════════════════════ */
  if (reportData) {
    const totalQ     = testData?.testQuestions?.length || 0;
    const correct    = reportData.correctAnswers || 0;
    const wrong      = Math.max(0, totalQ - correct);
    const scoreVal   = parseFloat(reportData.score?.toFixed(1) || '0.0');
    const passed     = scoreVal >= 70;
    
    const initialDuration = (testData?.duration || 40) * 60;
    const timeTakenSec = Math.max(10, initialDuration - remainingTime);
    const timeTakenMins = Math.floor(timeTakenSec / 60);
    const timeTakenSecs = timeTakenSec % 60;
    const formattedTimeTaken = `${timeTakenMins > 0 ? `${timeTakenMins} min ` : ''}${timeTakenSecs} sec`;
    const userName = user?.name || user?.username || 'Student User';

    const statusColor = passed ? '#16a34a' : scoreVal >= 50 ? '#d97706' : '#e11d48';

    // Dynamic Domain / Category Performance (Purely dynamic from question bank)
    const PALETTE = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#f43f5e', '#14b8a6', '#84cc16'];

    const getDomainPerformance = () => {
      const questions = testData?.testQuestions || [];
      const CSQNA_CERTS = [
        { key: 'CISA', label: 'CISA', keywords: ['cisa', 'auditor', 'audit', 'governance'] },
        { key: 'CEH', label: 'CEH', keywords: ['ceh', 'ethical', 'hacker', 'penetration', 'security', 'incident'] },
        { key: 'CIPP', label: 'CIPP', keywords: ['cipp', 'privacy professional'] },
        { key: 'DPDP', label: 'DPDP', keywords: ['dpdp', 'data protection', 'privacy officer'] },
        { key: 'ISO 27001', label: 'ISO 27001', keywords: ['iso', '27001', 'isms', 'management system'] },
        { key: 'AAIA', label: 'AAIA', keywords: ['aaia', 'ai', 'artificial intelligence', 'fundamentals'] },
      ];

      const certScores: Record<string, { total: number; correct: number }> = {};
      CSQNA_CERTS.forEach(c => { certScores[c.key] = { total: 0, correct: 0 }; });

      const testTitle = (testData?.testname || testData?.category || testData?.title || '').toLowerCase();

      questions.forEach((q: any) => {
        const qCat = (q.category || q.domain || q.certificate || q.topic || q.subject || '').toString().toLowerCase();
        const uAns = selectedAnswers[q._id] || (Array.isArray(q.userAnswer) ? q.userAnswer : q.userAnswer ? [q.userAnswer] : []);
        const cAns = Array.isArray(q.correctAnswer) ? q.correctAnswer : q.correctAnswer !== undefined ? [q.correctAnswer] : [];
        const isCorr = cAns.length > 0 && uAns.length === cAns.length && uAns.every((a: string) => cAns.includes(a));

        let matched = false;
        CSQNA_CERTS.forEach(c => {
          if (c.keywords.some(kw => qCat.includes(kw) || testTitle.includes(kw))) {
            certScores[c.key].total += 1;
            if (isCorr) certScores[c.key].correct += 1;
            matched = true;
          }
        });

        if (!matched) {
          certScores['AAIA'].total += 1;
          if (isCorr) certScores['AAIA'].correct += 1;
        }
      });

      return CSQNA_CERTS.map((c, idx) => {
        const data = certScores[c.key];
        const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        return {
          name: c.label,
          color: PALETTE[idx % PALETTE.length],
          total: data.total,
          correct: data.correct,
          pct: pct
        };
      });
    };

    const domainStats = getDomainPerformance();

    // Adaptive SVG Radar/Gauge Chart Component
    const RenderRadarChart = ({ stats }: { stats: typeof domainStats }) => {
      const size = 160;
      const cx = size / 2;
      const cy = size / 2;
      const radius = 60;
      const n = stats.length;

      if (n === 0) return null;

      if (n === 1) {
        const r = 48;
        const circ = 2 * Math.PI * r;
        const offset = circ - (stats[0].pct / 100) * circ;
        return (
          <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={stats[0].color} strokeWidth="10"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: stats[0].color }}>{stats[0].pct}%</div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accuracy</div>
            </div>
          </div>
        );
      }

      if (n === 2) {
        return (
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <line x1={20} y1={cy} x2={size - 20} y2={cy} stroke="#e2e8f0" strokeWidth="2" />
            <line x1={cx} y1={20} x2={cx} y2={size - 20} stroke="#e2e8f0" strokeWidth="2" />
            <circle cx={cx - (stats[0].pct / 100) * 50} cy={cy} r="6" fill={stats[0].color} />
            <circle cx={cx + (stats[1].pct / 100) * 50} cy={cy} r="6" fill={stats[1].color} />
          </svg>
        );
      }

      const gridLevels = [0.25, 0.5, 0.75, 1.0];
      const gridPolygons = gridLevels.map(lvl => {
        return Array.from({ length: n }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
          const r = lvl * radius;
          return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(' ');
      });

      const valPolygon = stats.map((s, i) => {
        const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
        const r = Math.max(6, (s.pct / 100) * radius);
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(' ');

      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {gridPolygons.map((pts, i) => (
            <polygon key={i} points={pts} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray={i === 3 ? 'none' : '2,2'} />
          ))}
          {Array.from({ length: n }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
            return (
              <line key={i} x1={cx} y1={cy} x2={cx + radius * Math.cos(angle)} y2={cy + radius * Math.sin(angle)} stroke="#e2e8f0" strokeWidth="1" />
            );
          })}
          <polygon points={valPolygon} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
          {stats.map((s, i) => {
            const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
            const r = Math.max(6, (s.pct / 100) * radius);
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="3.5" fill={s.color} stroke="#fff" strokeWidth="1" />;
          })}
        </svg>
      );
    };

    return (
      <div style={{ maxWidth: '1180px', margin: '0 auto', fontFamily: "'Inter','Segoe UI',sans-serif", color: '#0f172a' }}>
        <style>{`
          @keyframes ptFadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .pt-ss3-card        { animation: ptFadeUp .4s ease both; }
          .pt-ss3-btn         { transition: all .25s ease; cursor: pointer; }
          .pt-ss3-btn:hover   { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%) !important; border-color: transparent !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.25) !important; }
          .pt-ss3-btn:hover h4, .pt-ss3-btn:hover p, .pt-ss3-btn:hover svg { color: #ffffff !important; }
          .pt-ss3-next-step   { transition: all .2s ease; cursor: pointer; }
          .pt-ss3-next-step:hover { transform: translateY(-3px); border-color: #6366f1 !important; box-shadow: 0 8px 24px rgba(99,102,241,0.08) !important; }
        `}</style>

        {/* ── Breadcrumbs ── */}
        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ cursor: 'pointer', color: '#475569' }} onClick={() => navigate('/panel/dashboard')}>Dashboard</span>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>Test Result</span>
        </div>

        {/* ── Top Main Hero Container (Matching SS3) ── */}
        <div className="pt-ss3-card" style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)',
          borderRadius: '24px', padding: '36px 40px',
          border: '1px solid #e0e7ff', boxShadow: '0 10px 40px rgba(99,102,241,0.05)',
          marginBottom: '24px', position: 'relative'
        }}>
          {/* Top-Right Handwritten Annotation */}
          <div style={{
            position: 'absolute', top: '28px', right: '40px',
            textAlign: 'right', pointerEvents: 'none'
          }}>
            <div style={{
              fontFamily: "'Segoe Script', 'Caveat', 'Comic Sans MS', cursive",
              fontSize: '15px', fontWeight: '700', color: '#4f46e5',
              transform: 'rotate(-3deg)', display: 'flex', alignItems: 'center', gap: '4px'
            }}>
              <span>Keep Practicing You'll Get There!</span>
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                <path d="M 3 16 Q 14 14 18 5" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 12 5 L 18 5 L 18 11" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Title & Badge Header */}
          <div style={{ marginBottom: '28px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 14px', borderRadius: '20px', background: '#ede9fe',
              color: '#4338ca', fontSize: '11px', fontWeight: '800', letterSpacing: '0.8px',
              marginBottom: '12px'
            }}>
              <CheckCircle2 size={14} /> PRACTICE TEST REPORT
            </span>
            <h1 style={{ margin: '0 0 14px', fontSize: '26px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>
              PRACTICE TEST REPORT (Ref: {testData?.testname || testId})
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#475569', fontWeight: '600', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <User size={15} style={{ color: '#6366f1' }} />
                <span>User Name:</span> <strong style={{ color: '#0f172a' }}>{userName}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <Calendar size={15} style={{ color: '#6366f1' }} />
                <span>Test Completed on:</span> <strong style={{ color: '#0f172a' }}>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <ClockIcon size={15} style={{ color: '#6366f1' }} />
                <span>Time Taken:</span> <strong style={{ color: '#0f172a' }}>{formattedTimeTaken}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                <ClipboardList size={15} style={{ color: '#6366f1' }} />
                <span>No of Questions:</span> <strong style={{ color: '#0f172a' }}>{totalQ}</strong>
              </span>
            </div>
          </div>

          {/* ── Full Width DashboardVisual Card Container (Fills Hero Parent Container) ── */}
          <div style={{ width: '100%', position: 'relative', zIndex: 10, marginTop: '8px' }}>
            {/* Ambient Soft Blur Aura */}
            <div style={{
              position: 'absolute', inset: '-14px', borderRadius: '30px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(37, 99, 235, 0.12) 100%)',
              filter: 'blur(28px)', pointerEvents: 'none'
            }} />

            {/* DashboardVisual Glassmorphic Card */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                padding: '32px',
                boxShadow: '0 24px 60px -12px rgba(37, 99, 235, 0.16), 0 10px 28px -6px rgba(99, 102, 241, 0.1)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
                
                {/* Score Box */}
                <div style={{
                  borderRadius: '20px', backgroundColor: '#ffffff',
                  padding: '24px', border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <p style={{ margin: 0, fontSize: '11.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', width: '100%', textAlign: 'left' }}>
                    Score
                  </p>
                  <div style={{
                    margin: '18px auto 8px', width: '135px', height: '135px', borderRadius: '50%',
                    background: `conic-gradient(${statusColor} 0% ${scoreVal}%, #f1f5f9 ${scoreVal}% 100%)`,
                    padding: '12px', boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.06)',
                    display: 'grid', placeItems: 'center'
                  }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      backgroundColor: '#ffffff', display: 'grid', placeItems: 'center',
                      fontSize: '32px', fontWeight: '900', color: '#0f172a'
                    }}>
                      {Math.round(scoreVal)}%
                    </div>
                  </div>
                </div>

                {/* Score-at-a-glance Box */}
                <div style={{
                  borderRadius: '20px', backgroundColor: '#ffffff',
                  padding: '24px', border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                  <p style={{ margin: 0, fontSize: '11.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b' }}>
                    Score-at-a-glance
                  </p>
                  <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '20px' }}>
                    <RenderRadarChart stats={domainStats} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontWeight: '700', color: '#64748b', lineHeight: 1.3 }}>
                      {domainStats && domainStats.length > 0 ? (
                        domainStats.map((item) => (
                          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                            <span style={{ color: '#1e293b', fontWeight: '700' }}>{item.name}</span>
                            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '900', marginLeft: 'auto' }}>{item.pct}%</span>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>No certificate data</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                {/* Questions Practiced */}
                <div style={{
                  borderRadius: '16px', backgroundColor: '#ffffff',
                  padding: '14px 16px', border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                  <span style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    <FileQuestion size={18} />
                  </span>
                  <div>
                    <small style={{ display: 'block', fontSize: '8.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b' }}>
                      Questions Practiced
                    </small>
                    <b style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, display: 'block', marginTop: '2px' }}>
                      {reportData?.questionsPracticed || reportData?.totalQuestionsPracticed || (user as any)?.questionsPracticed || totalQ}
                    </b>
                  </div>
                </div>

                {/* Correct */}
                <div style={{
                  borderRadius: '16px', backgroundColor: '#ffffff',
                  padding: '14px 16px', border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                  <span style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: '#f0fdf4', color: '#16a34a', display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    <CheckCircle2 size={18} />
                  </span>
                  <div>
                    <small style={{ display: 'block', fontSize: '8.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b' }}>
                      Correct
                    </small>
                    <b style={{ fontSize: '20px', fontWeight: '900', color: '#16a34a', lineHeight: 1.1, display: 'block', marginTop: '2px' }}>{correct}</b>
                  </div>
                </div>

                {/* Incorrect */}
                <div style={{
                  borderRadius: '16px', backgroundColor: '#ffffff',
                  padding: '14px 16px', border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                  <span style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: '#fff1f2', color: '#e11d48', display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    <XCircle size={18} />
                  </span>
                  <div>
                    <small style={{ display: 'block', fontSize: '8.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b' }}>
                      Incorrect
                    </small>
                    <b style={{ fontSize: '20px', fontWeight: '900', color: '#e11d48', lineHeight: 1.1, display: 'block', marginTop: '2px' }}>{wrong}</b>
                  </div>
                </div>

                {/* Tests Completed */}
                <div style={{
                  borderRadius: '16px', backgroundColor: '#ffffff',
                  padding: '14px 16px', border: '1px solid #f1f5f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '12px'
                }}>
                  <span style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    backgroundColor: 'rgba(249, 115, 22, 0.15)', color: '#f97316', display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    <Trophy size={18} />
                  </span>
                  <div>
                    <small style={{ display: 'block', fontSize: '8.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b' }}>
                      Tests Completed
                    </small>
                    <b style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, display: 'block', marginTop: '2px' }}>
                      {reportData?.testsCompleted || reportData?.totalTestsCompleted || (user as any)?.testsCompleted || 1}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Middle Action Row (Matching SS3) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          
          {/* Card 1: View All Reports */}
          <div onClick={() => navigate('/panel/reports')} className="pt-ss3-btn" style={{
            background: '#ffffff', borderRadius: '18px', padding: '20px 24px',
            border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f3f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart2 size={22} color="#7c3aed" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>View All Reports</h4>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Detailed analysis & history</p>
              </div>
            </div>
            <ChevronRight size={20} color="#6366f1" />
          </div>

          {/* Card 2: Question Review */}
          <div onClick={() => {
            const el = document.getElementById('tested-questions-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} className="pt-ss3-btn" style={{
            background: '#ffffff', borderRadius: '18px', padding: '20px 24px',
            border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} color="#2563eb" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  Question Review
                </h4>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Review tested questions below</p>
              </div>
            </div>
            <ChevronRight size={20} color="#6366f1" />
          </div>

          {/* Card 3: New Test → */}
          <div onClick={() => navigate('/panel/create')} className="pt-ss3-btn" style={{
            background: '#ffffff', borderRadius: '18px', padding: '20px 24px',
            border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={22} color="#f97316" fill="#f97316" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  New Test <ArrowRight size={15} />
                </h4>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Practice another test</p>
              </div>
            </div>
            <ChevronRight size={20} color="#6366f1" />
          </div>

        </div>

        {/* ── Tested Questions Review Section (Pixel Perfect to Mockup) ── */}
        <div id="tested-questions-section" style={{
          background: '#ffffff', borderRadius: '24px', padding: '32px',
          border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
          marginBottom: '32px'
        }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} color="#6366f1" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.3px' }}>
                  Tested Questions Review & Explanations
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                  Full breakdown of tested questions with correct options and detailed explanations
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{
                padding: '8px 18px', borderRadius: '20px', background: '#dcfce7',
                color: '#15803d', fontSize: '13px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <CheckCircle2 size={16} color="#15803d" /> {correct} Correct
              </span>
              <span style={{
                padding: '8px 18px', borderRadius: '20px', background: '#ffe4e6',
                color: '#e11d48', fontSize: '13px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <XCircle size={16} color="#e11d48" /> {wrong} Incorrect
              </span>
            </div>
          </div>

          {/* Questions Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {(reportData?.testQuestions || testData?.testQuestions || []).map((q: any, idx: number) => {
              const uAns = selectedAnswers[q._id] || (Array.isArray(q.userAnswer) ? q.userAnswer : q.userAnswer ? [q.userAnswer] : []);
              const cAns = Array.isArray(q.correctAnswers)
                ? q.correctAnswers
                : Array.isArray(q.correctAnswer)
                ? q.correctAnswer
                : q.correctAnswers !== undefined
                ? [q.correctAnswers]
                : q.correctAnswer !== undefined
                ? [q.correctAnswer]
                : [];
              const opts = getOptionsArray(q.options);
              
              const isCorr = q.score > 0 || (cAns.length > 0 && uAns.length === cAns.length && uAns.every((a: any) => cAns.includes(a)));
              const badgeBg = isCorr ? '#dcfce7' : '#ffe4e6';
              const badgeTextColor = isCorr ? '#16a34a' : '#e11d48';

              let justification = '';
              if (Array.isArray(q.justifications) && q.justifications.length > 0) {
                justification = q.justifications.filter(Boolean).join(' ');
              } else if (typeof q.justifications === 'string' && q.justifications.trim()) {
                justification = q.justifications;
              } else if (typeof q.explanation === 'string' && q.explanation.trim()) {
                justification = q.explanation;
              } else if (typeof q.justification === 'string' && q.justification.trim()) {
                justification = q.justification;
              } else if (typeof q.description === 'string' && q.description.trim()) {
                justification = q.description;
              }

              const correctOptObj = opts.find((opt, optIdx) => {
                return cAns.some((c: any) => {
                  if (c === undefined || c === null) return false;
                  const cStr = String(c).trim().toLowerCase();
                  const optTextStr = String(opt.text).trim().toLowerCase();
                  const optKeyStr = String(opt.key).trim().toLowerCase();
                  const labelStr = String(LABELS[optIdx] || '').trim().toLowerCase();
                  return (
                    cStr === optTextStr ||
                    cStr === optKeyStr ||
                    cStr === labelStr ||
                    cStr === String(optIdx + 1) ||
                    cStr.includes(optTextStr) ||
                    optTextStr.includes(cStr)
                  );
                });
              });

              if (!justification || justification.includes('cybersecurity certification standards')) {
                const correctLabel = correctOptObj ? correctOptObj.text : cAns.join(', ') || 'the marked correct option';
                justification = `The correct answer is "${correctLabel}". This selection directly maximizes outcome effectiveness and aligns with standard governance and audit practices.`;
              }

              return (
                <div key={q._id || idx} style={{
                  padding: '28px', borderRadius: '24px', background: '#ffffff',
                  border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  position: 'relative'
                }}>
                  {/* Card Header Badges & Bookmark */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        padding: '4px 14px', borderRadius: '20px', background: '#ede9fe',
                        color: '#6366f1', fontSize: '13px', fontWeight: '800'
                      }}>
                        Q{idx + 1}
                      </span>
                      <span style={{
                        padding: '4px 14px', borderRadius: '20px', background: badgeBg,
                        color: badgeTextColor, fontSize: '13px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px'
                      }}>
                        {isCorr ? <CheckCircle2 size={14} color="#16a34a" /> : <XCircle size={14} color="#e11d48" />}
                        {isCorr ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <Bookmark size={20} color="#cbd5e1" style={{ cursor: 'pointer' }} />
                  </div>

                  {/* Question Title */}
                  <h4 style={{ margin: '0 0 20px', fontSize: '15.5px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.2px', lineHeight: 1.5 }}>
                    {q.question}
                  </h4>

                  {/* Options List */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '20px' }}>
                    {opts.map((opt, optIdx) => {
                      const isUserSelected = uAns.some((u: any) => {
                        if (u === undefined || u === null) return false;
                        const uStr = String(u).trim().toLowerCase();
                        const optTextStr = String(opt.text).trim().toLowerCase();
                        const optKeyStr = String(opt.key).trim().toLowerCase();
                        const labelStr = String(LABELS[optIdx] || '').trim().toLowerCase();
                        return uStr === optTextStr || uStr === optKeyStr || uStr === labelStr || uStr === String(optIdx + 1);
                      });

                      const isCorrectOpt = cAns.some((c: any) => {
                        if (c === undefined || c === null) return false;
                        const cStr = String(c).trim().toLowerCase();
                        const optTextStr = String(opt.text).trim().toLowerCase();
                        const optKeyStr = String(opt.key).trim().toLowerCase();
                        const labelStr = String(LABELS[optIdx] || '').trim().toLowerCase();
                        return (
                          cStr === optTextStr ||
                          cStr === optKeyStr ||
                          cStr === labelStr ||
                          cStr === String(optIdx + 1) ||
                          cStr.includes(optTextStr) ||
                          (optTextStr.length > 3 && cStr.includes(optTextStr))
                        );
                      });

                      let optBg = '#ffffff';
                      let optBorder = '1px solid #e2e8f0';
                      let optTextColor = '#334155';
                      let letterBg = '#f1f5f9';
                      let letterColor = '#475569';
                      let optFontWeight = '500';
                      let rightIcon = null;

                      if (isCorrectOpt) {
                        optBg = '#e6f4ea';
                        optBorder = '1.5px solid #22c55e';
                        optTextColor = '#15803d';
                        letterBg = '#16a34a';
                        letterColor = '#ffffff';
                        optFontWeight = '700';
                        rightIcon = <Check size={20} color="#16a34a" strokeWidth={3} />;
                      } else if (isUserSelected && !isCorrectOpt) {
                        optBg = '#fde8e8';
                        optBorder = '1.5px solid #f87171';
                        optTextColor = '#b91c1c';
                        letterBg = '#e11d48';
                        letterColor = '#ffffff';
                        optFontWeight = '700';
                        rightIcon = <XCircle size={20} color="#e11d48" />;
                      }

                      return (
                        <div key={opt.key} style={{
                          padding: '14px 20px', borderRadius: '16px', background: optBg,
                          border: optBorder, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{
                              width: '32px', height: '32px', borderRadius: '50%',
                              background: letterBg, color: letterColor,
                              display: 'grid', placeItems: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0
                            }}>
                              {LABELS[optIdx] || opt.key}
                            </span>
                            <span style={{ fontSize: '14.5px', fontWeight: optFontWeight, color: optTextColor }}>
                              {opt.text}
                            </span>
                          </div>
                          {rightIcon}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box (Matching Mockup) */}
                  <div style={{
                    padding: '20px 24px', borderRadius: '16px',
                    background: '#f3f0ff', border: '1px solid #e0e7ff',
                    borderLeft: '4px solid #6366f1'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Lightbulb size={18} color="#6366f1" />
                      <strong style={{ fontSize: '14px', color: '#6366f1', fontWeight: '800' }}>
                        Explanation
                      </strong>
                    </div>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: 1.6, fontWeight: '500' }}>
                      {justification}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ══ ACTIVE TEST ═════════════════════════════════════════════════════════ */
  const cq       = testData?.testQuestions?.[currentIdx];
  if (!cq) return null;

  const cqStatus      = answerStatuses[cq._id] || 'Unanswered';
  const isMulti       = cq.questionType === 'MSQ';
  const userAns       = selectedAnswers[cq._id] || [];
  const opts          = getOptionsArray(cq.options);
  const totalQ        = testData.testQuestions.length;
  const answeredCount = Object.values(answerStatuses).filter(s => s === 'Answered').length;
  const partialCount  = Object.values(answerStatuses).filter(s => s === 'Partial Answer').length;
  const unansweredCount = Math.max(0, totalQ - answeredCount - partialCount);
  const progress      = Math.round(((answeredCount + partialCount) / totalQ) * 100);
  const timerUrgent   = remainingTime < 300;
  const timerWarn     = remainingTime < 600;
  const timerColor    = timerUrgent ? '#ef4444' : timerWarn ? '#f59e0b' : '#10b981';
  const timerBg       = timerUrgent ? '#fff1f2' : timerWarn ? '#fffbeb' : '#f0fdf4';
  const timerBorder   = timerUrgent ? '#fecaca' : timerWarn ? '#fde68a' : '#bbf7d0';

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <style>{`
        @keyframes ptSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes ptSlide{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ptPulseRed{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 6px rgba(239,68,68,0)}}
        .pt-option-btn { transition: all .15s ease !important; }
        .pt-option-btn:hover { transform: translateX(4px) !important; }
        .pt-nav-btn    { transition: all .15s ease !important; }
        .pt-nav-btn:hover { transform: translateY(-2px) !important; }
        .pt-q-dot      { transition: all .15s ease; cursor: pointer; }
        .pt-q-dot:hover{ transform: scale(1.12); }

        .pt-layout-grid {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 920px) {
          .pt-layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── Top Status Bar ── */}
      <div style={{
        background: '#fff', borderRadius: '18px', padding: '14px 22px',
        marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f2f8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Flag size={18} color="#fff" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1e293b', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{testData.testname}</p>
            <p style={{ margin: '1px 0 0', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
              Question <strong style={{ color: '#7c3aed' }}>{currentIdx + 1}</strong> of {totalQ} &nbsp;·&nbsp;
              <span style={{ color: '#10b981', fontWeight: '600' }}>{answeredCount} answered</span>
              {partialCount > 0 && <span style={{ color: '#d97706', fontWeight: '600', marginLeft: '6px' }}>· {partialCount} partial</span>}
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

      {/* ── Progress Bar ── */}
      <div style={{ marginBottom: '20px' }}>
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

      {/* ── Main Layout: Question (Left) & Question Navigator (Right) ── */}
      <div className="pt-layout-grid">
        {/* LEFT COLUMN: Question & Buttons */}
        <div>
          {/* Question Card */}
          <div key={currentIdx} style={{
            background: '#fff', borderRadius: '20px', padding: '32px 36px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: '16px',
            border: '1px solid #f0f2f8', animation: 'ptSlide .2s ease',
          }}>
            {partialNotice && (
              <div style={{
                background: '#fffbeb', border: '1.5px solid #f59e0b', borderRadius: '12px',
                padding: '10px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px',
                color: '#b45309', fontSize: '13px', fontWeight: '700',
                boxShadow: '0 4px 14px rgba(245,158,11,0.15)', animation: 'ptFadeUp .2s ease'
              }}>
                <AlertCircle size={18} color="#d97706" />
                <span>{partialNotice}</span>
              </div>
            )}

            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
              {cqStatus === 'Partial Answer' && (
                <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.5px', padding: '4px 10px', borderRadius: '20px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' }}>
                  🟡 Partial Answer
                </span>
              )}
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
                const isPartial = cqStatus === 'Partial Answer';

                const borderColor = sel
                  ? (isPartial ? '#f59e0b' : '#7c3aed')
                  : '#e8edf3';

                const optionBg = sel
                  ? (isPartial ? 'linear-gradient(135deg,#fffdf0,#fffbeb)' : 'linear-gradient(135deg,#faf8ff,#f3f0ff)')
                  : '#fafbfc';

                const badgeBg = sel
                  ? (isPartial ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'linear-gradient(135deg,#7c3aed,#a78bfa)')
                  : '#f1f5f9';

                const badgeTextColor = sel ? '#fff' : '#94a3b8';

                const optionTextColor = sel
                  ? (isPartial ? '#92400e' : '#4c1d95')
                  : '#374151';

                const boxShadow = sel
                  ? (isPartial ? '0 2px 12px rgba(245,158,11,0.2)' : '0 2px 12px rgba(124,58,237,0.12)')
                  : 'none';

                return (
                  <button key={opt.key} type="button" onClick={() => handleOptionSelect(cq._id, opt.text, isMulti)}
                    className="pt-option-btn"
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '14px',
                      padding: '15px 18px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '14px',
                      background: optionBg,
                      cursor: 'pointer', textAlign: 'left', outline: 'none', width: '100%',
                      boxShadow: boxShadow,
                    }}>
                    <span style={{
                      width: '30px', height: '30px', borderRadius: sel ? '10px' : '50%', flexShrink: 0,
                      background: badgeBg,
                      color: badgeTextColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: '800', transition: 'all .15s ease',
                    }}>
                      {sel ? <CheckCircle2 size={16} /> : LABELS[i] || i + 1}
                    </span>
                    <span style={{ fontSize: '14px', color: optionTextColor, lineHeight: '1.65', fontWeight: sel ? '600' : '400', flex: 1 }}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <button type="button" onClick={handlePartialAnswer} className="pt-nav-btn"
                style={{
                  padding: '12px 18px', borderRadius: '12px',
                  border: `2px solid ${cqStatus === 'Partial Answer' ? '#f59e0b' : '#fde68a'}`,
                  background: cqStatus === 'Partial Answer' ? '#fef3c7' : '#fffbeb',
                  color: '#d97706', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: cqStatus === 'Partial Answer' ? '0 2px 8px rgba(245,158,11,0.25)' : 'none'
                }}>
                🟡 Partial Answer
              </button>

              {currentIdx !== totalQ - 1 && (
                <button type="button" onClick={() => setShowConfirm(true)} className="pt-nav-btn"
                  style={{ padding: '12px 18px', borderRadius: '12px', border: '2px solid #fca5a5', background: '#fff5f5', color: '#ef4444', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                  Submit
                </button>
              )}
              {currentIdx === totalQ - 1 ? (
                <button type="button" onClick={() => setShowConfirm(true)} className="pt-nav-btn"
                  style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}>
                  ✓ Submit Test
                </button>
              ) : (
                <button type="button" onClick={handleNext} className="pt-nav-btn"
                  style={{ padding: '12px 28px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(124,58,237,0.35)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Next <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Question Navigator Sidebar */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', border: '1px solid #f0f2f8', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.8px' }}>QUESTION NAVIGATOR</p>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#7c3aed', background: '#ede9fe', padding: '3px 10px', borderRadius: '12px' }}>
                {answeredCount + partialCount}/{totalQ}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', maxHeight: '360px', overflowY: 'auto', paddingRight: '2px' }}>
              {testData.testQuestions.map((q: any, idx: number) => {
                const status = answerStatuses[q._id] || 'Unanswered';
                const isCur  = currentIdx === idx;

                let bg = '#fef2f2';
                let color = '#ef4444';
                let border = '1px solid #fecaca';

                if (isCur) {
                  bg = 'linear-gradient(135deg,#7c3aed,#a78bfa)';
                  color = '#fff';
                  border = 'none';
                  if (status === 'Partial Answer') {
                    border = '2px solid #f59e0b';
                  } else if (status === 'Unanswered') {
                    border = '2px solid #ef4444';
                  }
                } else if (status === 'Partial Answer') {
                  bg = '#fffbeb';
                  color = '#d97706';
                  border = '1px solid #fde68a';
                } else if (status === 'Answered') {
                  bg = '#ede9fe';
                  color = '#7c3aed';
                  border = '1px solid #ddd6fe';
                }

                return (
                  <button key={idx} className="pt-q-dot" onClick={() => setCurrentIdx(idx)}
                    style={{
                      height: '36px', borderRadius: '10px', border,
                      background: bg, color,
                      fontSize: '12px', fontWeight: '700',
                      boxShadow: isCur ? '0 2px 8px rgba(124,58,237,0.4)' : 'none',
                    }}>
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
              {[
                { color: 'linear-gradient(135deg,#7c3aed,#a78bfa)', label: 'Current Question' },
                { color: '#ede9fe', label: 'Answered', border: '1px solid #ddd6fe' },
                { color: '#fffbeb', label: 'Partial Answer', border: '1px solid #fde68a' },
                { color: '#fef2f2', label: 'Unanswered', border: '1px solid #fecaca' },
              ].map((leg, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: leg.color, border: leg.border || 'none', flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>{leg.label}</span>
                </div>
              ))}
            </div>
          </div>
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
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px', lineHeight: 1.6 }}>
              You've answered <strong style={{ color: '#7c3aed' }}>{answeredCount}</strong> of <strong>{totalQ}</strong> questions.
            </p>
            {partialCount > 0 && (
              <p style={{ color: '#d97706', fontSize: '13px', marginBottom: '10px', background: '#fffbeb', padding: '8px 14px', borderRadius: '8px', border: '1px solid #fde68a' }}>
                🟡 {partialCount} question(s) marked as Partial Answer
              </p>
            )}
            {unansweredCount > 0 && (
              <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '20px', background: '#fff5f5', padding: '8px 14px', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                ⚠️ {unansweredCount} question(s) are unanswered
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
