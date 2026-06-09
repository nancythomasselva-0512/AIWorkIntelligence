"use client";
import React from 'react';
import { Target, CheckCircle, Leaf } from 'lucide-react';

const About = () => {
  return (
    <section className="section-padding container">
      <div style={{ display: 'flex', gap: '5rem', alignItems: 'flex-start', marginBottom: '6rem', flexDirection: 'row' }}>
        
        {/* Left Side: Header & Image */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '0.4rem 1.2rem', 
              backgroundColor: 'rgba(196,240,63,0.2)', 
              color: '#4d7c0f', 
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>
              About Us
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '-1.5rem', marginBottom: '-1rem' }}>
            <img 
              src="/logo.jpeg" 
              alt="Tekquora Logo" 
              style={{ 
                width: '120px', 
                height: '120px', 
                objectFit: 'contain', 
                mixBlendMode: 'multiply',
                filter: 'brightness(1.08) contrast(1.2)',
                marginLeft: '-1rem'
              }} 
            />
            <h2 style={{ 
              fontSize: '3.2rem', 
              lineHeight: '1.2', 
              fontWeight: '800', 
              letterSpacing: '-1px', 
              margin: 0,
              marginLeft: '-1.5rem',
              background: 'linear-gradient(to right, #3b82f6, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              TekQuora
            </h2>
          </div>

          <div style={{ 
            borderRadius: '24px', 
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '8px solid #ffffff'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team meeting" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
              className="transition-transform duration-500 hover:scale-105 cursor-pointer"
            />
          </div>
          
           <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.15)',
            maxWidth: '260px'
          }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
               <Target color="var(--accent-lime)" size={24} />
               <h4 style={{ fontWeight: '800', color: '#0f172a' }}>Company Vision</h4>
             </div>
             <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
               Inventing the Intelligent Future by bridging the gap between cutting-edge technology and business success.
             </p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div style={{ flex: 1, marginTop: '120px' }}>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
             <div>
               <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                 Tekquora is a technology-driven innovation company operating from MRF Innovation Park, Chennai. We specialize in software development, AI-powered solutions, IT administration, research support, and digital transformation services.
               </p>

               <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-lime)' }}>
                  <p style={{ color: '#0f172a', fontSize: '1.05rem', lineHeight: '1.8', fontWeight: '600', margin: 0 }}>
                    Our mission is to empower businesses with innovative, AI-driven solutions that anticipate future opportunities rather than just addressing current challenges.
                  </p>
               </div>
             </div>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--bg-dark)', 
            color: 'var(--text-white)',
            padding: '1.5rem',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CheckCircle color="var(--accent-lime)" size={24} />
              <span style={{ fontSize: '0.9rem', maxWidth: '280px', lineHeight: '1.4' }}>
                Join us to achieve zero-touch administration and scale your digital transformation.
              </span>
            </div>
            <a href="https://www.tekquora.com/" target="_blank" rel="noopener noreferrer" className="btn btn-lime" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Learn More →
            </a>
          </div>
        </div>

      </div>

      {/* Stats Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '3rem'
      }}>
        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            10 <span style={{ color: 'var(--accent-lime)', marginLeft: '4px' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>Integrations including Google Workspace.</p>
        </div>
        
        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            100 <span style={{ color: 'var(--accent-lime)', marginLeft: '4px' }}>%</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>Automated daily tracking and invoicing.</p>
        </div>

        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            Multi
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>Multi-language support including English & Tamil.</p>
        </div>

        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            AI <span style={{ color: 'var(--accent-lime)', marginLeft: '4px' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>Powered semantic search and tagging.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
