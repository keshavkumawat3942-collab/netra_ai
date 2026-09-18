import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCase } from '../../context/CaseContext';

export const Slide2Auth = () => {
  const { submitStep1, verifyOtp, loading, loginStep, pendingDeptId, otpHint } = useAuth();
  const { setCurrentSlide } = useCase();

  const [deptId, setDeptId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStep1 = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await submitStep1(deptId, password);
    } catch (err) {
      setErrorMsg(err.message || 'Authentication error');
    }
  };

  const handleStep3 = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await verifyOtp(otp);
      setCurrentSlide(3);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid 4-digit OTP');
    }
  };

  const setCommanderPreset = () => {
    setDeptId('HQ-SUP-KESHAV');
    setPassword('KeshavCommander2026');
  };

  const setOfficerPreset = () => {
    setDeptId('OFFICER-DL-4089');
    setPassword('OfficerDelhi4089');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at center, #101929 0%, #090D16 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="tactical-card" style={{
        width: '460px',
        padding: '36px',
        background: 'rgba(16, 25, 41, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid #1c2b42',
        boxShadow: '0 0 35px rgba(0, 0, 0, 0.8)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid #00f0ff',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0,240,255,0.4)'
          }}>
            <span style={{ color: '#00f0ff', fontSize: '20px' }}>👁️</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#ffffff', letterSpacing: '1px' }}>
            SECURE LAW ENFORCEMENT ACCESS
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#7f93b0' }}>
            3-STEP ZERO-TRUST VERIFICATION PROTOCOL
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(255, 42, 85, 0.15)',
            border: '1px solid #ff2a55',
            color: '#ff2a55',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '12px',
            marginBottom: '18px',
            fontFamily: 'var(--font-mono)'
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {loginStep === 1 && (
          <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#7f93b0', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                1. DEPARTMENT BADGE / HQ ID
              </label>
              <input
                type="text"
                required
                placeholder="e.g. HQ-SUP-KESHAV or OFFICER-DL-4089"
                value={deptId}
                onChange={(e) => setDeptId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#7f93b0', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                2. SECURITY PASSCODE
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" disabled={loading} className="tactical-btn" style={{ padding: '12px', marginTop: '6px' }}>
              {loading ? "VALIDATING CREDENTIALS..." : "REQUEST 4-DIGIT SECURE OTP →"}
            </button>

            <div style={{ borderTop: '1px solid #1c2b42', paddingTop: '14px', marginTop: '8px' }}>
              <span style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '8px' }}>
                QUICK ROLE PRESETS (TEST CREDENTIALS):
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={setCommanderPreset}
                  className="tactical-btn commander-btn"
                  style={{ flex: 1, fontSize: '11px', padding: '8px 4px' }}
                >
                  ⭐ Commander Keshav
                </button>
                <button
                  type="button"
                  onClick={setOfficerPreset}
                  className="tactical-btn"
                  style={{ flex: 1, fontSize: '11px', padding: '8px 4px' }}
                >
                  🛡️ Field Officer
                </button>
              </div>
            </div>
          </form>
        )}

        {loginStep === 3 && (
          <form onSubmit={handleStep3} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{
              background: '#090D16',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #1c2b42',
              fontSize: '12px',
              color: '#00f0ff',
              fontFamily: 'var(--font-mono)'
            }}>
              Tactical 2FA Token for: <strong style={{ color: '#fff' }}>{pendingDeptId}</strong>
              <div style={{ fontSize: '11px', color: '#7f93b0', marginTop: '4px' }}>
                (Demo Token Auto-Fill: <span style={{ color: '#00f0ff', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setOtp(otpHint || '2026')}>{otpHint || '2026'}</span>)
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#7f93b0', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                3. ENTER 4-DIGIT OTP
              </label>
              <input
                type="text"
                required
                maxLength={4}
                placeholder="2026"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  textAlign: 'center',
                  letterSpacing: '12px',
                  background: '#090D16',
                  border: '1px solid #00f0ff',
                  borderRadius: '8px',
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '22px',
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" disabled={loading} className="tactical-btn" style={{ padding: '12px' }}>
              {loading ? "VERIFYING SECURITY KEY..." : "VERIFY & ENTER INTELLIGENCE SUITE →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};