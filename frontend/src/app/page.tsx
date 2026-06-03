"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BarChart3, ChevronDown, Play, Mic, StopCircle, Loader2, CheckCircle2, BrainCircuit, FileText, Users, Clock, ArrowRight, LayoutDashboard, Zap, Star, Activity, PlusCircle, TrendingUp, DollarSign } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isWorkIntelOpen, setIsWorkIntelOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);

  // AI Insights State
  const [hoursLoggedToday, setHoursLoggedToday] = useState<number | string>("Data not available yet");
  const [pendingFollowUps, setPendingFollowUps] = useState<number | string>("Data not available yet");
  const [mostActiveProject, setMostActiveProject] = useState<string>("Data not available yet");
  const [revenueActivities, setRevenueActivities] = useState<number | string>("Data not available yet");
  const [productivityScore, setProductivityScore] = useState<number | string>("Data not available yet");
  const [todayLogsCount, setTodayLogsCount] = useState<number | string>("Data not available yet");
  const [tasksCompleted, setTasksCompleted] = useState<number | string>("Data not available yet");
  const [meetingsCount, setMeetingsCount] = useState<number | string>("Data not available yet");

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  const fetchRecentLogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/worklogs?limit=4`);
      setRecentLogs(res.data.data || res.data || []);

      const allLogsRes = await axios.get(`${API_BASE_URL}/worklogs?limit=100`);
      const allLogs = allLogsRes.data.data || allLogsRes.data || [];

      if (allLogs.length > 0) {
        const today = new Date().toDateString();
        const todayLogs = allLogs.filter((log: any) => new Date(log.createdAt).toDateString() === today);
        setTodayLogsCount(todayLogs.length.toString());

        const totalHours = todayLogs.reduce((acc: number, log: any) => acc + (parseFloat(log.hours) || 0), 0);
        setHoursLoggedToday(totalHours > 0 ? totalHours.toFixed(1) : "0");

        const pending = allLogs.filter((log: any) => log.status === 'PENDING').length;
        setPendingFollowUps(pending.toString());

        const completed = allLogs.filter((log: any) => log.status === 'COMPLETED').length;
        setTasksCompleted(completed.toString());

        const meetings = allLogs.filter((log: any) => log.category && log.category.toLowerCase().includes('meeting')).length;
        setMeetingsCount(meetings.toString());

        const categories = allLogs.map((log: any) => log.category).filter(Boolean);
        if (categories.length > 0) {
          const counts: any = {};
          categories.forEach((c: string) => { counts[c] = (counts[c] || 0) + 1; });
          const mostActive = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
          setMostActiveProject(mostActive);
        }

        const score = Math.min(100, Math.max(0, Math.round((completed / (allLogs.length || 1)) * 100) + 20));
        setProductivityScore(`${score}%`);

      } else {
        setHoursLoggedToday("0");
        setPendingFollowUps("0");
        setProductivityScore("85%");
        setTodayLogsCount("0");
        setTasksCompleted("0");
        setMeetingsCount("0");
      }

      try {
        const revRes = await axios.get(`${API_BASE_URL}/revenue?limit=100`);
        const revData = revRes.data.data || revRes.data || [];
        setRevenueActivities(revData.length > 0 ? revData.length.toString() : "0");
      } catch (e) {
        setRevenueActivities("0");
      }

    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const transcriptRef = useRef(transcript);
  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);

  const autoSaveLog = async (textToSave: string) => {
    if (!textToSave.trim()) return;
    setIsSaving(true);
    try {
      await axios.post(`${API_BASE_URL}/worklogs`, { textContent: textToSave });
      setTranscript('');
      transcriptRef.current = '';
      setToastMessage('Saved to dashboard successfully!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (error: any) {
      alert('Failed to save log: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSaving(false);
    }
  };

  const toggleRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (isRecording) {
      if (recognition) {
        try { recognition.stop(); } catch (e) { }
      }
      return;
    }

    setTranscript('');
    transcriptRef.current = '';
    setIsRecording(true);

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    rec.onend = () => {
      setIsRecording(false);
      if (transcriptRef.current.trim()) {
        autoSaveLog(transcriptRef.current);
      }
    };

    rec.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    setRecognition(rec);
    try { rec.start(); } catch (e) { setIsRecording(false); }
  };

  return (
    <main className="bg-[#0F1F2E] min-h-screen w-full overflow-hidden">

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

      {/* Floating Action Button (Quick Actions) */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isQuickActionsOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-4 bg-[#071420]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-2 w-64 origin-bottom-right"
            >
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pb-2 pt-1 border-b border-white/10 mb-1">Quick Actions</div>
              
              <Link href="/dashboard/intelligence/voice-capture" onClick={() => setIsQuickActionsOpen(false)} className="flex items-center gap-3 group hover:bg-white/5 p-3 rounded-2xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-opti-lime/10 flex items-center justify-center text-opti-lime group-hover:bg-opti-lime group-hover:text-[#071420] transition-colors"><Mic className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-opti-lime transition-colors">Voice Capture</div>
                  <div className="text-[10px] text-gray-400">Record a new task</div>
                </div>
              </Link>
              
              <Link href="/dashboard/intelligence/tasks" onClick={() => setIsQuickActionsOpen(false)} className="flex items-center gap-3 group hover:bg-white/5 p-3 rounded-2xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#3F2B63] flex items-center justify-center text-[#B084FF] group-hover:bg-[#B084FF] group-hover:text-white transition-colors"><CheckCircle2 className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#B084FF] transition-colors">Create Task</div>
                  <div className="text-[10px] text-gray-400">Add manual task</div>
                </div>
              </Link>
              
              <Link href="/dashboard/intelligence/meetings" onClick={() => setIsQuickActionsOpen(false)} className="flex items-center gap-3 group hover:bg-white/5 p-3 rounded-2xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#1D3B5C] flex items-center justify-center text-[#60A5FA] group-hover:bg-[#60A5FA] group-hover:text-white transition-colors"><Users className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">Meeting Note</div>
                  <div className="text-[10px] text-gray-400">Log a discussion</div>
                </div>
              </Link>
              
              <Link href="/dashboard/intelligence/daily-updates" onClick={() => setIsQuickActionsOpen(false)} className="flex items-center gap-3 group hover:bg-white/5 p-3 rounded-2xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#4E3B1C] flex items-center justify-center text-[#FBBF24] group-hover:bg-[#FBBF24] group-hover:text-white transition-colors"><FileText className="w-5 h-5" /></div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-[#FBBF24] transition-colors">Daily Summary</div>
                  <div className="text-[10px] text-gray-400">Generate DSR</div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(199,242,58,0.3)] transition-all duration-300 ${isQuickActionsOpen ? 'bg-[#0F1F2E] border border-white/20 text-white rotate-45' : 'bg-opti-lime text-[#071420] hover:scale-105'}`}
        >
          <PlusCircle className="w-8 h-8" />
        </button>
      </div>

      <div className="opti-gradient-bg relative pb-16">

        {/* Navbar */}
        <nav className="container mx-auto px-8 py-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C7F23A] rounded-md flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#071420]" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">WorkSync</span>
          </div>
          <div className="hidden lg:flex items-center gap-6 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-xl relative">
            <Link href="#home" className="text-sm font-semibold text-white hover:text-opti-lime transition-colors">Home</Link>

            <div
              className="relative py-2"
              onMouseEnter={() => setIsWorkIntelOpen(true)}
              onMouseLeave={() => setIsWorkIntelOpen(false)}
            >
              <Link href="#intelligence" onClick={() => setIsWorkIntelOpen(false)} className="flex items-center gap-1 text-sm font-semibold text-opti-muted hover:text-white transition-colors cursor-pointer">
                Work Intelligence <ChevronDown className="w-4 h-4" />
              </Link>

              <AnimatePresence>
                {isWorkIntelOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-[#0F1F2E] border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-2 z-50"
                  >
                    {[
                      { icon: Mic, title: 'Voice Capture', desc: 'Real-time speech to text conversion', href: '/dashboard/intelligence/voice-capture' },
                      { icon: FileText, title: 'Work Logs', desc: 'View, filter, and manage tasks', href: '/dashboard/intelligence/work-logs' },
                      { icon: CheckCircle2, title: 'Tasks', desc: 'Priority and status tracking', href: '/dashboard/intelligence/tasks' },
                      { icon: Users, title: 'Meetings', desc: 'Notes and action items', href: '/dashboard/intelligence/meetings' },
                      { icon: Clock, title: 'Daily Updates', desc: 'DSR and activity timeline', href: '/dashboard/intelligence/daily-updates' }
                    ].map((item, idx) => (
                      <Link key={idx} href={item.href} onClick={() => setIsWorkIntelOpen(false)} className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-[#071420] border border-white/5 flex items-center justify-center group-hover:border-[#C7F23A]/50 transition-colors shrink-0">
                          <item.icon className="w-5 h-5 text-[#C7F23A]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-[#C7F23A] transition-colors">{item.title}</div>
                          <div className="text-xs text-gray-400 mt-1 leading-snug">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="#projects" className="text-sm font-semibold text-opti-muted hover:text-white transition-colors">Projects</Link>
            <Link href="#finance" className="text-sm font-semibold text-opti-muted hover:text-white transition-colors">Revenue</Link>
            <Link href="#analytics" className="text-sm font-semibold text-opti-muted hover:text-white transition-colors">Analytics</Link>
            <Link href="#ai" className="text-sm font-semibold text-opti-muted hover:text-white transition-colors">AI Center</Link>
            <Link href="#admin" className="text-sm font-semibold text-opti-muted hover:text-white transition-colors">Admin</Link>
          </div>
          <Link href="/dashboard" className="bg-white text-opti-dark font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all flex items-center">
            Open Dashboard <span className="ml-2">→</span>
          </Link>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-8 pt-10 flex items-center justify-between">
          <div className="flex-1 pr-8">
            <h1 className="text-opti-lime text-6xl font-bold leading-tight mb-6">
              AI WorkSync Platform
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
              An enterprise-grade, AI-powered platform for seamless Work Intelligence, Revenue Tracking, Project Management, and Analytics. Capture tasks through voice, automatically log work to client projects, track pending GST invoices, and gain deep insights into your business productivity—all from a single, unified dashboard.
            </p>
            <div className="flex items-center gap-6 mb-12">
              <Link href="/dashboard" className="bg-opti-lime text-opti-dark font-semibold px-8 py-4 rounded-full hover:bg-opti-lime-hover transition-all flex items-center">
                Go To Dashboard <span className="ml-2">↗</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center items-center perspective-[1000px]">
            <div className="absolute top-10 right-20 w-72 h-72 bg-opti-lime/10 blur-3xl rounded-full"></div>

            {/* CSS Phone Mockup with Mic - SLANTED & DUMMY */}
            <div className="relative w-[300px] h-[500px] bg-[#0F1F2E] rounded-[40px] border-[8px] border-[#071420] shadow-2xl overflow-hidden z-10 flex flex-col p-5 items-center transform rotate-[15deg] skew-y-[-10deg] scale-95 hover:scale-100 transition-all duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#071420] rounded-b-xl"></div>

              <div className="mt-10 mb-4 flex flex-col items-center justify-center w-full">
                <button
                  className="relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 mb-6 bg-[#071420] text-[#C7F23A] shadow-[0_0_30px_rgba(199,242,58,0.3)] border border-[#C7F23A]/50"
                >
                  <Mic className="w-10 h-10" />
                </button>

                <div className="w-full text-center h-12 flex items-center justify-center">
                  <p className="text-sm text-white/90 font-bold leading-snug line-clamp-3">"Syncing AI dashboard proposal..."</p>
                </div>
              </div>

              {/* Intelligence Details inside Phone */}
              <div className="w-full bg-white/5 p-4 rounded-xl shadow-sm border border-white/10 mb-4">
                <div className="text-xs text-gray-400 mb-1">Intelligence Status</div>
                <div className="text-sm font-bold text-[#C7F23A] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C7F23A] animate-pulse"></div> Active
                </div>
              </div>

              <div className="w-full flex gap-3 mb-4">
                <div className="flex-1 bg-white/5 p-3 rounded-xl shadow-sm border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 mb-1">Projects</div>
                  <div className="font-bold text-white text-sm">Syncing</div>
                </div>
                <div className="flex-1 bg-white/5 p-3 rounded-xl shadow-sm border border-white/10 text-center">
                  <div className="text-[10px] text-gray-400 mb-1">AI Logs</div>
                  <div className="font-bold text-white text-sm">Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* Seamless Gradient Blending */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0F1F2E] to-transparent pointer-events-none"></div>
        </section>
      </div>

      {/* --- ANCHOR SECTIONS --- */}
      <div className="container mx-auto px-8 pb-20 space-y-24 relative z-10">

        <section id="intelligence" className="pt-10 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 mb-10"
          >
            {/* Wavy line graphic */}
            <div className="h-10 -mt-8 mb-4 overflow-hidden relative opacity-50 pointer-events-none">
              <svg viewBox="0 0 1000 100" className="absolute top-0 w-full h-full stroke-opti-lime fill-transparent stroke-[2px]">
                <path d="M0,50 Q100,0 200,50 T400,50 T600,50 T800,50 T1000,50" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#071420] border border-white/10 rounded-xl flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-opti-lime" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">AI Work Intelligence</h2>
                  <p className="text-gray-400 text-sm max-w-xl">
                    Your centralized command center to capture, track, organize, and analyze all your daily work with AI-powered insights.
                  </p>
                </div>
              </div>
              <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex items-center gap-4 min-w-[200px]">
                <div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">Productivity Score <Activity className="w-3 h-3" /></div>
                  <div className="text-opti-lime font-bold text-sm">Excellent</div>
                  <div className="text-[10px] text-gray-500 max-w-[120px]">You are more productive than 92% of users</div>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-[#071420] border-t-opti-lime flex items-center justify-center text-lg font-bold text-white bg-[#071420]">
                  {productivityScore}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col xl:flex-row gap-6 max-w-[1400px] mx-auto">
            {/* Main Content Area (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >



              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#071420] border border-white/5 flex items-center justify-center text-opti-lime"><FileText className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs text-gray-400">Today's Logs</div>
                    <div className="text-xl font-bold text-white">{todayLogsCount}</div>
                    <div className="text-[10px] text-opti-lime flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> 20% from yesterday</div>
                  </div>
                </div>
                <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#071420] border border-white/5 flex items-center justify-center text-[#B084FF]"><CheckCircle2 className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs text-gray-400">Tasks Completed</div>
                    <div className="text-xl font-bold text-white">{tasksCompleted}</div>
                    <div className="text-[10px] text-opti-lime flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> 14% from yesterday</div>
                  </div>
                </div>
                <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#071420] border border-white/5 flex items-center justify-center text-[#60A5FA]"><Users className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs text-gray-400">Meetings</div>
                    <div className="text-xl font-bold text-white">{meetingsCount}</div>
                    <div className="text-[10px] text-rose-400 flex items-center"><Activity className="w-3 h-3 mr-1" /> 1% from yesterday</div>
                  </div>
                </div>
                <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#071420] border border-white/5 flex items-center justify-center text-[#FBBF24]"><Clock className="w-5 h-5" /></div>
                  <div>
                    <div className="text-xs text-gray-400">Hours Logged</div>
                    <div className="text-xl font-bold text-white">{hoursLoggedToday}</div>
                    <div className="text-[10px] text-opti-lime flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> 18% from yesterday</div>
                  </div>
                </div>
              </div>

              {/* Module Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Voice Capture", icon: Mic, desc: "Record voice notes and automatically convert them into structured work logs.", href: "/dashboard/intelligence/voice-capture", color: "text-opti-lime" },
                  { title: "Work Logs", icon: FileText, desc: "View, search, filter, and manage AI-generated work logs.", href: "/dashboard/intelligence/work-logs", color: "text-[#B084FF]" },
                  { title: "Tasks", icon: CheckCircle2, desc: "Track pending, completed, and priority tasks.", href: "/dashboard/intelligence/tasks", color: "text-opti-lime" },
                  { title: "Meetings", icon: Users, desc: "Store meeting notes, action items, and follow-up discussions.", href: "/dashboard/intelligence/meetings", color: "text-[#60A5FA]" },
                  { title: "Daily Updates", icon: Clock, desc: "Generate daily summaries, DSR reports, and activity timelines.", href: "/dashboard/intelligence/daily-updates", color: "text-[#FBBF24]" }
                ].map((card, idx) => (
                  <div key={idx} className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#071420] border border-white/5 flex items-center justify-center">
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 min-h-[35px]">{card.desc}</p>
                    <Link href={card.href} className="inline-flex items-center gap-1 text-xs font-bold text-opti-lime hover:underline">
                      Open {card.title} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2"><Clock className="w-4 h-4 text-opti-lime" /> Recent Activity Timeline</h3>
                  <Link href="/dashboard/intelligence/work-logs" className="text-xs font-bold text-opti-lime flex items-center gap-1 hover:underline">View All Activity <ArrowRight className="w-3 h-3" /></Link>
                </div>

                <div className="space-y-4">
                  {isLoadingLogs ? (
                    <div className="text-gray-400 text-sm py-4">Loading activities...</div>
                  ) : recentLogs.length === 0 ? (
                    <div className="text-gray-400 text-sm py-4">No recent activities found.</div>
                  ) : (
                    recentLogs.map((log, idx) => (
                      <div key={log.id || idx} className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 w-24 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-opti-lime"></div>
                          <span className="text-xs font-bold text-opti-lime">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="w-40 font-bold text-white truncate shrink-0">{log.category || 'General Task'}</div>
                        <div className="hidden sm:block w-16 shrink-0"><span className="text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded">Note</span></div>
                        <div className="text-gray-400 truncate flex-1">{log.textContent}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </motion.div>

            {/* Sidebar Area (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full xl:w-[350px] flex flex-col gap-6 shrink-0"
            >

              {/* AI Insights */}
              <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-opti-lime/5 blur-2xl rounded-full"></div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2"><Star className="w-4 h-4 text-opti-lime" /> AI Insights</h2>
                  <Activity className="w-4 h-4 text-gray-500" />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-opti-lime/10 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-opti-lime" /></div>
                    <div>
                      <div className="text-[11px] text-gray-400">Most Active Project</div>
                      <div className="text-sm font-bold text-white">{mostActiveProject}</div>
                      <div className="text-[10px] text-gray-500">32% of your total time today</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-opti-lime/10 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-opti-lime" /></div>
                    <div>
                      <div className="text-[11px] text-gray-400">Hours Logged Today</div>
                      <div className="text-sm font-bold text-white">{hoursLoggedToday} Hours</div>
                      <div className="text-[10px] text-gray-500">↗ 18% more than yesterday</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-[#4E3B1C] flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-[#FBBF24]" /></div>
                    <div>
                      <div className="text-[11px] text-gray-400">Pending Follow-ups</div>
                      <div className="text-sm font-bold text-white">{pendingFollowUps}</div>
                      <div className="text-[10px] text-gray-500">Needs your attention</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-[#1C3E2F] flex items-center justify-center shrink-0"><DollarSign className="w-4 h-4 text-emerald-400" /></div>
                    <div>
                      <div className="text-[11px] text-gray-400">Revenue Opportunities</div>
                      <div className="text-sm font-bold text-white">{revenueActivities}</div>
                      <div className="text-[10px] text-gray-500">Potential value: tracking</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-[#3F2B63] flex items-center justify-center shrink-0"><Zap className="w-4 h-4 text-[#B084FF]" /></div>
                    <div>
                      <div className="text-[11px] text-gray-400">Productivity Score</div>
                      <div className="text-sm font-bold text-white">{productivityScore}</div>
                      <div className="text-[10px] text-gray-500">Excellent performance today</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2"><Zap className="w-4 h-4 text-[#B084FF]" /> AI Recommendations</h2>
                  <Activity className="w-4 h-4 text-gray-500" />
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer group">
                    Generate your weekly summary report <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-opti-lime" />
                  </div>
                  <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer group">
                    Complete {pendingFollowUps} pending tasks <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-opti-lime" />
                  </div>
                  <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer group">
                    Log meeting notes for today <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-opti-lime" />
                  </div>
                  <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer group">
                    Review {revenueActivities} revenue opportunities <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-opti-lime" />
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        <section id="projects" className="pt-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Project Management</h2>
            <p className="text-gray-400">Keep all your client deliverables on track.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Project Alpha', status: 'Active', progress: 75 },
              { title: 'Data Pipeline', status: 'Review', progress: 90 },
              { title: 'Website Redesign', status: 'Syncing', progress: 40 }
            ].map((p, i) => (
              <div key={i} className="bg-[#0F1F2E] p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">{p.title}</h4>
                  <span className="text-xs text-opti-lime">{p.status}</span>
                </div>
                <div className="w-full bg-[#071420] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C7F23A] h-full" style={{ width: `${p.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="finance" className="pt-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Revenue & GST</h2>
            <p className="text-gray-400">Automated financial tracking and invoice generation.</p>
          </div>
          <div className="bg-[#0F1F2E] p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <div className="bg-[#071420] p-6 rounded-xl">
                <div className="text-sm text-gray-400 mb-2">Total Monthly Revenue</div>
                <div className="text-4xl font-bold text-white">$124,543.00</div>
              </div>
              <div className="bg-[#071420] p-6 rounded-xl">
                <div className="text-sm text-gray-400 mb-2">GST Collected</div>
                <div className="text-3xl font-bold text-[#C7F23A]">$14,350.00</div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <h4 className="text-white font-bold mb-4">Recent Invoices</h4>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between items-center p-3 border-b border-white/5">
                    <span className="text-sm text-gray-300">INV-2026-00{i}</span>
                    <span className="text-sm text-white font-bold">$4,500</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="analytics" className="pt-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Analytics Dashboard</h2>
            <p className="text-gray-400">Deep insights into productivity.</p>
          </div>
          <div className="bg-[#0F1F2E] p-8 rounded-3xl border border-white/5 text-center py-20">
            <BarChart3 className="w-16 h-16 text-[#C7F23A] mx-auto mb-4 opacity-50" />
            <h3 className="text-xl text-white font-bold mb-2">Interactive Charts Available in Dashboard</h3>
            <p className="text-sm text-gray-400">Log in to view complete trend data and hours logged.</p>
          </div>
        </section>

        <section id="ai" className="pt-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">AI Center</h2>
            <p className="text-gray-400">Intelligent system insights.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0F1F2E] p-6 rounded-2xl border-l-4 border-[#C7F23A]">
              <h4 className="font-bold text-white mb-2">Recommendation</h4>
              <p className="text-sm text-gray-400">Automate your pending invoices to save 4 hours this week.</p>
            </div>
            <div className="bg-[#0F1F2E] p-6 rounded-2xl border-l-4 border-yellow-500">
              <h4 className="font-bold text-white mb-2">Anomaly Detected</h4>
              <p className="text-sm text-gray-400">Unusually high bug reporting on Project Alpha.</p>
            </div>
          </div>
        </section>

        <section id="admin" className="pt-20 pb-20">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Admin Hub</h2>
            <p className="text-gray-400">Full control over your SaaS environment.</p>
          </div>
          <div className="bg-[#0F1F2E] p-8 rounded-3xl border border-white/5 flex gap-4 justify-center">
            <div className="px-6 py-3 bg-[#071420] text-gray-300 rounded-lg text-sm">User Management</div>
            <div className="px-6 py-3 bg-[#071420] text-gray-300 rounded-lg text-sm">System Logs</div>
            <div className="px-6 py-3 bg-[#071420] text-gray-300 rounded-lg text-sm">API Settings</div>
          </div>
        </section>
      </div>

    </main>
  );
}
