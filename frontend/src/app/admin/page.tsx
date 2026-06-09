"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Mail, ArrowRight, Mic, Square, Pause, Trash2, Globe, Calendar as CalendarIcon, Download, Play, StopCircle, LayoutDashboard, Type, UploadCloud, Users, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA FOR SYSTEM-WIDE RECORDS ---
const MOCK_COMPANY_LOGS = [
  { id: 'l1', userId: 'u1', userName: 'Alex Johnson', role: 'Intern', textContent: 'Completed the React component tutorials and built my first UI.', createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), category: 'Learning', tags: 'React, UI' },
  { id: 'l2', userId: 'u2', userName: 'Sarah Smith', role: 'Mentor', textContent: 'Reviewed Alex\'s pull request. Gave feedback on component structure.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), category: 'Mentorship', tags: 'CodeReview' },
  { id: 'l3', userId: 'u3', userName: 'Mike Brown', role: 'Employee', textContent: 'Deployed the new payment gateway to staging. All tests passing.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), category: 'Development', tags: 'Staging, Payments' },
  { id: 'l4', userId: 'u4', userName: 'Emily Chen', role: 'Intern', textContent: 'Drafted the weekly progress report.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), category: 'Documentation', tags: 'Report' },
  { id: 'l5', userId: 'u5', userName: 'David Lee', role: 'Employee', textContent: 'Fixed the navigation routing bugs.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), category: 'BugFix', tags: 'Routing, Fix' },
];

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'voice' | 'text' | 'files'>('dashboard');
  const [filterRole, setFilterRole] = useState('All');

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  
  // Text/File State
  const [manualText, setManualText] = useState('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileProgress, setFileProgress] = useState({ text: '', percent: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [allRecords, setAllRecords] = useState<any[]>([]);

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const [allUsers, setAllUsers] = useState<any>({});
  const [dashboardView, setDashboardView] = useState<'records' | 'users'>('records');
  const [selectedUserRole, setSelectedUserRole] = useState('Employee');
  
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editUserForm, setEditUserForm] = useState({ name: '', email: '', role: 'employee' });

  useEffect(() => {
    if (isLoggedIn) {
      loadRecords();
      loadUsers();
    }
  }, [isLoggedIn]);

  const loadRecords = () => {
    const localLogsStr = localStorage.getItem('mock_worklogs');
    const localLogs = localLogsStr ? JSON.parse(localLogsStr) : [];
    
    const combined = [...localLogs, ...MOCK_COMPANY_LOGS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setAllRecords(combined);
  };

  const loadUsers = () => {
    const usersStr = localStorage.getItem('mock_users');
    if (usersStr) {
      setAllUsers(JSON.parse(usersStr));
    } else {
      setAllUsers({});
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'mrfadmin@gmail.com' && password === 'mrfadmin123') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  // --- VOICE LOGIC ---
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    setTranscript('');
    transcriptRef.current = '';
    setRecordingTime(0);
    setIsRecording(true);
    setIsPaused(false);

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = language;

    rec.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    rec.onend = () => {
      if (isRecording && !isPaused) {
        try { rec.start(); } catch (e) {}
      }
    };

    rec.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = rec;
    try { rec.start(); } catch (e) { setIsRecording(false); }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsPaused(false);
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    
    if (transcriptRef.current.trim()) {
      saveRecord(transcriptRef.current, 'Voice Note');
    }
  };

  const togglePause = () => {
    if (!isRecording) return;
    setIsPaused(!isPaused);
    if (!isPaused) {
      if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch (e) {} }
    } else {
      try { recognitionRef.current.start(); } catch (e) {}
    }
  };

  const clearRecording = () => {
    if (isRecording) stopRecording();
    setTranscript('');
    transcriptRef.current = '';
    setRecordingTime(0);
  };

  // --- FILE LOGIC ---
  const processFile = () => {
    setIsProcessingFile(true);
    setFileProgress({ text: 'Reading file contents...', percent: 20 });
    
    setTimeout(() => setFileProgress({ text: 'Extracting text using OCR...', percent: 50 }), 1000);
    setTimeout(() => setFileProgress({ text: 'AI categorizing content...', percent: 80 }), 2000);
    setTimeout(() => {
      setIsProcessingFile(false);
      setFileProgress({ text: '', percent: 0 });
      saveRecord('Uploaded Document: Processed and extracted successfully.', 'Document');
    }, 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) processFile();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile();
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();


  // --- SAVE LOGIC ---
  const saveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUserForm.email || !editUserForm.name) return;
    const updatedUsers = { ...allUsers };
    updatedUsers[editUserForm.email] = {
      name: editUserForm.name,
      role: editUserForm.role
    };
    localStorage.setItem('mock_users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
    setEditingUser(null);
    showToast('User saved successfully!');
  };

  const deleteUser = (emailToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = { ...allUsers };
      delete updatedUsers[emailToDelete];
      localStorage.setItem('mock_users', JSON.stringify(updatedUsers));
      setAllUsers(updatedUsers);
      showToast('User deleted successfully!');
    }
  };

  const saveRecord = (text: string, category: string = 'Admin Note') => {
    const localLogs = JSON.parse(localStorage.getItem('mock_worklogs') || '[]');
    localLogs.unshift({
      id: Date.now().toString(),
      textContent: text,
      category: category,
      tags: 'Admin, Manual',
      createdAt: new Date().toISOString(),
      role: 'Admin',
      userName: 'Admin / You'
    });
    localStorage.setItem('mock_worklogs', JSON.stringify(localLogs));
    loadRecords();
    showToast('Record saved successfully!');
    if(activeTab !== 'dashboard') {
      setActiveTab('dashboard'); // Redirect to dashboard to see the record
    }
  };


  // --- COMPUTED DATA ---
  const filteredLogs = filterRole === 'All' 
    ? allRecords 
    : allRecords.filter(log => log.role === filterRole || (filterRole === 'Admin' && log.role === 'Admin'));

  const groupedLogs = filteredLogs.reduce((acc: any, log: any) => {
    const d = new Date(log.createdAt);
    const dateStr = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} | ${d.toLocaleDateString(undefined, { weekday: 'long' })}`;
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(log);
    return acc;
  }, {});

  const userList = Object.keys(allUsers).map(email => ({ email, ...allUsers[email] }));
  
  const stats = {
    total: allRecords.length,
    interns: userList.filter((u: any) => u.role.toLowerCase() === 'intern').length,
    mentors: userList.filter((u: any) => u.role.toLowerCase() === 'mentor').length,
    employees: userList.filter((u: any) => u.role.toLowerCase() === 'employee').length,
  };


  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-[#071420] text-white font-inter flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-opti-lime/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-opti-lime/5 rounded-full blur-[100px]"></div>

        <div className="w-full max-w-md bg-[#0F1F2E] border border-white/10 rounded-3xl p-10 shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-opti-lime/10 border border-opti-lime/30 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="text-opti-lime w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white font-outfit mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm text-center">Secure access for administrative controls.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <input 
                  type="email" 
                  autoComplete="new-password"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#071420] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-opti-lime/50 focus:ring-1 focus:ring-opti-lime/50 transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input 
                  type="password" 
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#071420] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-opti-lime/50 focus:ring-1 focus:ring-opti-lime/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 mt-4 bg-opti-lime text-[#071420] font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Secure Login <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071420] text-white font-inter flex flex-col overflow-hidden">
      
      {/* Top Navbar / Submenus */}
      <header className="bg-[#0F1F2E] border-b border-white/5 py-4 px-4 md:px-8 sticky top-0 z-40">
        <div className="max-w-[1800px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full xl:w-auto justify-center xl:justify-start">
            <div className="w-10 h-10 bg-opti-lime/10 border border-opti-lime/30 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="text-opti-lime w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-outfit text-white leading-tight">Admin Portal</h1>
              <p className="text-xs text-gray-400">System Command Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-[#071420] p-1 rounded-2xl border border-white/5 w-full xl:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-opti-lime text-[#071420] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard size={16} /> Analytics & Records
            </button>
            <button 
              onClick={() => setActiveTab('voice')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${activeTab === 'voice' ? 'bg-opti-lime text-[#071420] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Mic size={16} /> Voice Capture
            </button>
            <button 
              onClick={() => setActiveTab('text')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${activeTab === 'text' ? 'bg-opti-lime text-[#071420] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Type size={16} /> Text Input
            </button>
            <button 
              onClick={() => setActiveTab('files')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${activeTab === 'files' ? 'bg-opti-lime text-[#071420] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <UploadCloud size={16} /> Upload Files
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-[1800px] mx-auto space-y-6">

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div 
                  onClick={() => setDashboardView('records')}
                  className={`bg-[#0F1F2E] border ${dashboardView === 'records' ? 'border-opti-lime/50 ring-1 ring-opti-lime/50' : 'border-white/5'} rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:border-opti-lime/50 transition-all`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-opti-lime/5 rounded-full blur-3xl group-hover:bg-opti-lime/10 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-[#071420] border border-white/10 rounded-2xl flex items-center justify-center">
                      <LayoutDashboard className="text-opti-lime w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400">Total Records</div>
                      <div className="text-3xl font-black text-white">{stats.total}</div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => { setDashboardView('users'); setSelectedUserRole('employee'); }}
                  className={`bg-[#0F1F2E] border ${dashboardView === 'users' && selectedUserRole === 'employee' ? 'border-blue-500/50 ring-1 ring-blue-500/50' : 'border-white/5'} rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-all`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-[#071420] border border-white/10 rounded-2xl flex items-center justify-center">
                      <Users className="text-blue-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400">Employees</div>
                      <div className="text-3xl font-black text-white">{stats.employees}</div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => { setDashboardView('users'); setSelectedUserRole('mentor'); }}
                  className={`bg-[#0F1F2E] border ${dashboardView === 'users' && selectedUserRole === 'mentor' ? 'border-purple-500/50 ring-1 ring-purple-500/50' : 'border-white/5'} rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:border-purple-500/50 transition-all`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-[#071420] border border-white/10 rounded-2xl flex items-center justify-center">
                      <Users className="text-purple-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400">Mentors</div>
                      <div className="text-3xl font-black text-white">{stats.mentors}</div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => { setDashboardView('users'); setSelectedUserRole('intern'); }}
                  className={`bg-[#0F1F2E] border ${dashboardView === 'users' && selectedUserRole === 'intern' ? 'border-green-500/50 ring-1 ring-green-500/50' : 'border-white/5'} rounded-3xl p-6 shadow-xl relative overflow-hidden group cursor-pointer hover:border-green-500/50 transition-all`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-[#071420] border border-white/10 rounded-2xl flex items-center justify-center">
                      <Users className="text-green-400 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400">Interns</div>
                      <div className="text-3xl font-black text-white">{stats.interns}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Records List */}
              {dashboardView === 'records' && (
                <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl font-bold font-outfit text-white">System Records Directory</h2>
                  
                  {/* Role Filters */}
                  <div className="flex items-center gap-2 bg-[#071420] p-1 rounded-2xl border border-white/5">
                    {['All', 'Admin', 'Employee', 'Mentor', 'Intern'].map(role => (
                      <button 
                        key={role}
                        onClick={() => setFilterRole(role)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${filterRole === role ? 'bg-opti-lime text-[#071420]' : 'text-gray-400 hover:text-white'}`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {Object.keys(groupedLogs).length === 0 ? (
                    <div className="text-center text-gray-500 py-12 italic border border-white/5 rounded-2xl bg-[#071420]">No records found for this role.</div>
                  ) : (
                    Object.keys(groupedLogs).map((date) => (
                      <div key={date} className="bg-[#071420] border border-white/5 rounded-2xl p-6 shadow-inner">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                          <h3 className="text-opti-lime font-bold flex items-center gap-2">
                            <CalendarIcon size={18} /> {date.split('|')[0].trim()}
                            <span className="text-opti-lime/50 mx-2">•</span> {date.split('|')[1].trim()}
                          </h3>
                        </div>
                        <div className="space-y-5">
                          {groupedLogs[date].map((log: any, idx: number) => (
                            <div key={log.id || idx} className="relative pl-6 py-2 border-l-2 border-white/10 last:border-transparent">
                              <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-opti-lime"></div>
                              <div className="flex flex-col md:flex-row md:items-start gap-4">
                                
                                {/* User Info Column */}
                                <div className="w-48 shrink-0 flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-opti-lime">
                                    {log.userName ? log.userName.charAt(0).toUpperCase() : 'U'}
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-sm">{log.userName || 'System User'}</div>
                                    <div className={`text-[10px] font-bold uppercase tracking-wide mt-1 px-2 py-0.5 rounded inline-block ${
                                      log.role === 'Admin' ? 'bg-red-500/10 text-red-400' :
                                      log.role === 'Mentor' ? 'bg-purple-500/10 text-purple-400' :
                                      log.role === 'Intern' ? 'bg-green-500/10 text-green-400' :
                                      'bg-blue-500/10 text-blue-400'
                                    }`}>
                                      {log.role || 'Employee'}
                                    </div>
                                  </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                      <Play size={10} className="text-opti-lime"/> {new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                    {log.category && (
                                      <>
                                        <span className="text-gray-600 text-[10px]">•</span>
                                        <span className="text-xs text-gray-400 font-medium">{log.category}</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="text-base text-gray-200 leading-relaxed whitespace-pre-wrap">{log.textContent}</div>
                                  <div className="flex flex-wrap items-center gap-2 mt-3">
                                    {log.tags && log.tags.split(',').map((tag: string, i: number) => tag.trim() ? (
                                      <span key={i} className="bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full text-xs font-bold">{tag.trim()}</span>
                                    ) : null)}
                                  </div>
                                </div>

                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              )}

              {/* User Management UI */}
              {dashboardView === 'users' && (
                <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl font-bold font-outfit text-white flex items-center gap-2">
                      <Users className="text-opti-lime" /> 
                      {selectedUserRole === 'employee' ? 'Employees' : selectedUserRole === 'mentor' ? 'Mentors' : 'Interns'} Management
                    </h2>
                    <button 
                      onClick={() => {
                        setEditingUser('new');
                        setEditUserForm({ name: '', email: '', role: selectedUserRole });
                      }}
                      className="px-4 py-2 bg-opti-lime text-[#071420] rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform flex items-center gap-2"
                    >
                      + Add New User
                    </button>
                  </div>

                  <div className="space-y-4">
                    {userList.filter(u => u.role.toLowerCase() === selectedUserRole).length === 0 ? (
                      <div className="text-center text-gray-500 py-12 italic border border-white/5 rounded-2xl bg-[#071420]">No users found for this role.</div>
                    ) : (
                      userList.filter(u => u.role.toLowerCase() === selectedUserRole).map((u, idx) => (
                        <div key={idx} className="bg-[#071420] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {editingUser === u.email ? (
                            <form onSubmit={saveUser} className="flex-1 flex flex-col md:flex-row items-center gap-4">
                              <input type="text" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} className="bg-[#0F1F2E] border border-white/10 rounded-xl px-4 py-2 text-white w-full md:w-auto" placeholder="Full Name" required />
                              <input type="email" value={editUserForm.email} readOnly className="bg-[#0F1F2E] border border-white/5 rounded-xl px-4 py-2 text-gray-500 w-full md:w-auto cursor-not-allowed" />
                              <select value={editUserForm.role} onChange={e => setEditUserForm({...editUserForm, role: e.target.value})} className="bg-[#0F1F2E] border border-white/10 rounded-xl px-4 py-2 text-white w-full md:w-auto">
                                <option value="employee">Employee</option>
                                <option value="mentor">Mentor</option>
                                <option value="intern">Intern</option>
                              </select>
                              <div className="flex items-center gap-2">
                                <button type="submit" className="px-4 py-2 bg-opti-lime text-[#071420] rounded-xl font-bold text-sm">Save</button>
                                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-white/5 text-gray-400 rounded-xl font-bold text-sm">Cancel</button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl text-opti-lime">
                                  {u.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-white text-lg">{u.name}</div>
                                  <div className="text-gray-400 text-sm">{u.email}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 uppercase tracking-wider mr-4">
                                  {u.role}
                                </div>
                                <button onClick={() => { setEditingUser(u.email); setEditUserForm({ name: u.name, email: u.email, role: u.role }); }} className="px-4 py-2 bg-white/5 text-gray-300 hover:text-white rounded-xl text-sm font-bold transition-colors">Edit</button>
                                <button onClick={() => deleteUser(u.email)} className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-bold transition-colors">Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {editingUser === 'new' && (
                    <div className="mt-4 bg-[#071420] border border-opti-lime/30 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Create New Account</h3>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!editUserForm.email || !editUserForm.name) return;
                        const updatedUsers = { ...allUsers };
                        if (updatedUsers[editUserForm.email]) {
                          showToast('User with this email already exists!');
                          return;
                        }
                        updatedUsers[editUserForm.email] = { name: editUserForm.name, role: editUserForm.role };
                        localStorage.setItem('mock_users', JSON.stringify(updatedUsers));
                        setAllUsers(updatedUsers);
                        setEditingUser(null);
                        showToast('New user created!');
                      }} className="flex flex-col md:flex-row items-center gap-4">
                        <input type="text" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} className="bg-[#0F1F2E] border border-white/10 rounded-xl px-4 py-2 text-white w-full" placeholder="Full Name" required />
                        <input type="email" value={editUserForm.email} onChange={e => setEditUserForm({...editUserForm, email: e.target.value})} className="bg-[#0F1F2E] border border-white/10 rounded-xl px-4 py-2 text-white w-full" placeholder="Email Address" required />
                        <select value={editUserForm.role} onChange={e => setEditUserForm({...editUserForm, role: e.target.value})} className="bg-[#0F1F2E] border border-white/10 rounded-xl px-4 py-2 text-white w-full">
                          <option value="employee">Employee</option>
                          <option value="mentor">Mentor</option>
                          <option value="intern">Intern</option>
                        </select>
                        <div className="flex items-center gap-2">
                          <button type="submit" className="px-4 py-2 bg-opti-lime text-[#071420] rounded-xl font-bold text-sm whitespace-nowrap">Create User</button>
                          <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 bg-white/5 text-gray-400 rounded-xl font-bold text-sm">Cancel</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VOICE CAPTURE TAB */}
          {activeTab === 'voice' && (
            <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[650px]">
              {/* Column 1: Record Your Voice */}
              <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-8 flex flex-col flex-1 shadow-2xl relative">
                <h2 className="text-xl font-bold font-outfit text-white mb-12">Record Your Voice</h2>
                
                <div className="flex-1 flex flex-col items-center justify-center -mt-10">
                  <div 
                    onClick={!isRecording ? startRecording : undefined}
                    className={`w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${isRecording && !isPaused ? 'bg-opti-lime text-[#071420] shadow-[0_0_50px_rgba(205,255,100,0.3)] scale-105' : 'bg-[#071420] text-gray-400 hover:text-white border border-white/5 hover:border-opti-lime/50'}`}
                  >
                    <Mic size={64} className={isRecording && !isPaused ? "animate-pulse" : ""} />
                  </div>

                  <div className="mt-8 text-center">
                    <div className="text-4xl font-black font-outfit tracking-wider text-white mb-2 drop-shadow-md">
                      {formatTime(recordingTime)}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {isRecording ? (isPaused ? 'Paused' : 'Recording...') : 'Ready to record'}
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-center gap-4 w-full">
                    <button onClick={togglePause} disabled={!isRecording} className="w-16 h-16 rounded-2xl flex items-center justify-center border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                    </button>
                    <button onClick={!isRecording ? startRecording : stopRecording} className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${isRecording ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500' : 'border-opti-lime/30 bg-opti-lime/10 hover:bg-opti-lime/20 text-opti-lime'} transition-colors`}>
                      {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                    <button onClick={clearRecording} className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 2: Live Transcription */}
              <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-8 flex flex-col flex-1 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold font-outfit text-white">Live Transcription</h2>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-opti-lime" />
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      disabled={isRecording}
                      className="bg-[#071420] border border-white/10 rounded-xl py-2 pl-9 pr-8 text-sm font-bold text-white appearance-none outline-none focus:border-opti-lime/50 disabled:opacity-50"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="ta-IN">Tamil (தமிழ்)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex-1 bg-[#071420] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-inner">
                  <div className="flex-1 overflow-y-auto text-gray-300 leading-relaxed text-lg font-inter custom-scrollbar pr-4 whitespace-pre-wrap">
                    {transcript || <span className="text-gray-600 italic">Start speaking to see transcription...</span>}
                    {isRecording && !isPaused && <span className="w-2 h-5 ml-1 inline-block bg-opti-lime animate-pulse align-middle"></span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEXT CAPTURE TAB */}
          {activeTab === 'text' && (
            <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-8 flex flex-col shadow-2xl h-[650px] animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold">Manual Text Input</h2>
               </div>
               <textarea 
                 value={manualText}
                 onChange={(e) => setManualText(e.target.value)}
                 className="flex-1 bg-[#071420] border border-white/5 rounded-2xl p-6 text-white text-lg leading-relaxed resize-none custom-scrollbar focus:outline-none focus:border-opti-lime transition-colors" 
                 placeholder="Type or paste your worklog details here... It will automatically be saved as an Admin log."
               ></textarea>
               <div className="flex justify-end gap-3 mt-6">
                 <button 
                   onClick={() => setManualText('')}
                   disabled={!manualText.trim()}
                   className="py-4 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-32 transition-all disabled:opacity-50"
                 >
                   <Trash2 size={18} /> Clear
                 </button>
                 <button 
                   onClick={() => {
                     saveRecord(manualText, 'Manual Text');
                     setManualText('');
                   }}
                   disabled={!manualText.trim()}
                   className="py-4 bg-opti-lime text-[#071420] rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-48 hover:scale-[1.02] transition-transform disabled:opacity-50"
                 >
                   <Save size={18} /> Save Record
                 </button>
               </div>
            </div>
          )}

          {/* FILES CAPTURE TAB */}
          {activeTab === 'files' && (
            <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-8 flex flex-col shadow-2xl h-[650px] animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold">Upload Documents</h2>
               </div>

              <div 
                className={`flex-1 border-2 border-dashed ${isProcessingFile ? 'border-opti-lime/50 bg-opti-lime/5' : 'border-white/20 hover:border-opti-lime/50'} rounded-3xl p-8 flex flex-col shadow-inner items-center justify-center text-center transition-colors relative bg-[#071420]`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.mp3,.wav,.ogg" 
                  onChange={handleFileSelect} 
                />
              
              {isProcessingFile ? (
                <div className="w-full max-w-md flex flex-col items-center">
                  <Loader2 className="w-16 h-16 text-opti-lime animate-spin mb-6" />
                  <h2 className="text-2xl font-bold mb-3">Processing File...</h2>
                  <p className="text-gray-400 mb-6">{fileProgress.text}</p>
                  <div className="w-full h-3 bg-[#071420] rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-opti-lime transition-all duration-300" style={{ width: `${fileProgress.percent}%` }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud size={64} className="text-gray-600 mb-6" />
                  <h2 className="text-2xl font-bold mb-3">Upload Admin Documents</h2>
                  <p className="text-gray-400 mb-8 max-w-md">Drag and drop documents, images, or audio here. The system will process it and store it securely.</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="py-4 px-8 bg-opti-lime text-[#071420] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                     <UploadCloud size={18} /> Browse Files
                  </button>
                </>
              )}
            </div>
            </div>
          )}

        </div>
      </main>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-8 z-50 flex items-center gap-3 bg-[#0F1F2E] border border-white/10 px-6 py-4 rounded-xl shadow-2xl"
          >
            <CheckCircle2 className="w-6 h-6 text-opti-lime" />
            <p className="text-sm font-bold text-white">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
