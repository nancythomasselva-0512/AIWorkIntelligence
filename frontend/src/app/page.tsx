import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ConsultingCards from '../components/ConsultingCards';
import About from '../components/About';
import Services from '../components/Services';
import Team from '../components/Team';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section with dark gradient background */}
      <div id="home" style={{
        background: 'linear-gradient(180deg, var(--bg-gradient-top) 0%, var(--bg-dark) 40%, var(--bg-gradient-bottom) 100%)',
        position: 'relative',
        paddingBottom: '8rem'
      }}>
        <Navbar />
        <Hero />
        <div style={{ position: 'absolute', bottom: '-40px', left: 0, right: 0, zIndex: 10 }}>
          <ConsultingCards />
        </div>
      </div>

      {/* Main Content with white background */}
      <main style={{ marginTop: '8rem' }}>
        <div id="about">
          <About />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="team">
          <Team />
        </div>
        <Contact />
      </main>
    </div>
  );
}
