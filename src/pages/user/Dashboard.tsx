import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const IconActive = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconOngoing = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3l14 9-14 9V3z"/>
  </svg>
);
const IconCompleted = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconTotal = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

interface StatCardProps {
  label: string; value: number;
  icon: React.ReactNode;
  iconBg: string; iconColor: string;
  borderColor: string;
}
const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconBg, iconColor, borderColor }) => (
  <div className="ud-stat-card" style={{
    background: '#ffffff', borderRadius: '14px', padding: '20px',
    display: 'flex', alignItems: 'center', gap: '16px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    border: '1px solid #f0f2f8',
    borderTop: `3px solid ${borderColor}`,
    transition: 'all .22s ease',
  }}>
    <div style={{
      width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
      background: iconBg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: iconColor,
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.7px', textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ margin: '3px 0 0', fontSize: '26px', fontWeight: '700', color: '#1e293b', lineHeight: 1, letterSpacing: '-0.5px' }}>
        {value}
      </p>
    </div>
  </div>
);

const categories = [
  'Data Protection and Privacy',
  'Information Security Risk Management',
  'Network Security',
  'Encryption & Cryptography',
  'Malware Protection',
  'Identity and Access Management (IAM)',
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ active: 0, ongoing: 0, completed: 0, total: 0 });
  const chartRef      = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/user/dashboard');
        if (res.data?.status && res.data?.data) {
          const { testStats } = res.data.data;
          setStats({
            active:    testStats.active    || 0,
            ongoing:   testStats.ongoing   || 0,
            completed: testStats.completed || 0,
            total:     testStats.total     || 0,
          });
          const graph  = testStats.graph || [];
          const pad7   = (arr: number[]) => { const t = [...arr]; while (t.length < 7) t.push(0); return t; };
          const scores    = pad7(graph.map((i: any) => Number(i.score)));
          const questions = pad7(graph.map((i: any) => Number(i.questions)));

          const win = window as any;
          if (chartRef.current && win.Chart) {
            chartInstance.current?.destroy();
            chartInstance.current = new win.Chart(chartRef.current, {
              type: 'radar',
              data: {
                labels: ['Test 1','Test 2','Test 3','Test 4','Test 5','Test 6','Test 7'],
                datasets: [
                  {
                    label: 'Correct Answers', data: scores, fill: true,
                    backgroundColor: 'rgba(124,58,237,0.1)',
                    borderColor: '#7c3aed',
                    pointBackgroundColor: '#7c3aed', pointBorderColor: '#fff',
                    borderWidth: 2,
                  },
                  {
                    label: 'Questions Attempted', data: questions, fill: true,
                    backgroundColor: 'rgba(99,102,241,0.08)',
                    borderColor: '#6366f1',
                    pointBackgroundColor: '#6366f1', pointBorderColor: '#fff',
                    borderWidth: 2,
                  },
                ],
              },
              options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: '#64748b', font: { family: 'Inter', size: 12 }, boxWidth: 12, padding: 16 } },
                },
                scales: {
                  r: {
                    grid: { color: '#e8eaf0' }, angleLines: { color: '#e8eaf0' },
                    pointLabels: { color: '#64748b', font: { family: 'Inter', size: 11 } },
                    ticks: { display: false },
                  },
                },
              },
            });
          }
        }
      } catch (err) { console.error(err); }
    };
    fetchDashboard();
    return () => { chartInstance.current?.destroy(); };
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ maxWidth: '1200px' }}>
      <style>{`
        .ud-stat-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.09) !important;
        }
        .ud-topic-row:hover {
          background: #faf9ff !important;
          border-color: #ede9fe !important;
        }
      `}</style>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 60%, #c4b5fd 100%)',
        borderRadius: '16px', padding: '24px 28px', marginBottom: '24px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(124,58,237,0.25)',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-20px',
          width: '180px', height: '180px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', right: '100px',
          width: '130px', height: '130px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
        }} />
        <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: '600', letterSpacing: '0.8px' }}>
          {greeting.toUpperCase()}
        </p>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '-0.2px' }}>
          {user?.name} 👋
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
          Ready to practice? Your next certification is waiting.
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <StatCard label="Active Tests"    value={stats.active}    icon={<IconActive />}    iconBg="#fdf4ff" iconColor="#9333ea" borderColor="#a855f7" />
        <StatCard label="Ongoing Tests"   value={stats.ongoing}   icon={<IconOngoing />}   iconBg="#eff6ff" iconColor="#3b82f6" borderColor="#60a5fa" />
        <StatCard label="Completed Tests" value={stats.completed} icon={<IconCompleted />} iconBg="#f0fdf4" iconColor="#16a34a" borderColor="#4ade80" />
        <StatCard label="Total Tests"     value={stats.total}     icon={<IconTotal />}     iconBg="#fff7ed" iconColor="#ea580c" borderColor="#fb923c" />
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>

        {/* Chart */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '22px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f8',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>Performance</h2>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Last 7 tests</span>
          </div>
          <div style={{ height: '320px', position: 'relative' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* Trending */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '22px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f0f2f8',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>Trending Topics</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {categories.map((cat, i) => (
              <div key={i} className="ud-topic-row" style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                background: i === 0 ? '#faf9ff' : '#fafafa',
                border: `1px solid ${i === 0 ? '#ede9fe' : '#f0f2f8'}`,
                transition: 'all .18s ease', cursor: 'default',
              }}>
                <span style={{
                  fontSize: '11px', fontWeight: '700', minWidth: '20px',
                  color: i < 3 ? '#7c3aed' : '#cbd5e1',
                }}>
                  {i < 3 ? '★' : `${i+1}`}
                </span>
                <span style={{ fontSize: '12.5px', color: '#475569', flex: 1, lineHeight: 1.35 }}>{cat}</span>
                <span style={{ color: '#cbd5e1', display: 'flex' }}><IconArrow /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
