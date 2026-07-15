import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export const PracticeTest: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Convert options object {Option1: 'text', ...} to array [{key, text}]
  const getOptionsArray = (options: any): { key: string; text: string }[] => {
    if (!options) return [];
    if (Array.isArray(options)) return options.map((o: any) => ({ key: o.id || o.text, text: o.text || o.id }));
    return Object.entries(options)
      .filter(([, val]) => val && String(val).trim() !== '')
      .map(([key, val]) => ({ key, text: String(val) }));
  };

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await api.patch('/user/practice/start', { testid: testId });
        if (res.data && res.data.status && res.data.data) {
          setTestData(res.data.data);
          setRemainingTime((res.data.data.duration || 40) * 60);
          // Re-populate already answered questions
          const initialAnswers: Record<string, string[]> = {};
          res.data.data.testQuestions?.forEach((q: any) => {
            if (q.userAnswer) {
              initialAnswers[q._id] = Array.isArray(q.userAnswer) ? q.userAnswer : [q.userAnswer];
            }
          });
          setSelectedAnswers(initialAnswers);
        } else {
          setErrorMessage('Failed to start test session.');
        }
      } catch (err: any) {
        setErrorMessage(err.response?.data?.message || 'Error occurred starting test.');
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
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [remainingTime, reportData]);

  const handleOptionSelect = async (questionId: string, optionText: string, isMultiple = false) => {
    let currentAnswers = selectedAnswers[questionId] || [];
    if (isMultiple) {
      currentAnswers = currentAnswers.includes(optionText)
        ? currentAnswers.filter((a) => a !== optionText)
        : [...currentAnswers, optionText];
    } else {
      currentAnswers = [optionText];
    }
    setSelectedAnswers({ ...selectedAnswers, [questionId]: currentAnswers });
    try {
      await api.post('/user/practice/saveresponse', {
        testId,
        questionId,
        answer: currentAnswers,
      });
    } catch { /* silent */ }
  };

  const handleSubmitTest = async () => {
    setSubmitting(true);
    setShowConfirmModal(false);
    try {
      const res = await api.post('/user/practice/submittest', { testId });
      if (res.data && res.data.status && res.data.data) {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timerColor = remainingTime < 300 ? '#ef4444' : remainingTime < 600 ? '#f59e0b' : '#10b981';

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #1a3456', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#64748b', fontWeight: '600' }}>Preparing test session...</p>
      </div>
    );
  }

  if (errorMessage && !reportData) {
    return (
      <div className="alert alert-danger" style={{ maxWidth: '600px', margin: '40px auto', borderRadius: '12px', padding: '20px', fontSize: '14px' }}>
        <strong>Error:</strong> {errorMessage}
        <br />
        <button onClick={() => navigate('/panel/create')} className="btn btn-primary mt-3" style={{ borderRadius: '8px', fontSize: '13px' }}>
          ← Back to Create Test
        </button>
      </div>
    );
  }

  // ─── SCORE REPORT ────────────────────────────────────────────────────
  if (reportData) {
    const totalQ = testData?.testQuestions?.length || 0;
    const scorePercent = reportData.score?.toFixed(1) || '0.0';
    const passed = parseFloat(scorePercent) >= 70;

    return (
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Score Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0f3460 0%, #1a3456 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: '#fff',
          marginBottom: '24px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(26,52,86,0.25)'
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', marginBottom: '8px', fontWeight: '600' }}>ASSESSMENT COMPLETE</p>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 32px' }}>{testData?.testname}</h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '48px', fontWeight: '900', margin: 0, color: passed ? '#4ade80' : '#f87171' }}>{scorePercent}%</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '1px' }}>FINAL SCORE</p>
            </div>
            <div>
              <p style={{ fontSize: '48px', fontWeight: '900', margin: 0 }}>{totalQ}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '1px' }}>TOTAL QUESTIONS</p>
            </div>
            <div>
              <p style={{ fontSize: '48px', fontWeight: '900', margin: 0, color: '#4ade80' }}>{reportData.correctAnswers || 0}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '1px' }}>CORRECT</p>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 20px',
              borderRadius: '20px',
              background: passed ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)',
              border: `1px solid ${passed ? '#4ade80' : '#f87171'}`,
              color: passed ? '#4ade80' : '#f87171',
              fontWeight: '700',
              fontSize: '13px',
              letterSpacing: '1px'
            }}>
              {passed ? '✓ PASSED' : '✗ NEEDS IMPROVEMENT'}
            </span>
          </div>
        </div>

        {/* Questions Review */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <h4 style={{ fontWeight: '700', color: '#1a3456', marginBottom: '20px', fontSize: '16px' }}>Question Review</h4>
          <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
            {testData?.testQuestions?.map((q: any, idx: number) => {
              const uAns = selectedAnswers[q._id] || [];
              const opts = getOptionsArray(q.options);
              return (
                <div key={q._id} style={{ marginBottom: '20px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                    <span style={{ color: '#64748b', marginRight: '8px' }}>Q{idx + 1}.</span>{q.question}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {opts.map((opt) => {
                      const isSelected = uAns.includes(opt.text);
                      return (
                        <span key={opt.key} style={{
                          padding: '5px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          background: isSelected ? '#dbeafe' : '#f8fafc',
                          border: `1px solid ${isSelected ? '#93c5fd' : '#e2e8f0'}`,
                          color: isSelected ? '#1e40af' : '#64748b',
                          fontWeight: isSelected ? '600' : '400'
                        }}>
                          {opt.text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={() => navigate('/panel/reports')}
            className="btn btn-outline-secondary"
            style={{ borderRadius: '10px', flex: 1, padding: '12px', fontWeight: '600', fontSize: '14px' }}
          >
            View All Reports
          </button>
          <button
            onClick={() => navigate('/panel/create')}
            className="btn btn-primary rt-gradient"
            style={{ borderRadius: '10px', flex: 1, padding: '12px', fontWeight: '600', fontSize: '14px', border: 'none' }}
          >
            New Test →
          </button>
        </div>
      </div>
    );
  }

  // ─── ACTIVE TEST ────────────────────────────────────────────────────
  const currentQuestion = testData?.testQuestions?.[currentIdx];
  if (!currentQuestion) return null;

  const isMulti = currentQuestion.questionType === 'MSQ';
  const userAnswersList = selectedAnswers[currentQuestion._id] || [];
  const optionsArray = getOptionsArray(currentQuestion.options);
  const totalQ = testData.testQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).filter(k => selectedAnswers[k]?.length > 0).length;
  const progress = Math.round((answeredCount / totalQ) * 100);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      {/* Top Bar */}
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '16px 24px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1a3456' }}>{testData.testname}</h4>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>
            Question {currentIdx + 1} of {totalQ} &nbsp;·&nbsp; {answeredCount} answered
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f8fafc',
          padding: '8px 16px',
          borderRadius: '10px',
          border: `2px solid ${timerColor}`
        }}>
          <span style={{ fontSize: '20px' }}>⏱️</span>
          <span style={{ fontSize: '18px', fontWeight: '800', color: timerColor, fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(remainingTime)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #1a3456, #59c7fb)',
          borderRadius: '4px',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Question Card */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        marginBottom: '20px'
      }}>
        {/* Question type badge */}
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{
            fontSize: '10px', fontWeight: '700', letterSpacing: '1px',
            padding: '3px 10px', borderRadius: '20px',
            background: '#dbeafe', color: '#1e40af'
          }}>{currentQuestion.questionType || 'MCQ'}</span>
          <span style={{
            fontSize: '10px', fontWeight: '700', letterSpacing: '1px',
            padding: '3px 10px', borderRadius: '20px',
            background: '#f0fdf4', color: '#16a34a'
          }}>{currentQuestion.difficultyLevel || 'Medium'}</span>
          {isMulti && <span style={{ fontSize: '12px', color: '#94a3b8' }}>Select all that apply</span>}
        </div>

        <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#1e293b', lineHeight: '1.7', marginBottom: '28px' }}>
          {currentQuestion.question}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {optionsArray.map((opt, optIdx) => {
            const isSelected = userAnswersList.includes(opt.text);
            const labels = ['A', 'B', 'C', 'D'];
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleOptionSelect(currentQuestion._id, opt.text, isMulti)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px 20px',
                  border: `2px solid ${isSelected ? '#3b82f6' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  background: isSelected ? '#eff6ff' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                  width: '100%'
                }}
              >
                <span style={{
                  width: '28px', height: '28px', flexShrink: 0,
                  borderRadius: '50%',
                  background: isSelected ? '#3b82f6' : '#f1f5f9',
                  color: isSelected ? '#fff' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '700'
                }}>
                  {labels[optIdx] || optIdx + 1}
                </span>
                <span style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', fontWeight: isSelected ? '600' : '400', flex: 1 }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(currentIdx - 1)}
          style={{
            padding: '12px 24px', borderRadius: '10px',
            border: '2px solid #e2e8f0', background: '#fff',
            color: '#64748b', fontWeight: '600', fontSize: '14px',
            cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
            opacity: currentIdx === 0 ? 0.5 : 1
          }}
        >
          ← Previous
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {currentIdx !== totalQ - 1 && (
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              style={{
                padding: '12px 20px', borderRadius: '10px',
                border: '2px solid #ef4444', background: 'transparent',
                color: '#ef4444', fontWeight: '600', fontSize: '13px', cursor: 'pointer'
              }}
            >
              Submit Early
            </button>
          )}

          {currentIdx === totalQ - 1 ? (
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              style={{
                padding: '12px 28px', borderRadius: '10px',
                border: 'none', background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer'
              }}
            >
              ✓ Submit Test
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentIdx(currentIdx + 1)}
              style={{
                padding: '12px 28px', borderRadius: '10px',
                border: 'none', background: 'linear-gradient(135deg, #1a3456, #0f3460)',
                color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer'
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Question Navigator dots */}
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
        {testData.testQuestions.map((_: any, idx: number) => {
          const isAnswered = selectedAnswers[testData.testQuestions[idx]._id]?.length > 0;
          return (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              style={{
                width: '30px', height: '30px', borderRadius: '6px',
                border: currentIdx === idx ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                background: currentIdx === idx ? '#3b82f6' : isAnswered ? '#dbeafe' : '#f8fafc',
                color: currentIdx === idx ? '#fff' : isAnswered ? '#1e40af' : '#94a3b8',
                fontSize: '11px', fontWeight: '600', cursor: 'pointer'
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050
        }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '36px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <h4 style={{ fontWeight: '800', color: '#1a3456', marginBottom: '8px' }}>Submit Assessment?</h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
              You have answered <strong>{answeredCount} of {totalQ}</strong> questions.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '28px' }}>
              Once submitted, your answers will be graded.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTest}
                disabled={submitting}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}
              >
                {submitting ? 'Grading...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PracticeTest;
