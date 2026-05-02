import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Award } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="page-wrapper">
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        
        <div className="text-center animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-accent)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '1.5rem' }}>
            Official Running Event
          </div>
          
          <h1 className="text-5xl font-extrabold mb-6">
            The Ultimate <br />
            <span className="text-accent">Notarace</span> Experience
          </h1>
          
          <p className="text-2xl text-muted mb-8">
            Trust the process, run the distance. Join thousands of runners in Indonesia's most premium running event. 5K, 10K, and Half Marathon.
          </p>

          <div className="flex justify-center gap-4 mb-12" style={{ flexWrap: 'wrap' }}>
            <Link to="/auth" className="btn btn-primary">
              Register Now <ChevronRight size={20} />
            </Link>
            <a href="#details" className="btn btn-outline">
              Event Details
            </a>
          </div>
        </div>

        <div id="details" className="flex gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.2s', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <div className="card text-center" style={{ flex: '1 1 250px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--color-accent)' }}>
              <Calendar size={40} />
            </div>
            <h3 className="font-bold text-2xl mb-2">November 12, 2026</h3>
            <p className="text-muted">Race Day</p>
          </div>

          <div className="card text-center" style={{ flex: '1 1 250px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--color-accent)' }}>
              <MapPin size={40} />
            </div>
            <h3 className="font-bold text-2xl mb-2">Jakarta, Indonesia</h3>
            <p className="text-muted">Gelora Bung Karno</p>
          </div>

          <div className="card text-center" style={{ flex: '1 1 250px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--color-accent)' }}>
              <Award size={40} />
            </div>
            <h3 className="font-bold text-2xl mb-2">5K • 10K • HM</h3>
            <p className="text-muted">Multiple Categories</p>
          </div>

        </div>
      </div>
    </div>
  );
};
