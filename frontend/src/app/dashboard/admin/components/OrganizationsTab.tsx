import React, { useState, useEffect } from 'react';
import { Briefcase, Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../../../utils/api';

export default function OrganizationsTab() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', gst_number: '', address: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const res = await api.get('/admin/organizations');
      setOrganizations(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/organizations/${editingId}`, formData);
      } else {
        await api.post('/admin/organizations', formData);
      }
      setShowModal(false);
      setFormData({ name: '', gst_number: '', address: '' });
      setEditingId(null);
      fetchOrgs();
    } catch (err) {
      console.error(err);
      alert('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this organization?')) return;
    try {
      await api.delete(`/admin/organizations/${id}`);
      fetchOrgs();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 text-opti-lime animate-spin" /></div>;
  }

  return (
    <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <Briefcase className="text-opti-lime" /> Organizations
        </h2>
        <button 
          onClick={() => { setEditingId(null); setFormData({ name: '', gst_number: '', address: '' }); setShowModal(true); }}
          className="flex items-center gap-2 bg-opti-lime text-[#071420] px-4 py-2 rounded-xl text-sm font-bold hover:bg-opti-lime-hover transition-colors"
        >
          <Plus size={16} /> Add Organization
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {organizations.map(org => (
          <div key={org.id} className="bg-[#071420] border border-white/10 rounded-2xl p-5 hover:border-opti-lime/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-white truncate pr-2">{org.name}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setEditingId(org.id); setFormData({ name: org.name, gst_number: org.gst_number, address: org.address }); setShowModal(true); }}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(org.id)} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-2"><span className="font-semibold text-gray-500">GST:</span> {org.gst_number || 'N/A'}</div>
            <div className="text-sm text-gray-400"><span className="font-semibold text-gray-500">Address:</span> {org.address || 'N/A'}</div>
          </div>
        ))}
        {organizations.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">No organizations found.</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0F1F2E] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Organization' : 'Add Organization'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Organization Name <span className="text-red-500">*</span></label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">GST Number</label>
                <input type="text" value={formData.gst_number} onChange={e => setFormData({...formData, gst_number: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Address</label>
                <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none h-24 resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-opti-lime text-[#071420] rounded-xl text-sm font-bold hover:scale-105 transition-transform">Save Organization</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
