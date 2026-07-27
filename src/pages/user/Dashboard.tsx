import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

/* ─── Icons ──────────────────────────────────────────────────────────────────── */
const IconPlus      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconArrow     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconClock     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconPlay      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 3l14 9-14 9V3z"/></svg>;
const IconCheck     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconBar       = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;

/* ─── Stat Card ──────────────────────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
  desc: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient, glow, desc, delay }) => (
  <div className="ud-stat" style={{ background: '#fff', borderRadius: '18px', padding: '20px 22px', border: '1px solid #f0f2f8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', animation: `udFadeUp .4s ease ${delay}s both` }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: gradient }} />
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 4px 14px ${glow}` }}>
        {icon}
      </div>
      <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', background: '#f8fafc', padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.5px' }}>
        {desc}
      </span>
    </div>
    <p style={{ margin: 0, fontSize: '34px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1.5px', lineHeight: 1 }}>{value}</p>
    <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.4px' }}>{label.toUpperCase()}</p>
  </div>
);

/* ─── Quick Action Card ──────────────────────────────────────────────────────── */
const ActionCard: React.FC<{ icon: string; title: string; desc: string; gradient: string; onClick: () => void; delay: number }> = ({ icon, title, desc, gradient, onClick, delay }) => (
  <button className="ud-action" onClick={onClick}
    style={{ background: '#fff', border: '1px solid #f0f2f8', borderRadius: '18px', padding: '22px', cursor: 'pointer', textAlign: 'left', width: '100%', position: 'relative', overflow: 'hidden', animation: `udFadeUp .4s ease ${delay}s both` }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: gradient }} />
    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>
    <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{title}</p>
    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>{desc}</p>
    <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: '#cbd5e1' }}><IconArrow /></div>
  </button>
);

