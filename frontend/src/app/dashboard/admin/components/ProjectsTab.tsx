import React, { useState, useEffect } from 'react';
import { FolderGit2, Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../../../utils/api';

export default function ProjectsTab() {
  const [projects, setProjects] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', organizationId: '', description: '', status: 'active', budget: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, orgRes] = await Promise.all([
        api.get('/admin/projects'),
        api.get('/admin/organizations')
      ]);
      setProjects(projRes.data.data);
      setOrganizations(orgRes.data.data);
      
      // Set default org if available
      if (orgRes.data.data.length > 0) {
        setFormData(prev => ({ ...prev, organizationId: orgRes.data.data[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, budget: formData.budget ? parseFloat(formData.budget) : 0 };
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, payload);
      } else {
        await api.post('/admin/projects', payload);
      }
      setShowModal(false);
      setFormData({ name: '', organizationId: organizations[0]?.id || '', description: '', status: 'active', budget: '' });
      setEditingId(null);
      fetchData(); // re-fetch to get updated relations
    } catch (err) {
      console.error(err);
      alert('Operation failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      fetchData();
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
          <FolderGit2 className="text-opti-lime" /> Projects
        </h2>
        <button 
          onClick={() => { setEditingId(null); setFormData({ name: '', organizationId: organizations[0]?.id || '', description: '', status: 'active', budget: '' }); setShowModal(true); }}
          className="flex items-center gap-2 bg-opti-lime text-[#071420] px-4 py-2 rounded-xl text-sm font-bold hover:bg-opti-lime-hover transition-colors"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs uppercase bg-[#071420] text-gray-400">
            <tr>
              <th className="px-6 py-4 rounded-tl-xl">Project Name</th>
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4 rounded-tr-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 font-bold text-white">{project.name}</td>
                <td className="px-6 py-4">{project.organization?.name || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${project.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {project.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">${project.budget ? parseFloat(project.budget).toLocaleString() : '0'}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => { setEditingId(project.id); setFormData({ name: project.name, organizationId: project.organization?.id || '', description: project.description || '', status: project.status, budget: project.budget || '' }); setShowModal(true); }} className="text-gray-400 hover:text-white mr-3"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0F1F2E] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Project' : 'Add Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Project Name <span className="text-red-500">*</span></label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Organization <span className="text-red-500">*</span></label>
                <select required value={formData.organizationId} onChange={e => setFormData({...formData, organizationId: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none">
                  <option value="" disabled>Select Organization</option>
                  {organizations.map(org => <option key={org.id} value={org.id}>{org.name}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none">
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-2">Budget ($)</label>
                  <input type="number" step="0.01" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#071420] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-opti-lime outline-none h-20 resize-none"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-opti-lime text-[#071420] rounded-xl text-sm font-bold hover:scale-105 transition-transform">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
