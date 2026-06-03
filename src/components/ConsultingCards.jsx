import React from 'react';
import { Target, Lightbulb, PieChart, PlayCircle } from 'lucide-react';

const ConsultingCards = () => {
  return (
    <div className="container" style={{ display: 'flex', gap: '1rem', height: '180px' }}>
      
      {/* Video Thumbnail Card */}
      <div style={{
        flex: 1.5,
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
      }} className="animate-fade-in delay-300">
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80") center/cover',
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(15,23,42,0.8), rgba(0,0,0,0))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.5rem'
        }}>
          <div style={{ color: 'var(--text-white)', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            How Does It Work?
          </div>
          <div style={{ color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
            Learn More <PlayCircle size={16} />
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div style={{
        flex: 3,
        backgroundColor: 'var(--bg-card)',
        borderRadius: '20px',
        display: 'flex',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }} className="animate-fade-in delay-300">
        
        {/* Card 1 */}
        <div style={{ flex: 1, padding: '2rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lime)', marginBottom: '1rem' }}>
             <Target size={20} />
           </div>
           <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Operational Consulting</h3>
           <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut.</p>
        </div>

        {/* Card 2 */}
        <div style={{ flex: 1, padding: '2rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lime)', marginBottom: '1rem' }}>
             <Lightbulb size={20} />
           </div>
           <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Strategy Consulting</h3>
           <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut.</p>
        </div>

        {/* Card 3 */}
        <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lime)', marginBottom: '1rem' }}>
             <PieChart size={20} />
           </div>
           <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Financial Consulting</h3>
           <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.5' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut.</p>
        </div>

      </div>
    </div>
  );
};

export default ConsultingCards;
