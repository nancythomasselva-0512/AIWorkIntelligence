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

      <div className="flex flex-col lg:flex-row" style={{ gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
        
        {/* Left Side: Images */}
        <div style={{ flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              borderRadius: '20px', 
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
            
            {/* Mission/Vision Box overlaying the image */}
            <div className="company-vision-box" style={{
              position: 'absolute',
              bottom: '-30px',
              left: '1.5rem',
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '15px',
              boxShadow: '0 10px 30px -5px rgba(0,0,0,0.15)',
              maxWidth: '260px',
              zIndex: 10
            }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                 <Target color="var(--accent-lime)" size={24} />
                 <h4 style={{ fontWeight: 'bold' }}>Company Vision</h4>
               </div>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)' }}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.
               </p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="mt-8 lg:mt-0" style={{ flex: 1 }}>

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
             <Leaf color="var(--accent-lime)" size={40} style={{ flexShrink: 0 }} />
             <div>
               <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Company Mission</h4>
               <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
               </p>
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
                Join us to achieve sustainable growth and reach your financial goals.
              </span>
            </div>
            <button className="btn btn-lime" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              Learn More →
            </button>
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
            25 <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: 'var(--accent-lime)', marginLeft: '4px', display: 'inline-block' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>A legacy of expertise spanning 25+ years.</p>
        </div>
        
        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            150K <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: 'var(--accent-lime)', marginLeft: '4px', display: 'inline-block' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>Where ideas flourish and projects thrive.</p>
        </div>

        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div className="transition-transform duration-300 group-hover:scale-110" style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            98%
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>Striving for customer satisfaction is top priority.</p>
        </div>

        <div className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            $40M <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: 'var(--accent-lime)', marginLeft: '4px', display: 'inline-block' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '180px', margin: '0 auto', textAlign: 'justify' }}>This is our pure benefit to our clients.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
