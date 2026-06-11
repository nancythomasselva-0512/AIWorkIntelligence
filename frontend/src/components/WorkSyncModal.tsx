"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Check, Award, Flame, Users, BarChart3, ShieldCheck, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface WorkSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const galleryImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Analytics screen
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Dashboard mockup
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"  // Collaboration flow
];

const WorkSyncModal: React.FC<WorkSyncModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasRequested, setHasRequested] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Backdrop with blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(5, 10, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ 
              opacity: 0, 
              y: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 50,
              scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 30,
              scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 0.95
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full md:w-[90%] md:max-w-[950px] h-full md:h-[88vh] bg-[#0c151d] text-white overflow-hidden shadow-2xl relative flex flex-col"
            style={{
              borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? '24px 24px 0 0' : '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: typeof window !== 'undefined' && window.innerWidth < 768 ? '5vh' : '0',
            }}
          >
            {/* Mobile Drag/Indicator Handle */}
            <div className="block md:hidden w-12 h-1 bg-gray-600 rounded-full mx-auto mt-3 mb-1 flex-shrink-0" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                zIndex: 30,
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'; e.currentTarget.style.backgroundColor = 'var(--accent-lime)'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)'; e.currentTarget.style.color = '#fff'; }}
            >
              <X size={20} />
            </button>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              
              {/* Header Hero Banner */}
              <div className="relative h-[220px] md:h-[300px] w-full flex-shrink-0">
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80")',
                    backgroundPosition: 'center 30%',
                    backgroundSize: 'cover'
                  }}
                />
                {/* Overlay with matching visual identity */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(12,21,29,0.3) 0%, rgba(12,21,29,0.85) 60%, rgba(12,21,29,1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '1.5rem' : '2.5rem'
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-lime)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    <Sparkles size={16} /> Enterprise Work Intelligence
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                    WorkSync Engine
                  </h1>
                  <p className="text-[#a3b8cc] text-sm md:text-base max-w-2xl font-light">
                    The background engine that silently syncs activities, processes speech inputs, and structures workflow telemetry into actionable team scorecards.
                  </p>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="px-6 md:px-10 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left/Middle Column (Main Info) */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  
                  {/* Detailed Description */}
                  <div className="bg-[#121f2b] p-6 rounded-[20px] border border-white/5 shadow-inner">
                    <h3 className="text-lg font-bold text-white mb-3">Next-Generation Ambient Tracking</h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                      WorkSync Engine runs dynamically under the hood, enabling zero-overhead reporting for engineers and consultants. By integrating background activity telemetry with active speech parsing, the platform automatically categories tasks, links them to appropriate clients, and computes velocity analytics.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-opti-lime" /> Zero-touch log generation
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-opti-lime" /> Deep integrations with IDEs
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-opti-lime" /> End-to-end data encryption
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-opti-lime" /> Multi-organization isolation
                      </div>
                    </div>
                  </div>

                  {/* Key Features Cards */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-opti-lime rounded-full inline-block"></span>
                      Core Engine Modules
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Feature 1 */}
                      <div className="bg-[#121f2b]/60 hover:bg-[#121f2b] p-5 rounded-[16px] border border-white/5 transition-all">
                        <div className="w-10 h-10 rounded-full bg-opti-lime/10 border border-opti-lime/20 flex items-center justify-center text-opti-lime mb-3">
                          <Mic size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1">AI Voice Capture</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Dictate logs or meetings directly. Automatically transcribes, extracts action items, and generates descriptive summaries.
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="bg-[#121f2b]/60 hover:bg-[#121f2b] p-5 rounded-[16px] border border-white/5 transition-all">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                          <Flame size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1">Automatic Task Tracking</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Captures active desktop applications, window titles, and file systems to map your focus duration and minimize manual logging.
                        </p>
                      </div>

                      {/* Feature 3 */}
                      <div className="bg-[#121f2b]/60 hover:bg-[#121f2b] p-5 rounded-[16px] border border-white/5 transition-all">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                          <ShieldCheck size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1">Smart Activity Monitoring</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Intelligently filter personal data and map corporate activities. Focuses strictly on work patterns to guarantee user privacy.
                        </p>
                      </div>

                      {/* Feature 4 */}
                      <div className="bg-[#121f2b]/60 hover:bg-[#121f2b] p-5 rounded-[16px] border border-white/5 transition-all">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                          <BarChart3 size={18} />
                        </div>
                        <h4 className="font-bold text-sm text-white mb-1">Productivity Analytics</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          Synthesizes dashboard scores representing team flow, distraction alerts, task switching frequencies, and burnout warnings.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Demo Video Section */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-opti-lime rounded-full inline-block"></span>
                      Interactive Engine Showcase
                    </h3>
                    
                    <div className="relative rounded-[20px] overflow-hidden border border-white/10 group aspect-video bg-black shadow-xl">
                      {!isPlaying ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 p-6 text-center">
                          <button 
                            onClick={() => setIsPlaying(true)}
                            className="w-16 h-16 rounded-full bg-opti-lime hover:bg-opti-lime-hover text-[#0f172a] flex items-center justify-center shadow-lg transform transition hover:scale-110 mb-4 cursor-pointer"
                          >
                            <Play size={28} style={{ marginLeft: '4px' }} />
                          </button>
                          <h4 className="font-bold text-base text-white">Watch WorkSync in Action</h4>
                          <p className="text-gray-400 text-xs max-w-sm mt-1">Discover how the voice recording module auto-categorizes worklogs in real time.</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
                          {/* Simulated Playback View */}
                          <div className="absolute top-4 left-4 text-xs font-bold bg-opti-lime text-slate-900 px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                            <Sparkles size={12} /> ENGINE ACTIVE: TRANSCRIBING...
                          </div>
                          
                          {/* Audio Wave Visualizer Simulation */}
                          <div className="flex items-end gap-1.5 h-[60px] mb-6">
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((idx) => (
                              <div 
                                key={idx} 
                                className="w-1 bg-opti-lime rounded-full"
                                style={{ 
                                  height: `${15 + Math.random() * 45}px`,
                                  animation: `pulse ${0.6 + Math.random() * 0.8}s infinite alternate`
                                }}
                              />
                            ))}
                          </div>
                          
                          <div className="text-center">
                            <p className="text-opti-lime text-lg font-mono mb-1">"...refactored the SQLite entity mappings..."</p>
                            <p className="text-gray-400 text-xs">Simulated Audio Dictation Input</p>
                          </div>

                          <button 
                            onClick={() => setIsPlaying(false)}
                            className="mt-8 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full text-xs flex items-center gap-2 transition cursor-pointer"
                          >
                            <Pause size={14} /> Stop Demo
                          </button>
                        </div>
                      )}
                      
                      <img 
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Demo Video Placeholder" 
                        className="w-full h-full object-cover filter brightness-50"
                      />
                    </div>
                  </div>

                  {/* Screenshots Gallery/Carousel */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-opti-lime rounded-full inline-block"></span>
                      Product Gallery
                    </h3>

                    <div className="relative rounded-[20px] overflow-hidden aspect-[16/9] border border-white/5 shadow-2xl bg-slate-900 group">
                      
                      {/* Slides */}
                      <div className="w-full h-full relative">
                        {galleryImages.map((src, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentSlide === index ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              display: currentSlide === index ? 'block' : 'none'
                            }}
                          >
                            <img src={src} alt={`Product Screen ${index + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                              <p className="text-xs text-opti-lime font-bold">Screenshot {index + 1} of 3</p>
                              <p className="text-sm text-white font-medium">
                                {index === 0 && "WorkSync Analytics dashboard view showing activity charts."}
                                {index === 1 && "Interactive admin portal containing detailed client structures."}
                                {index === 2 && "Integration timeline view showcasing real-time synchronization."}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      <button 
                        onClick={handlePrevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-opti-lime hover:text-black text-white border border-white/10 transition z-20 cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={handleNextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-opti-lime hover:text-black text-white border border-white/10 transition z-20 cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>

                      {/* Indicators */}
                      <div className="absolute top-4 right-4 bg-black/50 border border-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold z-20 flex gap-2">
                        {galleryImages.map((_, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${currentSlide === idx ? 'bg-opti-lime scale-125' : 'bg-gray-500'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column (Sidebar Statistics & CTA) */}
                <div className="flex flex-col gap-6">
                  
                  {/* CTA Card (Sticky style) */}
                  <div className="bg-[#121f2b] p-6 rounded-[24px] border border-white/10 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-opti-lime to-purple-600" />
                    
                    <h4 className="text-lg font-bold text-white mb-2">Request A Private Sandbox</h4>
                    <p className="text-[#a3b8cc] text-xs leading-relaxed mb-6">
                      Deploy the WorkSync Engine container straight to your organization's cloud infrastructure in minutes.
                    </p>

                    {hasRequested ? (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-opti-lime/10 border border-opti-lime/20 p-4 rounded-xl text-center w-full"
                      >
                        <Award className="text-opti-lime mx-auto mb-2" size={32} />
                        <h5 className="font-bold text-sm text-white">Demo Requested!</h5>
                        <p className="text-[#a3b8cc] text-2xs mt-1">Our system integration engineers will contact you at admin@gmail.com shortly.</p>
                      </motion.div>
                    ) : (
                      <button 
                        onClick={() => setHasRequested(true)}
                        className="btn btn-lime w-full py-3 text-sm font-bold tracking-wider rounded-xl cursor-pointer"
                        style={{
                          boxShadow: '0 10px 15px -3px rgba(197, 240, 21, 0.3)',
                          border: 'none'
                        }}
                      >
                        REQUEST LIVE DEMO
                      </button>
                    )}

                    <div className="flex items-center gap-2 mt-4 text-[#a3b8cc] text-2xs justify-center">
                      <Users size={12} className="text-opti-lime" /> Joining 1,200+ active enterprise admins
                    </div>
                  </div>

                  {/* Engine Statistics Card */}
                  <div className="bg-[#0f1b25] p-6 rounded-[24px] border border-white/5 shadow-md">
                    <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-center">Engine Performance</h4>
                    
                    <div className="flex flex-col gap-5">
                      
                      {/* Stat 1 */}
                      <div className="border-b border-white/5 pb-4 text-center">
                        <div className="text-3xl font-extrabold text-opti-lime mb-1">500+ Hours</div>
                        <div className="text-[#a3b8cc] text-xs">Saved Weekly across pilot teams</div>
                      </div>

                      {/* Stat 2 */}
                      <div className="border-b border-white/5 pb-4 text-center">
                        <div className="text-3xl font-extrabold text-blue-400 mb-1">92.4%</div>
                        <div className="text-[#a3b8cc] text-xs">Reduction in consultant admin tasks</div>
                      </div>

                      {/* Stat 3 */}
                      <div className="text-center">
                        <div className="text-3xl font-extrabold text-purple-400 mb-1">Real-Time</div>
                        <div className="text-[#a3b8cc] text-xs">Activity logs mapping automation</div>
                      </div>

                    </div>
                  </div>

                  {/* Privacy Guard Card */}
                  <div className="bg-[#121f2b]/50 p-5 rounded-[20px] border border-white/5">
                    <h5 className="font-bold text-xs text-white mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-opti-lime" /> Zero-Logs Privacy Guarantee
                    </h5>
                    <p className="text-[#a3b8cc] text-3xs leading-relaxed">
                      We never store keystrokes, personal passwords, browser tabs, or credit card fields. System filters run entirely inside your client browser and local SQLite instance before uploads.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WorkSyncModal;
