"use client";
import React, { useState } from 'react';
import { ChevronDown, Hexagon, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 0',
      color: 'var(--text-white)',
      position: 'relative',
      zIndex: 100
    }} className="container animate-fade-in px-4 md:px-0">
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', zIndex: 60 }}>
        <Hexagon color="var(--accent-lime)" size={28} />
        <span>AI WorkSync</span>
      </div>

      <div className="hidden lg:flex" style={{
        alignItems: 'center',
        gap: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '0.5rem 1.5rem',
        borderRadius: '50px',
        border: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)'
      }}>
        <Link href="#home" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
        <Link href="#about" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
        <Link href="#services" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Services</Link>
        <div className="relative group cursor-pointer" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.9rem' }}>
          <span>Pages</span> <ChevronDown size={14} />
          <div className="absolute top-full left-0 mt-2 w-48 bg-[#0F1F2E] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-2 z-50">
            <Link href="/dashboard" className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-white text-sm">Dashboard</Link>
            <Link href="/worksync" className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-white text-sm">WorkSync Engine</Link>
            <Link href="/login" className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-white text-sm">Login</Link>
          </div>
        </div>

        <Link href="#contact" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</Link>
      </div>

      <div className="hidden lg:block">
        <Link href="/login" className="btn btn-white">
          Login / Signup <span style={{ marginLeft: '0.5rem' }}>→</span>
        </Link>
      </div>

      <button className="lg:hidden z-60 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ zIndex: 60 }}>
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Popup */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ 
            position: 'absolute', 
            top: '100%', 
            right: '1rem', 
            backgroundColor: '#071420', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '1.5rem', 
            padding: '1.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem', 
            width: '220px', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', 
            zIndex: 9999 
          }}
        >
          <Link href="#home" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }} className="hover:text-opti-lime transition-colors">Home</Link>
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }} className="hover:text-opti-lime transition-colors">About Us</Link>
          <Link href="#services" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }} className="hover:text-opti-lime transition-colors">Services</Link>
          <Link href="/worksync" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '1rem' }} className="hover:text-opti-lime transition-colors">WorkSync App</Link>
          <hr style={{ border: '0', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.25rem 0' }} />
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--accent-lime)', textDecoration: 'none', fontWeight: '700', fontSize: '1rem' }} className="hover:opacity-80 transition-opacity">Login / Signup</Link>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
