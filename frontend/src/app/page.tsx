import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ConsultingCards from '../components/ConsultingCards';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import FadeIn from '../components/FadeIn';

export default function Home() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section with dark gradient background */}
      <div id="home" className="relative pb-8 md:pb-48 bg-gradient-to-b from-[var(--bg-gradient-top)] via-[var(--bg-dark)] to-[var(--bg-gradient-bottom)]">
        <Navbar />
        <FadeIn delay={0.1}>
          <Hero />
        </FadeIn>
        <div className="relative md:absolute md:bottom-[-40px] left-0 right-0 z-10 px-4 md:px-0">
          <FadeIn delay={0.3} direction="up">
            <ConsultingCards />
          </FadeIn>
        </div>
      </div>

      {/* Main Content with white background */}
      <main className="mt-4 md:mt-12">
        <div id="about">
          <FadeIn>
            <About />
          </FadeIn>
        </div>
        <div id="services">
          <FadeIn>
            <Services />
          </FadeIn>
        </div>
        <FadeIn>
          <Contact />
        </FadeIn>
      </main>
    </div>
  );
}
