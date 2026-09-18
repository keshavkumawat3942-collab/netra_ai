import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const Slide7BatchScan = () => {
  const { executeBatchScan, scanResults, isScanning, evidenceSlots, setCurrentSlide, activeCase } = useCase();
  const { t } = useLanguage();
  const { isCommander } = useAuth();
  const [noMatchTriggered, setNoMatchTriggered] = useState(false);

  const handleTriggerScan = async () => {
    const res = await executeBatchScan();
    if (res?.results?.photo?.status === "NO_MATCH_FOUND" || res?.results?.photo?.flag === "UNIDENTIFIED_TRACKING_MODE") {
      setNoMatchTriggered(true);
    }
  };

  const results = scanResults?.results || {};
  const isDone = !!scanResults;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
        <span>STEP 3 OF 6: MULTI-MODAL PARALLEL AI INFERENCE</span>
        <span style={{ color: '#00f0ff' }}>
          CASE: {activeCase?.case_id || "CASE-2026-8942"} | STATUS: {isDone ? "RAW SCAN COMPLETE" : "READY TO SCAN"}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#ffffff' }}>
            UNIVERSAL AI EVIDENCE BATCH SCANNER
          </h2>
          <p style={{ color: '#7f93b0', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
            PARALLEL INFERENCE PIPELINE: YOLOv11 + INSIGHTFACE + SPACY NER + LIBROSA VOICEPRINT
          </p>
        </div>

        {scanResults && (
          <div style={{
            background: 'rgba(0,240,255,0.15)',
            border: '1px solid #00f0ff',
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: '#00f0ff'
          }}>
            BATCH EFFICIENCY: <strong>{scanResults.batch_efficiency_score}%</strong> (High-Assurance)
          </div>
        )}
      </div>

      {/* Universal Batch Scan Button Card */}
      <div className="tactical-card" style={{ padding: '24px', textAlign: 'center', background: 'radial-gradient(circle, #101929 0%, #090D16 100%)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>
          MULTI-MODAL EVIDENCE INGESTION PIPELINE READY
        </h3>
        <p style={{ color: '#7f93b0', fontSize: '12px', marginBottom: '20px' }}>
          Executes concurrent model inference across all attached evidence channels with tensor acceleration.
        </p>

        <button
          onClick={handleTriggerScan}
          disabled={isScanning}
          className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
          style={{
            padding: '16px 48px',
            fontSize: '16px',
            borderRadius: '12px',
            boxShadow: '0 0 25px rgba(0,240,255,0.3)'
          }}
        >
          {isScanning ? "⚡ RUNNING PARALLEL AI INFERENCE (YOLO + FACE + NER)..." : (isDone ? "⚡ RE-RUN BATCH SCAN" : "⚡ " + t('batch_scan_btn'))}
        </button>
      </div>

      {/* 0% Fallback Alert */}
      {noMatchTriggered && (
        <div style={{
          background: 'rgba(255, 42, 85, 0.15)',
          border: '1px solid #ff2a55',
          borderRadius: '12px',
          padding: '16px 20px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ color: '#ff2a55', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '4px' }}>
              ⚠️ NO FACIAL MATCH FOUND (0% SIMILARITY THRESHOLD)
            </div>
            <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
              Target face vector not registered in National AFIS repository. Switched to <strong>"Unidentified Suspect Profile"</strong> tracking mode.
            </div>
          </div>
          <span style={{ background: '#ff2a55', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
            FALLBACK ACTIVE
          </span>
        </div>
      )}

      {/* Results Grid */}
      {scanResults && (
        <div style={{ marginTop: '10px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#ffd700', marginBottom: '12px' }}>
            ⚠️ RAW EVIDENCE TELEMETRY REPORT (UNVERIFIED)
          </h3>
          <p style={{ color: '#7f93b0', fontSize: '12px', marginBottom: '16px' }}>
            Note: The data below represents raw AI feature extraction. Suspect identity is NOT CONFIRMED until cross-linked via Neo4j Graph Intelligence in Step 4.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div className="tactical-card" style={{ padding: '20px' }}>
              <h4 style={{ color: '#00f0ff', fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '12px' }}>
                📸 INSIGHTFACE 512-D ARC-FACE BIOMETRIC
              </h4>
              {results.photo ? (
                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Raw Vector Match: <strong style={{ color: results.photo.match_pct > 0 ? '#00f0ff' : '#ff2a55' }}>{results.photo.match_pct}% (Threshold: &gt;80%)</strong></div>
                  <div>Proposed Target: <strong style={{ color: '#ffffff' }}>{results.photo.identified_person || "UNKNOWN_TARGET"}</strong></div>
                  <div style={{ color: '#7f93b0', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>Raw DB Record ID: {results.photo.criminal_record_id || "N/A"}</div>
                </div>
              ) : <span style={{ color: '#7f93b0' }}>Slot was empty</span>}
            </div>

            <div className="tactical-card" style={{ padding: '20px' }}>
              <h4 style={{ color: '#00f0ff', fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '12px' }}>
                🎥 YOLOv11 TEMPORAL WEAPON &amp; OCR SCAN
              </h4>
              {results.cctv ? (
                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Threat Classification: <strong style={{ color: '#ff2a55' }}>{results.cctv.status} ({results.cctv.confidence}%)</strong></div>
                  <div>Raw Detected Objects: <span style={{ color: '#ffffff' }}>Concealed 9mm Glock-19, Tactical Bag, Sat-Phone</span></div>
                  <div style={{ color: '#7f93b0', fontSize: '11px' }}>{results.cctv.gait_analysis}</div>
                </div>
              ) : <span style={{ color: '#7f93b0' }}>Slot was empty</span>}
            </div>

            <div className="tactical-card" style={{ padding: '20px' }}>
              <h4 style={{ color: '#ffd700', fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '12px' }}>
                📄 SPACY LEGAL-TRANSFORMER (NER ENTITIES)
              </h4>
              {results.document ? (
                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Raw Persons Extracted: <span style={{ color: '#ffffff' }}>{activeCase?.suspect_name || "Tariq Mahmood"}, Irfan @ Chhotu, Adv. R.K. Singhal</span></div>
                  <div>Raw Orgs Extracted: <span style={{ color: '#00f0ff' }}>Al-Falah Overseas Logistics, Zion FinTech Exchange</span></div>
                  <div>Raw Amounts: <span style={{ color: '#ffd700' }}>₹4,50,00,000 INR, 500,000 USDT</span></div>
                </div>
              ) : <span style={{ color: '#7f93b0' }}>Slot was empty</span>}
            </div>

            <div className="tactical-card" style={{ padding: '20px' }}>
              <h4 style={{ color: '#ffd700', fontFamily: 'var(--font-display)', fontSize: '16px', marginBottom: '12px' }}>
                🎙️ LIBROSA VOICEPRINT &amp; NLP INTERCEPT
              </h4>
              {results.audio ? (
                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Raw MFCC Similarity: <strong style={{ color: '#00f0ff' }}>{results.audio.mfcc_similarity}% Match (Pitch: {results.audio.pitch_fundamental})</strong></div>
                  <div>Transcription Snippet: <em style={{ color: '#ffffff' }}>"{results.audio.transcription_snippet}"</em></div>
                  <div style={{ color: '#ff2a55', fontSize: '11px' }}>Stress Threat Index: {results.audio.stress_level}</div>
                </div>
              ) : <span style={{ color: '#7f93b0' }}>Slot was empty</span>}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button
          onClick={() => setCurrentSlide(6)}
          className="tactical-btn"
          style={{ background: 'transparent', borderColor: '#1c2b42', color: '#7f93b0' }}
        >
          ← Back to Evidence Grid (Step 2)
        </button>

        <button
          onClick={() => setCurrentSlide(8)}
          className={`tactical-btn ${isCommander ? 'commander-btn' : ''}`}
          style={{ padding: '14px 32px', fontSize: '14px' }}
        >
          CROSS-LINK ENTITIES IN NEO4J GRAPH (STEP 4) →
        </button>
      </div>
    </div>
  );
};