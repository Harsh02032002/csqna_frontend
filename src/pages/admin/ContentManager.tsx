import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContentItem {
  _id: string;
  page: string;
  sectionKey: string;
  contentValue: string;
  updatedAt: string;
}

const ACCENT = '#7c3aed';
const ACCENT_LIGHT = '#ede9fe';

// Default content sections for each page (pre-seeded list)
const PAGE_SECTIONS: Record<string, { key: string; label: string }[]> = {
  Home: [
    { key: 'home_hero_tagline',    label: 'Hero Tagline (top small text)' },
    { key: 'home_hero_heading',    label: 'Hero Main Heading' },
    { key: 'home_hero_subheading', label: 'Hero Sub Heading' },
    { key: 'home_hero_cta',        label: 'Hero CTA Button Text' },
    { key: 'home_features_title',  label: 'Features Section Title' },
    { key: 'home_features_sub',    label: 'Features Section Subtitle' },
    { key: 'home_certs_title',     label: 'Certifications Section Title' },
  ],
  About: [
    { key: 'about_hero_heading',   label: 'About Page Heading' },
    { key: 'about_hero_sub',       label: 'About Page Subtitle' },
    { key: 'about_mission',        label: 'Mission Statement' },
    { key: 'about_vision',         label: 'Vision Statement' },
    { key: 'about_team_title',     label: 'Team Section Title' },
  ],
  Services: [
    { key: 'services_hero_heading', label: 'Services Page Heading' },
    { key: 'services_hero_sub',     label: 'Services Page Subtitle' },
    { key: 'services_practice_title', label: 'Practice Test Card Title' },
    { key: 'services_practice_desc',  label: 'Practice Test Card Description' },
    { key: 'services_cert_title',    label: 'Certification Card Title' },
    { key: 'services_cert_desc',     label: 'Certification Card Description' },
  ],
  Pricing: [
    { key: 'pricing_hero_heading',  label: 'Pricing Page Heading' },
    { key: 'pricing_hero_sub',      label: 'Pricing Page Subtitle' },
    { key: 'pricing_free_title',    label: 'Free Plan Name' },
    { key: 'pricing_free_desc',     label: 'Free Plan Description' },
    { key: 'pricing_plan1_title',   label: 'Plan 1 Name' },
    { key: 'pricing_plan1_desc',    label: 'Plan 1 Description' },
    { key: 'pricing_plan2_title',   label: 'Plan 2 Name' },
    { key: 'pricing_plan2_desc',    label: 'Plan 2 Description' },
    { key: 'pricing_footer_note',   label: 'Pricing Footer Note' },
  ],
  Certifications: [
    { key: 'cert_cisa_heading',    label: 'CISA Page Heading' },
    { key: 'cert_cisa_desc',       label: 'CISA Description' },
    { key: 'cert_cissp_heading',   label: 'CISSP Page Heading' },
    { key: 'cert_cissp_desc',      label: 'CISSP Description' },
    { key: 'cert_ceh_heading',     label: 'CEH Page Heading' },
    { key: 'cert_ceh_desc',        label: 'CEH Description' },
    { key: 'cert_cipp_heading',    label: 'CIPP Page Heading' },
    { key: 'cert_dpdp_heading',    label: 'DPDP Page Heading' },
    { key: 'cert_iso_heading',     label: 'ISO 27001 Page Heading' },
    { key: 'cert_aaia_heading',    label: 'AAIA Page Heading' },
  ],
  Footer: [
    { key: 'footer_tagline',       label: 'Footer Tagline' },
    { key: 'footer_address',       label: 'Company Address' },
    { key: 'footer_phone',         label: 'Phone Number' },
    { key: 'footer_email',         label: 'Support Email' },
    { key: 'footer_copyright',     label: 'Copyright Text' },
  ],
};

