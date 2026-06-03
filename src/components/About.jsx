import React from 'react';
import { Target, CheckCircle, Leaf } from 'lucide-react';

const About = () => {
  return (
    <section className="section-padding container">
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
        
        {/* Left Side: Images */}
        <div style={{ flex: 1, position: 'relative' }}>
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
            />
          </div>
          
          {/* Mission/Vision Box overlaying the image */}
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            left: '-20px',
            backgroundColor: '#ffffff',
            padding: '1.5rem',
            borderRadius: '15px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            maxWidth: '250px'
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

        {/* Right Side: Content */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '0.4rem 1rem', 
            backgroundColor: 'rgba(196,240,63,0.2)', 
            color: '#65a30d', 
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            About Us
          </div>

          <h2 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '2rem', color: 'var(--text-dark)' }}>
            The Best Finance Consultant In Town
          </h2>

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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '3rem'
      }}>
        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            25 <span style={{ color: 'var(--accent-lime)', marginLeft: '4px' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>A legacy of expertise spanning 25+ years.</p>
        </div>
        
        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            150K <span style={{ color: 'var(--accent-lime)', marginLeft: '4px' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>Where ideas flourish and projects thrive.</p>
        </div>

        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            98%
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>Striving for customer satisfaction is top priority.</p>
        </div>

        <div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            $40M <span style={{ color: 'var(--accent-lime)', marginLeft: '4px' }}>+</span>
          </div>
          <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.85rem', maxWidth: '150px' }}>This is our pure benefit to our clients.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
