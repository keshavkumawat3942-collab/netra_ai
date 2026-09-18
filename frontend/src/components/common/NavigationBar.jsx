import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCase } from '../../context/CaseContext';

export const NavigationBar = () => {
  const { user, isCommander, logout, setUser } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { notifications, currentSlide, setCurrentSlide, goBack, approveOnboarding, denyOnboarding } = useCase();
  
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // New account form inside settings
  const [newAccName, setNewAccName] = useState('');
  const [newAccBadge, setNewAccBadge] = useState('');
  const [newAccRole, setNewAccRole] = useState('OFFICER');
  const [accCreatedNotice, setAccCreatedNotice] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const switchToCommander = () => {
    const cmdUser = {
      dept_id: 'HQ-SUP-KESHAV',
      name: 'Commander Keshav Kumawat',
      role: 'SUPREME_COMMANDER',
      theme: 'COMMANDER_GOLD_CRIMSON',
      is_commander: true,
      badge_id: 'HQ-SUP-KESHAV',
      ip_address: '10.14.88.101',
      clearance_level: 'LEVEL_5_TOP_SECRET'
    };
    setUser(cmdUser);
    localStorage.setItem('netra_user', JSON.stringify(cmdUser));
    setShowSettingsModal(false);
  };

  const switchToOfficer = () => {
    const offUser = {
      dept_id: 'OFFICER-DL-4089',
      name: 'Investigating Officer DL-4089',
      role: 'FIELD_INVESTIGATOR',
      theme: 'OFFICER_TACTICAL_CYAN',
      is_commander: false,
      badge_id: 'OFFICER-DL-4089',
      ip_address: '10.14.88.101',
      clearance_level: 'LEVEL_3_CONFIDENTIAL'
    };
    setUser(offUser);
    localStorage.setItem('netra_user', JSON.stringify(offUser));
    setShowSettingsModal(false);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setAccCreatedNotice(true);
    setTimeout(() => {
      setAccCreatedNotice(false);
      setNewAccName('');
      setNewAccBadge('');
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    setCurrentSlide(2); // Go directly to Slide 2 Login screen
  };

  return (
    <>
      <header style={{
        background: isCommander 
          ? 'linear-gradient(90deg, #101929 0%, #1a1208 50%, #101929 100%)' 
          : '#101929',
        borderBottom: `1px solid ${isCommander ? '#ffd700' : '#1c2b42'}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: isCommander ? '0 4px 20px rgba(255, 215, 0, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Brand & Eye Iris Emblem + Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Top Bar Back Button (Only visible on slides > 3) */}
          {currentSlide > 3 && (
            <button
              onClick={goBack}
              className="tactical-btn"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                background: '#090D16',
                border: `1px solid ${isCommander ? '#ffd700' : '#00f0ff'}`,
                color: isCommander ? '#ffd700' : '#00f0ff'
              }}
              title="Go Back to Previous Step"
            >
              ← Back
            </button>
          )}

          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
            onClick={() => setCurrentSlide(3)}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: `2px solid ${isCommander ? '#ffd700' : '#00f0ff'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, #090D16 80%)',
              boxShadow: `0 0 12px ${isCommander ? 'rgba(255,215,0,0.4)' : 'rgba(0,240,255,0.4)'}`
            }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: isCommander ? '#ffd700' : '#00f0ff',
                boxShadow: `0 0 8px ${isCommander ? '#ffd700' : '#00f0ff'}`
              }} />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '1px',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                NETRA-AI
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: isCommander ? 'rgba(255,215,0,0.15)' : 'rgba(0,240,255,0.15)',
                  color: isCommander ? '#ffd700' : '#00f0ff',
                  border: `1px solid ${isCommander ? '#ffd700' : '#00f0ff'}`
                }}>
                  {isCommander ? "COMMANDER KESHAV HQ" : "OFFICER WORKSPACE"}
                </span>
              </h1>
              <p style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
                POLICE INTELLIGENCE SUITE // INDIA LAW ENFORCEMENT
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* 5-Language Globe Selector */}
          <div style={{ position: 'relative' }}>
            <button 
              className="tactical-btn"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              🌐 {lang} (5 Lng)
            </button>
            
            {showLangMenu && (
              <div style={{
                position: 'absolute',
                top: '42px',
                right: 0,
                background: '#101929',
                border: '1px solid #00f0ff',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 110,
                boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
                minWidth: '150px'
              }}>
                {[
                  { code: 'EN', label: 'English (EN)' },
                  { code: 'HI', label: 'हिन्दी (Hindi)' },
                  { code: 'MR', label: 'मराठी (Marathi)' },
                  { code: 'UR', label: 'اردو (Urdu)' },
                  { code: 'PA', label: 'ਪੰਜਾਬੀ (Punjabi)' }
                ].map(item => (
                  <button
                    key={item.code}
                    style={{
                      background: lang === item.code ? 'rgba(0,240,255,0.2)' : 'transparent',
                      border: 'none',
                      color: lang === item.code ? '#00f0ff' : '#ffffff',
                      padding: '8px 12px',
                      textAlign: 'left',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                    onClick={() => {
                      setLang(item.code);
                      setShowLangMenu(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              className="tactical-btn"
              style={{ padding: '6px 12px', position: 'relative', fontSize: '13px' }}
              onClick={() => setShowNotifModal(!showNotifModal)}
            >
              🔔
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ff2a55',
                  color: '#fff',
                  fontSize: '10px',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifModal && (
              <div style={{
                position: 'absolute',
                top: '42px',
                right: 0,
                background: '#101929',
                border: '1px solid #1c2b42',
                borderRadius: '12px',
                padding: '16px',
                width: '340px',
                zIndex: 110,
                boxShadow: '0 8px 30px rgba(0,0,0,0.8)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}>TACTICAL DISPATCH ALERTS</h4>
                  <span style={{ fontSize: '11px', color: '#00f0ff' }}>{notifications.length} Active</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                  {notifications.length === 0 && (
                    <div style={{ color: '#7f93b0', fontSize: '12px', textAlign: 'center', padding: '12px' }}>No active alerts.</div>
                  )}
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      background: '#090D16',
                      border: `1px solid ${n.unread ? '#00f0ff' : '#1c2b42'}`,
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: n.unread ? '#00f0ff' : '#7f93b0', marginBottom: '4px', fontWeight: 600 }}>
                        <span>{n.title}</span>
                        <span style={{ fontSize: '10px', color: '#7f93b0' }}>{n.timestamp}</span>
                      </div>
                      <p style={{ color: '#7f93b0', lineHeight: 1.3, marginBottom: '6px' }}>{n.message}</p>
                      
                      {/* Interactive Onboarding Approvals for Commanders */}
                      {isCommander && n.type === 'ONBOARDING_REQUEST' && n.unread && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', borderTop: '1px solid #1c2b42', paddingTop: '8px' }}>
                          <button 
                            onClick={() => approveOnboarding(n.id)}
                            className="tactical-btn"
                            style={{ padding: '4px 8px', fontSize: '10px', flex: 1, borderColor: '#00f0ff', color: '#00f0ff' }}
                          >
                            ✓ APPROVE
                          </button>
                          <button 
                            onClick={() => denyOnboarding(n.id)}
                            className="tactical-btn danger-btn"
                            style={{ padding: '4px 8px', fontSize: '10px', flex: 1 }}
                          >
                            ✕ DENY
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings & Account Switcher Button */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="tactical-btn"
            style={{ padding: '6px 12px', fontSize: '12px' }}
            title="Settings & Account Management"
          >
            ⚙️ Settings
          </button>

          {/* Officer Profile Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#090D16',
            border: `1px solid ${isCommander ? '#ffd700' : '#1c2b42'}`,
            padding: '6px 14px',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: isCommander ? '#ffd700' : '#00f0ff',
              color: '#090D16',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px'
            }}>
              {isCommander ? "K" : "O"}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>
                {user?.name || "Commander Keshav"}
              </div>
              <div style={{ fontSize: '10px', color: isCommander ? '#ffd700' : '#7f93b0', fontFamily: 'var(--font-mono)' }}>
                {user?.badge_id || "HQ-SUP-KESHAV"}
              </div>
            </div>
          </div>

          {/* Direct Logout Button */}
          <button
            onClick={handleLogout}
            className="tactical-btn danger-btn"
            style={{ padding: '6px 12px', fontSize: '11px' }}
            title="Logout and return to Login Screen"
          >
            {t('logout')} ⏻
          </button>
        </div>
      </header>

      {/* Settings & Account Management Modal */}
      {showSettingsModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(9,13,22,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div className="tactical-card" style={{ width: '560px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1c2b42', paddingBottom: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#00f0ff', fontSize: '20px' }}>
                ⚙️ SETTINGS &amp; ACCOUNT MANAGEMENT
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#ff2a55', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* 1. Instant Account Switcher (Without Logging Out) */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', color: '#ffd700', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                1. INSTANT ROLE / CLEARANCE SWITCHER
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={switchToCommander}
                  className="tactical-btn commander-btn"
                  style={{ padding: '12px', fontSize: '12px', textAlign: 'center', flexDirection: 'column' }}
                >
                  <strong style={{ fontSize: '13px' }}>⭐ Commander Keshav HQ</strong>
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>Gold/Crimson Theme // VIP Clearance</span>
                </button>

                <button
                  type="button"
                  onClick={switchToOfficer}
                  className="tactical-btn"
                  style={{ padding: '12px', fontSize: '12px', textAlign: 'center', flexDirection: 'column' }}
                >
                  <strong style={{ fontSize: '13px' }}>🛡️ Field Officer Workspace</strong>
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>Cyan Theme // Investigation Unit</span>
                </button>
              </div>
            </div>

            {/* 2. Add New Police Personnel Account */}
            <div style={{ marginBottom: '24px', background: '#090D16', padding: '16px', borderRadius: '10px', border: '1px solid #1c2b42' }}>
              <span style={{ fontSize: '12px', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                2. PROVISION NEW OFFICER ACCOUNT
              </span>

              {accCreatedNotice ? (
                <div style={{ color: '#00f0ff', textAlign: 'center', padding: '12px', fontSize: '13px' }}>
                  ✓ New Officer Account Successfully Provisioned into Active Directory!
                </div>
              ) : (
                <form onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#7f93b0' }}>Officer Name</label>
                      <input
                        required
                        placeholder="e.g. Insp. Rohit Sharma"
                        value={newAccName}
                        onChange={e => setNewAccName(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: '#101929', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px', fontSize: '12px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#7f93b0' }}>Department Badge ID</label>
                      <input
                        required
                        placeholder="OFFICER-DL-9912"
                        value={newAccBadge}
                        onChange={e => setNewAccBadge(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: '#101929', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px', fontSize: '12px' }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="tactical-btn" style={{ padding: '8px', fontSize: '12px', marginTop: '6px' }}>
                    ➕ Add Officer to Terminal
                  </button>
                </form>
              )}
            </div>

            {/* 3. Zero-Trust Security Policies & Full Logout */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #1c2b42' }}>
              <div style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
                FLAG_SECURE: LOCK_ON | TLS 1.3
              </div>

              <button
                onClick={handleLogout}
                className="tactical-btn danger-btn"
                style={{ padding: '10px 18px', fontSize: '12px' }}
              >
                Secure Logout &amp; Return to Login Screen ⏻
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};