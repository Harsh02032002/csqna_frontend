import React, { useState, useEffect, useMemo } from 'react';
import api from '../../utils/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Question {
  _id: string;
  category: string;
  area: string;
  question: string;
  options: { Option1?: string; Option2?: string; Option3?: string; Option4?: string };
  correctAnswers: string[];
  justifications: { Option1?: string; Option2?: string; Option3?: string; Option4?: string };
  questionType: string;
  difficultyLevel: string;
  certification?: string;
}

const DIFFICULTY_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  Easy:   { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  Medium: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  Hard:   { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
};
const TYPE_STYLES: Record<string, { bg: string; color: string }> = {
  MCQ: { bg: '#eff6ff', color: '#2563eb' },
  MSQ: { bg: '#faf5ff', color: '#7c3aed' },
};

const ACCENT = '#7c3aed';
const ACCENT_LIGHT = '#ede9fe';

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconPlus   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconEdit   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconTrash  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IconSearch = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconClose  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconCheck  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconChevron = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge: React.FC<{ label: string; style: { bg: string; color: string; border?: string } }> = ({ label, style }) => (
  <span style={{
    fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px',
    background: style.bg, color: style.color, border: `1px solid ${style.border || style.bg}`,
    letterSpacing: '0.5px', whiteSpace: 'nowrap',
  }}>{label}</span>
);

// ─── Question Form (Add / Edit modal body) ─────────────────────────────────
interface QFormState {
  category: string; area: string; question: string;
  Option1: string; Option2: string; Option3: string; Option4: string;
  isCorrectOption1: boolean; isCorrectOption2: boolean; isCorrectOption3: boolean; isCorrectOption4: boolean;
  justification1: string; justification2: string; justification3: string; justification4: string;
  questionType: string; difficultyLevel: string; certification: string;
}
const emptyForm = (): QFormState => ({
  category: '', area: '', question: '',
  Option1: '', Option2: '', Option3: '', Option4: '',
  isCorrectOption1: false, isCorrectOption2: false, isCorrectOption3: false, isCorrectOption4: false,
  justification1: '', justification2: '', justification3: '', justification4: '',
  questionType: 'MCQ', difficultyLevel: 'Medium', certification: '',
});

const QuestionForm: React.FC<{
  form: QFormState;
  onChange: (k: keyof QFormState, v: any) => void;
  isCert?: boolean;
}> = ({ form, onChange, isCert }) => {
  const inp = (label: string, key: keyof QFormState, multi?: boolean) => (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>
        {label}
      </label>
      {multi ? (
        <textarea value={form[key] as string} onChange={e => onChange(key, e.target.value)} rows={3}
          style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} />
      ) : (
        <input type="text" value={form[key] as string} onChange={e => onChange(key, e.target.value)}
          style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
      )}
    </div>
  );

  const optionRow = (num: 1|2|3|4) => {
    const optKey = `Option${num}` as keyof QFormState;
    const corrKey = `isCorrectOption${num}` as keyof QFormState;
    const justKey = `justification${num}` as keyof QFormState;
    const isCorrect = form[corrKey] as boolean;
    return (
      <div key={num} style={{ background: isCorrect ? '#f0fdf4' : '#f8fafc', borderRadius: '10px', padding: '12px', marginBottom: '8px', border: `1px solid ${isCorrect ? '#bbf7d0' : '#f0f2f8'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <button type="button"
            onClick={() => onChange(corrKey, !isCorrect)}
            style={{
              width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
              background: isCorrect ? '#16a34a' : '#fff', border: `2px solid ${isCorrect ? '#16a34a' : '#cbd5e1'}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', transition: 'all .15s ease',
            }}>
            {isCorrect && <IconCheck />}
          </button>
          <span style={{ fontSize: '11px', fontWeight: '700', color: isCorrect ? '#16a34a' : '#94a3b8', letterSpacing: '0.5px' }}>
            OPTION {num} {isCorrect ? '✓ CORRECT' : ''}
          </span>
        </div>
        <input type="text" placeholder={`Option ${num} text`} value={form[optKey] as string} onChange={e => onChange(optKey, e.target.value)}
          style={{ width: '100%', padding: '7px 10px', borderRadius: '7px', border: '1px solid #e2e8f0', fontSize: '13px', marginBottom: '6px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
        <input type="text" placeholder={`Justification for Option ${num}`} value={form[justKey] as string} onChange={e => onChange(justKey, e.target.value)}
          style={{ width: '100%', padding: '7px 10px', borderRadius: '7px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>{inp('Category *', 'category')}</div>
        <div>{inp('Area *', 'area')}</div>
      </div>
      {isCert && inp('Certification *', 'certification')}
      {inp('Question *', 'question', true)}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>TYPE *</label>
          <select value={form.questionType} onChange={e => onChange('questionType', e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', background: '#fff', fontFamily: 'inherit' }}>
            <option>MCQ</option><option>MSQ</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>DIFFICULTY *</label>
          <select value={form.difficultyLevel} onChange={e => onChange('difficultyLevel', e.target.value)}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', background: '#fff', fontFamily: 'inherit' }}>
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </select>
        </div>
      </div>
      <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.8px' }}>OPTIONS (check = correct answer)</p>
      {([1,2,3,4] as (1|2|3|4)[]).map(optionRow)}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const Questions: React.FC = () => {
  const [tab, setTab]               = useState<'practice' | 'cert'>('practice');
  const [questions, setQuestions]   = useState<Question[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [catFilter, setCatFilter]   = useState('');
  const [selected, setSelected]     = useState<Set<string>>(new Set());
  const [expanded, setExpanded]     = useState<string | null>(null);

  const [showAddModal,  setShowAddModal]  = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelConfirm, setShowDelConfirm] = useState<Question | null>(null);
  const [showBulkDel,   setShowBulkDel]   = useState(false);

  const [form, setForm] = useState<QFormState>(emptyForm());
  const [editTarget, setEditTarget] = useState<Question | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const isCert = tab === 'cert';
  const baseUrl = isCert ? '/admin/certification/question' : '/admin/practice/question';
  const listUrl = isCert ? '/admin/certification/questions' : '/admin/practice/questions';
  const bulkUrl = isCert ? '/admin/certification/questions/bulk' : '/admin/practice/questions/bulk';

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    setSelected(new Set());
    setCatFilter('');
    try {
      const r = await api.get(listUrl + '?limit=5000');
      setQuestions(r.data?.data || []);
    } catch { showToast('Failed to load questions', false); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [tab]);

  // ── Derived data
  const categories = useMemo(() => [...new Set(questions.map(q => q.category))].sort(), [questions]);

  const filtered = useMemo(() => {
    let q = questions;
    if (catFilter) q = q.filter(x => x.category === catFilter);
    if (search)    q = q.filter(x => x.question.toLowerCase().includes(search.toLowerCase()) || x.category.toLowerCase().includes(search.toLowerCase()));
    return q;
  }, [questions, catFilter, search]);

  // ── Selection
  const toggleSelect = (id: string) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll    = () => setSelected(s => s.size === filtered.length ? new Set() : new Set(filtered.map(q => q._id)));

  // ── Add
  const handleAdd = async () => {
    setSaving(true);
    try {
      const payload = { ...form };
      const r = await api.post(baseUrl, payload);
      if (r.data?.status) { showToast('Question added!'); setShowAddModal(false); setForm(emptyForm()); load(); }
      else showToast(r.data?.message || 'Failed', false);
    } catch { showToast('Error adding question', false); }
    finally { setSaving(false); }
  };

  // ── Edit
  const openEdit = (q: Question) => {
    const ca = q.correctAnswers || [];
    setForm({
      category: q.category, area: q.area, question: q.question,
      Option1: q.options?.Option1 || '', Option2: q.options?.Option2 || '',
      Option3: q.options?.Option3 || '', Option4: q.options?.Option4 || '',
      isCorrectOption1: ca.includes(q.options?.Option1 || ''),
      isCorrectOption2: ca.includes(q.options?.Option2 || ''),
      isCorrectOption3: ca.includes(q.options?.Option3 || ''),
      isCorrectOption4: ca.includes(q.options?.Option4 || ''),
      justification1: q.justifications?.Option1 || '',
      justification2: q.justifications?.Option2 || '',
      justification3: q.justifications?.Option3 || '',
      justification4: q.justifications?.Option4 || '',
      questionType: q.questionType, difficultyLevel: q.difficultyLevel,
      certification: q.certification || '',
    });
    setEditTarget(q);
    setShowEditModal(true);
  };

  const handleEdit = async () => {
    if (!editTarget) return;
    setSaving(true);
    try {
      const payload = { id: editTarget._id, ...form };
      const r = await api.patch(baseUrl, payload);
      if (r.data?.status) { showToast('Question updated!'); setShowEditModal(false); load(); }
      else showToast(r.data?.message || 'Failed', false);
    } catch { showToast('Error updating question', false); }
    finally { setSaving(false); }
  };

  // ── Delete single
  const handleDelete = async (q: Question) => {
    try {
      const r = await api.delete(baseUrl, { headers: { id: q._id } });
      if (r.data?.status) { showToast('Deleted!'); setShowDelConfirm(null); load(); }
      else showToast('Failed', false);
    } catch { showToast('Error', false); }
  };

  // ── Bulk delete
  const handleBulkDelete = async () => {
    try {
      const r = await api.delete(bulkUrl, { data: { ids: [...selected] } });
      if (r.data?.status) { showToast(`${r.data.data?.deletedCount || selected.size} deleted!`); setShowBulkDel(false); load(); }
      else showToast('Failed', false);
    } catch { showToast('Error', false); }
  };

  const formChange = (k: keyof QFormState, v: any) => setForm(f => ({ ...f, [k]: v }));

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '1200px' }}>
      <style>{`
        .q-row:hover { background: #faf9ff !important; }
        .q-row-expanded { background: #faf9ff !important; }
        .q-cat-item:hover { background: ${ACCENT_LIGHT} !important; color: ${ACCENT} !important; }
        .q-action-btn:hover { opacity: 0.75; }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.3); z-index:500; display:flex; align-items:center; justify-content:center; padding:20px; }
        .modal-box { background:#fff; border-radius:16px; width:100%; max-width:680px; max-height:90vh; overflow-y:auto; box-shadow:0 24px 80px rgba(0,0,0,0.15); }
        @keyframes qFadeIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .modal-box { animation: qFadeIn .18s ease; }
        .q-toast { position:fixed; bottom:24px; right:24px; z-index:1000; padding:12px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.15); animation: qFadeIn .18s ease; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="q-toast" style={{ background: toast.ok ? '#f0fdf4' : '#fef2f2', color: toast.ok ? '#16a34a' : '#dc2626', border: `1px solid ${toast.ok ? '#bbf7d0' : '#fecaca'}` }}>
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>Question Bank</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#94a3b8' }}>
            {questions.length.toLocaleString()} questions loaded
          </p>
        </div>
        <button onClick={() => { setForm(emptyForm()); setShowAddModal(true); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px',
            background: ACCENT, color: '#fff', border: 'none', borderRadius: '10px',
            cursor: 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
          }}>
          <IconPlus /> Add Question
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: '#f1f5f9', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {(['practice', 'cert'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: '7px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: '600',
              background: tab === t ? '#fff' : 'transparent',
              color: tab === t ? ACCENT : '#64748b',
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all .15s ease',
            }}>
            {t === 'practice' ? 'Practice Questions' : 'Certification Questions'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px', alignItems: 'start' }}>

        {/* Category sidebar */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f0f2f8', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f2f8' }}>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px' }}>CATEGORIES</p>
          </div>
          <div style={{ padding: '8px' }}>
            <div className="q-cat-item" onClick={() => setCatFilter('')}
              style={{ padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12.5px', fontWeight: catFilter === '' ? '600' : '500', color: catFilter === '' ? ACCENT : '#475569', background: catFilter === '' ? ACCENT_LIGHT : 'transparent', transition: 'all .15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span>All</span>
              <span style={{ fontSize: '11px', background: '#f1f5f9', borderRadius: '20px', padding: '1px 7px' }}>{questions.length}</span>
            </div>
            {categories.map(cat => {
              const cnt = questions.filter(q => q.category === cat).length;
              return (
                <div key={cat} className="q-cat-item" onClick={() => setCatFilter(cat)}
                  style={{ padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12.5px', fontWeight: catFilter === cat ? '600' : '400', color: catFilter === cat ? ACCENT : '#475569', background: catFilter === cat ? ACCENT_LIGHT : 'transparent', transition: 'all .15s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px', lineHeight: 1.3 }}>
                  <span style={{ flex: 1, paddingRight: '6px' }}>{cat}</span>
                  <span style={{ fontSize: '11px', background: '#f1f5f9', borderRadius: '20px', padding: '1px 7px', flexShrink: 0 }}>{cnt}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question table */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f0f2f8', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

          {/* Toolbar */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}><IconSearch /></span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..."
                style={{ width: '100%', paddingLeft: '32px', paddingRight: '10px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500', whiteSpace: 'nowrap' }}>{filtered.length} shown</span>
            {selected.size > 0 && (
              <button onClick={() => setShowBulkDel(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                <IconTrash /> Delete {selected.size} selected
              </button>
            )}
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f0f2f8' }}>
                  <th style={{ width: '40px', padding: '10px 12px' }}>
                    <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll}
                      style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: ACCENT }} />
                  </th>
                  {['Category / Area', 'Question', 'Type', 'Difficulty', 'Options', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px', textAlign: 'left', whiteSpace: 'nowrap' }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No questions found</td></tr>
                ) : filtered.map((q) => {
                  const isExp = expanded === q._id;
                  const diffStyle = DIFFICULTY_STYLES[q.difficultyLevel] || DIFFICULTY_STYLES['Medium'];
                  const typeStyle = TYPE_STYLES[q.questionType] || TYPE_STYLES['MCQ'];
                  const opts = [q.options?.Option1, q.options?.Option2, q.options?.Option3, q.options?.Option4].filter(Boolean);
                  const corrects = (q.correctAnswers || []).filter(Boolean);

                  return (
                    <React.Fragment key={q._id}>
                      <tr className={`q-row ${isExp ? 'q-row-expanded' : ''}`}
                        style={{ borderBottom: '1px solid #f0f2f8', cursor: 'pointer', transition: 'background .15s' }}>
                        <td style={{ padding: '10px 12px' }} onClick={e => e.stopPropagation()}>
                          <input type="checkbox" checked={selected.has(q._id)} onChange={() => toggleSelect(q._id)}
                            style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: ACCENT }} />
                        </td>
                        <td style={{ padding: '10px 12px', minWidth: '140px' }} onClick={() => setExpanded(isExp ? null : q._id)}>
                          <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>{q.category}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94a3b8' }}>{q.area}</p>
                          {isCert && q.certification && <p style={{ margin: '2px 0 0', fontSize: '10px', color: ACCENT, fontWeight: '700' }}>{q.certification}</p>}
                        </td>
                        <td style={{ padding: '10px 12px', maxWidth: '320px' }} onClick={() => setExpanded(isExp ? null : q._id)}>
                          <p style={{ margin: 0, fontSize: '12.5px', color: '#334155', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {q.question}
                          </p>
                        </td>
                        <td style={{ padding: '10px 12px' }} onClick={() => setExpanded(isExp ? null : q._id)}>
                          <Badge label={q.questionType} style={typeStyle} />
                        </td>
                        <td style={{ padding: '10px 12px' }} onClick={() => setExpanded(isExp ? null : q._id)}>
                          <Badge label={q.difficultyLevel} style={diffStyle} />
                        </td>
                        <td style={{ padding: '10px 12px' }} onClick={() => setExpanded(isExp ? null : q._id)}>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{opts.length} options • {corrects.length} correct</span>
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="q-action-btn" onClick={e => { e.stopPropagation(); openEdit(q); }}
                              style={{ padding: '5px 8px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: '600' }}>
                              <IconEdit /> Edit
                            </button>
                            <button className="q-action-btn" onClick={e => { e.stopPropagation(); setShowDelConfirm(q); }}
                              style={{ padding: '5px 8px', background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: '600' }}>
                              <IconTrash />
                            </button>
                            <button className="q-action-btn" onClick={e => { e.stopPropagation(); setExpanded(isExp ? null : q._id); }}
                              style={{ padding: '5px 7px', background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all .15s', transform: isExp ? 'rotate(180deg)' : 'none' }}>
                              <IconChevron />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {isExp && (
                        <tr style={{ background: '#faf9ff' }}>
                          <td colSpan={7} style={{ padding: '0 12px 16px 56px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px', paddingTop: '12px' }}>
                              {opts.map((opt, i) => {
                                const optKey = `Option${i+1}`;
                                const isCorr = corrects.includes(opt || '');
                                const just = (q.justifications as any)?.[optKey] || '';
                                return (
                                  <div key={i} style={{ background: isCorr ? '#f0fdf4' : '#fff', border: `1px solid ${isCorr ? '#bbf7d0' : '#f0f2f8'}`, borderRadius: '10px', padding: '10px 12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: isCorr ? '#16a34a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {isCorr ? <span style={{ color: '#fff', fontSize: '9px' }}>✓</span> : <span style={{ color: '#94a3b8', fontSize: '9px' }}>{i+1}</span>}
                                      </span>
                                      <span style={{ fontSize: '12.5px', fontWeight: isCorr ? '600' : '400', color: isCorr ? '#15803d' : '#334155' }}>{opt}</span>
                                    </div>
                                    {just && <p style={{ margin: '4px 0 0 24px', fontSize: '11px', color: '#64748b', lineHeight: 1.5, fontStyle: 'italic' }}>{just}</p>}
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Add Modal ── */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Add Question</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><IconClose /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <QuestionForm form={form} onChange={formChange} isCert={isCert} />
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f2f8', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
              <button onClick={handleAdd} disabled={saving} style={{ padding: '9px 18px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Edit Question</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><IconClose /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <QuestionForm form={form} onChange={formChange} isCert={isCert} />
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f2f8', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowEditModal(false)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
              <button onClick={handleEdit} disabled={saving} style={{ padding: '9px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {showDelConfirm && (
        <div className="modal-overlay" onClick={() => setShowDelConfirm(null)}>
          <div className="modal-box" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <IconTrash />
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Delete Question?</h2>
              <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                "{showDelConfirm.question.slice(0, 80)}..."
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowDelConfirm(null)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
                <button onClick={() => handleDelete(showDelConfirm)} style={{ padding: '9px 18px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Bulk Delete Confirm ── */}
      {showBulkDel && (
        <div className="modal-overlay" onClick={() => setShowBulkDel(false)}>
          <div className="modal-box" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Bulk Delete {selected.size} Questions?</h2>
              <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#64748b' }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowBulkDel(false)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
                <button onClick={handleBulkDelete} style={{ padding: '9px 18px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Delete All</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
