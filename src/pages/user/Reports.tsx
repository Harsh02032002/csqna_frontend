import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export const Reports: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<any>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/user/practice/reports');
        if (res.data && res.data.status && res.data.data) {
          setTests(res.data.data);
          setFiltered(res.data.data);
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    const result = tests.filter((t) =>
      t.testname?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, tests]);

  const handlePrint = (test: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>CSQNA Practice Report - ${test.testname}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            h1 { font-size: 24px; margin-bottom: 2px; }
            .score { font-size: 40px; font-weight: bold; color: #1a3456; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f8fafc; }
          </style>
        </head>
        <body onload="window.print()">
          <h1>CSQNA Score Report</h1>
          <p><strong>Test Name:</strong> ${test.testname}</p>
          <p><strong>Date:</strong> ${new Date(test.createdAt).toLocaleDateString()}</p>
          <div class="score">Score: ${test.score?.toFixed(1) || 0}%</div>
          <table>
            <tr><th>Metric</th><th>Details</th></tr>
            <tr><td>Total Questions</td><td>${test.totalQuestions || 0}</td></tr>
            <tr><td>Correct Answers</td><td>${test.correctAnswers || 0}</td></tr>
            <tr><td>Test Status</td><td>Completed</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="container-fluid">
      <div className="row column_title page_title">
        <div className="col-md-12">
          <h2 className="rt-pt-10 rt-pb-10" style={{ fontWeight: 'bold', fontSize: '24px', color: '#1a3456' }}>Reports &amp; Scores</h2>
        </div>
      </div>

      <div className="white_card card_height_100 p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search test names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ maxWidth: '300px', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted font-weight-bold">
            Extracting candidate sheets...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No completed test logs found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Date</th>
                  <th>Questions</th>
                  <th>Score</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t._id}>
                    <td className="font-weight-bold" style={{ color: '#1a3456' }}>{t.testname}</td>
                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td>{t.totalQuestions || 0}</td>
                    <td className="text-primary font-weight-bold">{t.score?.toFixed(1) || 0}%</td>
                    <td className="text-right">
                      <button onClick={() => setSelectedTest(t)} className="btn btn-outline-primary btn-sm mr-2">
                        View
                      </button>
                      <button onClick={() => handlePrint(t)} className="btn btn-outline-secondary btn-sm">
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedTest && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1050
        }}>
          <div className="card p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px', border: 'none' }}>
            <h4 className="mb-4" style={{ fontWeight: 'bold', color: '#1a3456' }}>Report Details</h4>
            <div className="mb-4" style={{ fontSize: '14px' }}>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">Test Name</span>
                <span className="font-weight-bold">{selectedTest.testname}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">Date</span>
                <span>{new Date(selectedTest.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">Total Questions</span>
                <span>{selectedTest.totalQuestions || 0}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">Correct Answers</span>
                <span>{selectedTest.correctAnswers || 0}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-muted">Final Score</span>
                <span className="text-primary font-weight-bold">{selectedTest.score?.toFixed(1) || 0}%</span>
              </div>
            </div>
            <button onClick={() => setSelectedTest(null)} className="btn btn-primary w-100" style={{ borderRadius: '8px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
