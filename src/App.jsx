import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConsultingCards from './components/ConsultingCards';
import About from './components/About';
import Services from './components/Services';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Hero Section with dark gradient background */}
      <div style={{
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
        <About />
        <Services />
      </main>
    </div>
  );
}

export default App;
