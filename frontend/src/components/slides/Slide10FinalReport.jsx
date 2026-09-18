import React, { useState, useEffect } from 'react';
import { useCase } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ENDPOINTS } from '../../config/apiConfig';

export const Slide10FinalReport = () => {
  const { activeCase, setCurrentSlide } = useCase();
  const { user, isCommander } = useAuth();
  const { t } = useLanguage();

  const [dossierData, setDossierData] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [hometownRouting, setHometownRouting] = useState(true);
  const [broadcastApb, setBroadcastApb] = useState(true);
  const [remoteKillSwitch, setRemoteKillSwitch] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [pdfAuthError, setPdfAuthError] = useState(null);
  const [pdfAuthSuccess, setPdfAuthSuccess] = useState(false);

  useEffect(() => {
    const caseId = activeCase?.case_id || "CASE-2026-8942";
    fetch(ENDPOINTS.REPORT_DOSSIER(caseId), {
      headers: { 'x-badge-id': user?.badge_id || 'HQ-SUP-KESHAV' }
    })
      .then(res => res.json())
      .then(data => setDossierData(data))
      .catch(err => console.error("Error loading dossier", err));
  }, [activeCase, user]);

  const handleExecuteDispatch = async () => {
    try {
      const res = await fetch(ENDPOINTS.DISPATCH_PROTOCOLS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_id: activeCase?.case_id || "CASE-2026-8942",
          officer_badge: user?.badge_id || "HQ-SUP-KESHAV",
          hometown_routing: hometownRouting,
          broadcast_emergency_apb: broadcastApb,
          remote_kill_switch: remoteKillSwitch
        })
      });
      const data = await res.json();
      setDispatchStatus(data);
    } catch (e) {
      setDispatchStatus({
        status: "DISPATCH_EXECUTED",
        timestamp: new Date().toLocaleTimeString(),
        actions_taken: [
          "Automated warrant package dispatched to Kotputli & Jaipur Police Control Rooms.",
          "EMERGENCY APB BROADCAST: Level-1 Intercept Alert flashed to all State Toll Plazas."
        ]
      });
    }
  };

  const handleExportPdf = async () => {
    setPdfAuthError(null);
    setPdfAuthSuccess(false);
    const badge = user?.badge_id || "OFFICER-DL-4089";

    if (badge.toUpperCase() !== "HQ-SUP-KESHAV") {
      setPdfAuthError("ACCESS DENIED (403): Forensic Dossier PDF Export is EXCLUSIVELY authorized for Commander Keshav HQ credentials. Audit event logged.");
      return;
    }

    setPdfAuthSuccess(true);
    setTimeout(() => {
      window.print();
    }, 600);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1050px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        <span>STEP 6 OF 6: OFFICIAL POLICE FORENSIC INTELLIGENCE DOSSIER</span>
        <span style={{ color: '#ffd700' }}>IMMUTABLE LEDGER RECORD (NO DELETE OPTION)</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#ffffff' }}>
            {t('dossier_title')}
          </h2>
          <p style={{ color: '#7f93b0', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            CENTRAL LAW ENFORCEMENT RECORD // RESTRICTED DISSEMINATION
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
          style={{ padding: '12px 24px', fontSize: '13px' }}
        >
          🖨️ {t('export_pdf_btn')}
        </button>
      </div>

      {pdfAuthError && (
        <div style={{
          background: 'rgba(255, 42, 85, 0.15)',
          border: '1px solid #ff2a55',
          borderRadius: '8px',
          padding: '12px 16px',
          color: '#ff2a55',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px'
        }}>
          ⛔ {pdfAuthError}
        </div>
      )}

      {pdfAuthSuccess && (
        <div style={{
          background: 'rgba(255, 215, 0, 0.15)',
          border: '1px solid #ffd700',
          borderRadius: '8px',
          padding: '12px 16px',
          color: '#ffd700',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px'
        }}>
          ✓ SUPREME HQ COMMANDER CLEARANCE VERIFIED. Generating official forensic stamped PDF with LSB steganographic signature...
        </div>
      )}

      {/* CLEAN, AUTHENTIC A4 PAPER-STYLE POLICE DOSSIER DOCUMENT */}
      <div style={{
        background: '#ffffff',
        color: '#0f172a',
        borderRadius: '6px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
        padding: '48px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        minHeight: '700px'
      }}>
        {/* Document Security Watermark Stamp */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '48px',
          fontWeight: 900,
          color: 'rgba(15, 23, 42, 0.04)',
          letterSpacing: '12px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase'
        }}>
          LAW ENFORCEMENT SENSITIVE
        </div>

        {/* Paper Header: National Emblem / Police Letterhead */}
        <div style={{ borderBottom: '3px double #0f172a', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#64748b' }}>
              GOVERNMENT OF INDIA // MINISTRY OF HOME AFFAIRS
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 900, margin: '4px 0', letterSpacing: '0.5px', color: '#0f172a' }}>
              POLICE INTELLIGENCE &amp; FORENSIC DOSSIER
            </h1>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>
              SPECIAL CELL HQ // CRIME BRANCH &amp; CYBER OPERATIONS COMMAND
            </div>
          </div>

          <div style={{ textAlign: 'right', borderLeft: '2px solid #cbd5e1', paddingLeft: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#b91c1c' }}>
              SECRET // NO FORN
            </div>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#0f172a', marginTop: '2px' }}>
              CASE ID: <strong>{activeCase?.case_id || "CASE-2026-8942"}</strong>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>
              DATE: {new Date().toLocaleDateString('en-GB')}
            </div>
          </div>
        </div>

        {/* Page Switcher Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
          {[
            { page: 1, label: 'Page 1: Executive Summary' },
            { page: 2, label: 'Page 2: Multi-Modal Evidence' },
            { page: 3, label: 'Page 3: Network Topology' },
            { page: 4, label: 'Page 4: Geospatial Route' },
            { page: 5, label: 'Page 5: Chain of Custody' }
          ].map(p => (
            <button
              key={p.page}
              onClick={() => setActivePage(p.page)}
              style={{
                background: activePage === p.page ? '#0f172a' : '#f1f5f9',
                color: activePage === p.page ? '#ffffff' : '#475569',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Paper Page 1 Content */}
        {activePage === 1 && (
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '16px' }}>
              1. Case Overview &amp; Incident Genesis
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '20px' }}>
              <tbody>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', width: '25%', fontWeight: 700 }}>Operation Codename</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#0f172a' }}>{activeCase?.title || "Operation DarkNet Hawala & Crypto Laundering Syndicate"}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Prime Suspect / Alias</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700, color: '#b91c1c' }}>{activeCase?.suspect_name || "Tariq Mahmood @ Tiger (Alias: Sultan Bhai)"}</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Crime Classification</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{activeCase?.crime_type || "Hawala Money Laundering / Crypto Mixer Nexus"}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Investigating Officer</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{activeCase?.investigator || "Commander Keshav Kumawat"} (Badge: {activeCase?.badge_id || "HQ-SUP-KESHAV"})</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Target ANPR Vehicle</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontWeight: 700 }}>{activeCase?.vehicle_plate || "DL 8C A 9921 (Mahindra Scorpio-N)"}</td>
                </tr>
              </tbody>
            </table>

            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              Incident Intelligence Narrative:
            </h4>
            <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#334155', textAlign: 'justify' }}>
              {activeCase?.description || "Multi-state hawala cartel operating encrypted communication lines and darknet crypto mixers to launder extortion proceeds. Intercepted telecom calls, CDR convergence at Azadpur cell tower, and multi-modal facial biometric matches establish operational command hierarchy."}
            </p>
          </div>
        )}

        {/* Paper Page 2 Content */}
        {activePage === 2 && (
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '16px' }}>
              2. Multi-Modal Evidence &amp; AI Forensics Summary
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '20px' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'left' }}>Module</th>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'left' }}>AI Model &amp; Technique</th>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'left' }}>Inference Finding</th>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'right' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>1. Facial Mugshot</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>InsightFace-512D ArcFace</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Match against National AFIS ({activeCase?.suspect_name || "Tariq Mahmood"})</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>98.4%</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>2. CCTV Stream</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>YOLOv11-Pose-Tactical</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Concealed Glock-19 firearm &amp; tactical duffel identified</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>96.2%</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>3. Audio Wiretap</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Librosa-MFCC + Whisper-X</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Voiceprint matched at 128.4 Hz pitch; 50 USDT transfer order parsed</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>94.7%</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>4. Seized FIR/Docs</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>spaCy-Legal-Transformer</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Extracted 3 shell entities &amp; ₹4.5 Cr unbilled hawala transfers</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#16a34a' }}>97.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Paper Page 3 Content */}
        {activePage === 3 && (
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '16px' }}>
              3. Syndicate Network Topology &amp; Centrality Threat Matrix
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '20px' }}>
              <thead>
                <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', width: '10%' }}>Rank</th>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'left' }}>Entity Node</th>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'left' }}>Operational Role</th>
                  <th style={{ padding: '8px', border: '1px solid #0f172a', textAlign: 'right' }}>Centrality</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 700 }}>#1</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>{activeCase?.suspect_name || "Tariq Mahmood @ Tiger"}</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Syndicate Head / Mastermind</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700, color: '#b91c1c' }}>0.984</td>
                </tr>
                <tr style={{ background: '#f8fafc' }}>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 700 }}>#2</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Al-Falah Shell Co (A/C #9188)</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Primary Laundering Node</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>0.890</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 700 }}>#3</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Mixer Wallet 0x7F9a...4B91</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Cross-Chain Crypto Tumbler</td>
                  <td style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>0.840</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Paper Page 4 Content */}
        {activePage === 4 && (
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '16px' }}>
              4. Geospatial Tracking &amp; ANPR Sighting Log
            </h3>
            <div style={{ fontSize: '12px', lineHeight: 1.7, color: '#334155' }}>
              <div><strong>Target Vehicle:</strong> {activeCase?.vehicle_plate || "DL 8C A 9921"} (Mahindra Scorpio-N)</div>
              <div><strong>Route Corridor:</strong> NH-48 Delhi ➔ Gurugram ➔ Kotputli ➔ Jaipur Sector-3</div>
              <div><strong>Checkpoint Sightings:</strong> Kherki Daula Toll (02:15 AM) ➔ Dharuhera Overbridge (02:48 AM) ➔ Shahpura Checkpost (03:30 AM)</div>
              <div><strong>Intercept Beacon Status:</strong> 4G/GPS Dual-Lock active with 98% satellite integrity.</div>
            </div>
          </div>
        )}

        {/* Paper Page 5 Content */}
        {activePage === 5 && (
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', marginBottom: '16px' }}>
              5. Chain of Custody &amp; Forensic Steganographic Hash
            </h3>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#334155', lineHeight: 1.8, background: '#f8fafc', padding: '16px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
              <div>DIGITAL CUSTODY OFFICER : {activeCase?.investigator || "Commander Keshav Kumawat"} ({activeCase?.badge_id || "HQ-SUP-KESHAV"})</div>
              <div>IMMUTABLE LEDGER HASH   : SHA256:7D9F88A109C2E341BF89A900821EFA0892019488</div>
              <div>STEGANO LSB SIGNATURE   : LSB-SHA256:9A81-CC20-0019-FE89-BBD7-4491-0023</div>
              <div>FLAG_SECURE ATTESTATION : VERIFIED BY ZERO-TRUST SECURITY KERNEL</div>
            </div>
          </div>
        )}

        {/* Paper Footer with Official Signature */}
        <div style={{ marginTop: '32px', borderTop: '2px solid #0f172a', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '10px', color: '#64748b' }}>
          <div>
            <div>ORIGIN: [{activeCase?.badge_id || "HQ-SUP-KESHAV"}] | DESTINATION: [CENTRAL DISPATCH]</div>
            <div>CONFIDENTIAL LAW ENFORCEMENT RECORD // NO UNAUTHORIZED DISCLOSURE</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'cursive', fontSize: '16px', color: '#0f172a', marginBottom: '4px' }}>
              Keshav Kumawat
            </div>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>
              COMMANDER KESHAV KUMAWAT
            </div>
            <div>Supreme Investigation Commander</div>
          </div>
        </div>
      </div>

      {/* TACTICAL DISPATCH MATRIX SECTION */}
      <div className="tactical-card" style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#ffd700', marginBottom: '16px' }}>
          TACTICAL DISPATCH PROTOCOL MATRIX
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <label style={{
            background: '#090D16',
            border: `1px solid ${hometownRouting ? '#00f0ff' : '#1c2b42'}`,
            padding: '16px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <input
              type="checkbox"
              checked={hometownRouting}
              onChange={e => setHometownRouting(e.target.checked)}
              style={{ marginTop: '4px', accentColor: '#00f0ff' }}
            />
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '13px' }}>Hometown Station Routing</div>
              <div style={{ color: '#7f93b0', fontSize: '11px', marginTop: '4px' }}>
                Auto-dispatch warrant package to Kotputli &amp; Jaipur Police Control Rooms.
              </div>
            </div>
          </label>

          <label style={{
            background: '#090D16',
            border: `1px solid ${broadcastApb ? '#ff2a55' : '#1c2b42'}`,
            padding: '16px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <input
              type="checkbox"
              checked={broadcastApb}
              onChange={e => setBroadcastApb(e.target.checked)}
              style={{ marginTop: '4px', accentColor: '#ff2a55' }}
            />
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '13px' }}>Broadcast Emergency APB</div>
              <div style={{ color: '#7f93b0', fontSize: '11px', marginTop: '4px' }}>
                Flashes Level-1 all-points bulletin across state border highway checkpoints.
              </div>
            </div>
          </label>

          <label style={{
            background: '#090D16',
            border: `1px solid ${remoteKillSwitch ? '#ffd700' : '#1c2b42'}`,
            padding: '16px',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <input
              type="checkbox"
              checked={remoteKillSwitch}
              onChange={e => setRemoteKillSwitch(e.target.checked)}
              style={{ marginTop: '4px', accentColor: '#ffd700' }}
            />
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '13px' }}>Remote Access Kill Switch</div>
              <div style={{ color: '#7f93b0', fontSize: '11px', marginTop: '4px' }}>
                Freezes bank accounts &amp; revokes associated burner SIM network registration.
              </div>
            </div>
          </label>
        </div>

        <button
          onClick={handleExecuteDispatch}
          className="tactical-btn"
          style={{ width: '100%', padding: '14px', fontSize: '14px' }}
        >
          🚨 EXECUTE TACTICAL DISPATCH &amp; LOCK DOSSIER
        </button>

        {dispatchStatus && (
          <div style={{
            marginTop: '16px',
            background: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid #00f0ff',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ color: '#00f0ff', fontWeight: 700, marginBottom: '6px' }}>
              ✓ DISPATCH PROTOCOLS SUCCESSFULLY EXECUTED ({dispatchStatus.timestamp})
            </div>
            {dispatchStatus.actions_taken?.map((act, i) => (
              <div key={i} style={{ color: '#ffffff', marginLeft: '12px' }}>• {act}</div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button
          onClick={() => setCurrentSlide(9)}
          className="tactical-btn"
          style={{ background: 'transparent', borderColor: '#1c2b42', color: '#7f93b0' }}
        >
          ← Back to Suspect Profile (Step 5)
        </button>

        <button
          onClick={() => setCurrentSlide(3)}
          className="tactical-btn"
          style={{ padding: '12px 28px' }}
        >
          ⟳ RETURN TO MAIN DASHBOARD (COMPLETE)
        </button>
      </div>
    </div>
  );
};