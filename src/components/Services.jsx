import React from 'react';
import { ArrowUpRight, Briefcase, Calculator, PiggyBank } from 'lucide-react';

const Services = () => {
  return (
    <section className="section-padding container" style={{ backgroundColor: '#f8fafc', borderRadius: '30px', marginBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div style={{ maxWidth: '600px' }}>
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
            Our Services
          </div>
          <h2 style={{ fontSize: '3rem', lineHeight: '1.2', color: 'var(--text-dark)' }}>
            Financial Services To Grow And Secure Your Wealth
          </h2>
        </div>
        
        <div style={{ maxWidth: '400px', textAlign: 'right' }}>
           <p style={{ color: 'var(--text-dark-muted)', marginBottom: '1.5rem', textAlign: 'left' }}>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
           </p>
           <button className="btn btn-lime">
             Learn More →
           </button>
        </div>
      </div>

      {/* Service Cards */}
      <div style={{ display: 'flex', gap: '2rem' }}>
        
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
