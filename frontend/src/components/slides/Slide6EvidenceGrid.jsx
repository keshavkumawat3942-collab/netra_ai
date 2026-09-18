import React, { useState, useRef } from 'react';
import { useCase } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Slide6EvidenceGrid = () => {
  const { activeCase, evidenceSlots, updateEvidenceSlot, setCurrentSlide } = useCase();
  const { t } = useLanguage();
  const { isCommander } = useAuth();
  const [activePickerModule, setActivePickerModule] = useState(null);
  
  // Custom manual intel entities - all blank by default
  const [customEntities, setCustomEntities] = useState({
    burnerPhone: '',
    bankAccount: '',
    firNumber: '',
    hawalaBroker: ''
  });

  const fileInputRefs = {
    photo: useRef(null),
    cctv: useRef(null),
    fingerprint: useRef(null),
    audio: useRef(null),
    document: useRef(null),
    cdr: useRef(null),
    anpr: useRef(null),
    finance: useRef(null)
  };

  const modules = [
    { key: 'photo', title: '1. Photo / Sketch', icon: '📸', accept: 'image/*', desc: 'Suspect Mugshot, Facial Crop or Forensic Sketch', defaultFile: 'tariq_cctv_crop.png', samples: ['tariq_cctv_crop.png', 'sketch_suspect_alpha.jpg', 'unidentified_nomatch_crop.png'] },
    { key: 'cctv', title: '2. CCTV Video Feed', icon: '🎥', accept: 'video/*', desc: 'Temporal Surveillance Footage & Vault Cam', defaultFile: 'cctv_vault_feed_0828.mp4', samples: ['cctv_vault_feed_0828.mp4', 'atm_hallway_cam_02.mp4', 'traffic_junction_cam.mp4'] },
    { key: 'fingerprint', title: '3. Fingerprint Biometric', icon: '🖐️', accept: '.dat,.iso,.wsq', desc: 'Latent Friction Ridge or Digital Sensor AFIS Data', defaultFile: 'latent_print_vault_handle.dat', samples: ['latent_print_vault_handle.dat', 'left_thumb_whorl.iso', 'palm_print_counter.dat'] },
    { key: 'audio', title: '4. Audio Wiretap', icon: '🎙️', accept: 'audio/*', desc: 'Intercepted VoIP / Wiretap Audio Recording', defaultFile: 'intercepted_wiretap_ch4.wav', samples: ['intercepted_wiretap_ch4.wav', 'extortion_call_voip.mp3', 'burner_conf_call.wav'] },
    { key: 'document', title: '5. PDF / FIR Document', icon: '📄', accept: '.pdf,.doc,.docx', desc: 'First Information Report & Seized Ledger Pages', defaultFile: 'fir_and_hawala_ledger.pdf', samples: ['fir_and_hawala_ledger.pdf', 'shell_co_incorporation.pdf', 'seizure_memo_delhi.pdf'] },
    { key: 'cdr', title: '6. CDR Tower Dump', icon: '📡', accept: '.csv,.xlsx,.txt', desc: 'Cell Detail Records & Base Station BTS Dump', defaultFile: 'cdr_tower_dump_sector44.csv', samples: ['cdr_tower_dump_sector44.csv', 'delhi_jaipur_bts_log.csv', 'burner_call_matrix.xlsx'] },
    { key: 'anpr', title: '7. ANPR Vehicle Plate', icon: '🚗', accept: 'image/*', desc: 'High-Speed Highway Toll Camera Plate Ingestion', defaultFile: 'anpr_plate_DL8CA9921.jpg', samples: ['anpr_plate_DL8CA9921.jpg', 'scorpio_toll_kherki.jpg', 'creta_cloned_plate.jpg'] },
    { key: 'finance', title: '8. Financial / Hawala', icon: '💳', accept: '.xlsx,.csv,.json', desc: 'Crypto Mixer Transaction Ledger & Bank Statements', defaultFile: 'crypto_wallet_flows.xlsx', samples: ['crypto_wallet_flows.xlsx', 'hawala_chit_records.csv', 'offshore_wire_flows.json'] }
  ];

  // Handle Real Native File Upload from User's Computer
  const handleRealFileUpload = (key, e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateEvidenceSlot(key, file.name);
    }
  };

  const handleSelectSample = (key, filename) => {
    updateEvidenceSlot(key, filename);
    setActivePickerModule(null);
  };

  const handleClearSlot = (key) => {
    updateEvidenceSlot(key, null);
  };

  const uploadedCount = Object.values(evidenceSlots).filter(Boolean).length;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        <span>STEP 2 OF 6: MULTI-MODAL EVIDENCE INGESTION</span>
        <span style={{ color: '#00f0ff' }}>
          ATTACHED: <strong style={{ color: '#fff' }}>{uploadedCount} of 8 MODULES</strong> | CASE: {activeCase?.case_id || "CASE-2026-8942"}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#ffffff' }}>
            {t('evidence_grid_title')}
          </h2>
          <p style={{ color: '#00f0ff', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            📁 Real File Upload &amp; Local Directory Ingestion ({t('evidence_path_restricted')})
          </p>
        </div>

        {/* Quick Batch Autofill All 8 Modules */}
        <button
          onClick={() => {
            modules.forEach(m => updateEvidenceSlot(m.key, m.defaultFile));
          }}
          className="tactical-btn"
          style={{ fontSize: '11px', padding: '6px 14px' }}
        >
          ⚡ Load All 8 SIH Evidence Presets
        </button>
      </div>

      {/* 8 Independent Modules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {modules.map(m => {
          const isUploaded = !!evidenceSlots[m.key];
          const filename = evidenceSlots[m.key];

          return (
            <div
              key={m.key}
              className={`tactical-card ${isUploaded ? 'tactical-card-active' : ''}`}
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
                background: isUploaded ? 'rgba(16, 25, 41, 0.95)' : '#090D16'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{m.icon}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: '#ffffff' }}>
                      {m.title}
                    </h4>
                  </div>

                  {/* Hidden Native File Input */}
                  <input
                    type="file"
                    ref={fileInputRefs[m.key]}
                    accept={m.accept}
                    onChange={(e) => handleRealFileUpload(m.key, e)}
                    style={{ display: 'none' }}
                  />

                  {/* Dual Action: Upload Real File OR Pick SIH Presets */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      type="button"
                      onClick={() => fileInputRefs[m.key].current?.click()}
                      title="Upload ANY file from your computer"
                      style={{
                        background: 'rgba(0, 240, 255, 0.15)',
                        border: '1px solid #00f0ff',
                        color: '#00f0ff',
                        borderRadius: '4px',
                        padding: '4px 6px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Upload ⬆
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePickerModule(m.key)}
                      title="Browse SIH 2026 Sample Presets"
                      style={{
                        background: '#090D16',
                        border: '1px solid #1c2b42',
                        color: '#7f93b0',
                        borderRadius: '4px',
                        padding: '4px 6px',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Presets 📂
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '11px', color: '#7f93b0', lineHeight: 1.3, marginBottom: '12px' }}>
                  {m.desc}
                </p>
              </div>

              <div>
                {/* Real-Time Status Display */}
                <div style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  background: isUploaded ? 'rgba(0, 240, 255, 0.1)' : 'rgba(28, 43, 66, 0.4)',
                  border: `1px solid ${isUploaded ? '#00f0ff' : '#1c2b42'}`,
                  color: isUploaded ? '#00f0ff' : '#7f93b0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                    {isUploaded ? `✓ ${filename}` : "Empty"}
                  </span>
                  {isUploaded && (
                    <span
                      onClick={() => handleClearSlot(m.key)}
                      style={{ cursor: 'pointer', color: '#ff2a55', fontWeight: 700, marginLeft: '6px' }}
                      title="Remove file"
                    >
                      ✕
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Intel Entities Form (Live Custom Data Entry) */}
      <div className="tactical-card" style={{ padding: '20px' }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#ffd700', marginBottom: '12px' }}>
          OPTIONAL: LIVE INTEL ENTITY OVERRIDES
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>Intercepted Phone / SIM</label>
            <input
              value={customEntities.burnerPhone}
              onChange={e => setCustomEntities({ ...customEntities, burnerPhone: e.target.value })}
              style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>Flagged Bank Current A/C</label>
            <input
              value={customEntities.bankAccount}
              onChange={e => setCustomEntities({ ...customEntities, bankAccount: e.target.value })}
              style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>Linked FIR Record No.</label>
            <input
              value={customEntities.firNumber}
              onChange={e => setCustomEntities({ ...customEntities, firNumber: e.target.value })}
              style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#7f93b0', display: 'block', marginBottom: '4px' }}>Hawala Broker Network</label>
            <input
              value={customEntities.hawalaBroker}
              onChange={e => setCustomEntities({ ...customEntities, hawalaBroker: e.target.value })}
              style={{ width: '100%', padding: '8px', background: '#090D16', border: '1px solid #1c2b42', color: '#fff', borderRadius: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button
          onClick={() => setCurrentSlide(5)}
          className="tactical-btn"
          style={{ background: 'transparent', borderColor: '#1c2b42', color: '#7f93b0' }}
        >
          ← Back to Case Details (Step 1)
        </button>

        <button
          onClick={() => setCurrentSlide(7)}
          className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
          style={{ padding: '14px 32px', fontSize: '14px' }}
        >
          PROCEED TO UNIVERSAL AI BATCH SCAN (STEP 3) →
        </button>
      </div>

      {/* Preset Samples Modal strictly for Desktop/sih 2026 */}
      {activePickerModule && (
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
          <div className="tactical-card" style={{ width: '520px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: '#00f0ff', fontSize: '18px' }}>
                INGEST EVIDENCE: {activePickerModule.toUpperCase()}
              </h3>
              <button
                onClick={() => setActivePickerModule(null)}
                style={{ background: 'transparent', border: 'none', color: '#ff2a55', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{
              background: '#090D16',
              border: '1px solid #1c2b42',
              padding: '10px',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#00f0ff',
              marginBottom: '16px'
            }}>
              🔒 LOCAL SECURE DIRECTORY:
              <div style={{ color: '#ffffff', marginTop: '2px' }}>C:\Users\Keshav Kumawat\Desktop\sih 2026</div>
            </div>

            <div style={{ fontSize: '12px', color: '#7f93b0', marginBottom: '10px' }}>
              Select evidence artifact from secure local directory:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {modules.find(m => m.key === activePickerModule)?.samples.map(filename => (
                <div
                  key={filename}
                  onClick={() => handleSelectSample(activePickerModule, filename)}
                  style={{
                    background: '#090D16',
                    border: '1px solid #1c2b42',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00f0ff'; e.currentTarget.style.color = '#00f0ff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1c2b42'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  <span>📄 {filename}</span>
                  <span style={{ fontSize: '11px', color: '#00f0ff' }}>Attach ↗</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePickerModule(null)}
              className="tactical-btn"
              style={{ width: '100%', padding: '10px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};