const PAGES = Object.keys(PAGE_SECTIONS);

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconEdit  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSave  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconTrash = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>;
const IconPlus  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconClose = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// ─── Main Component ───────────────────────────────────────────────────────────
export const ContentManager: React.FC = () => {
  const [activePage, setActivePage]   = useState('Home');
  const [contents, setContents]       = useState<ContentItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [editing, setEditing]         = useState<Record<string, string>>({});
  const [activeEdits, setActiveEdits] = useState<Set<string>>(new Set());
  const [saving, setSaving]           = useState<string | null>(null);
  const [toast, setToast]             = useState<{ msg: string; ok: boolean } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem]         = useState({ page: 'Home', sectionKey: '', contentValue: '' });

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get('/admin/content');
      setContents(r.data?.data || []);
    } catch { showToast('Failed to load content', false); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  // All sections for current page (merge template + existing DB data)
  const sections = PAGE_SECTIONS[activePage] || [];
  const pageContents = contents.filter(c => c.page === activePage);
  const contentMap: Record<string, ContentItem> = {};
  pageContents.forEach(c => { contentMap[c.sectionKey] = c; });

  // Custom sections that are in DB but not in template
  const customSections = pageContents.filter(c => !sections.find(s => s.key === c.sectionKey));

  const startEdit = (key: string, currentValue: string) => {
    setEditing(e => ({ ...e, [key]: currentValue }));
    setActiveEdits(s => { const n = new Set(s); n.add(key); return n; });
  };

  const cancelEdit = (key: string) => {
    setActiveEdits(s => { const n = new Set(s); n.delete(key); return n; });
  };

  const handleSave = async (key: string, page: string) => {
    setSaving(key);
    try {
      const r = await api.post('/admin/content', {
        page, sectionKey: key, contentValue: editing[key] || '',
      });
      if (r.data?.status) {
        showToast('Saved!');
        cancelEdit(key);
        load();
      } else showToast('Failed to save', false);
    } catch { showToast('Error saving', false); }
    finally { setSaving(null); }
  };

  const handleDelete = async (id: string, key: string) => {
    if (!window.confirm(`Delete section "${key}"?`)) return;
    try {
      await api.delete(`/admin/content/${id}`);
      showToast('Deleted!');
      load();
    } catch { showToast('Error deleting', false); }
  };

  const handleAddCustom = async () => {
    if (!newItem.sectionKey || !newItem.page) return;
    try {
      const r = await api.post('/admin/content', newItem);
      if (r.data?.status) {
        showToast('Section added!');
        setShowAddForm(false);
        setNewItem({ page: 'Home', sectionKey: '', contentValue: '' });
        load();
      } else showToast('Failed', false);
    } catch { showToast('Error', false); }
  };

  const SectionCard: React.FC<{ label: string; sectionKey: string; item?: ContentItem; page: string }> = ({ label, sectionKey, item, page }) => {
    const isEditing = activeEdits.has(sectionKey);
    const isSaving = saving === sectionKey;
    const value = item?.contentValue || '';
    const editVal = editing[sectionKey] ?? value;
    const hasValue = !!value;

    return (
      <div style={{
        background: '#fff', borderRadius: '12px', border: '1px solid #f0f2f8',
        padding: '16px', marginBottom: '10px',
        boxShadow: isEditing ? `0 0 0 2px ${ACCENT_LIGHT}, 0 1px 8px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all .2s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: ACCENT, background: ACCENT_LIGHT, padding: '2px 8px', borderRadius: '20px', letterSpacing: '0.5px' }}>
                {sectionKey}
              </span>
              {!hasValue && (
                <span style={{ fontSize: '10px', color: '#f59e0b', background: '#fffbeb', padding: '1px 6px', borderRadius: '20px', border: '1px solid #fde68a', fontWeight: '600' }}>
                  NOT SET
                </span>
              )}
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>{label}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {!isEditing && (
              <button onClick={() => startEdit(sectionKey, value)}
                style={{ padding: '5px 10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '7px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IconEdit /> Edit
              </button>
            )}
            {item && (
              <button onClick={() => handleDelete(item._id, sectionKey)}
                style={{ padding: '5px 8px', background: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <IconTrash />
              </button>
            )}
          </div>
        </div>

        {/* Current value preview */}
        {!isEditing && hasValue && (
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#475569', background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', lineHeight: 1.5, wordBreak: 'break-word' }}>
            {value}
          </p>
        )}

        {/* Edit mode */}
        {isEditing && (
          <div style={{ marginTop: '10px' }}>
            <textarea value={editVal} onChange={e => setEditing(ed => ({ ...ed, [sectionKey]: e.target.value }))}
              rows={3}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: `1px solid ${ACCENT}`, fontSize: '13px', color: '#1e293b', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', lineHeight: 1.5 }} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => cancelEdit(sectionKey)}
                style={{ padding: '7px 14px', background: '#f1f5f9', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
                Cancel
              </button>
              <button onClick={() => handleSave(sectionKey, page)} disabled={isSaving}
                style={{ padding: '7px 14px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', opacity: isSaving ? 0.7 : 1 }}>
                <IconSave /> {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <style>{`
        @keyframes cmFadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .cm-toast { position:fixed; bottom:24px; right:24px; z-index:1000; padding:12px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.12); animation:cmFadeIn .18s ease; }
        .cm-page-tab:hover { background: ${ACCENT_LIGHT} !important; color: ${ACCENT} !important; }
      `}</style>

      {toast && (
        <div className="cm-toast" style={{ background: toast.ok ? '#f0fdf4' : '#fff1f2', color: toast.ok ? '#16a34a' : '#dc2626', border: `1px solid ${toast.ok ? '#bbf7d0' : '#fecdd3'}` }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>Content Manager</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#94a3b8' }}>Edit static page content from here</p>
        </div>
        <button onClick={() => setShowAddForm(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
          <IconPlus /> Add Custom Section
        </button>
      </div>

      {/* Page Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {PAGES.map(page => (
          <button key={page} className="cm-page-tab" onClick={() => setActivePage(page)}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: activePage === page ? '600' : '500',
              background: activePage === page ? ACCENT : '#f1f5f9',
              color: activePage === page ? '#fff' : '#64748b',
              transition: 'all .15s ease',
            }}>
            {page}
          </button>
        ))}
      </div>

      {/* Sections */}
      {loading ? (
        <p style={{ color: '#94a3b8', fontSize: '13px' }}>Loading...</p>
      ) : (
        <div>
          <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px' }}>
            DEFAULT SECTIONS — {activePage.toUpperCase()} PAGE
          </p>
          {sections.map(s => (
            <SectionCard key={s.key} label={s.label} sectionKey={s.key} item={contentMap[s.key]} page={activePage} />
          ))}

          {customSections.length > 0 && (
            <>
              <p style={{ margin: '20px 0 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px' }}>
                CUSTOM SECTIONS
              </p>
              {customSections.map(c => (
                <SectionCard key={c.sectionKey} label={c.sectionKey} sectionKey={c.sectionKey} item={c} page={c.page} />
              ))}
            </>
          )}
        </div>
      )}

      {/* Add Custom Section Form */}
      {showAddForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setShowAddForm(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)', animation: 'cmFadeIn .18s ease' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Add Custom Section</h2>
              <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><IconClose /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {[
                { label: 'Page', key: 'page', type: 'select' },
                { label: 'Section Key (unique, no spaces)', key: 'sectionKey', type: 'text' },
                { label: 'Content Value', key: 'contentValue', type: 'textarea' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>{field.label.toUpperCase()}</label>
                  {field.type === 'select' ? (
                    <select value={(newItem as any)[field.key]} onChange={e => setNewItem(n => ({ ...n, [field.key]: e.target.value }))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }}>
                      {PAGES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea rows={3} value={(newItem as any)[field.key]} onChange={e => setNewItem(n => ({ ...n, [field.key]: e.target.value }))}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', resize: 'vertical', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  ) : (
                    <input type="text" value={(newItem as any)[field.key]} onChange={e => setNewItem(n => ({ ...n, [field.key]: e.target.value }))}
                      placeholder={field.key === 'sectionKey' ? 'e.g. home_new_section' : ''}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f2f8', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowAddForm(false)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
              <button onClick={handleAddCustom} style={{ padding: '9px 18px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Add Section</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
