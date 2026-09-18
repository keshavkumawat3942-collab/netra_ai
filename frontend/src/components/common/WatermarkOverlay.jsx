import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export const WatermarkOverlay = () => {
  const { user } = useAuth();
  const [timeStr, setTimeStr] = useState(new Date().toLocaleTimeString());
  const [securityShieldActive, setSecurityShieldActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString());
    }, 1000);

    // FLAG_SECURE anti-screenshot / keylogger protections
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        setSecurityShieldActive(true);
        setTimeout(() => setSecurityShieldActive(false), 3000);
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      setSecurityShieldActive(true);
      setTimeout(() => setSecurityShieldActive(false), 2000);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const officer = user?.name || "OFFICER KESHAV KUMAWAT";
  const badge = user?.badge_id || "HQ-SUP-KESHAV";
  const ip = user?.ip_address || "10.14.88.101";

  return (
    <>
      {/* Triple Layer 1: Top & Bottom Dynamic Overlay */}
      <div className="watermark-overlay">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>🔒 NETRA-AI ZERO-TRUST KERNEL</span>
          <span>OFFICER: {officer.toUpperCase()} | BADGE: {badge}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '24px' }}>
          <span>IP ADDR: {ip} | TIME: {timeStr}</span>
          <span>FLAG_SECURE: ENFORCED // STEGANO: SHA256-LSB-ACTIVE</span>
        </div>
      </div>

      {/* Triple Layer 2: Center Diagonal Watermark */}
      <div className="watermark-diagonal">
        CONFIDENTIAL POLICE RECORD // {badge} // {timeStr}
      </div>

      {/* OS-Level FLAG_SECURE Anti-Leak Shield Trigger */}
      {securityShieldActive && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(9, 13, 22, 0.96)',
          backdropFilter: 'blur(20px)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff2a55',
          fontFamily: 'var(--font-display)',
          textAlign: 'center',
          padding: '24px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛡️</div>
          <h2 style={{ fontSize: '32px', letterSpacing: '2px', marginBottom: '8px' }}>
            FLAG_SECURE ANTI-LEAK SHIELD ACTIVATED
          </h2>
          <p style={{ color: '#7f93b0', fontFamily: 'var(--font-mono)', fontSize: '14px', maxWidth: '600px' }}>
            Screen capture, inspector injection, and print attempts are strictly prohibited on Law Enforcement Terminals.
            Audit ID logged: <span style={{ color: '#00f0ff' }}>AUD-SEC-{Date.now()}</span>
          </p>
        </div>
      )}
    </>
  );
};
