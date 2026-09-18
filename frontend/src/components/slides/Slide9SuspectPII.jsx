import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Slide9SuspectPII = () => {
  const { activeCase, unlockPii, unmaskedPiiData, setCurrentSlide } = useCase();
  const { user, isCommander } = useAuth();
  const { t } = useLanguage();

  const [isUnmasking, setIsUnmasking] = useState(false);
  const [auditNotice, setAuditNotice] = useState(null);

  const handleUnlockIdentity = async () => {
    setIsUnmasking(true);
    try {
      const badge = user?.badge_id || "HQ-SUP-KESHAV";
      const res = await unlockPii(badge);
      setAuditNotice(`AUDIT RECORD: ${res.audit_id || 'AUD-PII-007'} LOGGED TO CENTRAL POLICE LEDGER`);
    } finally {
      setIsUnmasking(false);
    }
  };

  const isMasked = !unmaskedPiiData;

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Workflow Progress Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: '#101929',
        border: '1px solid #1c2b42',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'var(--font-mono)',
        color: '#7f93b0'
      }}>
        <span>STEP 5 OF 6: CONDITIONAL SUSPECT PII CLEARANCE</span>
        <span style={{ color: '#00f0ff' }}>STATUS: {isMasked ? "🔒 ENCRYPTED / MASKED" : "🔓 UNLOCKED & AUDITED"}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#ffffff' }}>
            {t('suspect_profile_title')}
          </h2>
          <p style={{ color: '#7f93b0', fontSize: '12px' }}>
            Zero-Trust Protected Intelligence Profile. Personal data is encrypted &amp; masked until authorized unlock.
          </p>
        </div>

        {auditNotice && (
          <div style={{
            background: 'rgba(0, 240, 255, 0.15)',
            border: '1px solid #00f0ff',
            padding: '6px 14px',
            borderRadius: '6px',
            color: '#00f0ff',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)'
          }}>
            ✓ {auditNotice}
          </div>
        )}
      </div>

      <div className="tactical-card" style={{ padding: '28px' }}>
        {/* Suspect Header / Mugshot & Core Demographics */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #1c2b42', paddingBottom: '20px', marginBottom: '20px' }}>
          <div style={{
            width: '120px',
            height: '140px',
            borderRadius: '10px',
            background: '#090D16',
            border: '2px solid #ff2a55',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{ fontSize: '48px' }}>👤</span>
            <span style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: '#ff2a55',
              color: '#ffffff',
              fontSize: '10px',
              textAlign: 'center',
              fontWeight: 700
            }}>
              RED ALERT
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#ffffff' }}>
                  {activeCase?.suspect_name || "Tariq Mahmood @ Tiger"}
                </h3>
                <p style={{ color: '#7f93b0', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                  SYNDICATE ALIAS: "SULTAN BHAI" | CASE FILE: {activeCase?.case_id || "CASE-2026-8942"}
                </p>
              </div>

              <span style={{
                background: 'rgba(255, 42, 85, 0.15)',
                border: '1px solid #ff2a55',
                color: '#ff2a55',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}>
                CENTRALITY: 0.984 // HIGH RISK
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
              <div style={{ background: '#090D16', padding: '10px', borderRadius: '8px', border: '1px solid #1c2b42' }}>
                <span style={{ fontSize: '10px', color: '#7f93b0', display: 'block' }}>GENDER / AGE</span>
                <strong style={{ color: '#ffffff', fontSize: '13px' }}>Male / 42 Yrs</strong>
              </div>
              <div style={{ background: '#090D16', padding: '10px', borderRadius: '8px', border: '1px solid #1c2b42' }}>
                <span style={{ fontSize: '10px', color: '#7f93b0', display: 'block' }}>TARGET VEHICLE</span>
                <strong style={{ color: '#ffd700', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>{activeCase?.vehicle_plate || "DL 8C A 9921"}</strong>
              </div>
              <div style={{ background: '#090D16', padding: '10px', borderRadius: '8px', border: '1px solid #1c2b42' }}>
                <span style={{ fontSize: '10px', color: '#7f93b0', display: 'block' }}>PRIMARY OPERATION</span>
                <strong style={{ color: '#00f0ff', fontSize: '13px' }}>{activeCase?.crime_type || "Hawala Money Laundering"}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* SENSITIVE MASKED PII SECTION */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ color: '#ffd700', fontFamily: 'var(--font-display)', fontSize: '18px' }}>
              RESTRICTED CITIZEN PII &amp; ASSET RECORDS
            </h4>
            {isMasked && (
              <span style={{ fontSize: '11px', color: '#ff2a55', fontFamily: 'var(--font-mono)' }}>
                🔒 PII ENCRYPTION ACTIVE // REQUIRING AUDIT SIGNATURE
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ background: '#090D16', padding: '14px', borderRadius: '10px', border: '1px solid #1c2b42' }}>
              <span style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>
                AADHAAR UID NUMBER
              </span>
              <div style={{
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                color: isMasked ? '#7f93b0' : '#00f0ff',
                filter: isMasked ? 'blur(4px)' : 'none',
                transition: 'filter 0.3s ease'
              }}>
                {isMasked ? "XXXX-XXXX-1829" : (unmaskedPiiData?.aadhaar_no || "7812 9044 1829")}
              </div>
            </div>

            <div style={{ background: '#090D16', padding: '14px', borderRadius: '10px', border: '1px solid #1c2b42' }}>
              <span style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>
                PRIMARY BANK CURRENT A/C
              </span>
              <div style={{
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                color: isMasked ? '#7f93b0' : '#00f0ff',
                filter: isMasked ? 'blur(4px)' : 'none',
                transition: 'filter 0.3s ease'
              }}>
                {isMasked ? "YES BANK ••••••••••••0192" : (unmaskedPiiData?.primary_bank || "Yes Bank Current A/C #009188200192 (IFSC: YESB0000091)")}
              </div>
            </div>

            <div style={{ background: '#090D16', padding: '14px', borderRadius: '10px', border: '1px solid #1c2b42' }}>
              <span style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>
                RESIDENTIAL ADDRESS &amp; SAFEHOUSES
              </span>
              <div style={{
                fontSize: '13px',
                color: isMasked ? '#7f93b0' : '#ffffff',
                filter: isMasked ? 'blur(4px)' : 'none',
                transition: 'filter 0.3s ease'
              }}>
                {isMasked ? "Flat #402, Al-Madina Residency, Chandni Chowk, Delhi" : (unmaskedPiiData?.residential_address || "Flat #402, Al-Madina Residency, Chandni Chowk, Delhi - 110006")}
              </div>
            </div>

            <div style={{ background: '#090D16', padding: '14px', borderRadius: '10px', border: '1px solid #1c2b42' }}>
              <span style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>
                FAMILY &amp; NETWORK COURIERS
              </span>
              <div style={{
                fontSize: '13px',
                color: isMasked ? '#7f93b0' : '#ffffff',
                filter: isMasked ? 'blur(4px)' : 'none',
                transition: 'filter 0.3s ease'
              }}>
                {isMasked ? "Brother: Zubair (+91 98221•••••) | Spouse: Farhana" : "Brother: Zubair Mahmood (+91 98221 00912) | Spouse: Farhana Mahmood"}
              </div>
            </div>
          </div>
        </div>

        {/* VERIFY & CONFIRM IDENTITY BUTTON */}
        {isMasked && (
          <div style={{
            background: 'rgba(255, 215, 0, 0.08)',
            border: '1px solid #ffd700',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ffd700', fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
              SECURITY AUDIT CLEARANCE REQUIRED
            </div>
            <p style={{ color: '#7f93b0', fontSize: '12px', maxWidth: '600px', margin: '0 auto 16px' }}>
              Unmasking citizen PII logs an irreversible security audit record containing Officer Badge, Timestamp, and Terminal IP.
            </p>

            <button
              onClick={handleUnlockIdentity}
              disabled={isUnmasking}
              className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
              style={{ padding: '12px 36px', fontSize: '13px' }}
            >
              {isUnmasking ? "LOGGING AUDIT & UNMASKING..." : "🔓 " + t('verify_confirm_identity')}
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button
          onClick={() => setCurrentSlide(8)}
          className="tactical-btn"
          style={{ background: 'transparent', borderColor: '#1c2b42', color: '#7f93b0' }}
        >
          ← Back to Graph Intelligence (Step 4)
        </button>

        <button
          onClick={() => setCurrentSlide(10)}
          className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
          style={{ padding: '14px 32px', fontSize: '14px' }}
        >
          GENERATE FINAL FORENSIC DOSSIER (STEP 6) →
        </button>
      </div>
    </div>
  );
};