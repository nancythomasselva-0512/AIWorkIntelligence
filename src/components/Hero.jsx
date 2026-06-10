import React from 'react';
import { Play, Star, Plus } from 'lucide-react';
import Mockup from './Mockup';

const Hero = () => {
  return (
    <section className="container flex flex-col lg:flex-row items-center justify-between pt-16 pb-12 lg:pb-24 min-h-0 lg:min-h-[85vh] gap-12">
      {/* Phone Mockup Column (Desktop ONLY) */}
      <div className="hidden lg:flex order-2 animate-fade-in delay-200 w-[40%] flex-none" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
         
         <div className="h-[500px] lg:h-[360px] lg:overflow-hidden" style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
           <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center', width: '100%', display: 'flex', justifyContent: 'center' }}>
             <Mockup />
           </div>
         </div>
      </div>

      {/* Left Content Column (Order 2 on mobile, Order 1 on desktop) */}
      <div className="order-2 lg:order-1 animate-fade-in flex flex-col items-center lg:items-start text-center lg:text-left w-full flex-1 lg:flex-none lg:w-[60%]" style={{}}>
        <div className="flex justify-center lg:justify-start" style={{ color: 'var(--accent-lime)', fontWeight: '500', marginBottom: '1rem', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--accent-lime)' }}></span>
          Welcome To Optibiz
        </div>
        
        <h1 className="hero-title" style={{ 
          lineHeight: '1.1', 
          color: 'var(--text-white)', 
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          Where The Expertise Creates Excellence
        </h1>
        
        <p className="mx-auto lg:mx-0" style={{ 
          color: 'var(--text-gray)', 
          fontSize: '1.1rem', 
          lineHeight: '1.6', 
          marginBottom: '2rem',
          maxWidth: '500px'
        }}>
          Transform your business with our AI-powered dynamic work intelligence platform. Automatically capture, organize, and analyze daily activities.
        </p>
        
        {/* Mobile Row for CTA/Team and Mockup */}
        <div className="flex flex-row w-full justify-between items-start mt-4 lg:mt-0">
           {/* Left side: CTA, Team */}
           <div className="w-[55%] lg:w-full flex flex-col items-start text-left">
              <div className="flex justify-start mb-6 w-full">
                <a href="http://localhost:3000/login" className="btn btn-lime whitespace-nowrap px-3 py-1.5 text-[0.75rem] lg:px-[1.4rem] lg:py-[0.7rem] lg:text-[0.92rem]" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  Let's Get Started <span style={{ marginLeft: '0.5rem' }}>↗</span>
                </a>
              </div>

              {/* Rating and Team */}
              <div className="flex flex-col items-start gap-3 mb-6 lg:mb-0">
                <div style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Join Our Team Now:</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#64748b', border: '2px solid var(--bg-dark)', zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    <img src="https://i.pravatar.cc/100?img=1" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#94a3b8', border: '2px solid var(--bg-dark)', marginLeft: '-15px', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                     <img src="https://i.pravatar.cc/100?img=2" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#cbd5e1', border: '2px solid var(--bg-dark)', marginLeft: '-15px', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                     <img src="https://i.pravatar.cc/100?img=3" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'transparent', border: '1px dashed var(--text-gray)', marginLeft: '-15px', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-gray)' }}>
                    <Plus size={16} />
                  </div>
                </div>
              </div>
           </div>

           {/* Right side: Mockup on Mobile */}
           <div className="flex lg:hidden justify-end w-[45%] h-[300px] sm:h-[370px] md:h-[420px] overflow-visible relative">
              <div className="absolute -top-6 sm:-top-8 -right-8 scale-[0.55] sm:scale-[0.65] md:scale-[0.75] origin-top-right">
                 <Mockup />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
