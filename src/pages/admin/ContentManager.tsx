import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContentItem {
  _id: string;
  page: string;
  sectionKey: string;
  contentValue: string;
  updatedAt: string;
}

interface VideoItem {
  id: string;
  title: string;
  subtitle?: string;
  src: string;        // file URL (uploaded) or YouTube URL/embed
  type: 'file' | 'youtube';
  poster?: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface BannerItem {
  key: string;
  label: string;
  page: string;
  defaultSrc: string;
  overlayKey?: string;
  overlayLabel?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const ACCENT = '#7c3aed';
const ACCENT_LIGHT = '#ede9fe';
const DANGER = '#e11d48';
const DANGER_LIGHT = '#fff1f2';
const SUCCESS = '#16a34a';

type TabType = 'texts' | 'banners' | 'videos' | 'faqs';
const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'texts',   label: 'Text Sections', icon: '✏️' },
  { id: 'banners', label: 'Banners & Images', icon: '🖼️' },
  { id: 'videos',  label: 'Videos', icon: '🎬' },
  { id: 'faqs',    label: 'FAQs', icon: '❓' },
];

// ─── Page Sections (Texts) ───────────────────────────────────────────────────
const PAGE_SECTIONS: Record<string, { key: string; label: string; defaultVal: string }[]> = {
  Home: [
    { key: 'home_hero_tagline',         label: 'Hero Tagline (top small text)',     defaultVal: 'Assess YOUR CYBERSECURITY SKILLS - use the Cyber Security Question & Answer platform.' },
    { key: 'home_hero_heading',         label: 'Hero Main Heading',                 defaultVal: 'CSQNA' },
    { key: 'home_hero_subheading',      label: 'Hero Sub Heading',                  defaultVal: 'BUILD AND USE PRACTICE TESTS TO ASSESS AND SHARPEN YOUR CYBERSECURITY EDGE\n\nTEST, LEARN, CERTIFY' },
    { key: 'home_hero_cta',             label: 'Hero CTA Button Text',              defaultVal: 'Get Started' },
    { key: 'home_features_title',       label: 'Features Section Title',            defaultVal: 'Key Features' },
    { key: 'home_feature1_title',       label: 'Feature Card 1 Title',              defaultVal: 'Test Skills' },
    { key: 'home_feature1_desc',        label: 'Feature Card 1 Description',        defaultVal: 'At CSQNA, we understand that just reading theory alone isn\'t enough for you to be ready for the certification exam, or your cybersecurity job interview. You need to continuously test yourself and hone your skills.' },
    { key: 'home_feature2_title',       label: 'Feature Card 2 Title',              defaultVal: 'Easy-to-Use Platform' },
    { key: 'home_feature2_desc',        label: 'Feature Card 2 Description',        defaultVal: 'CSQNA is a trusted global test platform for building and taking practice tests. Our user-friendly interface ensures a seamless experience from start to finish.' },
    { key: 'home_feature3_title',       label: 'Feature Card 3 Title',              defaultVal: 'Certify' },
    { key: 'home_feature3_desc',        label: 'Feature Card 3 Description',        defaultVal: 'Gain confidence with practice tests that prepare you for certifications like CISA, CISM, CISSP, CEH etc.' },
    { key: 'home_feature4_title',       label: 'Feature Card 4 Title',              defaultVal: 'Free Sign-Up' },
    { key: 'home_feature4_desc',        label: 'Feature Card 4 Description',        defaultVal: 'Experience the benefits of seamless Test management with CSQNA\'s free sign-up. Register effortlessly and gain instant access.' },
    { key: 'home_feature5_title',       label: 'Feature Card 5 Title',              defaultVal: 'Email Confirmation' },
    { key: 'home_feature5_desc',        label: 'Feature Card 5 Description',        defaultVal: 'CSQNA adds an extra layer of security to the account, ensuring your data stays protected.' },
    { key: 'home_feature6_title',       label: 'Feature Card 6 Title',              defaultVal: '24/7 Customer Support' },
    { key: 'home_feature6_desc',        label: 'Feature Card 6 Description',        defaultVal: 'Our expert support team is available 24/7 to address your questions and guide you through every aspect.' },
    { key: 'home_panel_title',          label: 'Panel Overview Title',              defaultVal: 'Panel Overview' },
    { key: 'home_panel_desc',           label: 'Panel Overview Description',        defaultVal: 'Once you sign up, you get your own personal admin panel—a smart and user-friendly platform designed to simplify your test management experience.' },
    { key: 'home_certs_title',          label: 'Videos/Certs Section Title',        defaultVal: 'Expert Insights & Certification Guidance' },
    { key: 'home_certs_subtitle',       label: 'Videos/Certs Section Subtitle',     defaultVal: 'AI-powered video guidance to help you prepare smarter for cybersecurity certifications.' },
    { key: 'home_training_title',       label: 'Training Programs Title',           defaultVal: 'Training Programs' },
    { key: 'home_training_desc',        label: 'Training Programs Description',     defaultVal: 'Expert-led training programs to build your cybersecurity and compliance skills.' },
    { key: 'home_blogs_title',          label: 'Featured Blogs Section Title',      defaultVal: 'Featured Blogs' },
    { key: 'home_faq_title',            label: 'FAQ Section Title',                 defaultVal: 'Frequently Asked Questions' },
    { key: 'home_faq_subtitle',         label: 'FAQ Section Subtitle',              defaultVal: 'Find answers to the most frequently asked questions here' },
  ],
  About: [
    { key: 'about_hero_heading',        label: 'About Page H1 Heading',             defaultVal: 'About Us' },
    { key: 'about_hero_sub',            label: 'About Subtitle / Section Heading',  defaultVal: 'Empowering You to Navigate the Complex World of Cybersecurity' },
    { key: 'about_mission',             label: 'Mission Paragraph',                 defaultVal: 'At CSQNA, we believe that knowledge is the most powerful defense in an increasingly complex and dangerous digital world.' },
    { key: 'about_who_heading',         label: '"Who We Are" Heading',              defaultVal: 'Who We Are' },
    { key: 'about_who_desc',            label: '"Who We Are" Paragraph',            defaultVal: 'CSQNA was founded by cybersecurity professionals with decades of experience in protecting digital assets, conducting security audits, and responding to cyber incidents.' },
    { key: 'about_offer_heading',       label: '"What We Offer" Heading',           defaultVal: 'What We Offer' },
    { key: 'about_offer_desc',          label: '"What We Offer" Paragraph',         defaultVal: 'Our platform focuses on providing practice tests and self-assessment tools covering a broad range of cybersecurity topics.' },
    { key: 'about_why_heading',         label: '"Why Choose CSQNA?" Heading',       defaultVal: 'Why Choose CSQNA?' },
    { key: 'about_vision',              label: 'Vision Paragraph',                  defaultVal: 'We envision a world where every cybersecurity professional is equipped with the knowledge and resilience to tackle evolving threats.' },
    { key: 'about_get_involved',        label: '"Get Involved" Paragraph',          defaultVal: 'At CSQNA, we value our users\' feedback. Feel free to contact us at info@csqna.com' },
    { key: 'about_highlights_title',    label: 'Highlights Section Title',          defaultVal: 'CSQNA - Test , Learn , Certify' },
    { key: 'about_cta_email',           label: 'Highlights CTA Email/Label',        defaultVal: 'Connect With Us Now' },
  ],
  Services: [
    { key: 'services_hero_heading',     label: 'Services Page Main Heading',        defaultVal: 'We Boost Your Cybersecurity Skills.' },
    { key: 'services_hero_sub',         label: 'Services Page Subtitle',            defaultVal: 'Get to know your knowledge level and skill preparedness, identify the areas you need to focus on for skill building.' },
    { key: 'services_skills_title',     label: 'Skill Gap Analysis Title',          defaultVal: 'Skill Gap Analysis' },
    { key: 'services_practice_title',   label: 'Practice Card Title (Step 01)',     defaultVal: 'Detailed Performance Insights' },
    { key: 'services_practice_desc',    label: 'Practice Card Items (use " / " to separate)',  defaultVal: 'Identify strengths and weaknesses. / Understand current skill levels.' },
    { key: 'services_cert_title',       label: 'Cert Recommendations Title (Step 02)', defaultVal: 'Customized Study Recommendations' },
    { key: 'services_cert_desc',        label: 'Cert Items (use " / " to separate)', defaultVal: 'Focus on improvement areas. / Tailored guidance for certifications.' },
    { key: 'services_track_title',      label: 'Progress Tracking Title (Step 03)', defaultVal: 'Reporting and Progress Tracking' },
    { key: 'services_track_desc',       label: 'Progress Tracking Items (use " / " to separate)', defaultVal: 'Track growth over time. / Receive instant feedback after tests.' },
    { key: 'services_career_title',     label: 'Career Growth Training Title',      defaultVal: 'Career Growth Training' },
  ],
  Pricing: [
    { key: 'pricing_hero_heading',      label: 'Pricing Page Heading',              defaultVal: 'Pricing Plans' },
    { key: 'pricing_hero_sub',          label: 'Pricing Page Subtitle',             defaultVal: 'Choose the plan that fits your learning requirements.' },
    { key: 'pricing_free_title',        label: 'Free Plan Name',                    defaultVal: 'Basic' },
    { key: 'pricing_free_desc',         label: 'Free Plan Price / Description',     defaultVal: 'Free Forever' },
    { key: 'pricing_plan1_title',       label: 'Plan 1 Name',                       defaultVal: 'Plus' },
    { key: 'pricing_plan1_desc',        label: 'Plan 1 Price / Description',        defaultVal: 'INR 550/-' },
    { key: 'pricing_plan2_title',       label: 'Plan 2 Name',                       defaultVal: 'Premium' },
    { key: 'pricing_plan2_desc',        label: 'Plan 2 Price / Description',        defaultVal: 'INR 750/-\n\nBilled as one payment\nfor 6 months.' },
    { key: 'pricing_footer_note',       label: 'Plan Promo Banner Text',            defaultVal: 'Our most valuable package!\nBilled as one payment for 3 months.' },
    { key: 'pricing_row1_title',        label: 'Feature Row 1 Title',               defaultVal: 'Unlimited Practice Tests' },
    { key: 'pricing_row1_desc',         label: 'Feature Row 1 Description',         defaultVal: 'Practice as many timed tests as you want. Test Your Skills in 23 CyberSec Categories.' },
    { key: 'pricing_row2_title',        label: 'Feature Row 2 Title',               defaultVal: 'Detailed Analytical Reports' },
    { key: 'pricing_row2_desc',         label: 'Feature Row 2 Description',         defaultVal: 'Per-test performance breakdown: domain-wise strengths & weaknesses.' },
    { key: 'pricing_row3_title',        label: 'Feature Row 3 Title',               defaultVal: 'Restart Ongoing Assessments' },
    { key: 'pricing_row3_desc',         label: 'Feature Row 3 Description',         defaultVal: 'Pause & resume tests from where you left off within 24-48hrs.' },
    { key: 'pricing_row4_title',        label: 'Feature Row 4 Title',               defaultVal: 'Saved Reports' },
    { key: 'pricing_row4_desc',         label: 'Feature Row 4 Description',         defaultVal: 'Keeps your scoring history for reference.' },
    { key: 'pricing_row5_title',        label: 'Feature Row 5 Title',               defaultVal: 'Certification Simulators' },
    { key: 'pricing_row5_desc',         label: 'Feature Row 5 Description',         defaultVal: 'Mock exams that mimic real certification conditions.' },
    { key: 'pricing_row6_title',        label: 'Feature Row 6 Title',               defaultVal: 'Schedule Your Certification Test' },
    { key: 'pricing_row6_desc',         label: 'Feature Row 6 Description',         defaultVal: 'Book simulated proctored sessions.' },
    { key: 'pricing_row7_title',        label: 'Feature Row 7 Title',               defaultVal: 'Priority Support & Mentoring' },
    { key: 'pricing_row7_desc',         label: 'Feature Row 7 Description',         defaultVal: 'Faster help and optional mentor guidance.' },
  ],
  Certifications: [
    { key: 'cisa_banner_title',         label: 'CISA Banner Title',                 defaultVal: 'CISA' },
    { key: 'cisa_hero_desc',            label: 'CISA Hero Description',             defaultVal: 'ISACA\'s Certified Information Systems Auditor (CISA) is the world-renowned credential validating your ability to audit operational systems.' },
    { key: 'cissp_banner_title',        label: 'CISSP Banner Title',                defaultVal: 'CISSP' },
    { key: 'cissp_hero_desc',           label: 'CISSP Hero Description',            defaultVal: 'Validate your expertise in designing, engineering, and managing an organization\'s overall security posture.' },
    { key: 'ceh_banner_title',          label: 'CEH Banner Title',                  defaultVal: 'CEH' },
    { key: 'ceh_hero_desc',             label: 'CEH Hero Description',              defaultVal: 'EC-Council\'s Certified Ethical Hacker (CEH) is the premier credential validating your ability to audit operational risk.' },
    { key: 'cipp_banner_title',         label: 'CIPP Banner Title',                 defaultVal: 'CIPP' },
    { key: 'dpdp_banner_title',         label: 'DPDP Banner Title',                 defaultVal: 'DPDP' },
    { key: 'iso_banner_title',          label: 'ISO 27001 Banner Title',            defaultVal: 'ISO 27001' },
    { key: 'aaia_banner_title',         label: 'AAIA Banner Title',                 defaultVal: 'AAIA' },
  ],
  Footer: [
    { key: 'footer_tagline',            label: 'Footer Tagline',                    defaultVal: 'Test , Learn , Certify' },
    { key: 'footer_phone',              label: 'Phone Number',                      defaultVal: '+91 91372 73947' },
    { key: 'footer_email',              label: 'Support Email',                     defaultVal: 'support@csqna.com' },
    { key: 'footer_copyright',          label: 'Copyright Text',                    defaultVal: 'Copyright © 2026-2030. All Rights Reserved By' },
  ],
};

