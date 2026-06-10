"use client";
import React from 'react';
import { Target, CheckCircle, Leaf } from 'lucide-react';

const About = () => {
  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="text-center max-w-3xl mx-auto mb-2">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#000000' }}>
          About <span style={{ color: 'var(--accent-lime)' }}>Us</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ gap: '5rem', alignItems: 'flex-start', marginBottom: '6rem' }}>
        
        {/* Left Side: Header & Image */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <img 
              src="/logo.jpeg" 
              alt="Tekquora Logo" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain', 
                mixBlendMode: 'multiply',
                filter: 'brightness(1.08) contrast(1.2)',
                marginLeft: '-1rem'
              }} 
            />
            <h3 style={{ 
              fontSize: '2.2rem', 
              lineHeight: '1.2', 
              fontWeight: '800', 
              letterSpacing: '-1px', 
              margin: 0,
              background: 'linear-gradient(to right, #3b82f6, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              TekQuora
            </h3>
          </div>

          <div style={{ position: 'relative' }}>
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
            
             <div className="company-vision-box" style={{
              position: 'absolute',
              bottom: '-30px',
              left: '1.5rem',
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.15)',
              maxWidth: '260px',
              zIndex: 10
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
        </div>

        {/* Right Side: Content */}
        <div className="mt-8 lg:mt-[60px]" style={{ flex: 1 }}>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ 
        borderTop: '1px solid #e2e8f0',
        paddingTop: '3rem'
      }}>
        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            10 <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: 'var(--accent-lime)', marginLeft: '4px', display: 'inline-block' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>Integrations including Google Workspace.</p>
        </div>
        
        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            100 <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: 'var(--accent-lime)', marginLeft: '4px', display: 'inline-block' }}>%</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>Automated daily tracking and invoicing.</p>
        </div>

        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div className="transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Multi
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>Multi-language support including English & Tamil.</p>
        </div>

        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            AI <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: 'var(--accent-lime)', marginLeft: '4px', display: 'inline-block' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>Powered semantic search and tagging.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
