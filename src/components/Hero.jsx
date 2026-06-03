import React from 'react';
import { Play, Star, Plus } from 'lucide-react';
import Mockup from './Mockup';

const Hero = () => {
  return (
    <section className="container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '4rem',
      paddingBottom: '6rem',
      minHeight: '80vh'
    }}>
      {/* Left Content */}
      <div style={{ flex: 1, paddingRight: '2rem' }} className="animate-fade-in">
        <div style={{ color: 'var(--accent-lime)', fontWeight: '500', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '20px', height: '2px', backgroundColor: 'var(--accent-lime)' }}></span>
          Welcome To Optibiz
        </div>
        
        <h1 style={{ 
          fontSize: '4.5rem', 
          lineHeight: '1.1', 
          color: 'var(--text-white)', 
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          Where The Expertise Creates Excellence
        </h1>
        
        <p style={{ 
          color: 'var(--text-gray)', 
          fontSize: '1.1rem', 
          lineHeight: '1.6', 
          marginBottom: '2.5rem',
          maxWidth: '500px'
        }}>
          Transform your business with our AI-powered dynamic work intelligence platform. Automatically capture, organize, and analyze daily activities.
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
          <button className="btn btn-lime">
            Let's Get Started <span style={{ marginLeft: '0.5rem' }}>↗</span>
          </button>
          
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-white)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <Play fill="currentColor" size={20} style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Rating and Team */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.2rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>(4.5/5)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-white)' }}>4.5</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)', maxWidth: '100px', lineHeight: '1.2' }}>
                Positive Reviews From Our Customer
              </span>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Join Our Team Now:</div>
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

      </div>

      {/* Right Content - Phones Mockup */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }} className="animate-fade-in delay-200">
         {/* Background Decorator */}
         <div style={{
           position: 'absolute',
           top: '10%',
           right: '20%',
           width: '300px',
           height: '300px',
           background: 'radial-gradient(circle, rgba(196,240,63,0.15) 0%, rgba(0,0,0,0) 70%)',
           zIndex: 0
         }}></div>
         <Mockup />
      </div>
    </section>
  );
};

export default Hero;