// ─── Banner Configs ───────────────────────────────────────────────────────────
const BANNERS: BannerItem[] = [
  { key: 'home_hero_image',    label: 'Home Hero Banner Image',       page: 'Home',         defaultSrc: '/marketing-assets/images/banner/banner_01-alt.png', overlayKey: 'home_hero_tagline', overlayLabel: 'Home Hero Overlay Text' },
  { key: 'about_banner_image', label: 'About Us Banner Image',        page: 'About',        defaultSrc: '/marketing-assets/images/banner/About-us-banner.png', overlayKey: 'about_hero_heading', overlayLabel: 'About Banner Overlay Text' },
  { key: 'services_banner_image', label: 'Services Banner Image',     page: 'Services',     defaultSrc: '/marketing-assets/images/banner/FamousDots-Buy Domains-Banner.png' },
  { key: 'home_pc_image',      label: 'Home Hero Right-side PC Image', page: 'Home',        defaultSrc: '/marketing-assets/images/banner/pc2.png' },
  { key: 'home_panel_bg',      label: 'Panel Overview Background',    page: 'Home',         defaultSrc: '/marketing-assets/images/banner/pannel-overview-banner.png' },
];

const PAGES = Object.keys(PAGE_SECTIONS);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isYouTubeUrl(url: string): boolean {
  return /youtu\.?be|youtube\.com/.test(url);
}
function getYouTubeEmbedUrl(url: string): string {
  // Handle youtu.be/ID and youtube.com/watch?v=ID and youtube.com/embed/ID
  let id = '';
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  const longMatch  = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) id = shortMatch[1];
  else if (longMatch) id = longMatch[1];
  else if (embedMatch) id = embedMatch[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconEdit  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconSave  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
const IconTrash = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>;
const IconPlus  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconClose = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconUpload = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;

// ─── Shared input styles ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = { width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };
const textareaStyle: React.CSSProperties = { ...inputStyle, resize: 'vertical' };

// ─── Main Component ───────────────────────────────────────────────────────────
export const ContentManager: React.FC = () => {
  const [activeTab,   setActiveTab]   = useState<TabType>('texts');
  const [activePage,  setActivePage]  = useState('Home');
  const [contents,    setContents]    = useState<ContentItem[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [editing,     setEditing]     = useState<Record<string, string>>({});
  const [activeEdits, setActiveEdits] = useState<Set<string>>(new Set());
  const [saving,      setSaving]      = useState<string | null>(null);
  const [toast,       setToast]       = useState<{ msg: string; ok: boolean } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem,     setNewItem]     = useState({ page: 'Home', sectionKey: '', contentValue: '' });

  // Video state
  const [videos,     setVideos]     = useState<VideoItem[]>([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo,  setEditingVideo]  = useState<VideoItem | null>(null);
  const [videoForm, setVideoForm] = useState<Partial<VideoItem> & { youtubeUrl?: string; uploadFile?: File | null }>({
    title: '', subtitle: '', src: '', type: 'youtube', youtubeUrl: '', uploadFile: null,
  });
  const [videoUploading, setVideoUploading] = useState(false);

  // FAQ state
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  // Banner state
  const [bannerUploading, setBannerUploading] = useState<string | null>(null);
  const [bannerUrlInputs, setBannerUrlInputs] = useState<Record<string, string>>({});

  const videoFileRef = useRef<HTMLInputElement>(null);
  const bannerFileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load all content from DB ───────────────────────────────────────────────
  const load = async () => {
    setLoading(true);
    try {
      const r = await api.get('/admin/content');
      const all: ContentItem[] = r.data?.data || [];
      setContents(all);

      // Parse videos JSON
      const vItem = all.find(c => c.sectionKey === 'home_videos_list');
      try { setVideos(vItem ? JSON.parse(vItem.contentValue) : []); } catch { setVideos([]); }

      // Parse FAQs JSON
      const fItem = all.find(c => c.sectionKey === 'home_faqs_list');
      try { setFaqs(fItem ? JSON.parse(fItem.contentValue) : defaultFaqs); } catch { setFaqs(defaultFaqs); }

    } catch { showToast('Failed to load content', false); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  // ── Computed ───────────────────────────────────────────────────────────────
  const sections = PAGE_SECTIONS[activePage] || [];
  const pageContents = contents.filter(c => c.page === activePage);
  const contentMap: Record<string, ContentItem> = {};
  pageContents.forEach(c => { contentMap[c.sectionKey] = c; });
  const customSections = pageContents.filter(c => !sections.find(s => s.key === c.sectionKey)
    && c.sectionKey !== 'home_videos_list' && c.sectionKey !== 'home_faqs_list');

  // ── Text CRUD ──────────────────────────────────────────────────────────────
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
      const r = await api.post('/admin/content', { page, sectionKey: key, contentValue: editing[key] || '' });
      if (r.data?.status) { showToast('Saved!'); cancelEdit(key); load(); }
      else showToast('Failed to save', false);
    } catch { showToast('Error saving', false); }
    finally { setSaving(null); }
  };
  const handleDelete = async (id: string, key: string) => {
    if (!window.confirm(`Delete section "${key}"?`)) return;
    try { await api.delete(`/admin/content/${id}`); showToast('Deleted!'); load(); }
    catch { showToast('Error deleting', false); }
  };
  const handleAddCustom = async () => {
    if (!newItem.sectionKey || !newItem.page) return;
    try {
      const r = await api.post('/admin/content', newItem);
      if (r.data?.status) { showToast('Section added!'); setShowAddForm(false); setNewItem({ page: 'Home', sectionKey: '', contentValue: '' }); load(); }
      else showToast('Failed', false);
    } catch { showToast('Error', false); }
  };

  // ── Banner Upload / URL Save ───────────────────────────────────────────────
  const handleBannerFileUpload = async (bannerKey: string, page: string, file: File) => {
    setBannerUploading(bannerKey);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const r = await api.post('/admin/upload-media', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (r.data?.status) {
        await api.post('/admin/content', { page, sectionKey: bannerKey, contentValue: r.data.data.url });
        showToast('Banner updated!');
        load();
      } else showToast('Upload failed', false);
    } catch { showToast('Upload error', false); }
    finally { setBannerUploading(null); }
  };
  const handleBannerUrlSave = async (bannerKey: string, page: string) => {
    const url = bannerUrlInputs[bannerKey] || '';
    if (!url) return;
    try {
      await api.post('/admin/content', { page, sectionKey: bannerKey, contentValue: url });
      showToast('Banner URL saved!');
      load();
    } catch { showToast('Error', false); }
  };

  // ── Video CRUD ─────────────────────────────────────────────────────────────
  const saveVideos = async (updated: VideoItem[]) => {
    await api.post('/admin/content', { page: 'Home', sectionKey: 'home_videos_list', contentValue: JSON.stringify(updated) });
    setVideos(updated);
    load();
  };

  const handleVideoSave = async () => {
    let finalSrc = videoForm.src || '';

    if (videoForm.type === 'youtube') {
      const ytUrl = videoForm.youtubeUrl || '';
      if (!ytUrl) { showToast('Enter a YouTube URL', false); return; }
      finalSrc = getYouTubeEmbedUrl(ytUrl);
    } else if (videoForm.type === 'file') {
      if (videoForm.uploadFile) {
        setVideoUploading(true);
        try {
          const fd = new FormData();
          fd.append('file', videoForm.uploadFile);
          const r = await api.post('/admin/upload-media', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
          if (r.data?.status) { finalSrc = r.data.data.url; }
          else { showToast('Video upload failed', false); setVideoUploading(false); return; }
        } catch { showToast('Upload error', false); setVideoUploading(false); return; }
        finally { setVideoUploading(false); }
      } else if (!finalSrc) {
        showToast('Select a video file to upload', false); return;
      }
    }

    if (!videoForm.title) { showToast('Enter a video title', false); return; }

    let updated: VideoItem[];
    if (editingVideo) {
      updated = videos.map(v => v.id === editingVideo.id ? { ...v, title: videoForm.title!, subtitle: videoForm.subtitle, src: finalSrc, type: videoForm.type! } : v);
    } else {
      const newVid: VideoItem = { id: Date.now().toString(), title: videoForm.title!, subtitle: videoForm.subtitle, src: finalSrc, type: videoForm.type! };
      updated = [...videos, newVid];
    }

    try {
      await saveVideos(updated);
      showToast(editingVideo ? 'Video updated!' : 'Video added!');
      setShowVideoForm(false);
      setEditingVideo(null);
      setVideoForm({ title: '', subtitle: '', src: '', type: 'youtube', youtubeUrl: '', uploadFile: null });
    } catch { showToast('Error saving video', false); }
  };

  const openEditVideo = (v: VideoItem) => {
    setEditingVideo(v);
    setVideoForm({ title: v.title, subtitle: v.subtitle, src: v.src, type: v.type, youtubeUrl: v.type === 'youtube' ? v.src : '', uploadFile: null });
    setShowVideoForm(true);
  };

  const handleDeleteVideo = async (id: string) => {
    if (!window.confirm('Delete this video?')) return;
    const updated = videos.filter(v => v.id !== id);
    await saveVideos(updated);
    showToast('Video deleted!');
  };

  // ── FAQ CRUD ───────────────────────────────────────────────────────────────
  const saveFaqs = async (updated: FAQItem[]) => {
    await api.post('/admin/content', { page: 'Home', sectionKey: 'home_faqs_list', contentValue: JSON.stringify(updated) });
    setFaqs(updated);
    load();
  };

  const handleFaqSave = async () => {
    if (!faqForm.question || !faqForm.answer) { showToast('Enter question and answer', false); return; }
    let updated: FAQItem[];
    if (editingFaq) {
      updated = faqs.map(f => f.id === editingFaq.id ? { ...f, question: faqForm.question, answer: faqForm.answer } : f);
    } else {
      updated = [...faqs, { id: Date.now().toString(), question: faqForm.question, answer: faqForm.answer }];
    }
    await saveFaqs(updated);
    showToast(editingFaq ? 'FAQ updated!' : 'FAQ added!');
    setShowFaqForm(false);
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '' });
  };

  const openEditFaq = (f: FAQItem) => {
    setEditingFaq(f);
    setFaqForm({ question: f.question, answer: f.answer });
    setShowFaqForm(true);
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm('Delete this FAQ?')) return;
    await saveFaqs(faqs.filter(f => f.id !== id));
    showToast('FAQ deleted!');
  };

  // ── SectionCard ────────────────────────────────────────────────────────────
  const SectionCard: React.FC<{ label: string; sectionKey: string; item?: ContentItem; page: string; defaultVal?: string }> = ({ label, sectionKey, item, page, defaultVal = '' }) => {
    const isEditing = activeEdits.has(sectionKey);
    const isSaving  = saving === sectionKey;
    const value = item?.contentValue || '';
    const displayValue = value || defaultVal;
    const editVal = editing[sectionKey] ?? displayValue;
    const hasValue = !!value;

    return (
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f0f2f8', padding: '16px', marginBottom: '10px', boxShadow: isEditing ? `0 0 0 2px ${ACCENT_LIGHT}, 0 1px 8px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.04)', transition: 'all .2s ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: ACCENT, background: ACCENT_LIGHT, padding: '2px 8px', borderRadius: '20px', letterSpacing: '0.5px' }}>{sectionKey}</span>
              {!hasValue ? (
                <span style={{ fontSize: '10px', color: '#64748b', background: '#f1f5f9', padding: '1px 8px', borderRadius: '20px', border: '1px solid #e2e8f0', fontWeight: '600' }}>DEFAULT (NOT SET)</span>
              ) : (
                <span style={{ fontSize: '10px', color: SUCCESS, background: '#f0fdf4', padding: '1px 8px', borderRadius: '20px', border: '1px solid #bbf7d0', fontWeight: '600' }}>OVERRIDDEN</span>
              )}
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>{label}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {!isEditing && (
              <button onClick={() => startEdit(sectionKey, displayValue)} style={{ padding: '5px 10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '7px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <IconEdit /> Edit
              </button>
            )}
            {item && (
              <button onClick={() => handleDelete(item._id, sectionKey)} style={{ padding: '5px 8px', background: DANGER_LIGHT, color: DANGER, border: '1px solid #fecdd3', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <IconTrash />
              </button>
            )}
          </div>
        </div>

        {!isEditing && displayValue && (
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: hasValue ? '#475569' : '#94a3b8', background: hasValue ? '#f8fafc' : '#fafafa', padding: '8px 10px', borderRadius: '8px', lineHeight: 1.5, wordBreak: 'break-word', border: hasValue ? 'none' : '1px dashed #e2e8f0', fontStyle: hasValue ? 'normal' : 'italic', whiteSpace: 'pre-wrap' }}>
            {displayValue}
          </p>
        )}

        {isEditing && (
          <div style={{ marginTop: '10px' }}>
            <textarea value={editVal} onChange={e => setEditing(ed => ({ ...ed, [sectionKey]: e.target.value }))} rows={4}
              style={{ ...textareaStyle, border: `1px solid ${ACCENT}` }} />
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => cancelEdit(sectionKey)} style={{ padding: '7px 14px', background: '#f1f5f9', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
              <button onClick={() => handleSave(sectionKey, page)} disabled={isSaving} style={{ padding: '7px 14px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '7px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', opacity: isSaving ? 0.7 : 1 }}>
                <IconSave /> {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── Video Preview Helper ───────────────────────────────────────────────────
  const renderVideoPreview = (v: VideoItem) => {
    if (v.type === 'youtube') {
      return <iframe src={v.src} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '160px', border: 'none', borderRadius: '8px' }} />;
    }
    return <video src={v.src} controls style={{ width: '100%', height: '160px', borderRadius: '8px', objectFit: 'cover' }} />;
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '1100px' }}>
      <style>{`
        @keyframes cmFadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .cm-toast { position:fixed; bottom:24px; right:24px; z-index:9999; padding:12px 20px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 8px 24px rgba(0,0,0,0.12); animation:cmFadeIn .18s ease; }
        .cm-page-tab:hover { background: ${ACCENT_LIGHT} !important; color: ${ACCENT} !important; }
        .cm-main-tab:hover { opacity: 0.85; }
        .cm-card-hover:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; transform: translateY(-1px); }
        .cm-card-hover { transition: all .2s ease; }
      `}</style>

      {toast && (
        <div className="cm-toast" style={{ background: toast.ok ? '#f0fdf4' : DANGER_LIGHT, color: toast.ok ? SUCCESS : DANGER, border: `1px solid ${toast.ok ? '#bbf7d0' : '#fecdd3'}` }}>
          {toast.msg}
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1e293b' }}>Content Manager</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#94a3b8' }}>Manage all website content — text, banners, videos & FAQs</p>
        </div>
        {activeTab === 'texts' && (
          <button onClick={() => setShowAddForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
            <IconPlus /> Add Custom Section
          </button>
        )}
        {activeTab === 'videos' && (
          <button onClick={() => { setEditingVideo(null); setVideoForm({ title: '', subtitle: '', src: '', type: 'youtube', youtubeUrl: '', uploadFile: null }); setShowVideoForm(true); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
            <IconPlus /> Add Video
          </button>
        )}
        {activeTab === 'faqs' && (
          <button onClick={() => { setEditingFaq(null); setFaqForm({ question: '', answer: '' }); setShowFaqForm(true); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
            <IconPlus /> Add FAQ
          </button>
        )}
      </div>

      {/* ── Main Tabs ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '22px', background: '#f1f5f9', padding: '4px', borderRadius: '12px', width: 'fit-content' }}>
        {TABS.map(tab => (
          <button key={tab.id} className="cm-main-tab" onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 18px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', background: activeTab === tab.id ? '#fff' : 'transparent', color: activeTab === tab.id ? ACCENT : '#64748b', boxShadow: activeTab === tab.id ? '0 1px 6px rgba(0,0,0,0.08)' : 'none', transition: 'all .15s ease' }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontSize: '14px' }}>Loading content...</div>
      ) : (
        <>
          {/* ════════════════════════════════════════════════════════
              TAB: TEXTS
          ════════════════════════════════════════════════════════ */}
          {activeTab === 'texts' && (
            <div>
              {/* Page selector */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {PAGES.map(page => (
                  <button key={page} className="cm-page-tab" onClick={() => setActivePage(page)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: activePage === page ? '600' : '500', background: activePage === page ? ACCENT : '#f1f5f9', color: activePage === page ? '#fff' : '#64748b', transition: 'all .15s ease' }}>
                    {page}
                  </button>
                ))}
              </div>

              <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px' }}>
                DEFAULT SECTIONS — {activePage.toUpperCase()} PAGE
              </p>
              {sections.map(s => (
                <SectionCard key={s.key} label={s.label} sectionKey={s.key} item={contentMap[s.key]} page={activePage} defaultVal={s.defaultVal} />
              ))}

              {customSections.length > 0 && (
                <>
                  <p style={{ margin: '20px 0 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.8px' }}>CUSTOM SECTIONS</p>
                  {customSections.map(c => (
                    <SectionCard key={c.sectionKey} label={c.sectionKey} sectionKey={c.sectionKey} item={c} page={c.page} />
                  ))}
                </>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
              TAB: BANNERS
          ════════════════════════════════════════════════════════ */}
          {activeTab === 'banners' && (
            <div>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                Upload a new image file or enter a URL to update any banner/image on the website.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {BANNERS.map(banner => {
                  const currentVal = contents.find(c => c.sectionKey === banner.key)?.contentValue || banner.defaultSrc;
                  const isUploading = bannerUploading === banner.key;
                  return (
                    <div key={banner.key} className="cm-card-hover" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f0f2f8', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{banner.label}</p>
                      <div style={{ marginBottom: '12px', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc', height: '140px' }}>
                        <img src={currentVal} alt={banner.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60"><rect fill="%23f1f5f9" width="100" height="60"/><text x="50" y="35" text-anchor="middle" font-size="12" fill="%2394a3b8">No Image</text></svg>'; }} />
                      </div>
                      <p style={{ margin: '0 0 6px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px' }}>CURRENT: <span style={{ color: '#475569', fontWeight: '500' }}>{currentVal.substring(0, 60)}{currentVal.length > 60 ? '...' : ''}</span></p>

                      {/* Upload file */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                        <input type="file" accept="image/*" ref={el => { bannerFileRefs.current[banner.key] = el; }} style={{ display: 'none' }}
                          onChange={async e => { const f = e.target.files?.[0]; if (f) await handleBannerFileUpload(banner.key, banner.page, f); }} />
                        <button onClick={() => bannerFileRefs.current[banner.key]?.click()} disabled={isUploading}
                          style={{ flex: 1, padding: '8px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <IconUpload /> {isUploading ? 'Uploading...' : 'Upload Image File'}
                        </button>
                      </div>

                      {/* URL input */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <input type="text" placeholder="Or paste image URL…" value={bannerUrlInputs[banner.key] || ''} onChange={e => setBannerUrlInputs(b => ({ ...b, [banner.key]: e.target.value }))}
                          style={{ ...inputStyle, flex: 1, fontSize: '12px' }} />
                        <button onClick={() => handleBannerUrlSave(banner.key, banner.page)} style={{ padding: '8px 12px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <IconSave />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
              TAB: VIDEOS
          ════════════════════════════════════════════════════════ */}
          {activeTab === 'videos' && (
            <div>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
                Manage videos shown in the Home page certification guidance section. Supports YouTube links and direct file uploads.
              </p>
              {videos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
                  <p style={{ fontSize: '32px', margin: '0 0 8px' }}>🎬</p>
                  <p style={{ margin: 0, fontWeight: '600' }}>No videos yet</p>
                  <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Click "Add Video" to add a YouTube link or upload a video file</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                  {videos.map(v => (
                    <div key={v.id} className="cm-card-hover" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f0f2f8', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                      <div style={{ marginBottom: '10px' }}>{renderVideoPreview(v)}</div>
                      <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{v.title}</p>
                      {v.subtitle && <p style={{ margin: '0 0 10px', fontSize: '12px', color: '#64748b' }}>{v.subtitle}</p>}
                      <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: v.type === 'youtube' ? '#dc2626' : '#7c3aed', background: v.type === 'youtube' ? '#fff1f2' : ACCENT_LIGHT, padding: '2px 8px', borderRadius: '20px' }}>
                          {v.type === 'youtube' ? '▶ YouTube' : '📁 Uploaded'}
                        </span>
                        <div style={{ flex: 1 }} />
                        <button onClick={() => openEditVideo(v)} style={{ padding: '5px 10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '7px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><IconEdit /> Edit</button>
                        <button onClick={() => handleDeleteVideo(v.id)} style={{ padding: '5px 8px', background: DANGER_LIGHT, color: DANGER, border: '1px solid #fecdd3', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><IconTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════
              TAB: FAQs
          ════════════════════════════════════════════════════════ */}
          {activeTab === 'faqs' && (
            <div>
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
                Manage the FAQ accordion on the Home page. Add, edit or delete questions and answers.
              </p>
              {faqs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
                  <p style={{ fontSize: '32px', margin: '0 0 8px' }}>❓</p>
                  <p style={{ margin: 0, fontWeight: '600' }}>No FAQs added yet</p>
                </div>
              ) : faqs.map((f, idx) => (
                <div key={f.id} className="cm-card-hover" style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f0f2f8', padding: '16px', marginBottom: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '10px', fontWeight: '700', color: ACCENT, background: ACCENT_LIGHT, padding: '1px 8px', borderRadius: '20px', marginBottom: '6px', display: 'inline-block' }}>FAQ #{idx + 1}</span>
                      <p style={{ margin: '6px 0 4px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{f.question}</p>
                      <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>{f.answer}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button onClick={() => openEditFaq(f)} style={{ padding: '5px 10px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '7px', cursor: 'pointer', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><IconEdit /> Edit</button>
                      <button onClick={() => handleDeleteFaq(f.id)} style={{ padding: '5px 8px', background: DANGER_LIGHT, color: DANGER, border: '1px solid #fecdd3', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><IconTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          MODAL: Add Custom Text Section
      ════════════════════════════════════════════════════════════════════ */}
      {showAddForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowAddForm(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)', animation: 'cmFadeIn .18s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Add Custom Section</h2>
              <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><IconClose /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {[{ label: 'Page', key: 'page', type: 'select' }, { label: 'Section Key (unique, no spaces)', key: 'sectionKey', type: 'text' }, { label: 'Content Value', key: 'contentValue', type: 'textarea' }].map(field => (
                <div key={field.key} style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>{field.label.toUpperCase()}</label>
                  {field.type === 'select' ? (
                    <select value={(newItem as any)[field.key]} onChange={e => setNewItem(n => ({ ...n, [field.key]: e.target.value }))} style={inputStyle}>
                      {PAGES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea rows={3} value={(newItem as any)[field.key]} onChange={e => setNewItem(n => ({ ...n, [field.key]: e.target.value }))} style={textareaStyle} />
                  ) : (
                    <input type="text" value={(newItem as any)[field.key]} onChange={e => setNewItem(n => ({ ...n, [field.key]: e.target.value }))} placeholder="e.g. home_new_section" style={inputStyle} />
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

      {/* ════════════════════════════════════════════════════════════════════
          MODAL: Add / Edit Video
      ════════════════════════════════════════════════════════════════════ */}
      {showVideoForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowVideoForm(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '520px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)', animation: 'cmFadeIn .18s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{editingVideo ? 'Edit Video' : 'Add Video'}</h2>
              <button onClick={() => setShowVideoForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><IconClose /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {/* Title */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>VIDEO TITLE *</label>
                <input type="text" placeholder="e.g. CISA Certification Intro" value={videoForm.title || ''} onChange={e => setVideoForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
              </div>
              {/* Subtitle */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>SUBTITLE / DESCRIPTION (optional)</label>
                <input type="text" placeholder="Short description…" value={videoForm.subtitle || ''} onChange={e => setVideoForm(f => ({ ...f, subtitle: e.target.value }))} style={inputStyle} />
              </div>
              {/* Source type toggle */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' }}>VIDEO SOURCE</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['youtube', 'file'] as const).map(t => (
                    <button key={t} onClick={() => setVideoForm(f => ({ ...f, type: t }))} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `2px solid ${videoForm.type === t ? ACCENT : '#e2e8f0'}`, background: videoForm.type === t ? ACCENT_LIGHT : '#fff', color: videoForm.type === t ? ACCENT : '#64748b', cursor: 'pointer', fontWeight: '700', fontSize: '12px' }}>
                      {t === 'youtube' ? '▶ YouTube Link' : '📁 Upload File'}
                    </button>
                  ))}
                </div>
              </div>

              {/* YouTube URL input */}
              {videoForm.type === 'youtube' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>YOUTUBE URL *</label>
                  <input type="text" placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..." value={videoForm.youtubeUrl || ''} onChange={e => setVideoForm(f => ({ ...f, youtubeUrl: e.target.value }))} style={inputStyle} />
                  {videoForm.youtubeUrl && isYouTubeUrl(videoForm.youtubeUrl) && (
                    <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden' }}>
                      <iframe src={getYouTubeEmbedUrl(videoForm.youtubeUrl)} title="preview" style={{ width: '100%', height: '200px', border: 'none' }} allowFullScreen />
                    </div>
                  )}
                </div>
              )}

              {/* File upload */}
              {videoForm.type === 'file' && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>VIDEO FILE *</label>
                  <input type="file" ref={videoFileRef} accept="video/mp4,video/webm,video/mov,video/avi,video/mkv" style={{ display: 'none' }} onChange={e => setVideoForm(f => ({ ...f, uploadFile: e.target.files?.[0] || null, src: '' }))} />
                  <button onClick={() => videoFileRef.current?.click()} style={{ width: '100%', padding: '14px', background: '#f8fafc', border: '2px dashed #cbd5e1', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                    <IconUpload /> {videoForm.uploadFile ? videoForm.uploadFile.name : 'Click to select video (mp4, webm, mov…)'}
                  </button>
                  {editingVideo?.type === 'file' && !videoForm.uploadFile && (
                    <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#64748b' }}>Current: {editingVideo.src} — leave blank to keep existing</p>
                  )}
                </div>
              )}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f2f8', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowVideoForm(false)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
              <button onClick={handleVideoSave} disabled={videoUploading} style={{ padding: '9px 18px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', opacity: videoUploading ? 0.7 : 1 }}>
                <IconSave /> {videoUploading ? 'Uploading…' : editingVideo ? 'Update Video' : 'Add Video'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          MODAL: Add / Edit FAQ
      ════════════════════════════════════════════════════════════════════ */}
      {showFaqForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowFaqForm(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)', animation: 'cmFadeIn .18s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f2f8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</h2>
              <button onClick={() => setShowFaqForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}><IconClose /></button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>QUESTION *</label>
                <input type="text" placeholder="e.g. What services does your platform provide?" value={faqForm.question} onChange={e => setFaqForm(f => ({ ...f, question: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px', letterSpacing: '0.5px' }}>ANSWER *</label>
                <textarea rows={5} placeholder="Write the answer here…" value={faqForm.answer} onChange={e => setFaqForm(f => ({ ...f, answer: e.target.value }))} style={textareaStyle} />
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f2f8', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowFaqForm(false)} style={{ padding: '9px 18px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Cancel</button>
              <button onClick={handleFaqSave} style={{ padding: '9px 18px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <IconSave /> {editingFaq ? 'Update FAQ' : 'Add FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Default FAQs (fallback when DB is empty) ─────────────────────────────────
const defaultFaqs: FAQItem[] = [
  { id: '1', question: 'What services does your platform provide?', answer: 'We have a database of over 20,000 questions, offering you a resource to create cybersecurity practice tests which help you understand your knowledge and skill preparedness for certification exams like CISA, CISSP, CISM and CEH.' },
  { id: '2', question: 'How does the skill assessment work?', answer: 'Users can create practice tests to assess their knowledge. Select from 23 domain areas or select the Certification which you want to prepare for. Once you have made this choice, you can set the time period for the exam and the number of questions you want served.' },
  { id: '3', question: 'Can I earn certifications on your platform?', answer: 'Yes! We can provide a certificate for the tests you have taken on our platform and your overall score. However, for certifications like CISA, CISSP etc you have to give the exam for that certification.' },
  { id: '4', question: 'How long is my data stored on the platform?', answer: 'Your data is saved for 7 days by default. Paid users have their data stored for up to 6 months.' },
  { id: '5', question: 'Can I access my past test results?', answer: 'Yes, if you\'ve paid for data retention, you can view all your past results within the 6-month retention period.' },
  { id: '6', question: 'Are the practice tests updated regularly?', answer: 'Absolutely! Our tests are frequently updated to align with the latest certification standards and industry trends.' },
  { id: '7', question: 'Is there a cost for accessing the platform?', answer: 'No! There is no cost for accessing the platform, creating your practice test, taking it and checking your score. The cost is applied only if you want us to store your test results for more than a week.' },
];

export default ContentManager;
