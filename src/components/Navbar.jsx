import React from 'react';
import { ChevronDown, Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 0',
      color: 'var(--text-white)',
      position: 'relative',
      zIndex: 100
    }} className="container animate-fade-in">
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Leaf color="var(--accent-lime)" size={28} />
        <span>Optibiz</span>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '0.5rem 1.5rem',
        borderRadius: '50px',
        border: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)'
      }}>
        <a href="#" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Home</a>
        <a href="#" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</a>
        <a href="#" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Services</a>
        <a href="#" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          Pages <ChevronDown size={14} />
        </a>
        <a href="#" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</a>
      </div>

      <button className="btn btn-white">
        Get A Quote <span style={{ marginLeft: '0.5rem' }}>→</span>
      </button>

    </nav>
  );
};

export default Navbar;
