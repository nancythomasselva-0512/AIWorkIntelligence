"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, Play, Edit2, Trash2, Download, Search, CheckCircle2, X, Loader2, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

export default function WorkLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterTimeframe, setFilterTimeframe] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  
  const [logToEdit, setLogToEdit] = useState<any>(null);
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedLogView, setSelectedLogView] = useState<any>(null);

  useEffect(() => {
    fetchLogs();
  }, [filterDate, filterTimeframe]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      let url = '/worklogs?limit=100';
      if (filterDate) url += `&date=${filterDate}`;
      if (filterTimeframe !== 'all') url += `&timeframe=${filterTimeframe}`;
      
      const res = await api.get(url);
      setLogs(res.data.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Category,Task,Created By,Role\n"
      + logs.map(log => `${new Date(log.createdAt).toLocaleDateString()},${log.category || 'General'},"${(log.textContent || '').replace(/"/g, '""')}",${log.user?.full_name || 'User'},${log.user?.role || 'User'}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `worklogs_${filterDate || 'all'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsPDF = (log: any) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFontSize(20);
    pdf.text("Work Log Details", 10, 20);
    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date(log.createdAt).toLocaleString()}`, 10, 35);
    pdf.text(`Category: ${log.category || 'General'}`, 10, 45);
    
    if (log.user) {
      pdf.text(`Created By: ${log.user.full_name} (${log.user.role})`, 10, 55);
    }
    
    const splitText = pdf.splitTextToSize(`Content: ${log.textContent || ''}`, 190);
    pdf.text(splitText, 10, 65);
    
    pdf.save(`log_${log.id}.pdf`);
  };

  const downloadAsWord = (log: any) => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const footer = "</body></html>";
    const content = `
      <h1>Work Log Details</h1>
      <p><strong>Date:</strong> ${new Date(log.createdAt).toLocaleString()}</p>
      <p><strong>Category:</strong> ${log.category || 'General'}</p>
      ${log.user ? `<p><strong>Created By:</strong> ${log.user.full_name} (${log.user.role})</p>` : ''}
      <hr />
      <h3>Content:</h3>
      <p>${log.textContent || ''}</p>
    `;
    const html = header + content + footer;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `log_${log.id}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEditLog = async () => {
    if (!logToEdit) return;
    setIsEditing(true);
    try {
      await api.put(`/worklogs/${logToEdit.id}`, {
        textContent: editContent
      });
      setToastMessage('Log updated successfully!');
      setTimeout(() => setToastMessage(''), 3000);
      setLogToEdit(null);
      fetchLogs();
    } catch (err) {
      console.error('Failed to update', err);
      setToastMessage('Error updating log.');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteLog = async () => {
    if (!logToDelete) return;
    setIsDeleting(true);
    try {
      await api.delete(`/worklogs/${logToDelete}`);
      setToastMessage('Log deleted successfully!');
      setTimeout(() => setToastMessage(''), 3000);
      setLogToDelete(null);
      fetchLogs();
    } catch (err) {
      console.error('Failed to delete', err);
      setToastMessage('Error deleting log.');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 text-white min-h-screen">
      
      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0F1F2E] border border-white/10 px-5 py-3.5 rounded-xl shadow-2xl"
          >
            <CheckCircle2 className="w-5 h-5 text-[#C7F23A]" />
            <p className="text-sm font-bold text-white">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#B084FF]/10 rounded-2xl flex items-center justify-center text-[#B084FF] border border-[#B084FF]/20">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Work Logs Directory</h1>
            <p className="text-gray-400 text-sm mt-1">View, search, filter, and manage all your stored AI work logs.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={filterTimeframe}
            onChange={(e) => { setFilterTimeframe(e.target.value); setFilterDate(''); }}
            className="bg-[#0F1F2E] border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-[#B084FF] focus:border-[#B084FF] text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => { setFilterDate(e.target.value); setFilterTimeframe('all'); }}
            className="bg-[#0F1F2E] border border-white/10 text-white rounded-xl px-4 py-2.5 focus:ring-[#B084FF] focus:border-[#B084FF] text-sm [color-scheme:dark]"
          />
          <button onClick={exportData} className="text-sm font-bold text-white bg-[#B084FF] hover:bg-[#9f72f0] px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search logs by keyword..." 
              className="w-full bg-[#071420] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#B084FF] transition-colors"
            />
          </div>
          <div className="text-sm text-gray-400">{logs.length} Total Logs</div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="py-12 flex justify-center">
               <Loader2 className="w-8 h-8 text-[#B084FF] animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
               <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p>No work logs found for the selected timeframe.</p>
            </div>
          ) : (
            logs.map((log, idx) => (
              <div 
                key={log.id || idx} 
                onClick={() => setSelectedLogView(log)}
                className="flex flex-col gap-2 bg-[#071420] border border-white/5 rounded-2xl p-4 hover:border-white/10 hover:bg-[#152737]/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <button className="w-10 h-10 mt-1 rounded-full bg-[#B084FF]/10 flex items-center justify-center shrink-0 border border-[#B084FF]/20 text-[#B084FF] group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-bold text-white mb-2 leading-relaxed">{log.textContent || 'Voice Capture'}</div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {new Date(log.createdAt).toLocaleDateString()} at {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {log.category && (
                        <span className="bg-white/10 px-2 py-1 rounded text-white font-medium">{log.category}</span>
                      )}
                      {log.subCategory && (
                        <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300 font-medium">{log.subCategory}</span>
                      )}
                      {log.tags && log.tags.split(',').map((tag: string, i: number) => tag.trim() ? (
                        <span key={i} className="bg-[#B084FF]/10 text-[#B084FF] border border-[#B084FF]/20 px-1.5 py-0.5 rounded text-[10px] font-bold">{tag.trim()}</span>
                      ) : null)}
                      {log.user && (
                        <>
                           <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 flex items-center gap-1">
                             {log.user.full_name}
                           </span>
                           <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20 uppercase tracking-wider text-[10px]">
                             {log.user.role.replace('_', ' ')}
                           </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => { setLogToEdit(log); setEditContent(log.textContent || ''); }}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setLogToDelete(log.id)}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Log Detail View Modal */}
      <AnimatePresence>
        {selectedLogView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedLogView(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F1F2E] border border-white/10 rounded-3xl p-6 w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Work Log Details</h3>
                  <p className="text-sm text-gray-400">{new Date(selectedLogView.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedLogView(null)} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar mb-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedLogView.category && (
                    <span className="bg-[#B084FF]/10 text-[#B084FF] px-3 py-1 rounded-lg text-sm font-medium border border-[#B084FF]/20">
                      {selectedLogView.category}
                    </span>
                  )}
                  {selectedLogView.user && (
                    <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm font-medium border border-blue-500/20">
                      {selectedLogView.user.full_name}
                    </span>
                  )}
                </div>
                <div className="bg-[#071420] border border-white/5 rounded-2xl p-5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedLogView.textContent || 'No content.'}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button 
                  onClick={() => downloadAsWord(selectedLogView)}
                  className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Download Word
                </button>
                <button 
                  onClick={() => downloadAsPDF(selectedLogView)}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {logToEdit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0F1F2E] border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Edit Work Log</h3>
                <button onClick={() => setLogToEdit(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-400 mb-2">Content</label>
                <textarea 
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-32 bg-[#071420] border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#B084FF] transition-colors resize-none placeholder:text-gray-600 custom-scrollbar"
                ></textarea>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setLogToEdit(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button onClick={handleEditLog} disabled={isEditing || !editContent.trim()} className="px-5 py-2.5 bg-[#B084FF] text-white rounded-xl text-sm font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2">
                  {isEditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {logToDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0F1F2E] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-500">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Work Log?</h3>
              <p className="text-sm text-gray-400 mb-8">This action cannot be undone. Are you sure you want to permanently delete this log?</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setLogToDelete(null)} className="flex-1 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDeleteLog} disabled={isDeleting} className="flex-1 px-5 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
