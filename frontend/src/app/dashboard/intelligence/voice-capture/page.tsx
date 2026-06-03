"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, StopCircle, Loader2, CheckCircle2, Clock, 
  FileText, Activity, Lightbulb, X, Maximize2, 
  Sparkles, Play, MoreVertical, ChevronDown, Save, Pause, Trash2, Globe, ArrowRight, Edit2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function VoiceCapturePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  
  // Edit and Delete States
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [logToEdit, setLogToEdit] = useState<any>(null);
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTips, setShowTips] = useState(true);
  const [language, setLanguage] = useState('ta-IN');
  
  const [detectedCategory, setDetectedCategory] = useState<string>('General');
  const [detectedTags, setDetectedTags] = useState<string[]>([]);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);

  const transcriptRef = useRef(transcript);
  const categoryRef = useRef(detectedCategory);
  const tagsRef = useRef(detectedTags);
  
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  useEffect(() => {
    categoryRef.current = detectedCategory;
    tagsRef.current = detectedTags;
  }, [detectedCategory, detectedTags]);

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    // Basic Rule-based AI Categorization
    const t = transcript.toLowerCase();
    let cat = "General";
    let tags: string[] = [];
    let score = 45;

    if (t.includes("app") || t.includes("application") || t.includes("mobile") || t.includes("ios") || t.includes("android")) {
        cat = "Mobile Application Development";
        score = 92;
        if (t.includes("ios") || t.includes("apple")) tags.push("iOS");
        if (t.includes("android")) tags.push("Android");
        if (t.includes("ui") || t.includes("screen") || t.includes("design")) tags.push("UI/UX");
        if (t.includes("recognition") || t.includes("voice")) tags.push("Feature");
    } else if (t.includes("api") || t.includes("code") || t.includes("server") || t.includes("database") || t.includes("bug") || t.includes("dns") || t.includes("infrastructure") || t.includes("deploy") || t.includes("fix")) {
        cat = "Technical Work";
        score = 94;
        if (t.includes("api")) tags.push("API Integration");
        if (t.includes("database") || t.includes("sql")) tags.push("Database");
        if (t.includes("server") || t.includes("dns")) tags.push("DNS");
        if (t.includes("infrastructure") || t.includes("deploy")) tags.push("DevOps");
    } else if (t.includes("meet") || t.includes("call") || t.includes("discuss") || t.includes("client")) {
        cat = "Meeting";
        score = 88;
        if (t.includes("client")) tags.push("Client Sync");
        if (t.includes("sync")) tags.push("Daily Sync");
    } else if (t.includes("update") || t.includes("status") || t.includes("progress")) {
        cat = "Project Update";
        score = 75;
    }

    if (t.length < 5) {
      cat = "Waiting...";
      tags = [];
      score = 0;
    }

    setDetectedCategory(cat);
    setDetectedTags(tags);
    setConfidenceScore(score);
  }, [transcript]);

  const fetchRecentLogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/worklogs?limit=4`);
      setRecentLogs(res.data.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch recent logs", err);
    }
  };

  const autoSaveLog = async (finalTranscript: string) => {
    if (!finalTranscript.trim()) return;
    setIsSaving(true);
    try {
      let textToSave = finalTranscript;
      
      if (language === 'ta-IN') {
        setToastMessage('Translating to English...');
        try {
          const res = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(finalTranscript)}&langpair=ta|en`);
          if (res.data && res.data.responseData && res.data.responseData.translatedText) {
            textToSave = res.data.responseData.translatedText;
          }
        } catch (translateError) {
          console.error('Translation failed', translateError);
        }
      }

      const categoryToSave = categoryRef.current !== 'Waiting...' ? categoryRef.current : 'General';

      await axios.post(`${API_BASE_URL}/worklogs`, {
        textContent: textToSave,
        category: categoryToSave,
        tags: tagsRef.current.join(","),
        organizationId: null,
        projectId: null,
      });
      
      setToastMessage('Work log saved automatically!');
      setTimeout(() => setToastMessage(''), 3000);
      setTranscript('');
      setRecordingTime(0);
      fetchRecentLogs();
    } catch (error) {
      console.error('Failed to auto-save worklog', error);
      setToastMessage('Error saving work log.');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLog = async () => {
    if (!logToDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/worklogs/${logToDelete}`);
      setToastMessage('Log deleted successfully!');
      setTimeout(() => setToastMessage(''), 3000);
      setLogToDelete(null);
      fetchRecentLogs();
    } catch (err) {
      console.error('Failed to delete', err);
      setToastMessage('Error deleting log.');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditLog = async () => {
    if (!logToEdit) return;
    setIsEditing(true);
    try {
      await axios.put(`${API_BASE_URL}/worklogs/${logToEdit.id}`, {
        textContent: editContent
      });
      setToastMessage('Log updated successfully!');
      setTimeout(() => setToastMessage(''), 3000);
      setLogToEdit(null);
      fetchRecentLogs();
    } catch (err) {
      console.error('Failed to update', err);
      setToastMessage('Error updating log.');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsEditing(false);
    }
  };

  const manualSaveLog = async () => {
    if (!transcript.trim()) return;
    autoSaveLog(transcript);
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
    setRecordingTime(0);
    setIsRecording(true);

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
      setIsRecording(false);
      // Auto-save logic
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

  const clearRecording = () => {
    if (recognition && isRecording) {
      try { recognition.stop(); } catch (e) { }
    }
    setIsRecording(false);
    setTranscript('');
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate a random audio visualizer
  const visualizerBars = Array.from({ length: 40 }).map((_, i) => {
    const height = isRecording ? Math.random() * 100 : 10;
    return <div key={i} className={`w-1 bg-opti-lime/80 rounded-full transition-all duration-75`} style={{ height: `${height}%` }}></div>
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 text-white">
      
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

      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1C3E2F] rounded-2xl flex items-center justify-center text-opti-lime border border-opti-lime/20">
              <Mic className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Voice Capture</h1>
              <p className="text-gray-400 text-sm mt-1">Record your work activities using voice and automatically<br/>convert them into structured work logs.</p>
            </div>
          </div>
        </div>
        
        {showTips && (
          <div className="bg-[#0F1F2E] border border-white/5 p-4 rounded-2xl flex items-start gap-4 max-w-sm relative">
            <div className="w-8 h-8 rounded-full bg-opti-lime/10 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-opti-lime" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Tips</div>
              <div className="text-xs text-gray-400 mt-1 leading-relaxed">Speak clearly and include key details like project, task, and outcome.</div>
            </div>
            <button onClick={() => setShowTips(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Panel 1: Record Your Voice */}
        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-lg font-bold">Record Your Voice</h2>
            {isRecording && (
              <div className="flex items-center gap-2 text-xs font-bold text-opti-lime">
                <div className="w-3 h-10 flex items-center gap-1">
                  <div className="w-1 h-3 bg-opti-lime animate-pulse rounded-full"></div>
                  <div className="w-1 h-2 bg-opti-lime animate-pulse rounded-full" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-4 bg-opti-lime animate-pulse rounded-full" style={{ animationDelay: '0.4s' }}></div>
                </div>
                Listening...
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <button 
              onClick={toggleRecording}
              className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-[#071420] text-opti-lime shadow-[0_0_50px_rgba(199,242,58,0.2)]' : 'bg-[#071420] text-gray-400 hover:text-opti-lime hover:shadow-[0_0_30px_rgba(199,242,58,0.1)]'}`}
            >
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-2 border-opti-lime opacity-50 animate-ping"></div>
              )}
              <div className={`absolute inset-2 rounded-full border border-opti-lime/20 ${isRecording ? 'opacity-100' : 'opacity-0'}`}></div>
              <Mic className="w-16 h-16 relative z-10" />
            </button>
            
            <div className="text-center mt-6">
              <div className="text-3xl font-mono font-bold">{formatTime(recordingTime)}</div>
              <div className="text-sm text-gray-400 mt-1">{isRecording ? 'Recording in progress' : 'Ready to record'}</div>
            </div>
            
            <div className="w-full h-16 mt-8 flex items-end justify-center gap-1 px-8">
              {visualizerBars}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-8">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-colors">
              <Pause className="w-4 h-4 text-yellow-400" /> Pause
            </button>
            <button onClick={toggleRecording} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-bold transition-colors">
              <StopCircle className="w-4 h-4 shrink-0" /> Stop
            </button>
            <button onClick={clearRecording} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-colors">
              <Trash2 className="w-4 h-4 text-gray-400" /> Clear
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Your recording is secure and private. It will be processed using AI.
          </div>
        </div>

        {/* Panel 2: Live Transcription */}
        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-3">
              Live Transcription 
              {isRecording && <span className="text-[10px] uppercase tracking-wider bg-[#1C3E2F] text-opti-lime px-2 py-0.5 rounded font-bold">Live</span>}
            </h2>
            <div className="flex items-center gap-2 bg-[#071420] border border-white/10 rounded-lg px-3 py-1.5 shadow-sm">
              <Globe className="w-4 h-4 text-opti-lime" /> 
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isRecording}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="en-US" className="bg-[#0F1F2E]">English (US)</option>
                <option value="ta-IN" className="bg-[#0F1F2E]">Tamil (தமிழ்)</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 bg-[#071420] border border-white/5 rounded-2xl p-5 relative overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto text-gray-300 leading-relaxed font-inter custom-scrollbar">
              {transcript || <span className="text-gray-600 italic">Start speaking to see transcription...</span>}
              {isRecording && <span className="w-2 h-4 ml-1 inline-block bg-opti-lime animate-pulse align-middle"></span>}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
              <div>{transcript.length} / 5000 characters</div>
            </div>
          </div>
        </div>

        {/* Panel 3 (Now Recent Captures) */}
        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Recent Voice Captures</h2>
            <Link href="/dashboard/intelligence/work-logs" className="text-xs font-bold text-opti-lime flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex-1 space-y-4">
            {recentLogs.length === 0 ? (
               <div className="text-sm text-gray-500 py-4">No recent logs found.</div>
            ) : (
              recentLogs.map((log, idx) => (
                <div key={log.id || idx} className="flex items-center gap-4 bg-[#071420] border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors group cursor-pointer">
                  <button className="w-8 h-8 rounded-full bg-[#1C3E2F] flex items-center justify-center shrink-0 border border-opti-lime/20 text-opti-lime group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{log.textContent?.substring(0, 40) || 'Voice Capture'}...</div>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                      <span>{new Date(log.createdAt).toLocaleDateString()} • {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {log.category && (
                        <span className="bg-white/10 px-1.5 py-0.5 rounded text-white">{log.category}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-mono font-semibold text-gray-400">01:24</div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setLogToEdit(log); setEditContent(log.textContent || ''); }}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setLogToDelete(log.id)}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500">
            Total {recentLogs.length} recordings
          </div>
        </div>

        {/* Panel 4: Save as Work Log */}
        <div className="xl:col-span-2 bg-[#0F1F2E] border border-white/5 rounded-3xl p-6">
          <h2 className="text-lg font-bold mb-6">Save as Work Log</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Project <span className="text-red-500">*</span></label>
              <button className="w-full flex items-center justify-between bg-[#071420] border border-white/5 rounded-xl px-4 py-3 hover:border-white/20 transition-all text-left">
                <span className="text-sm text-white">MCC Infrastructure</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Organization</label>
              <button className="w-full flex items-center justify-between bg-[#071420] border border-white/5 rounded-xl px-4 py-3 hover:border-white/20 transition-all text-left">
                <span className="text-sm text-white">MCC</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Work Type</label>
              <button className="w-full flex items-center justify-between bg-[#071420] border border-white/5 rounded-xl px-4 py-3 hover:border-white/20 transition-all text-left">
                <span className="text-sm text-white">{detectedCategory !== 'Waiting...' ? detectedCategory : 'Technical Work'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Priority</label>
              <button className="w-full flex items-center justify-between bg-[#071420] border border-white/5 rounded-xl px-4 py-3 hover:border-white/20 transition-all text-left">
                <span className="text-sm text-white flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Medium</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 relative">
              <label className="block text-xs font-semibold text-gray-400 mb-2">Notes (Optional)</label>
              <textarea 
                className="w-full h-24 bg-[#071420] border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-opti-lime transition-colors resize-none placeholder:text-gray-600 custom-scrollbar"
                placeholder="Add any additional notes..."
              ></textarea>
              <div className="absolute bottom-4 right-4 text-xs text-gray-600">0 / 1000</div>
            </div>
            
            <div className="flex flex-col gap-3 justify-end md:w-56">
              <button 
                onClick={manualSaveLog}
                disabled={!transcript.trim() || isSaving}
                className="w-full flex items-center justify-center gap-2 bg-opti-lime text-opti-dark font-bold py-4 rounded-xl hover:bg-opti-lime-hover transition-colors shadow-[0_0_15px_rgba(199,242,58,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                Save Work Log
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white font-bold py-3.5 rounded-xl hover:bg-white/5 transition-colors">
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
            </div>
          </div>
        </div>

        {/* Panel 5 (Now AI Categorization) */}
        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">AI Categorization</h2>
            <Sparkles className="w-4 h-4 text-opti-lime" />
          </div>
          
          <div className="space-y-6 flex-1">
            <div>
              <div className="text-xs font-semibold text-white mb-3">Detected Category</div>
              <div className="flex flex-wrap gap-2">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${detectedCategory !== 'Waiting...' ? 'bg-[#1C3E2F] text-opti-lime border-opti-lime/20' : 'bg-gray-800 text-gray-400 border-white/5'}`}>
                  <CheckCircle2 className="w-3 h-3" /> {detectedCategory}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-xs font-semibold text-white mb-3">Detected Project</div>
              <button className="w-full flex items-center justify-between bg-[#071420] border border-white/5 rounded-xl p-3 hover:border-white/20 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-opti-lime/20 flex items-center justify-center text-opti-lime">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">MCC Infrastructure</div>
                    <div className="text-[10px] text-gray-500">Infrastructure & DevOps</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div>
              <div className="text-xs font-semibold text-white mb-3">Suggested Tags</div>
              <div className="flex flex-wrap gap-2">
                {detectedTags.length > 0 ? (
                  detectedTags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded bg-[#071420] border border-white/5 text-opti-lime text-xs font-bold">{tag}</span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 italic">Listening for context...</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-white font-semibold">Confidence Score</span>
              <span className="text-opti-lime font-bold">{confidenceScore}%</span>
            </div>
            <div className="w-full bg-[#071420] h-1.5 rounded-full overflow-hidden">
              <div className="bg-opti-lime h-full shadow-[0_0_10px_rgba(199,242,58,0.5)] transition-all duration-500" style={{ width: `${confidenceScore}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex items-center justify-center gap-2 text-sm text-gray-400">
        <Sparkles className="w-4 h-4 text-opti-lime" /> AI will process your voice and convert it into structured work logs automatically.
      </div>

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
                <h3 className="text-xl font-bold text-white">Edit Voice Capture</h3>
                <button onClick={() => setLogToEdit(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-400 mb-2">Content</label>
                <textarea 
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-32 bg-[#071420] border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-opti-lime transition-colors resize-none placeholder:text-gray-600 custom-scrollbar"
                ></textarea>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setLogToEdit(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button onClick={handleEditLog} disabled={isEditing || !editContent.trim()} className="px-5 py-2.5 bg-opti-lime text-[#071420] rounded-xl text-sm font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2">
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
              <h3 className="text-xl font-bold text-white mb-2">Delete Capture?</h3>
              <p className="text-sm text-gray-400 mb-8">This action cannot be undone. Are you sure you want to permanently delete this voice capture?</p>
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
