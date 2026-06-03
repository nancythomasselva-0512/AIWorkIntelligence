import React from 'react';
import { TrendingUp, BarChart2, Activity } from 'lucide-react';

const Mockup = () => {
  // CSS based phone mockup
  const phoneStyle = {
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

  const notchStyle = {
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
    <div style={{ position: 'relative', width: '100%', height: '600px', zIndex: 5 }}>
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

      {/* Front Phone */}
      <div style={{
        ...phoneStyle,
        position: 'absolute',
        top: '60px',
        left: '20px',
        transform: 'rotate(-5deg)',
        zIndex: 10
      }}>
        <div style={notchStyle}></div>
        <div style={{ padding: '40px 20px 20px', background: '#f8fafc', height: '100%', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#0f172a' }}>Dashboard</div>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#cbd5e1' }}></div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '15px', padding: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '15px' }}>
             <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '5px' }}>Total Revenue</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '10px' }}>$1,543.00</div>
             <Activity color="var(--accent-lime)" size={32} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 1, background: '#ffffff', borderRadius: '15px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
               <TrendingUp color="#10b981" size={20} style={{ marginBottom: '5px' }} />
               <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Projects</div>
               <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>+12%</div>
            </div>
            <div style={{ flex: 1, background: '#ffffff', borderRadius: '15px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
               <BarChart2 color="#3b82f6" size={20} style={{ marginBottom: '5px' }} />
               <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Consulting</div>
               <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>84h</div>
            </div>
          </div>

           <div style={{ background: '#ffffff', borderRadius: '15px', padding: '15px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', flex: 1 }}>
             <div style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>Recent Activity</div>
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
        right: '0',
        backgroundColor: 'var(--accent-lime)',
        padding: '15px 25px',
        borderRadius: '20px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
        zIndex: 20,
        transform: 'rotate(5deg)'
      }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a' }}>25+</div>
        <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '500' }}>Years Of Experience</div>
      </div>

    </div>
  );
};

export default Mockup;
