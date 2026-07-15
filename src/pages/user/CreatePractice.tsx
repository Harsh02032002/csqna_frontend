import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export const CreatePractice: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [difficultyLevels] = useState<string[]>(['Any', 'Easy', 'Medium', 'Hard']);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(['Any']);
  const [questionsCount, setQuestionsCount] = useState(25);
  const [duration, setDuration] = useState(40);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [testName, setTestName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get('/user/practice/categories');
        if (res.data && res.data.status && res.data.data) {
          setCategories(res.data.data);
          setFilteredCategories(res.data.data);
        }
      } catch {
        // Fallback
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    let result = categories.filter((c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.localeCompare(b));
    } else {
      result.sort((a, b) => b.localeCompare(a));
    }
    setFilteredCategories(result);
  }, [searchQuery, sortOrder, categories]);

  const handleToggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...filteredCategories]);
    }
  };

  const handleToggleDifficulty = (level: string) => {
    if (level === 'Any') {
      setSelectedDifficulties(['Any']);
      return;
    }
    let updated = selectedDifficulties.filter((d) => d !== 'Any');
    if (updated.includes(level)) {
      updated = updated.filter((d) => d !== level);
    } else {
      updated.push(level);
    }
    if (updated.length === 0) updated = ['Any'];
    setSelectedDifficulties(updated);
  };

  const handleQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setQuestionsCount(val);
    setDuration(Math.ceil(val * 1.6));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setMessage('Please select at least one assessment domain.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        testname: testName || `Practice_Test_${Date.now()}`,
        category: selectedCategories,
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
    <div className="container-fluid">
      <div className="row column_title page_title">
        <div className="col-md-12">
          <h2 className="rt-pt-10 rt-pb-10" style={{ fontWeight: 'bold', fontSize: '24px', color: '#1a3456' }}>Create Practice Test</h2>
        </div>
      </div>

      {message && (
        <div className="alert alert-danger" style={{ fontSize: '13px' }}>
          {message}
        </div>
      )}

      {step === 1 ? (
        <div className="white_card card_height_100 p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ maxWidth: '300px', borderRadius: '8px', fontSize: '14px' }}
            />
            <div className="d-flex align-items-center gap-3" style={{ fontSize: '13px' }}>
              <button type="button" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="btn btn-light btn-sm">
                Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </button>
              <button type="button" onClick={handleSelectAll} className="btn btn-link text-primary font-weight-bold text-decoration-none">
                {selectedCategories.length === filteredCategories.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>

          <div className="row" style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
            {filteredCategories.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <div className="col-md-4 mb-3" key={cat}>
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(cat)}
                    className="w-100 p-3 rounded-lg border text-left d-flex align-items-center gap-3"
                    style={{
                      backgroundColor: isSelected ? '#def4fe' : '#fff',
                      borderColor: isSelected ? '#59c7fb' : '#eee',
                      borderRadius: '10px',
                      outline: 'none',
                      cursor: 'pointer',
                      minHeight: '70px'
                    }}
                  >
                    <input type="checkbox" checked={isSelected} readOnly />
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>{cat}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center pt-3">
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#777' }}>
              {selectedCategories.length} Categories Selected
            </span>
            <button
              type="button"
              disabled={selectedCategories.length === 0}
              onClick={() => setStep(2)}
              className="btn btn-primary rt-btn rt-gradient pill text-uppercase"
              style={{ border: 'none', fontWeight: 'bold' }}
            >
              Next Step &nbsp;→
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="white_card card_height_100 p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Custom Test Name</label>
                <input
                  type="text"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '8px', padding: '10px' }}
                  placeholder="e.g. Audit_Prep_Module_1"
                />
              </div>

              <div className="form-group mb-3">
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Questions Count (Max 150)</label>
                <input
                  type="number"
                  min="5"
                  max="150"
                  value={questionsCount}
                  onChange={handleQuestionsChange}
                  className="form-control"
                  style={{ borderRadius: '8px', padding: '10px' }}
                />
              </div>

              <div className="form-group mb-3">
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Time Limit (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="form-control"
                  style={{ borderRadius: '8px', padding: '10px' }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#555', marginBottom: '10px', display: 'block' }}>Difficulty Levels</label>
              <div className="row">
                {difficultyLevels.map((lvl) => {
                  const isSelected = selectedDifficulties.includes(lvl);
                  return (
                    <div className="col-6 mb-3" key={lvl}>
                      <button
                        type="button"
                        onClick={() => handleToggleDifficulty(lvl)}
                        className="btn w-100 py-3 text-uppercase font-weight-bold"
                        style={{
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#def4fe' : '#fff',
                          borderColor: isSelected ? '#59c7fb' : '#eee',
                          color: isSelected ? '#1a3456' : '#555',
                          borderWidth: '2px',
                          fontSize: '12px'
                        }}
                      >
                        {lvl}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center pt-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn btn-outline-secondary pill text-uppercase"
              style={{ borderRadius: '30px', padding: '10px 25px' }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary rt-btn rt-gradient pill text-uppercase"
              style={{ border: 'none', fontWeight: 'bold' }}
            >
              {loading ? 'Generating...' : 'Start Assessment'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePractice;
