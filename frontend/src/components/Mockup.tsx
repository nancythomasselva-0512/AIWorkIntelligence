"use client";
import React from 'react';
import { Mic, Tag, Zap } from 'lucide-react';

const Mockup = () => {
  // CSS based phone mockup
  const phoneStyle: React.CSSProperties = {
    width: '280px',
    height: '560px',
    backgroundColor: '#ffffff',
    borderRadius: '40px',
    border: '8px solid #1e293b',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const notchStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '25px',
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    zIndex: 10
  };

  return (
    <div className="mockup-wrapper mx-auto" style={{ position: 'relative', width: '320px', height: '600px', zIndex: 5 }}>
      {/* Back Phone */}
      <div style={{
        ...phoneStyle,
        position: 'absolute',
        top: '20px',
        right: '20px',
        transform: 'rotate(15deg) scale(0.9)',
        opacity: 0.8,
        filter: 'blur(1px)'
      }}>
        <div style={notchStyle}></div>
        <div style={{ padding: '40px 20px', background: '#f8fafc', height: '100%' }}>
           <div style={{ height: '60px', background: '#e2e8f0', borderRadius: '10px', marginBottom: '15px' }}></div>
           <div style={{ height: '100px', background: '#e2e8f0', borderRadius: '10px', marginBottom: '15px' }}></div>
           <div style={{ height: '60px', background: '#e2e8f0', borderRadius: '10px', marginBottom: '15px' }}></div>
        </div>
      </div>

      {/* Front Phone Wrapper (maintains aspect ratio and scale bounds) */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '20px',
        width: '280px',
        height: '560px',
        transform: 'rotate(-5deg)',
        zIndex: 10
      }}>
        {/* Front Phone Body */}
        <div style={{
          ...phoneStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'none'
        }}>
          <div style={notchStyle}></div>
          <div style={{ padding: '40px 20px 20px', background: '#f8fafc', height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a' }}>WorkSync AI</div>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '15px', padding: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#071420', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                 <Mic color="var(--accent-lime)" size={28} />
               </div>
               <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '5px' }}>Listening...</div>
               <div style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', gap: '3px', alignItems: 'flex-end', height: '20px' }}>
                  <div style={{ width: '3px', height: '10px', backgroundColor: 'var(--accent-lime)', borderRadius: '2px', animation: 'pulse 1s infinite' }}></div>
                  <div style={{ width: '3px', height: '16px', backgroundColor: 'var(--accent-lime)', borderRadius: '2px', animation: 'pulse 1.2s infinite' }}></div>
                  <div style={{ width: '3px', height: '8px', backgroundColor: 'var(--accent-lime)', borderRadius: '2px', animation: 'pulse 0.8s infinite' }}></div>
                  <div style={{ width: '3px', height: '14px', backgroundColor: 'var(--accent-lime)', borderRadius: '2px', animation: 'pulse 1.1s infinite' }}></div>
               </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <div style={{ flex: 1, background: '#ffffff', borderRadius: '15px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                 <Tag color="#10b981" size={20} style={{ marginBottom: '5px' }} />
                 <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Auto-Tags</div>
                 <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Active</div>
              </div>
              <div style={{ flex: 1, background: '#ffffff', borderRadius: '15px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                 <Zap color="#3b82f6" size={20} style={{ marginBottom: '5px' }} />
                 <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Accuracy</div>
                 <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>99.8%</div>
              </div>
            </div>

             <div style={{ background: '#ffffff', borderRadius: '15px', padding: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', flex: 1 }}>
               <div style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>Recent Transcripts</div>
               {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-lime)' }}></div>
                    <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}></div>
                  </div>
               ))}
            </div>
          </div>
        </div>

        {/* Floating Badge */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '-20px',
          backgroundColor: 'var(--accent-lime)',
          padding: '15px 25px',
          borderRadius: '20px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
          zIndex: 20,
          transform: 'rotate(10deg)'
        }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a' }}>500+</div>
          <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>Hours Saved Weekly</div>
        </div>
      </div>

    </div>
  );
};

export default Mockup;
