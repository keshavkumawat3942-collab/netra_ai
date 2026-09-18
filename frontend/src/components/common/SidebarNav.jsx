import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCase } from '../../context/CaseContext';

export const SidebarNav = () => {
  const { user, isCommander } = useAuth();
  const { t } = useLanguage();
  const { currentSlide, setCurrentSlide, activeCase, requestOnboarding } = useCase();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [onboardingData, setOnboardingData] = useState({ name: '', badge: '', station: '', justification: '' });
  const [onboardingSuccess, setOnboardingSuccess] = useState(false);

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    requestOnboarding(onboardingData);
    setOnboardingSuccess(true);
    setTimeout(() => {
      setOnboardingSuccess(false);
      setShowOnboardingModal(false);
      setOnboardingData({ name: '', badge: '', station: '', justification: '' });
    }, 2000);
  };

  const isWorkflowActive = currentSlide >= 5 && !isCommander;

  return (
    <>
      <aside style={{
        width: '240px',
        background: '#101929',
        borderRight: '1px solid #1c2b42',
        padding: '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 64px)'
      }}>
        {/* Main Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)', padding: '4px 8px', letterSpacing: '1px' }}>
            COMMAND CONSOLE
          </div>

          <button
            onClick={() => setCurrentSlide(3)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 14px',
              borderRadius: '10px',
              background: currentSlide === 3 ? (isCommander ? 'rgba(255, 215, 0, 0.15)' : 'rgba(0, 240, 255, 0.15)') : 'transparent',
              border: currentSlide === 3 ? `1px solid ${isCommander ? '#ffd700' : '#00f0ff'}` : '1px solid transparent',
              color: currentSlide === 3 ? '#ffffff' : '#7f93b0',
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: currentSlide === 3 ? 700 : 500,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span>📊</span>
            <span>{isCommander ? "HQ Analytics" : t('dashboard')}</span>
          </button>

          {!isCommander && (
            <>
              <button
                onClick={() => setCurrentSlide(4)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: currentSlide === 4 ? (isCommander ? 'rgba(255, 215, 0, 0.15)' : 'rgba(0, 240, 255, 0.15)') : 'transparent',
                  border: currentSlide === 4 ? `1px solid ${isCommander ? '#ffd700' : '#00f0ff'}` : '1px solid transparent',
                  color: currentSlide === 4 ? '#ffffff' : '#7f93b0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: currentSlide === 4 ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>📈</span>
                <span>{t('insights')}</span>
              </button>

            </>
          )}

          {/* Active Investigation Flow Tracker (Context-Aware) - HIDE FOR COMMANDER HQ */}
          {isWorkflowActive && (
            <div style={{
              marginTop: '16px',
              background: '#090D16',
              border: '1px solid #1c2b42',
              borderRadius: '12px',
              padding: '12px'
            }}>
              <div style={{ fontSize: '10px', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '6px' }}>
                ACTIVE INVESTIGATION PIPELINE
              </div>
              <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 600, marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeCase?.case_id || "CASE-2026-8942"}
              </div>

              {/* Step indicator breadcrumbs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                {[
                  { step: 5, label: '1. Case Genesis' },
                  { step: 6, label: '2. Evidence Ingestion' },
                  { step: 7, label: '3. AI Batch Scan' },
                  { step: 8, label: '4. Neo4j Graph & GPS' },
                  { step: 9, label: '5. Suspect PII Audit' },
                  { step: 10, label: '6. Final Dossier' }
                ].map(s => {
                  const isCurrent = currentSlide === s.step;
                  const isDone = currentSlide > s.step;
                  return (
                    <div
                      key={s.step}
                      onClick={() => setCurrentSlide(s.step)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: isCurrent ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                        color: isCurrent ? '#00f0ff' : (isDone ? '#7f93b0' : '#4a5d78'),
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: isCurrent ? 700 : 400
                      }}
                    >
                      <span>{isDone ? '✓' : (isCurrent ? '▶' : '○')}</span>
                      <span>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid #1c2b42' }}>
          <button
            onClick={() => setShowOnboardingModal(true)}
            style={{
              background: 'transparent',
              border: '1px solid #1c2b42',
              color: '#7f93b0',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>➕</span>
            <span>{t('onboarding')}</span>
          </button>

          <div style={{
            background: '#090D16',
            border: '1px solid #1c2b42',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: '#7f93b0'
          }}>
            <div style={{ color: isCommander ? '#ffd700' : '#00f0ff', marginBottom: '2px', fontWeight: 700 }}>
              🛡️ {isCommander ? "COMMANDER HQ ACCESS" : "OFFICER TERMINAL"}
            </div>
            <div>TLS 1.3 / E2EE SHA-256</div>
            <div>FLAG_SECURE: ACTIVE</div>
          </div>
        </div>
      </aside>

      {/* Onboarding Request Modal */}
      {showOnboardingModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(9,13,22,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="tactical-card" style={{ width: '480px', padding: '24px' }}>
            <h3 style={{ color: '#00f0ff', fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '16px' }}>
              POLICE PERSONNEL ONBOARDING REQUEST
            </h3>
            
            {onboardingSuccess ? (
              <div style={{ color: '#00f0ff', textAlign: 'center', padding: '24px 0', fontFamily: 'var(--font-display)', fontSize: '18px' }}>
                ✓ ONBOARDING REQUEST DISPATCHED TO COMMANDER KESHAV HQ FOR BIOMETRIC CLEARANCE.
              </div>
            ) : (
              <form onSubmit={handleOnboardingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#7f93b0' }}>Officer Full Name</label>
                  <input
                    required
                    style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px' }}
                    value={onboardingData.name}
                    onChange={e => setOnboardingData({ ...onboardingData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#7f93b0' }}>Requested Badge ID</label>
                  <input
                    required
                    placeholder="OFFICER-XX-XXXX"
                    style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px' }}
                    value={onboardingData.badge}
                    onChange={e => setOnboardingData({ ...onboardingData, badge: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#7f93b0' }}>Assigned Police Station / Unit</label>
                  <input
                    required
                    placeholder="e.g. Special Cell HQ Delhi"
                    style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px' }}
                    value={onboardingData.station}
                    onChange={e => setOnboardingData({ ...onboardingData, station: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" onClick={() => setShowOnboardingModal(false)} className="tactical-btn danger-btn" style={{ padding: '8px 14px' }}>
                    Cancel
                  </button>
                  <button type="submit" className="tactical-btn" style={{ padding: '8px 14px' }}>
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};