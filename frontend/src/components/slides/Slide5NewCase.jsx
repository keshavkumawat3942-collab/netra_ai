import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Slide5NewCase = () => {
  const { createNewCase, setCurrentSlide } = useCase();
  const { user, isCommander } = useAuth();
  const { t } = useLanguage();

  const autoCaseId = `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const autoInvestigator = user?.name || "Commander Keshav Kumawat";
  const autoBadge = user?.badge_id || "HQ-SUP-KESHAV";
  const autoTimestamp = new Date().toLocaleString();

  const [title, setTitle] = useState('Operation DarkNet Hawala & Crypto Laundering Syndicate');
  const [suspectName, setSuspectName] = useState('Tariq Mahmood @ Tiger');
  const [vehiclePlate, setVehiclePlate] = useState('DL 8C A 9921');
  const [crimeType, setCrimeType] = useState('Hawala Money Laundering');
  const [priority, setPriority] = useState('CRITICAL');
  const [description, setDescription] = useState('Multi-state hawala cartel operating encrypted communication lines and darknet crypto mixers to launder extortion proceeds. Intercepted calls link to master operative Tariq @ Tiger.');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNewCase({
        case_id: autoCaseId,
        title,
        suspect_name: suspectName,
        vehicle_plate: vehiclePlate,
        crime_type: crimeType,
        investigator: autoInvestigator,
        badge_id: autoBadge,
        priority,
        description
      });
      setCurrentSlide(6); // Move to Step 6 (Evidence Ingestion)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '850px', margin: '0 auto' }}>
      {/* Workflow Progress Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        padding: '8px 16px',
        background: '#101929',
        border: '1px solid #1c2b42',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'var(--font-mono)',
        color: '#7f93b0'
      }}>
        <span>STEP 1 OF 6: CASE GENESIS & TARGET REGISTRATION</span>
        <span style={{ color: '#00f0ff' }}>CASE ID: {autoCaseId}</span>
      </div>

      <div className="tactical-card" style={{ padding: '32px' }}>
        <div style={{ borderBottom: '1px solid #1c2b42', paddingBottom: '16px', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#ffffff', letterSpacing: '1px' }}>
            CREATE NEW POLICE INVESTIGATION FILE
          </h2>
          <p style={{ color: '#7f93b0', fontSize: '13px' }}>
            Enter target intelligence, prime suspect details, and incident briefing to initialize the evidence pipeline.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Read-Only Auto Gen Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                AUTO CASE ID
              </label>
              <input
                disabled
                value={autoCaseId}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#090D16',
                  border: '1px solid #00f0ff',
                  borderRadius: '6px',
                  color: '#00f0ff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                INVESTIGATING OFFICER
              </label>
              <input
                disabled
                value={autoInvestigator}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                SYSTEM TIMESTAMP
              </label>
              <input
                disabled
                value={autoTimestamp}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '6px',
                  color: '#7f93b0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px'
                }}
              />
            </div>
          </div>

          {/* Case Title */}
          <div>
            <label style={{ fontSize: '12px', color: '#ffffff', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              CASE TITLE / OPERATION CODENAME *
            </label>
            <input
              required
              placeholder="e.g. Operation DarkNet Hawala & Crypto Laundering Syndicate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#090D16',
                border: '1px solid #1c2b42',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Target Suspect & Target Vehicle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#ffffff', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                PRIME SUSPECT IDENTIFIER / ALIAS *
              </label>
              <input
                required
                placeholder="e.g. Tariq Mahmood @ Tiger"
                value={suspectName}
                onChange={(e) => setSuspectName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '8px',
                  color: '#00f0ff',
                  fontWeight: 600,
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#ffffff', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                TARGET VEHICLE / ANPR PLATE
              </label>
              <input
                placeholder="e.g. DL 8C A 9921"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '8px',
                  color: '#ffd700',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Crime Category & Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                CRIME CATEGORY
              </label>
              <select
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              >
                <option value="Hawala Money Laundering">Hawala Money Laundering</option>
                <option value="Cyber Syndicate">Cyber Syndicate</option>
                <option value="Narcotics Trafficking">Narcotics Trafficking</option>
                <option value="ANPR Vehicle Tracking">ANPR Vehicle Tracking</option>
                <option value="Homicide Investigation">Homicide Investigation</option>
                <option value="Illegal Weapons Trade">Illegal Weapons Trade</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                PRIORITY LEVEL
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  borderRadius: '8px',
                  color: priority === 'CRITICAL' ? '#ff2a55' : (priority === 'HIGH' ? '#ffd700' : '#00f0ff'),
                  fontSize: '13px',
                  fontWeight: 700
                }}
              >
                <option value="CRITICAL">🔴 CRITICAL (Immediate Intercept)</option>
                <option value="HIGH">🟡 HIGH (Active Surveillance)</option>
                <option value="LOW">🔵 LOW (Standard Routine)</option>
              </select>
            </div>
          </div>

          {/* Incident Description */}
          <div>
            <label style={{ fontSize: '12px', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              INCIDENT BRIEFING & INVESTIGATION SCOPE *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#090D16',
                border: '1px solid #1c2b42',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '13px',
                lineHeight: 1.5,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '16px', borderTop: '1px solid #1c2b42' }}>
            <button
              type="button"
              onClick={() => setCurrentSlide(3)}
              className="tactical-btn"
              style={{ background: 'transparent', borderColor: '#1c2b42', color: '#7f93b0' }}
            >
              ← Back to Dashboard
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              {loading ? "SAVING..." : "SAVE & PROCEED TO EVIDENCE INGESTION (STEP 2) →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};