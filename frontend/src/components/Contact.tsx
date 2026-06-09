"use client";
import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '6rem 0' }}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contact <span style={{ color: 'var(--accent-lime)' }}>Us</span></h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Have a question about our enterprise plans, need technical support, or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(199, 242, 58, 0.2)', color: '#8baf15', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Email</h3>
                <p style={{ color: '#666' }}>nancythomasselva@gmail.com</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(176, 132, 255, 0.2)', color: '#B084FF', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Phone</h3>
                <p style={{ color: '#666' }}>+91 7904327211</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(96, 165, 250, 0.2)', color: '#60A5FA', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Office</h3>
                <p style={{ color: '#666' }}>MCC MRF INNOVATION PARK, Madras christian college East tambaram 600059</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ backgroundColor: '#f8f9fa', padding: '2.5rem', borderRadius: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Send us a Message</h2>
            <form className="space-y-6" action="https://formsubmit.co/nancythomasselva@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="New Message from Website Contact Form" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#666', marginBottom: '0.5rem' }}>First Name</label>
                  <input type="text" name="First Name" required style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '0.75rem', padding: '0.75rem 1rem', outline: 'none' }} placeholder="John" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#666', marginBottom: '0.5rem' }}>Last Name</label>
                  <input type="text" name="Last Name" required style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '0.75rem', padding: '0.75rem 1rem', outline: 'none' }} placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#666', marginBottom: '0.5rem' }}>Email Address</label>
                <input type="email" name="email" required style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '0.75rem', padding: '0.75rem 1rem', outline: 'none' }} placeholder="john@company.com" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#666', marginBottom: '0.5rem' }}>Message</label>
                <textarea name="Message" required rows={5} style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '0.75rem', padding: '0.75rem 1rem', outline: 'none', resize: 'none' }} placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="hover:opacity-90 transition-opacity" style={{ width: '100%', backgroundColor: 'var(--accent-lime)', color: '#071420', fontWeight: 'bold', padding: '1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