const TRENDING = [
  { name: 'Data Protection & Privacy', rank: 1, pct: 94 },
  { name: 'Information Security Risk', rank: 2, pct: 87 },
  { name: 'Network Security', rank: 3, pct: 81 },
  { name: 'Encryption & Cryptography', rank: 4, pct: 76 },
  { name: 'Identity & Access Management', rank: 5, pct: 70 },
  { name: 'Malware Protection', rank: 6, pct: 64 },
];

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
              type: 'line',
              data: {
                labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7'],
                datasets: [
                  {
                    label: 'Score %',
                    data: scores,
                    fill: true,
                    backgroundColor: 'rgba(124,58,237,0.08)',
                    borderColor: '#7c3aed',
                    pointBackgroundColor: '#7c3aed',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    borderWidth: 2.5,
                    tension: 0.4,
                  },
                  {
                    label: 'Questions',
                    data: questions,
                    fill: true,
                    backgroundColor: 'rgba(99,102,241,0.06)',
                    borderColor: '#6366f1',
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    borderWidth: 2,
                    tension: 0.4,
                  },
                ],
              },
              options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                  legend: { labels: { color: '#64748b', font: { family: 'Inter', size: 12, weight: '600' }, boxWidth: 10, padding: 20 } },
                  tooltip: {
                    backgroundColor: '#1e293b', titleColor: '#f1f5f9', bodyColor: '#94a3b8',
                    borderColor: '#334155', borderWidth: 1, padding: 12,
                    cornerRadius: 12,
                  },
                },
                scales: {
                  x: { grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } },
                  y: {
                    grid: { color: '#f1f5f9' }, ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
                    beginAtZero: true,
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

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? '🌅 Good morning' : hour < 18 ? '☀️ Good afternoon' : '🌙 Good evening';
  const plan     = user?.planDetails?.planName?.toUpperCase() || 'FREE';

  return (
    <div style={{ maxWidth: '1180px', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <style>{`
        @keyframes udFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes udShine  { from{left:-100%} to{left:200%} }
        .ud-stat    { transition:transform .2s,box-shadow .2s; }
        .ud-stat:hover    { transform:translateY(-4px); box-shadow:0 12px 36px rgba(0,0,0,0.1) !important; }
        .ud-action  { transition:transform .2s,box-shadow .2s; box-shadow:0 2px 12px rgba(0,0,0,0.05); }
        .ud-action:hover  { transform:translateY(-4px); box-shadow:0 10px 30px rgba(0,0,0,0.1) !important; }
        .ud-trend-row { transition:background .15s,transform .15s; border-radius:12px; }
        .ud-trend-row:hover { background:#faf8ff !important; transform:translateX(4px); }
      `}</style>

      {/* ── Welcome Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg,#4c1d95 0%,#7c3aed 45%,#a78bfa 100%)',
        borderRadius: '22px', padding: '28px 32px', marginBottom: '24px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(124,58,237,0.3)',
        animation: 'udFadeUp .3s ease both',
      }}>
        {/* Decorative circles */}
        {[
          { top: '-50px', right: '-30px', size: '200px', opacity: 0.15 },
          { bottom: '-40px', right: '120px', size: '140px', opacity: 0.1 },
          { top: '10px', right: '220px', size: '80px', opacity: 0.08 },
        ].map((c, i) => (
          <div key={i} style={{ position: 'absolute', ...c as any, width: c.size, height: c.size, borderRadius: '50%', background: 'rgba(255,255,255,1)', pointerEvents: 'none' }} />
        ))}
        {/* Shine sweep */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '60px', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)', animation: 'udShine 3s ease infinite 1s', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', position: 'relative' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: '600', letterSpacing: '0.8px' }}>{greeting}</p>
            <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>
              {user?.name || 'Welcome!'} 👋
            </h1>
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              Ready to sharpen your cybersecurity skills? Your next cert is closer than you think.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '10px 16px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '700', letterSpacing: '0.8px' }}>CURRENT PLAN</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#fff' }}>{plan}</p>
            </div>
            <button onClick={() => navigate('/panel/create')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', color: '#7c3aed', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
              <IconPlus /> New Test
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '22px' }}>
        <StatCard label="Active Tests"    value={stats.active}    icon={<IconClock />}  gradient="linear-gradient(135deg,#8b5cf6,#a78bfa)" glow="rgba(139,92,246,0.35)" desc="Pending"   delay={0.1} />
        <StatCard label="Ongoing Tests"   value={stats.ongoing}   icon={<IconPlay />}   gradient="linear-gradient(135deg,#3b82f6,#60a5fa)" glow="rgba(59,130,246,0.35)"  desc="In Progress" delay={0.15} />
        <StatCard label="Completed Tests" value={stats.completed} icon={<IconCheck />}  gradient="linear-gradient(135deg,#10b981,#34d399)" glow="rgba(16,185,129,0.35)" desc="Done"     delay={0.2} />
        <StatCard label="Total Tests"     value={stats.total}     icon={<IconBar />}    gradient="linear-gradient(135deg,#f59e0b,#fbbf24)" glow="rgba(245,158,11,0.35)"  desc="All time"  delay={0.25} />
      </div>

      {/* ── Main Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px', marginBottom: '22px' }}>

        {/* Chart */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f0f2f8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', animation: 'udFadeUp .4s ease .3s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Performance Overview</h2>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Last 7 test sessions</p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['7D', '30D', 'All'].map((t, i) => (
                <button key={i} style={{ padding: '4px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: i === 0 ? '#ede9fe' : '#fff', color: i === 0 ? '#7c3aed' : '#94a3b8', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ height: '280px', position: 'relative' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* Trending Topics */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f0f2f8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', animation: 'udFadeUp .4s ease .35s both' }}>
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Trending Topics</h2>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Most practiced domains</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {TRENDING.map((t, i) => (
              <div key={i} className="ud-trend-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 10px', cursor: 'default' }}>
                <span style={{
                  width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                  background: i < 3 ? 'linear-gradient(135deg,#7c3aed,#a78bfa)' : '#f1f5f9',
                  color: i < 3 ? '#fff' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', fontWeight: '800',
                }}>
                  {i < 3 ? '★' : t.rank}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#334155', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</p>
                  <div style={{ marginTop: '4px', height: '3px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${t.pct}%`, background: i < 3 ? 'linear-gradient(90deg,#7c3aed,#a78bfa)' : '#cbd5e1', borderRadius: '4px' }} />
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', flexShrink: 0 }}>{t.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', color: '#0f172a', letterSpacing: '0.3px' }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <ActionCard icon="⚡" title="Start Practice Test" desc="Choose your domain and begin a timed assessment." gradient="linear-gradient(135deg,#7c3aed,#a78bfa)" onClick={() => navigate('/panel/create')} delay={0.4} />
        <ActionCard icon="📊" title="View My Reports" desc="Track your progress and identify weak areas." gradient="linear-gradient(135deg,#3b82f6,#60a5fa)" onClick={() => navigate('/panel/reports')} delay={0.45} />
        <ActionCard icon="🎓" title="Certification Guide" desc="Browse CISA, CISSP, CEH and more cert prep paths." gradient="linear-gradient(135deg,#10b981,#34d399)" onClick={() => window.location.href = '/certifications'} delay={0.5} />
        <ActionCard icon="⚙️" title="Account Settings" desc="Update your profile, email and plan preferences." gradient="linear-gradient(135deg,#f59e0b,#fbbf24)" onClick={() => navigate('/panel/settings')} delay={0.55} />
      </div>
    </div>
  );
};

export default Dashboard;
