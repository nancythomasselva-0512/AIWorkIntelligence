"use client";
import React from 'react';
import { Target, Lightbulb, PieChart, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const ConsultingCards = () => {
  return (
    <div className="container flex flex-col md:flex-row gap-4 h-auto md:h-[180px]">
      
      {/* Video Thumbnail Card */}
      <div className="flex-[1.5] rounded-[20px] overflow-hidden relative shadow-xl animate-fade-in delay-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer min-h-[180px]">
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
            WorkSync Engine
          </div>
          <Link href="/worksync" style={{ color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'none' }}>
            Learn More <PlayCircle size={16} />
          </Link>
        </div>
      </div>

      {/* Info Cards */}
      <div className="flex-[3] bg-[var(--bg-card)] rounded-[20px] flex flex-col md:flex-row shadow-xl border border-[var(--border-color)] overflow-hidden animate-fade-in delay-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* Card 1 */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-[var(--border-color)] flex flex-col justify-center">
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lime)', marginBottom: '1rem' }}>
             <Target size={20} />
           </div>
           <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>WorkSync Engine</h3>
           <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.5' }}>Real-time speech to text, auto-transcription, and AI-powered tagging.</p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-[var(--border-color)] flex flex-col justify-center">
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lime)', marginBottom: '1rem' }}>
             <Lightbulb size={20} />
           </div>
           <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Work Logs</h3>
           <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.5' }}>Track technical work, meetings, and innovation tasks effortlessly.</p>
        </div>

        {/* Card 3 */}
        <div className="flex-1 p-6 flex flex-col justify-center">
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lime)', marginBottom: '1rem' }}>
             <PieChart size={20} />
           </div>
           <h3 style={{ color: 'var(--text-white)', marginBottom: '0.5rem' }}>Revenue & GST</h3>
           <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.5' }}>Auto invoice generation, tax reports, and service-based billing.</p>
        </div>

      </div>
    </div>
  );
};

export default ConsultingCards;
