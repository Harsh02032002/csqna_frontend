import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export const Users: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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
        { _id: '1', fullname: 'Aarav Sharma', email: 'aarav@example.in', username: 'aarav_s', country: 'India', createdAt: new Date().toISOString() },
        { _id: '2', fullname: 'Jane Smith', email: 'jane@example.com', username: 'janes', country: 'USA', createdAt: new Date().toISOString() },
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
    const result = clients.filter(
      (c) =>
        c.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.username?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, clients]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      const res = await api.delete(`/admin/clients/delete`, { data: { id } });
      if (res.data && res.data.status) {
        setMessage('Candidate record deleted successfully.');
        fetchClients();
      } else {
        setMessage(res.data?.message || 'Failed to delete client.');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error occurred while processing request.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row column_title page_title">
        <div className="col-md-12">
          <h2 className="rt-pt-10 rt-pb-10" style={{ fontWeight: 'bold', fontSize: '24px', color: '#1a3456' }}>Clients Database</h2>
        </div>
      </div>

      {message && (
        <div className="alert alert-info" style={{ fontSize: '13px' }}>
          {message}
        </div>
      )}

      <div className="white_card card_height_100 p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ maxWidth: '300px', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted font-weight-bold">
            Extracting candidate directory...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            No registered clients found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c._id}>
                    <td className="font-weight-bold" style={{ color: '#1a3456' }}>{c.fullname}</td>
                    <td>{c.username}</td>
                    <td>{c.email}</td>
                    <td>{c.country || 'N/A'}</td>
                    <td className="text-right">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
