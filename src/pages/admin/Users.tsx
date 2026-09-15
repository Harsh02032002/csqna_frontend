import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const getClientName = (c: any) => {
  if (c.fullname && c.fullname.trim()) return c.fullname;
  const fullName = [c.first_name, c.last_name].filter(Boolean).join(' ').trim();
  if (fullName) return fullName;
  if (c.name && c.name.trim()) return c.name;
  if (c.username) {
    const uname = c.username.split('@')[0];
    return uname.charAt(0).toUpperCase() + uname.slice(1);
  }
  return 'N/A';
};

const getClientCountry = (c: any) => {
  if (c.country && c.country.trim()) return c.country;
  if (c.address && c.address.trim()) return c.address;
  return 'India';
};

export const Users: React.FC = () => {
  const [clients, setClients]   = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [message, setMessage]   = useState('');

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/clients/list');
      if (res.data && res.data.status && res.data.data) {
        setClients(res.data.data);
        setFiltered(res.data.data);
      }
    } catch {
      const mockClients = [
        { _id: '1', first_name: 'Aarav', last_name: 'Sharma', email: 'aarav@example.in', username: 'aarav_s', country: 'India', createdAt: new Date().toISOString() },
        { _id: '2', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', username: 'janes', country: 'USA', createdAt: new Date().toISOString() },
      ];
      setClients(mockClients);
      setFiltered(mockClients);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase().trim();
    if (!s) {
      setFiltered(clients);
      return;
    }
    const result = clients.filter((c) => {
      const name    = getClientName(c).toLowerCase();
      const email   = (c.email || '').toLowerCase();
      const uname   = (c.username || '').toLowerCase();
      const country = getClientCountry(c).toLowerCase();
      return name.includes(s) || email.includes(s) || uname.includes(s) || country.includes(s);
    });
    setFiltered(result);
  }, [search, clients]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    try {
      const res = await api.delete(`/admin/clients/delete`, { data: { id } });
      if (res.data && res.data.status) {
        setMessage('Client record deleted successfully.');
        fetchClients();
      } else {
        setMessage(res.data?.message || 'Failed to delete client.');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error occurred while processing request.');
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1100px', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <style>{`
        .admin-del-btn { transition: all 0.18s ease !important; }
        .admin-del-btn:hover {
          background: #ffe4e6 !important;
          border-color: #fda4af !important;
          color: #be123c !important;
          transform: translateY(-1px);
        }
        .admin-tr-row { transition: background 0.15s ease; }
        .admin-tr-row:hover { background: #faf5ff !important; }
      `}</style>

      <div className="row column_title page_title" style={{ marginBottom: '20px' }}>
        <div className="col-md-12">
          <h2 style={{ fontWeight: '800', fontSize: '22px', color: '#0f172a', margin: 0 }}>Clients Database</h2>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#94a3b8' }}>Manage registered candidates and user records</p>
        </div>
      </div>

      {message && (
        <div className="alert alert-info" style={{ fontSize: '13px', borderRadius: '12px', marginBottom: '20px' }}>
          {message}
        </div>
      )}

      <div className="white_card card_height_100 p-4" style={{ borderRadius: '18px', background: '#fff', border: '1px solid #f0f2f8', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div className="mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <input
              type="text"
              placeholder="Search by name, email, or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{
                borderRadius: '12px',
                fontSize: '13px',
                padding: '10px 16px 10px 38px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc'
              }}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }}>🔍</span>
          </div>

          <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
            Total Registered: <span style={{ color: '#7c3aed', fontWeight: '800' }}>{filtered.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted font-weight-bold" style={{ fontSize: '14px' }}>
            ⏳ Fetching registered clients...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5 text-muted" style={{ fontSize: '14px' }}>
            No registered clients found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table" style={{ borderCollapse: 'separate', borderSpacing: '0 6px' }}>
              <thead>
                <tr style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '12px 16px', border: 'none' }}>Name</th>
                  <th style={{ padding: '12px 16px', border: 'none' }}>Username</th>
                  <th style={{ padding: '12px 16px', border: 'none' }}>Email</th>
                  <th style={{ padding: '12px 16px', border: 'none' }}>Country</th>
                  <th style={{ padding: '12px 16px', border: 'none', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const name    = getClientName(c);
                  const country = getClientCountry(c);
                  const initial = (name.charAt(0) || 'U').toUpperCase();

                  return (
                    <tr key={c._id} className="admin-tr-row" style={{ background: '#fff', borderRadius: '12px', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px', border: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                            color: '#6d28d9', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontWeight: '800', fontSize: '14px',
                            flexShrink: 0
                          }}>
                            {initial}
                          </div>
                          <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', border: 'none', color: '#475569', fontSize: '13px', fontWeight: '500' }}>
                        {c.username || '—'}
                      </td>
                      <td style={{ padding: '14px 16px', border: 'none', color: '#475569', fontSize: '13px' }}>
                        {c.email || '—'}
                      </td>
                      <td style={{ padding: '14px 16px', border: 'none' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '5px',
                          padding: '5px 12px', borderRadius: '20px',
                          background: '#f1f5f9', color: '#334155',
                          fontSize: '12px', fontWeight: '600'
                        }}>
                          🌐 {country}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', border: 'none', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="admin-del-btn"
                          style={{
                            padding: '8px 18px',
                            borderRadius: '10px',
                            border: '1px solid #fecdd3',
                            background: '#fff1f2',
                            color: '#e11d48',
                            fontWeight: '700',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 6px rgba(225,29,72,0.1)'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

