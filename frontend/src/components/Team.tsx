import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Scientist',
      image: '/team1.jpg',
      description: 'Former deep learning researcher focusing on audio LLMs.'
    },
    {
      name: 'Marcus Reynolds',
      role: 'VP of Engineering',
      image: '/team2.jpg',
      description: 'Expert in real-time streaming architectures and cloud infrastructure.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      image: '/team3.jpg',
      description: 'Passionate about building zero-friction workflows for professionals.'
    },
    {
      name: 'James Walker',
      role: 'Lead UX Architect',
      image: '/team4.jpg',
      description: 'Designing intuitive interfaces that merge human interaction with AI.'
    }
  ];

  return (
    <section id="team" className="section-padding" style={{ backgroundColor: '#f8f9fa', color: '#000000', padding: '6rem 0' }}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Meet Our <span style={{ color: '#1C3E2F' }}>Team</span></h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            The brilliant minds behind AI WorkSync, dedicated to building the future of work intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }} className="hover:-translate-y-2 group">
              <div style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-110" />
              </div>
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--accent-lime)', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '1rem' }}>{member.role}</p>
                <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{member.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <a href="#" style={{ color: '#ccc', transition: 'color 0.2s' }} className="hover:text-blue-500"><Linkedin size={18} /></a>
                  <a href="#" style={{ color: '#ccc', transition: 'color 0.2s' }} className="hover:text-blue-400"><Twitter size={18} /></a>
                  <a href="#" style={{ color: '#ccc', transition: 'color 0.2s' }} className="hover:text-gray-800"><Mail size={18} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
