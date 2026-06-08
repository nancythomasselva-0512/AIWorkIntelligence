"use client";
import React from 'react';
import { ChevronDown, Hexagon } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 0',
      color: 'var(--text-white)'
    }} className="container animate-fade-in">
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Hexagon color="var(--accent-lime)" size={28} />
        <span>AI WorkSync</span>
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
        <Link href="#home" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
        <Link href="#about" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
        <Link href="#services" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Services</Link>
        <Link href="#team" style={{ color: 'var(--text-white)', textDecoration: 'none', fontSize: '0.9rem' }}>Team</Link>
        
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

      <Link href="/login" className="btn btn-white">
        Login / Signup <span style={{ marginLeft: '0.5rem' }}>→</span>
      </Link>

    </nav>
  );
};

export default Navbar;
