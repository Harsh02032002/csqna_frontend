import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  Shield,
  Lock,
  Play,
  CheckCircle2,
  BarChart2,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
  Trophy,
  FileText,
  AlertTriangle,
  Network,
  User,
  Zap
} from 'lucide-react';

const DEFAULT_TRENDING = [
  { name: 'Data Protection & Privacy', rank: 1, pct: 94, icon: Shield, color: '#7c3aed', bg: '#f3e8ff' },
  { name: 'Information Security Risk', rank: 2, pct: 87, icon: AlertTriangle, color: '#e11d48', bg: '#ffe4e6' },
  { name: 'Network Security', rank: 3, pct: 81, icon: Network, color: '#16a34a', bg: '#dcfce7' },
  { name: 'Encryption & Cryptography', rank: 4, pct: 76, icon: Lock, color: '#d97706', bg: '#fef3c7' },
  { name: 'Identity & Access Management', rank: 5, pct: 70, icon: User, color: '#2563eb', bg: '#dbeafe' },
  { name: 'Malware Protection', rank: 6, pct: 64, icon: Zap, color: '#0284c7', bg: '#e0f2fe' },
];

/* ─── Quick Action Card ─── */
const ActionCard: React.FC<{ icon: string; title: string; desc: string; gradient: string; onClick: () => void }> = ({ icon, title, desc, gradient, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '20px',
      padding: '20px', cursor: 'pointer', textAlign: 'left', width: '100%',
      position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease',
      boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
    }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3.5px', background: gradient }} />
    <div style={{ fontSize: '26px', marginBottom: '10px' }}>{icon}</div>
    <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>{title}</p>
    <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.45, fontWeight: '500' }}>{desc}</p>
    <div style={{ position: 'absolute', bottom: '18px', right: '18px', color: '#cbd5e1' }}>
      <ArrowRight size={15} />
    </div>
  </button>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    active: 0,
    ongoing: 0,
    completed: 0,
    total: 0,
    avgScore: 0,
    completionRate: 0,
  });

  const [recentTests, setRecentTests] = useState<any[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<any[]>(DEFAULT_TRENDING);
  const [filterPeriod, setFilterPeriod] = useState<'7D' | '30D' | 'All'>('7D');
  const [reportsData, setReportsData] = useState<any[]>([]);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  // Load Dashboard Stats, Reports & Ongoing Tests
  useEffect(() => {
    let isMounted = true;

    const fetchAllDashboardData = async () => {
      try {
        // 1. Fetch Dashboard Stats
        const dashRes = await api.get('/user/dashboard').catch(() => null);
        let activeCount = 0;
        let ongoingCount = 0;
        let completedCount = 0;
        let totalCount = 0;

        if (dashRes?.data?.status && dashRes?.data?.data?.testStats) {
          const s = dashRes.data.data.testStats;
          activeCount = s.active || 0;
          ongoingCount = s.ongoing || 0;
          completedCount = s.completed || 0;
          totalCount = s.total || 0;
        }

        // 2. Fetch User Reports
        const reportsRes = await api.get('/user/practice/reports').catch(() => null);
        let reportsList: any[] = [];
        if (reportsRes?.data?.data && Array.isArray(reportsRes.data.data)) {
          reportsList = reportsRes.data.data;
        } else if (reportsRes?.data && Array.isArray(reportsRes.data)) {
          reportsList = reportsRes.data;
        }

        // 3. Fetch Ongoing Tests
        const ongoingRes = await api.get('/user/practice/listongoing').catch(() => null);
        if (ongoingRes?.data?.data && Array.isArray(ongoingRes.data.data)) {
          ongoingCount = ongoingRes.data.data.length;
        }

        if (!isMounted) return;

        setReportsData(reportsList);

        // Compute dynamic metrics
        const totalCompleted = reportsList.length > 0 ? reportsList.length : completedCount;
        const totalAll = totalCount > 0 ? totalCount : totalCompleted + ongoingCount;
        
        let calculatedAvgScore = 0;
        if (reportsList.length > 0) {
          const totalScoreSum = reportsList.reduce((acc, curr) => {
            const sc = typeof curr.score === 'number' ? curr.score : parseFloat(curr.score) || 0;
            return acc + sc;
          }, 0);
          calculatedAvgScore = Math.round(totalScoreSum / reportsList.length);
        }

        const compRate = totalAll > 0 ? Math.round((totalCompleted / totalAll) * 100) : 0;

        setStats({
          active: activeCount,
          ongoing: ongoingCount,
          completed: totalCompleted,
          total: totalAll,
          avgScore: calculatedAvgScore,
          completionRate: compRate,
        });

        // Set recent 5 submitted tests
        if (reportsList.length > 0) {
          setRecentTests(reportsList.slice(0, 5));

          // Calculate Dynamic Trending Topics based on user practice categories
          const categoryScores: Record<string, { totalScore: number; count: number }> = {};
          reportsList.forEach((r) => {
            let catName = 'General Cybersecurity';
            if (Array.isArray(r.category) && r.category.length > 0) {
              catName = r.category[0];
            } else if (typeof r.category === 'string' && r.category) {
              catName = r.category;
            } else if (r.testname) {
              catName = r.testname;
            }

            const sc = typeof r.score === 'number' ? r.score : parseFloat(r.score) || 0;
            if (!categoryScores[catName]) {
              categoryScores[catName] = { totalScore: 0, count: 0 };
            }
            categoryScores[catName].totalScore += sc;
            categoryScores[catName].count += 1;
          });

          const dynamicTrending = Object.entries(categoryScores)
            .map(([name, val], i) => {
              const avgPct = Math.round(val.totalScore / val.count);
              const fallback = DEFAULT_TRENDING[i % DEFAULT_TRENDING.length];
              return {
                name,
                rank: i + 1,
                pct: avgPct,
                icon: fallback.icon,
                color: fallback.color,
                bg: fallback.bg,
              };
            })
            .sort((a, b) => b.pct - a.pct)
            .map((item, index) => ({ ...item, rank: index + 1 }))
            .slice(0, 6);

          if (dynamicTrending.length > 0) {
            setTrendingTopics(dynamicTrending);
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic dashboard data:', err);
      }
    };

    fetchAllDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Update Dynamic Performance Overview Chart
  useEffect(() => {
    const win = window as any;
    if (!chartRef.current || !win.Chart) return;

    try {
      chartInstance.current?.destroy();

      // Filter reports by period (7D / 30D / All)
      let filtered = [...reportsData];
      const now = Date.now();

      if (filterPeriod === '7D') {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        filtered = reportsData.filter((r) => new Date(r.createdAt || r.submitTime || now).getTime() >= sevenDaysAgo);
      } else if (filterPeriod === '30D') {
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
        filtered = reportsData.filter((r) => new Date(r.createdAt || r.submitTime || now).getTime() >= thirtyDaysAgo);
      }

      // Reverse so chronological (oldest to newest)
      filtered = filtered.slice(0, 7).reverse();

      let labels: string[] = [];
      let scoreData: number[] = [];
      let qData: number[] = [];

      if (filtered.length > 0) {
        filtered.forEach((item, i) => {
          const dateObj = new Date(item.createdAt || item.submitTime || now);
          const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          labels.push(formattedDate || `Session ${i + 1}`);

          const sc = typeof item.score === 'number' ? item.score : parseFloat(item.score) || 0;
          scoreData.push(Math.round(sc));

          const qCount = item.questions?.length || item.totalQuestions || 20;
          qData.push(qCount);
        });
      } else {
        // Fallback smooth baseline data if user has no test history yet
        labels = ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5', 'Session 6', 'Session 7'];
        scoreData = [0, 0, 0, 0, 0, 0, 0];
        qData = [0, 0, 0, 0, 0, 0, 0];
      }

      chartInstance.current = new win.Chart(chartRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Score %',
              data: scoreData,
              borderColor: '#7c3aed',
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              fill: true,
              pointBackgroundColor: '#7c3aed',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 5,
              borderWidth: 2.5,
              lineTension: 0.4,
            },
            {
              label: 'Questions Attempted',
              data: qData,
              borderColor: '#a78bfa',
              backgroundColor: 'rgba(167, 139, 250, 0.05)',
              fill: true,
              pointBackgroundColor: '#6366f1',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4,
              borderWidth: 2,
              lineTension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          tooltips: {
            backgroundColor: '#1e293b',
            titleFontColor: '#f1f5f9',
            bodyFontColor: '#cbd5e1',
            borderColor: '#334155',
            borderWidth: 1,
            cornerRadius: 12,
          },
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
                ticks: { fontColor: '#94a3b8', fontSize: 11 }
              }
            ],
            yAxes: [
              {
                gridLines: { color: '#f1f5f9' },
                ticks: { beginAtZero: true, max: 100, fontColor: '#94a3b8', fontSize: 11 }
              }
            ]
          }
        },
      });
    } catch (e) {
      console.warn('Chart render exception:', e);
    }

    return () => {
      try {
        chartInstance.current?.destroy();
      } catch {
        // ignore
      }
    };
  }, [reportsData, filterPeriod]);

  // Greeting and user details
  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const rawUser = user?.first_name || user?.name || user?.username || user?.email || '';
  const cleanUser = rawUser.includes('@') ? rawUser.split('@')[0] : rawUser;
  const formattedName = cleanUser
    ? cleanUser.toLowerCase().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Candidate';

  const plan = user?.planDetails?.planName || 'Free';

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", color: '#0f172a' }}>
      
      {/* ── 1. HERO BANNER (Top Section - Dynamic User Welcome) ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eefc 45%, #f5eefd 100%)',
        borderRadius: '26px', padding: '26px 30px', marginBottom: '24px',
        border: '1px solid #e0e7ff', boxShadow: '0 8px 30px rgba(124,58,237,0.04)',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center'
      }}>
        
        {/* Left & Center Info Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#6366f1', letterSpacing: '0.3px', display: 'block', marginBottom: '6px' }}>
              {greetingTime}, {formattedName}! 👏
            </span>
            <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
              Sharpen Your <span style={{ color: '#7c3aed' }}>Cybersecurity Skills</span>
            </h1>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b', fontWeight: '500', maxWidth: '480px', lineHeight: 1.5 }}>
              Practice from 10K+ questions, track your progress and get ready for your next certification.
            </p>
          </div>

          {/* Glowing 3D Shield & Floating Feature Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '88px', height: '88px', borderRadius: '26px',
              background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
              display: 'grid', placeItems: 'center', color: '#ffffff',
              boxShadow: '0 12px 30px rgba(124,58,237,0.35)', border: '4px solid #ffffff'
            }}>
              <Shield size={42} fill="#ffffff" color="#6366f1" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#ffffff', padding: '6px 14px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', color: '#4338ca', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Target size={13} color="#6366f1" /> Practice
              </div>
              <div style={{ background: '#ffffff', padding: '6px 14px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', color: '#4338ca', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={13} color="#6366f1" /> Track Progress
              </div>
              <div style={{ background: '#ffffff', padding: '6px 14px', borderRadius: '12px', fontSize: '11.5px', fontWeight: '800', color: '#4338ca', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trophy size={13} color="#6366f1" /> Get Certified
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: CURRENT PLAN Box */}
        <div style={{
          background: '#ffffff', borderRadius: '20px', padding: '20px 24px',
          border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          minWidth: '230px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#7c3aed', letterSpacing: '0.8px', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
              CURRENT PLAN
            </span>
            <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>
              {plan.toUpperCase()}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '11.5px', color: '#64748b', fontWeight: '500', lineHeight: 1.4 }}>
              Upgrade to unlock more features and advanced tests.
            </p>
          </div>
          <button
            onClick={() => navigate('/panel/create')}
            style={{
              width: '100%', padding: '11px 18px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              color: '#ffffff', border: 'none', borderRadius: '14px', cursor: 'pointer',
              fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              boxShadow: '0 6px 20px rgba(124,58,237,0.25)', transition: 'all 0.2s ease'
            }}
          >
            <Plus size={15} strokeWidth={3} /> New Test <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* ── 2. 4 STAT CARDS ROW (Dynamic Metrics) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '24px' }}>
        
        {/* Card 1: Total Tests */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #faf8ff 100%)',
          borderRadius: '22px', padding: '20px 22px',
          border: '1px solid #eef2ff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center', flexShrink: 0
          }}>
            <FileText size={22} />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block' }}>
              Total Tests
            </span>
            <strong style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, display: 'block' }}>
              {stats.total}
            </strong>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
              ↑ Active <span style={{ color: '#94a3b8', fontWeight: '500' }}>practice count</span>
            </span>
          </div>
        </div>

        {/* Card 2: Ongoing Tests */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
          borderRadius: '22px', padding: '20px 22px',
          border: '1px solid #eef2ff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: '#e0f2fe', color: '#0284c7', display: 'grid', placeItems: 'center', flexShrink: 0
          }}>
            <Play size={22} />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block' }}>
              Ongoing Tests
            </span>
            <strong style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, display: 'block' }}>
              {stats.ongoing}
            </strong>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginTop: '2px', display: 'block' }}>
              In Progress
            </span>
          </div>
        </div>

        {/* Card 3: Completed Tests */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
          borderRadius: '22px', padding: '20px 22px',
          border: '1px solid #eef2ff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: '#dcfce7', color: '#16a34a', display: 'grid', placeItems: 'center', flexShrink: 0
          }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block' }}>
              Completed Tests
            </span>
            <strong style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, display: 'block' }}>
              {stats.completed}
            </strong>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginTop: '2px', display: 'block' }}>
              {stats.completionRate}% completion rate
            </span>
          </div>
        </div>

        {/* Card 4: Average Score */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #fffbeb 100%)',
          borderRadius: '22px', padding: '20px 22px',
          border: '1px solid #eef2ff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: '#fef3c7', color: '#d97706', display: 'grid', placeItems: 'center', flexShrink: 0
          }}>
            <BarChart2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block' }}>
              Average Score
            </span>
            <strong style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: 1.1, display: 'block' }}>
              {stats.avgScore}%
            </strong>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginTop: '2px', display: 'block' }}>
              Across all tests
            </span>
          </div>
        </div>

      </div>

      {/* ── 3. LOWER MAIN GRID (Dynamic Chart & Recent Activity) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '24px' }}>
        
        {/* LEFT COLUMN: Performance Chart & Recent Activity Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Dynamic Performance Overview */}
          <div style={{
            background: '#ffffff', borderRadius: '24px', padding: '24px',
            border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>
                    Performance Overview
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                    Your test performance over time ({filterPeriod})
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setFilterPeriod('7D')}
                    style={{
                      padding: '6px 14px', borderRadius: '10px',
                      background: filterPeriod === '7D' ? '#7c3aed' : '#f8fafc',
                      color: filterPeriod === '7D' ? '#ffffff' : '#64748b',
                      border: filterPeriod === '7D' ? 'none' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11.5px', cursor: 'pointer'
                    }}
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setFilterPeriod('30D')}
                    style={{
                      padding: '6px 14px', borderRadius: '10px',
                      background: filterPeriod === '30D' ? '#7c3aed' : '#f8fafc',
                      color: filterPeriod === '30D' ? '#ffffff' : '#64748b',
                      border: filterPeriod === '30D' ? 'none' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11.5px', cursor: 'pointer'
                    }}
                  >
                    30D
                  </button>
                  <button
                    onClick={() => setFilterPeriod('All')}
                    style={{
                      padding: '6px 14px', borderRadius: '10px',
                      background: filterPeriod === 'All' ? '#7c3aed' : '#f8fafc',
                      color: filterPeriod === 'All' ? '#ffffff' : '#64748b',
                      border: filterPeriod === 'All' ? 'none' : '1px solid #e2e8f0',
                      fontWeight: '800', fontSize: '11.5px', cursor: 'pointer'
                    }}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            {/* Legend indicators */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '18px', fontSize: '12px', fontWeight: '700', marginBottom: '12px' }}>
              <span style={{ color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#7c3aed' }} /> Score %
              </span>
              <span style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '8px', borderRadius: '2px', background: '#ddd6fe' }} /> Questions Attempted
              </span>
            </div>

            <div style={{ height: '240px', position: 'relative' }}>
              <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
            </div>
          </div>

          {/* Card 2: Recent Test Activity (Dynamic Table) */}
          <div style={{
            background: '#ffffff', borderRadius: '24px', padding: '24px',
            border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>
                    Recent Test Activity
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                    Your latest test sessions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/panel/reports')}
                style={{ background: 'none', border: 'none', color: '#7c3aed', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                View All <ArrowRight size={14} />
              </button>
            </div>

            {/* Recent Activity Table List */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#64748b', textAlign: 'left', fontWeight: '800', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 14px', borderRadius: '10px 0 0 10px' }}>Test Name</th>
                    <th style={{ padding: '10px 14px' }}>Category</th>
                    <th style={{ padding: '10px 14px' }}>Date</th>
                    <th style={{ padding: '10px 14px' }}>Score</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                    <th style={{ padding: '10px 14px', borderRadius: '0 10px 10px 0', textAlign: 'right' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {recentTests.length > 0 ? (
                    recentTests.map((t: any, idx: number) => {
                      const categoryName = Array.isArray(t.category) ? t.category[0] : t.category || 'General';
                      const scoreVal = typeof t.score === 'number' ? Math.round(t.score) : parseFloat(t.score) || 0;
                      const dateStr = new Date(t.createdAt || t.submitTime || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

                      return (
                        <tr key={t._id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px', fontWeight: '800', color: '#0f172a' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '26px', height: '26px', borderRadius: '8px', background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                                <FileText size={13} />
                              </span>
                              <span>{t.testname || `${categoryName} Practice`}</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', fontWeight: '700', fontSize: '11.5px' }}>
                              {categoryName}
                            </span>
                          </td>
                          <td style={{ padding: '14px', color: '#64748b', fontWeight: '500' }}>
                            {dateStr}
                          </td>
                          <td style={{ padding: '14px', fontWeight: '900', color: scoreVal >= 70 ? '#16a34a' : '#e11d48' }}>
                            {scoreVal}%
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span style={{ padding: '4px 10px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', fontWeight: '700', fontSize: '11.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={12} /> Completed
                            </span>
                          </td>
                          <td style={{ padding: '14px', textAlign: 'right' }}>
                            <button
                              onClick={() => navigate(t._id ? `/panel/reports` : '/panel/create')}
                              style={{ padding: '6px 14px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#6366f1', fontWeight: '800', fontSize: '12px', cursor: 'pointer' }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>
                        No practice tests taken yet.{' '}
                        <button
                          onClick={() => navigate('/panel/create')}
                          style={{ background: 'none', border: 'none', color: '#7c3aed', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Create your first test now
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Trending Topics Card (Dynamic Ranks) */}
        <div style={{
          background: '#ffffff', borderRadius: '24px', padding: '24px',
          border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🔥</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>
                  Trending Topics
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                  Most practiced domains
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/panel/create')}
              style={{ background: 'none', border: 'none', color: '#7c3aed', fontWeight: '800', fontSize: '12.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              View All <ArrowRight size={13} />
            </button>
          </div>

          {/* Trending Domain Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
            {trendingTopics.map((t) => {
              const IconComp = t.icon || Shield;
              return (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    background: t.bg || '#f3e8ff', color: t.color || '#7c3aed', display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    <IconComp size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {t.name}
                      </span>
                    </div>
                    <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, Math.max(5, t.pct))}%`, background: t.color || '#7c3aed', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>{t.pct}%</span>
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: t.rank <= 3 ? '#f3e8ff' : '#f1f5f9',
                      color: t.rank <= 3 ? '#7c3aed' : '#94a3b8',
                      fontSize: '11px', fontWeight: '800', display: 'grid', placeItems: 'center'
                    }}>
                      {t.rank}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── 4. QUICK ACTIONS SECTION ── */}
      <h3 style={{ margin: '24px 0 16px', fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <ActionCard icon="⚡" title="Start Practice Test" desc="Choose your domain and begin a timed assessment." gradient="linear-gradient(135deg,#7c3aed,#a78bfa)" onClick={() => navigate('/panel/create')} />
        <ActionCard icon="📊" title="View My Reports" desc="Track your progress and identify weak areas." gradient="linear-gradient(135deg,#3b82f6,#60a5fa)" onClick={() => navigate('/panel/reports')} />
        <ActionCard icon="🎓" title="Certification Guide" desc="Browse CISA, CISSP, CEH and more cert prep paths." gradient="linear-gradient(135deg,#10b981,#34d399)" onClick={() => window.location.href = '/ceh'} />
        <ActionCard icon="⚙️" title="Account Settings" desc="Update your profile, email and plan preferences." gradient="linear-gradient(135deg,#f59e0b,#fbbf24)" onClick={() => navigate('/panel/settings')} />
      </div>

    </div>
  );
};

export default Dashboard;
