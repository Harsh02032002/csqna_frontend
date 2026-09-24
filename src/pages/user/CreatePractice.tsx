import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {
  Lock,
  Cpu,
  BarChart3,
  Share2,
  Bot,
  Database,
  Target,
  Box,
  Server,
  BookOpen,
  Grid,
  Wrench,
  Shield,
  Search,
  Check,
  FileCheck,
  ArrowRight,
  Sliders,
  Clock,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const CreatePractice: React.FC = () => {
  const navigate = useNavigate();
  const [selectionMode, setSelectionMode] = useState<'category' | 'certification'>('category');

  const [categories, setCategories] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['AAIA Fundamentals']);
  const [catSearchQuery, setCatSearchQuery] = useState('');

  const [selectedCert, setSelectedCert] = useState<string>('');
  const [certSearchQuery, setCertSearchQuery] = useState('');

  const [difficultyLevels] = useState<string[]>(['Any', 'Easy', 'Medium', 'Hard']);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(['Any']);
  const [questionsCount, setQuestionsCount] = useState(25);
  const [duration, setDuration] = useState(40);
  const [testName, setTestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const DEFAULT_CATEGORIES = [
    'AAIA Fundamentals',
    'Advantage Computation',
    'Advantage Estimation',
    'Advantage Function',
    'AI / LLM',
    'AI / LLM Fine-tuning',
    'AI Alignment',
    'AI Architecture',
    'AI Data',
    'AI Dataset Knowledge',
    'AI Datasets',
    'AI Engineering'
  ];

  const CERTIFICATIONS = [
    {
      id: 'CISSP',
      title: 'Certified Information Systems Security Professional',
      desc: 'Domain areas: Security & Risk Management, Asset Security, ...',
      pillBg: '#7c3aed',
      pillColor: '#ffffff'
    },
    {
      id: 'CISA',
      title: 'Certified Information Systems Auditor',
      desc: 'Domain areas: Information Systems Auditing, Governance, ...',
      pillBg: '#e0f2fe',
      pillColor: '#0284c7'
    },
    {
      id: 'CISM',
      title: 'Certified Information Security Manager',
      desc: 'Domain areas: Information Security Governance, Risk ...',
      pillBg: '#dcfce7',
      pillColor: '#16a34a'
    },
    {
      id: 'CEH',
      title: 'Certified Ethical Hacker',
      desc: 'Domain areas: Footprinting, Scanning, System Hacking, ...',
      pillBg: '#ffe4e6',
      pillColor: '#e11d48'
    },
    {
      id: 'CIPP',
      title: 'Certified Information Privacy Professional',
      desc: 'Domain areas: Data Privacy Laws, Compliance, ...',
      pillBg: '#f3e8ff',
      pillColor: '#7c3aed'
    }
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get('/user/practice/categories');
        if (res.data && res.data.status && res.data.data && res.data.data.length > 0) {
          setCategories(res.data.data);
          setFilteredCategories(res.data.data);
        } else {
          setCategories(DEFAULT_CATEGORIES);
          setFilteredCategories(DEFAULT_CATEGORIES);
        }
      } catch {
        setCategories(DEFAULT_CATEGORIES);
        setFilteredCategories(DEFAULT_CATEGORIES);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const result = categories.filter((c) =>
      c.toLowerCase().includes(catSearchQuery.toLowerCase())
    );
    setFilteredCategories(result);
  }, [catSearchQuery, categories]);

  const filteredCertifications = CERTIFICATIONS.filter(
    (c) =>
      c.id.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(certSearchQuery.toLowerCase())
  );

  const getCategoryIconData = (catName: string, index: number) => {
    const lower = catName.toLowerCase();
    if (lower.includes('fundamental') || lower.includes('lock') || lower.includes('aaia')) {
      return { Icon: Lock, bg: '#f3e8ff', color: '#7c3aed' };
    }
    if (lower.includes('computation') || lower.includes('cpu')) {
      return { Icon: Cpu, bg: '#dcfce7', color: '#16a34a' };
    }
    if (lower.includes('estimation') || lower.includes('chart')) {
      return { Icon: BarChart3, bg: '#e0f2fe', color: '#0284c7' };
    }
    if (lower.includes('function') || lower.includes('share')) {
      return { Icon: Share2, bg: '#e0f2fe', color: '#0284c7' };
    }
    if (lower.includes('fine-tuning') || lower.includes('database')) {
      return { Icon: Database, bg: '#ffe4e6', color: '#e11d48' };
    }
    if (lower.includes('llm') || lower.includes('bot') || lower.includes('ai')) {
      return { Icon: Bot, bg: '#e0f2fe', color: '#0284c7' };
    }
    if (lower.includes('alignment') || lower.includes('target')) {
      return { Icon: Target, bg: '#ffe4e6', color: '#e11d48' };
    }
    if (lower.includes('architecture') || lower.includes('box')) {
      return { Icon: Box, bg: '#f3e8ff', color: '#7c3aed' };
    }
    if (lower.includes('data') && !lower.includes('dataset')) {
      return { Icon: Server, bg: '#e0f2fe', color: '#0284c7' };
    }
    if (lower.includes('knowledge') || lower.includes('book')) {
      return { Icon: BookOpen, bg: '#f3e8ff', color: '#7c3aed' };
    }
    if (lower.includes('dataset')) {
      return { Icon: Grid, bg: '#f3e8ff', color: '#7c3aed' };
    }
    if (lower.includes('engineering') || lower.includes('wrench')) {
      return { Icon: Wrench, bg: '#ffedd5', color: '#ea580c' };
    }

    const fallbacks = [
      { Icon: Lock, bg: '#f3e8ff', color: '#7c3aed' },
      { Icon: Cpu, bg: '#dcfce7', color: '#16a34a' },
      { Icon: BarChart3, bg: '#e0f2fe', color: '#0284c7' },
      { Icon: Share2, bg: '#e0f2fe', color: '#0284c7' },
      { Icon: Bot, bg: '#e0f2fe', color: '#0284c7' },
      { Icon: Wrench, bg: '#ffedd5', color: '#ea580c' }
    ];
    return fallbacks[index % fallbacks.length];
  };

  const handleToggleCategory = (cat: string) => {
    setSelectionMode('category');
    setSelectedCert('');
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSelectCert = (certId: string) => {
    setSelectionMode('certification');
    setSelectedCert(certId);
    setSelectedCategories([]);
  };

  const handleSelectAllCategories = () => {
    setSelectionMode('category');
    setSelectedCert('');
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...filteredCategories]);
    }
  };

  const handleQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setQuestionsCount(val);
    setDuration(Math.ceil(val * 1.6));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0 && !selectedCert) {
      setMessage('Please select at least one category or certification.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        testname: testName || (selectedCert ? `${selectedCert}_Practice_Test` : `Practice_Test_${Date.now()}`),
        category: selectedCategories.length > 0 ? selectedCategories : [selectedCert],
        difficulty: selectedDifficulties,
        questions: questionsCount,
        duration: duration,
      };
      const res = await api.post('/user/practice/generate', payload);
      if (res.data && res.data.status) {
        const testSession = res.data.data;
        navigate(`/panel/test/${testSession._id}`);
      } else {
        setMessage(res.data?.message || 'Failed to generate test.');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error occurred generating test.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#0f172a' }}>
      
      {/* ── 1. HERO BANNER (Exact Screenshot Header) ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eefc 45%, #f5eefd 100%)',
        borderRadius: '26px', padding: '24px 30px', marginBottom: '24px',
        border: '1px solid #e0e7ff', boxShadow: '0 8px 30px rgba(124,58,237,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px'
      }}>
        
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '18px',
            background: '#ffffff', color: '#7c3aed', display: 'grid', placeItems: 'center',
            boxShadow: '0 4px 16px rgba(124,58,237,0.12)', flexShrink: 0
          }}>
            <FileCheck size={28} />
          </div>
          <div>
            <span style={{
              fontSize: '11px', fontWeight: '800', color: '#7c3aed',
              letterSpacing: '1.2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px'
            }}>
              CREATE TEST
            </span>
            <h1 style={{
              margin: '0 0 6px', fontSize: '26px', fontWeight: '900', color: '#0f172a',
              letterSpacing: '-0.8px', lineHeight: 1.2
            }}>
              Create Your Practice (Mock) Test
              <br />
              <span style={{ color: '#7c3aed' }}>Select Your Exam Category</span>
            </h1>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b', fontWeight: '500' }}>
              Choose from our general 10K+ security questions database or select a certification syllabus.
            </p>
          </div>
        </div>

        {/* Right Section: 3D Checklist Card Graphic */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '180px', height: '110px', background: 'linear-gradient(135deg, #ffffff 0%, #f5eefd 100%)',
            borderRadius: '24px', padding: '16px', border: '2px solid #ffffff',
            boxShadow: '0 12px 30px rgba(124,58,237,0.12)', transform: 'rotate(-3deg)',
            display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f3e8ff', padding: '6px 10px', borderRadius: '8px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#7c3aed', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
              <div style={{ height: '6px', width: '70px', background: '#c4b5fd', borderRadius: '3px' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f3e8ff', padding: '6px 10px', borderRadius: '8px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#7c3aed', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '10px', fontWeight: 'bold' }}>✓</span>
              <div style={{ height: '6px', width: '50px', background: '#c4b5fd', borderRadius: '3px' }}></div>
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: '-10px', right: '-10px',
            width: '46px', height: '46px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
            display: 'grid', placeItems: 'center', color: '#ffffff',
            boxShadow: '0 8px 20px rgba(124,58,237,0.35)', border: '3px solid #ffffff'
          }}>
            <Shield size={24} fill="#ffffff" color="#6366f1" />
          </div>
        </div>

      </div>

      {message && (
        <div style={{
          padding: '14px 20px', borderRadius: '16px', background: '#ffe4e6',
          border: '1px solid #fecdd3', color: '#e11d48', fontSize: '13.5px', fontWeight: '700',
          marginBottom: '24px'
        }}>
          ⚠️ {message}
        </div>
      )}

      {/* ── 2. MAIN 2-COLUMN SECTION (Category vs Certification Side by Side) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', width: '100%' }}>
        
        {/* ── LEFT COLUMN: 1 Select the Category for the Exam ── */}
        <div style={{
          background: '#ffffff', borderRadius: '24px', padding: '24px',
          border: `2px solid ${selectionMode === 'category' && selectedCategories.length > 0 ? '#7c3aed' : '#e2e8f0'}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          minWidth: 0
        }}>
          {/* Header with Circle Badge 1 */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#7c3aed', color: '#ffffff', fontSize: '15px', fontWeight: '900',
              display: 'grid', placeItems: 'center', flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900', color: '#0f172a' }}>
                Select the Category for the Exam
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.4, fontWeight: '500' }}>
                You can select multiple categories – this is our general security questions database of more than 10k questions.
              </p>
            </div>
          </div>

          {/* Search Bar & Select All Row */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type="text"
                placeholder="Search categories..."
                value={catSearchQuery}
                onChange={(e) => setCatSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px 8px 36px', borderRadius: '12px',
                  background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12.5px',
                  outline: 'none', color: '#0f172a'
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSelectAllCategories}
              style={{
                padding: '7px 12px', borderRadius: '10px',
                background: selectedCategories.length > 0 && selectedCategories.length === filteredCategories.length ? '#7c3aed' : '#f3e8ff',
                color: selectedCategories.length > 0 && selectedCategories.length === filteredCategories.length ? '#ffffff' : '#7c3aed',
                border: 'none', fontWeight: '800', fontSize: '11.5px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0
              }}
            >
              <Check size={13} strokeWidth={3} /> Select All
            </button>
          </div>

          {/* Category Checkbox Grid (3 Columns) */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px',
            maxHeight: '380px', overflowY: 'auto', paddingRight: '2px'
          }}>
            {filteredCategories.map((cat, idx) => {
              const isSelected = selectedCategories.includes(cat);
              const { Icon, bg, color } = getCategoryIconData(cat, idx);

              return (
                <div
                  key={cat}
                  onClick={() => handleToggleCategory(cat)}
                  style={{
                    padding: '8px 10px', borderRadius: '12px', cursor: 'pointer',
                    background: isSelected ? '#f3e8ff' : '#ffffff',
                    border: `1.5px solid ${isSelected ? '#7c3aed' : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '6px', transition: 'all 0.15s ease', minWidth: 0
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', minWidth: 0, flex: 1 }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '7px',
                      background: bg, color: color, display: 'grid', placeItems: 'center', flexShrink: 0
                    }}>
                      <Icon size={13} />
                    </div>
                    <span style={{
                      fontSize: '11px', fontWeight: isSelected ? '800' : '700',
                      color: isSelected ? '#5b21b6' : '#1e293b', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0
                    }}>
                      {cat}
                    </span>
                  </div>

                  {/* Custom Checkbox Pill */}
                  <div style={{
                    width: '15px', height: '15px', borderRadius: '4px',
                    border: `2px solid ${isSelected ? '#7c3aed' : '#cbd5e1'}`,
                    background: isSelected ? '#7c3aed' : '#ffffff',
                    display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    {isSelected && <Check size={10} color="#ffffff" strokeWidth={3.5} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN: 2 Select the Certification ── */}
        <div style={{
          background: '#ffffff', borderRadius: '24px', padding: '24px',
          border: `2px solid ${selectionMode === 'certification' && selectedCert ? '#7c3aed' : '#e2e8f0'}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          minWidth: 0
        }}>
          {/* Header with Circle Badge 2 */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: '#7c3aed', color: '#ffffff', fontSize: '15px', fontWeight: '900',
              display: 'grid', placeItems: 'center', flexShrink: 0
            }}>
              2
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '900', color: '#0f172a' }}>
                Select the Certification
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#64748b', lineHeight: 1.4, fontWeight: '500' }}>
                This will select questions which are based on the domain areas as per their syllabi.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search certifications..."
                value={certSearchQuery}
                onChange={(e) => setCertSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '9px 14px 9px 38px', borderRadius: '14px',
                  background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '13px',
                  outline: 'none', color: '#0f172a'
                }}
              />
            </div>
          </div>

          {/* Certification List Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', overflowY: 'auto' }}>
            {filteredCertifications.map((cert) => {
              const isSelected = selectedCert === cert.id;
              return (
                <div
                  key={cert.id}
                  onClick={() => handleSelectCert(cert.id)}
                  style={{
                    padding: '14px 16px', borderRadius: '18px', cursor: 'pointer',
                    background: isSelected ? '#f8fafc' : '#ffffff',
                    border: `1.5px solid ${isSelected ? '#7c3aed' : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '14px', transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                    {/* Badge Pill */}
                    <div style={{
                      padding: '8px 16px', borderRadius: '12px',
                      background: cert.pillBg, color: cert.pillColor,
                      fontSize: '12px', fontWeight: '900', letterSpacing: '0.5px',
                      flexShrink: 0, textAlign: 'center', minWidth: '64px'
                    }}>
                      {cert.id}
                    </div>
                    {/* Title & Domain Subtitle */}
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ display: 'block', fontSize: '13.5px', color: '#0f172a', fontWeight: '800', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cert.title}
                      </strong>
                      <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '500', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cert.desc}
                      </span>
                    </div>
                  </div>

                  {/* Radio Outer & Dot */}
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    border: `2px solid ${isSelected ? '#7c3aed' : '#cbd5e1'}`,
                    display: 'grid', placeItems: 'center', flexShrink: 0
                  }}>
                    {isSelected && (
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#7c3aed' }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ── 3. TEST GENERATION CONFIGURATION & LAUNCH BAR ── */}
      <div style={{
        background: '#ffffff', borderRadius: '24px', padding: '24px',
        border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'
      }}>
        
        {/* Questions Slider & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '300px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: '#f3e8ff', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
            <Sliders size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                Questions Count: <span style={{ color: '#7c3aed' }}>{questionsCount} Questions</span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} color="#7c3aed" /> Approx Duration: {duration} mins
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={questionsCount}
              onChange={handleQuestionsChange}
              style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '14px 32px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
            color: '#ffffff', border: 'none', cursor: 'pointer',
            fontWeight: '900', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(124,58,237,0.3)', transition: 'all 0.2s ease'
          }}
        >
          {loading ? (
            'Generating Test...'
          ) : (
            <>
              <Sparkles size={18} /> Generate & Start Test <ArrowRight size={16} />
            </>
          )}
        </button>

      </div>

    </div>
  );
};

export default CreatePractice;
