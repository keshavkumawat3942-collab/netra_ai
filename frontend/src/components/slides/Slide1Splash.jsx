import React, { useEffect, useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';

export const Slide1Splash = () => {
  const { setCurrentSlide } = useCase();
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2.0 Seconds strict

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          if (user) {
            setCurrentSlide(3);
          } else {
            setCurrentSlide(2);
          }
        }, 150);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [user]);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at center, #101929 0%, #090D16 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* High-Precision Tactical Eye Logo Iris Animation */}
      <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '40px' }}>
        <div className="animate-spin-slow" style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px dashed rgba(0, 240, 255, 0.4)',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)'
        }} />

        <div className="animate-spin-reverse" style={{
          position: 'absolute',
          inset: '18px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 240, 255, 0.6)',
          borderTop: '3px solid #00f0ff',
          borderBottom: '3px solid #00f0ff'
        }} />

        <div style={{
          position: 'absolute',
          inset: '36px',
          borderRadius: '50%',
          background: '#090D16',
          border: '2px solid #00f0ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 0 25px rgba(0, 240, 255, 0.5)'
        }}>
          <div style={{
            width: `${Math.max(12, (progress / 100) * 58)}px`,
            height: `${Math.max(12, (progress / 100) * 58)}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00f0ff 0%, #005577 80%, #090D16 100%)',
            boxShadow: '0 0 25px #00f0ff',
            transition: 'all 0.05s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 10px #ffffff'
            }} />
          </div>
        </div>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '36px',
        fontWeight: 700,
        letterSpacing: '4px',
        color: '#ffffff',
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        NETRA-AI
      </h1>
      
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        color: '#00f0ff',
        letterSpacing: '2px',
        marginBottom: '32px'
      }}>
        POLICE INTELLIGENCE SUITE // ZERO-TRUST
      </p>

      <div style={{ width: '320px', background: '#101929', border: '1px solid #1c2b42', borderRadius: '8px', padding: '3px' }}>
        <div style={{
          height: '6px',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #005577 0%, #00f0ff 100%)',
          borderRadius: '6px',
          boxShadow: '0 0 10px #00f0ff',
          transition: 'width 0.03s linear'
        }} />
      </div>

      <div style={{
        marginTop: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: '#7f93b0'
      }}>
        BOOTING FORENSIC KERNEL... {progress}%
      </div>
    </div>
  );
};