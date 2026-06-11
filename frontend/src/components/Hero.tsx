"use client";
import React, { useState } from 'react';
import { Play, Star, Plus, X } from 'lucide-react';
import Mockup from './Mockup';
import Link from 'next/link';

const Hero = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <section className="container hero-section flex flex-col lg:flex-row items-center justify-between pt-16 pb-4 lg:pb-24 min-h-0 lg:min-h-[80vh] gap-12">
      {/* Phone Mockup Column (Desktop ONLY) */}
      <div className="hidden lg:flex order-2 flex-none justify-center relative animate-fade-in delay-200 w-[40%]">
         {/* Background Decorator */}
         <div style={{
           position: 'absolute',
           top: '10%',
           left: '50%',
           transform: 'translateX(-50%)',
           width: '260px',
           height: '260px',
           background: 'radial-gradient(circle, rgba(196,240,63,0.15) 0%, rgba(0,0,0,0) 70%)',
           zIndex: 0
         }}></div>
         
         <div className="h-[500px] lg:h-[500px]" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Mockup />
            </div>
          </div>
      </div>

      {/* Left Content Column (Order 2 on mobile, Order 1 on desktop) */}
      <div className="order-2 lg:order-1 flex-1 lg:flex-none flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in w-full lg:w-[60%]">
        <div className="text-opti-lime font-medium mb-4 flex items-center justify-center lg:justify-start gap-2">
          <span className="w-5 h-0.5 bg-opti-lime"></span>
          Dynamic Work Intelligence
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white mb-6">
          AI-Powered Personal Operating System
        </h1>
        
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-[500px] mx-auto lg:mx-0" style={{ textIndent: '2rem' }}>
          Automatically capture, organize, analyze, track, and monetize daily work activities across multiple organizations and projects.
        </p>
        
        {/* Mobile Row for CTA/Team and Mockup */}
        <div className="flex flex-row w-full justify-between items-start mt-4 lg:mt-0">
           {/* Left side: CTA, Team */}
           <div className="w-[55%] lg:w-full flex flex-col items-start text-left">
              <div className="flex justify-start mb-6">
                <Link href="/login" className="btn btn-lime whitespace-nowrap px-3 py-1.5 text-[0.75rem] lg:px-[1.4rem] lg:py-[0.7rem] lg:text-[0.92rem]">
                  Let's Get Started <span style={{ marginLeft: '0.5rem' }}>↗</span>
                </Link>
              </div>

              {/* Rating and Team */}
              <div className="flex flex-col items-start gap-3 mb-10 lg:mb-0">
                <div style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Join Our Team Now:</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#64748b', border: '2px solid var(--bg-dark)', zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    <img src="/team1.jpg" alt="avatar 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#94a3b8', border: '2px solid var(--bg-dark)', marginLeft: '-15px', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                     <img src="/team2.jpg" alt="avatar 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#cbd5e1', border: '2px solid var(--bg-dark)', marginLeft: '-15px', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                     <img src="/team3.jpg" alt="avatar 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <button 
                    onClick={() => setShowJoinModal(true)}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'transparent', border: '1px dashed var(--text-gray)', marginLeft: '-15px', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-gray)', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-lime)'; e.currentTarget.style.color = 'var(--accent-lime)'; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.zIndex = '4'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--text-gray)'; e.currentTarget.style.color = 'var(--text-gray)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = '0'; }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
           </div>
           
           {/* Right side: Mockup on Mobile */}
           <div className="flex lg:hidden justify-end w-[45%] h-[150px] sm:h-[220px] md:h-[280px] overflow-visible relative">
              <div className="absolute -top-6 sm:-top-8 -right-8 scale-[0.55] sm:scale-[0.65] md:scale-[0.75] origin-top-right">
                 <Mockup />
              </div>
           </div>
        </div>
      </div>

      {/* Join Team Modal */}
      {showJoinModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '2.5rem', borderRadius: '1.5rem', width: '100%', maxWidth: '450px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} className="animate-fade-in">
            <button 
              onClick={() => setShowJoinModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-gray)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-white)', marginBottom: '0.5rem' }}>Join Our Team</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', fontSize: '0.9rem' }}>Fill out the details below to apply for a role.</p>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const email = formData.get('email');
              const role = formData.get('role');
              
              const subject = encodeURIComponent(`New Team Application: ${name}`);
              const body = encodeURIComponent(`Hello,\n\nI would like to apply to join the WorkSync team.\n\nApplication Details:\n- Name: ${name}\n- Email: ${email}\n- Desired Role: ${role}\n\nBest regards,\n${name}`);
              
              window.location.href = `mailto:nancythomasselva@gmail.com?subject=${subject}&body=${body}`;
              setShowJoinModal(false); 
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Full Name</label>
                <input name="name" type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-dark)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-white)' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Email Address</label>
                <input name="email" type="email" required placeholder="john@example.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-dark)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-white)' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Desired Role</label>
                <select name="role" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--bg-dark)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-white)', appearance: 'none' }}>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', marginTop: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--accent-lime)', color: 'var(--bg-dark)', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', fontSize: '1rem' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                Send Application
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
