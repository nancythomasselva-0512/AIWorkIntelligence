"use client";
import React, { useState } from 'react';
import { ArrowUpRight, Briefcase, Calculator, PiggyBank, Monitor, Cpu, Cloud, X } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<{title: string, desc: string} | null>(null);

  const servicesData = [
    {
      title: "Web & Mobile Development",
      desc: "Our web and mobile development services focus on creating high-performance, responsive applications tailored to your business needs."
    },
    {
      title: "AI & Machine Learning",
      desc: "We leverage advanced AI and machine learning models to automate processes, generate insights, and build intelligent workflows."
    },
    {
      title: "Cloud & IoT Solutions",
      desc: "Our cloud and IoT solutions enable seamless connectivity, scalable infrastructure, and robust data management for modern enterprises."
    }
  ];

  return (
    <section className="container mb-8 md:mb-12" style={{ backgroundColor: '#f8fafc', borderRadius: '30px', padding: '3rem 2rem' }}>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#000000' }}>
          Our <span style={{ color: 'var(--accent-lime)' }}>Services</span>
        </h2>
        <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.1rem' }}>
          Empowering businesses with innovative, AI-driven solutions and modern digital platforms.
        </p>
      </div>

      {/* Service Cards */}
      <div className="flex flex-col md:flex-row" style={{ gap: '2rem' }}>
        
        {/* Card 1 */}
        <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer" style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
           <div style={{ height: '220px', backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
             <div 
               onClick={() => setSelectedService(servicesData[0])}
               className="hover:scale-110 transition-transform"
               style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}
             >
               <ArrowUpRight size={20} color="var(--accent-lime)" />
             </div>
           </div>
           <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Monitor color="var(--accent-lime)" size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Web & Mobile Development</h3>
           </div>
        </div>

        {/* Card 2 */}
        <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer" style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
           <div style={{ height: '220px', backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
             <div 
               onClick={() => setSelectedService(servicesData[1])}
               className="hover:scale-110 transition-transform"
               style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}
             >
               <ArrowUpRight size={20} color="var(--accent-lime)" />
             </div>
           </div>
           <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Cpu color="var(--accent-lime)" size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>AI & Machine Learning</h3>
           </div>
        </div>

        {/* Card 3 */}
        <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer" style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
           <div style={{ height: '220px', backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
             <div 
               onClick={() => setSelectedService(servicesData[2])}
               className="hover:scale-110 transition-transform"
               style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}
             >
               <ArrowUpRight size={20} color="var(--accent-lime)" />
             </div>
           </div>
           <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Cloud color="var(--accent-lime)" size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Cloud & IoT Solutions</h3>
           </div>
        </div>

      </div>

      {/* Modal Popup */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(5px)'
        }} onClick={() => setSelectedService(null)}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: '24px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedService(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
              className="hover:opacity-70 transition-opacity"
            >
              <X size={24} color="#666" />
            </button>
            <div style={{ width: '50px', height: '5px', backgroundColor: 'var(--accent-lime)', borderRadius: '10px', marginBottom: '1.5rem' }}></div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '1rem', fontWeight: 'bold' }}>
              {selectedService.title}
            </h3>
            <p style={{ color: 'var(--text-dark-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>
              {selectedService.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
