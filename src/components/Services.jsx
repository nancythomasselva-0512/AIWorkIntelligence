import React from 'react';
import { ArrowUpRight, Briefcase, Calculator, PiggyBank } from 'lucide-react';

const Services = () => {
  return (
    <section className="section-padding container" style={{ backgroundColor: '#f8fafc', borderRadius: '30px', marginBottom: '4rem' }}>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#000000' }}>
          Our <span style={{ color: 'var(--accent-lime)' }}>Services</span>
        </h2>
        <p style={{ color: 'var(--text-dark-muted)', fontSize: '1.1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Service Cards */}
      <div className="flex flex-col md:flex-row" style={{ gap: '2rem' }}>
        
        {/* Card 1 */}
        <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
           <div style={{ height: '220px', backgroundImage: 'url("https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <ArrowUpRight size={20} />
             </div>
           </div>
           <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Briefcase color="var(--accent-lime)" size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Business Strategy</h3>
           </div>
        </div>

        {/* Card 2 */}
        <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
           <div style={{ height: '220px', backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <ArrowUpRight size={20} />
             </div>
           </div>
           <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Calculator color="var(--accent-lime)" size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Taxes & Accounting</h3>
           </div>
        </div>

        {/* Card 3 */}
        <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
           <div style={{ height: '220px', backgroundImage: 'url("https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', backgroundColor: '#ffffff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <ArrowUpRight size={20} />
             </div>
           </div>
           <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <PiggyBank color="var(--accent-lime)" size={24} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Financial Planning</h3>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
