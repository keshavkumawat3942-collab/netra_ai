import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const STATIONS = [
  { name: "Delhi Special Cell", icon: "🏛️", solved: 410, pending: 12, eff: "98%", status: "OPTIMAL", officers: 38,
    recentCases: [
      { id: "CASE-2026-0182", title: "Hawala Network Bust", type: "Financial Terrorism", status: "COMPLETED" },
      { id: "CASE-2026-0219", title: "Fake Currency Racket", type: "Counterfeiting", status: "PENDING" },
      { id: "CASE-2026-0241", title: "Cross-Border Arms Smuggling", type: "Arms Act", status: "PENDING" },
    ]},
  { name: "Mumbai Anti-Terror Squad", icon: "🛡️", solved: 380, pending: 45, eff: "92%", status: "HIGH LOAD", officers: 52,
    recentCases: [
      { id: "CASE-2026-0311", title: "Encrypted Communication Intercept", type: "Cyber Terror", status: "PENDING" },
      { id: "CASE-2026-0298", title: "Port Surveillance Breach", type: "Infiltration", status: "COMPLETED" },
      { id: "CASE-2026-0334", title: "Sleeper Cell Identification", type: "Anti-Terror", status: "PENDING" },
    ]},
  { name: "Jaipur Cyber Crime Unit", icon: "💻", solved: 850, pending: 110, eff: "85%", status: "STABLE", officers: 29,
    recentCases: [
      { id: "CASE-2026-0401", title: "Banking Fraud Network", type: "Cyber Finance", status: "COMPLETED" },
      { id: "CASE-2026-0429", title: "Dark Web Narcotics Sale", type: "Cyber Narcotics", status: "PENDING" },
      { id: "CASE-2026-0455", title: "OTP Phishing Syndicate", type: "Identity Fraud", status: "COMPLETED" },
    ]},
  { name: "UP Special Task Force (STF)", icon: "⚔️", solved: 620, pending: 30, eff: "95%", status: "OPTIMAL", officers: 44,
    recentCases: [
      { id: "CASE-2026-0510", title: "Gangster Elimination Operation", type: "Organized Crime", status: "COMPLETED" },
      { id: "CASE-2026-0532", title: "Drug Cartel Seizure - 80kg", type: "Narcotics", status: "COMPLETED" },
      { id: "CASE-2026-0548", title: "Extortion Network Crackdown", type: "Extortion", status: "PENDING" },
    ]},
];

const CommanderHQView = ({ notifications, approveOnboarding, denyOnboarding }) => {
  const [expandedStation, setExpandedStation] = useState(null);
  const pendingOnboarding = (notifications || []).filter(n => n.type === 'ONBOARDING_REQUEST' && n.unread);

  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#ffd700', letterSpacing: '1px' }}>
          HEADQUARTERS COMMAND &amp; CONTROL
        </h2>
        <p style={{ color: '#7f93b0', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
          NATIONAL POLICE STATION PERFORMANCE ANALYTICS &amp; AUDIT LOGS
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
        <div className="tactical-card" style={{ padding: '22px', borderColor: '#ffd700' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>Total National Cases</div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>4,192</div>
          <div style={{ fontSize: '11px', color: '#ffd700', marginTop: '4px' }}>Across 14 active zones</div>
        </div>
        <div className="tactical-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>Global Solved Rate</div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#00f0ff', marginTop: '6px' }}>82.1%</div>
          <div style={{ fontSize: '11px', color: '#7f93b0', marginTop: '4px' }}>3,441 of 4,192 resolved</div>
        </div>
        <div className="tactical-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>Pending Audits</div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ff2a55', marginTop: '6px' }}>14</div>
          <div style={{ fontSize: '11px', color: '#ff2a55', marginTop: '4px' }}>Requires HQ clearance</div>
        </div>
        <div className="tactical-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>System Efficiency</div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#00f0ff', marginTop: '6px' }}>96.5%</div>
          <div style={{ fontSize: '11px', color: '#00f0ff', marginTop: '4px' }}>✓ High-Assurance AI</div>
        </div>
      </div>

      {/* Pending Onboarding Requests from Officers */}
      {pendingOnboarding.length > 0 && (
        <div className="tactical-card" style={{ padding: '20px', border: '2px solid #ffd700', background: 'rgba(255,215,0,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-display)', color: '#ffd700', fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>
            🔔 PENDING OFFICER ONBOARDING REQUESTS ({pendingOnboarding.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingOnboarding.map(n => (
              <div key={n.id} style={{ background: '#090D16', border: '1px solid #1c2b42', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>{n.data?.name} — {n.data?.badge}</div>
                  <div style={{ color: '#7f93b0', fontSize: '11px', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    Station: {n.data?.station} | Requested: {n.timestamp}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => approveOnboarding(n.id)} className="tactical-btn" style={{ padding: '6px 14px', fontSize: '11px', borderColor: '#00f0ff', color: '#00f0ff' }}>
                    ✓ APPROVE
                  </button>
                  <button onClick={() => denyOnboarding(n.id)} className="tactical-btn danger-btn" style={{ padding: '6px 14px', fontSize: '11px' }}>
                    ✕ DENY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Station Cards */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#ffffff' }}>
        POLICE STATION ANALYTICS <span style={{ color: '#7f93b0', fontSize: '12px', fontWeight: 400 }}>— Tap to expand case details</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {STATIONS.map(station => {
          const isExp = expandedStation === station.name;
          const sc = station.status === 'OPTIMAL' ? '#00f0ff' : station.status === 'HIGH LOAD' ? '#ff2a55' : '#ffd700';
          return (
            <div key={station.name} className="tactical-card" style={{ padding: 0, overflow: 'hidden', border: isExp ? `1px solid ${sc}` : '1px solid #1c2b42' }}>
              <div onClick={() => setExpandedStation(isExp ? null : station.name)}
                style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: isExp ? 'rgba(0,240,255,0.04)' : 'transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '22px' }}>{station.icon}</span>
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{station.name}</div>
                    <div style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      {station.officers} Officers Active | Eff: <span style={{ color: '#ffd700' }}>{station.eff}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#00f0ff' }}>✓ {station.solved}</span>
                    <span style={{ color: '#7f93b0', margin: '0 6px' }}>|</span>
                    <span style={{ color: '#ffd700' }}>⏳ {station.pending}</span>
                  </div>
                  <span style={{ padding: '3px 8px', background: `${sc}20`, color: sc, fontSize: '10px', borderRadius: '4px', fontWeight: 700 }}>{station.status}</span>
                  <span style={{ color: '#7f93b0' }}>{isExp ? '▲' : '▼'}</span>
                </div>
              </div>
              {isExp && (
                <div style={{ borderTop: '1px solid #1c2b42', padding: '12px 20px 16px' }}>
                  <div style={{ fontSize: '10px', color: '#7f93b0', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '10px' }}>RECENT CASE FILES</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {station.recentCases.map(c => (
                      <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#090D16', borderRadius: '6px', borderLeft: `3px solid ${c.status === 'COMPLETED' ? '#00f0ff' : '#ffd700'}` }}>
                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#00f0ff' }}>{c.id}</span>
                          <div style={{ color: '#ffffff', fontSize: '13px', marginTop: '2px' }}>{c.title}</div>
                          <div style={{ color: '#7f93b0', fontSize: '11px' }}>{c.type}</div>
                        </div>
                        <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, background: c.status === 'COMPLETED' ? 'rgba(0,240,255,0.15)' : 'rgba(255,215,0,0.15)', color: c.status === 'COMPLETED' ? '#00f0ff' : '#ffd700' }}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Slide3Dashboard = () => {
  const { casesList, kpiData, searchQuery, setSearchQuery, filterPriority, setFilterPriority, filterStatus, setFilterStatus, selectCaseAndRoute, setCurrentSlide, notifications, approveOnboarding, denyOnboarding } = useCase();
  const { t } = useLanguage();
  const { isCommander } = useAuth();

  const [showCaseRepository, setShowCaseRepository] = useState(false);

  const filteredCases = casesList.filter(c => {
    const matchesSearch = !searchQuery || 
      c.case_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.crime_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.suspect_name && c.suspect_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // ----------------------------------------------------------------------
  // COMMANDER HQ VIEW
  // ----------------------------------------------------------------------
  if (isCommander) {
    return <CommanderHQView casesList={casesList} notifications={notifications} approveOnboarding={approveOnboarding} denyOnboarding={denyOnboarding} />;
  }

  // ----------------------------------------------------------------------
  // FIELD OFFICER VIEW
  // ----------------------------------------------------------------------
  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#ffffff', letterSpacing: '1px' }}>
          {t('dashboard')}
        </h2>
        <p style={{ color: '#7f93b0', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
          LOCAL STATION INTELLIGENCE &amp; ACTIVE CASE REPOSITORY
        </p>
      </div>

      {/* KPI METRICS ROW (>80% strictly enforced) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
        <div className="tactical-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
            {t('kpi_total')}
          </div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
            {kpiData?.total_cases?.toLocaleString() || '1,284'}
          </div>
          <div style={{ fontSize: '11px', color: '#00f0ff', marginTop: '4px' }}>
            ▲ +28 cases logged this week
          </div>
        </div>

        <div className="tactical-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
            {t('kpi_solved')}
          </div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#00f0ff', marginTop: '6px' }}>
            {kpiData?.solved_rate || '88.4'}%
          </div>
          <div style={{ fontSize: '11px', color: '#7f93b0', marginTop: '4px' }}>
            1,135 cases successfully solved
          </div>
        </div>

        <div className="tactical-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
            {t('kpi_pending')}
          </div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ffd700', marginTop: '6px' }}>
            {kpiData?.pending_cases || '149'}
          </div>
          <div style={{ fontSize: '11px', color: '#ff2a55', marginTop: '4px' }}>
            ● 24 critical threat files active
          </div>
        </div>

        <div className="tactical-card" style={{ padding: '22px', borderColor: '#00f0ff' }}>
          <div style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
            {t('kpi_efficiency')} (&gt; 80%)
          </div>
          <div style={{ fontSize: '34px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#00f0ff', marginTop: '6px' }}>
            {kpiData?.efficiency_pct || '94.6'}%
          </div>
          <div style={{ fontSize: '11px', color: '#00f0ff', marginTop: '4px' }}>
            ✓ High-Assurance AI Clearance
          </div>
        </div>
      </div>

      {/* TWO PROMINENT ACTION CARDS IN MIDDLE DIRECTLY BELOW KPIS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Large Action Card 1: Register New Case File */}
        <div
          onClick={() => setCurrentSlide(5)}
          className="tactical-card"
          style={{
            padding: '28px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(16, 25, 41, 0.95) 0%, rgba(0, 240, 255, 0.1) 100%)',
            border: '2px solid #00f0ff',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(0, 240, 255, 0.15)',
            border: '2px solid #00f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px'
          }}>
            📁
          </div>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#00f0ff', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              START NEW INVESTIGATION
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#ffffff', margin: '4px 0' }}>
              REGISTER NEW CASE FILE (STEP 1)
            </h3>
            <p style={{ fontSize: '12px', color: '#7f93b0', lineHeight: 1.4 }}>
              Create auto-generated CASE-2026-XXXX ID, enter suspect targets, attach multi-modal evidence &amp; launch AI scan.
            </p>
          </div>

          <span style={{ fontSize: '24px', color: '#00f0ff', fontWeight: 700 }}>
            ➔
          </span>
        </div>

        {/* Large Action Card 2: Open Search & 50+ Old Cases Repository */}
        <div
          onClick={() => setShowCaseRepository(!showCaseRepository)}
          className="tactical-card"
          style={{
            padding: '28px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(16, 25, 41, 0.95) 0%, rgba(255, 215, 0, 0.1) 100%)',
            border: `2px solid ${showCaseRepository ? '#ffd700' : '#1c2b42'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(255, 215, 0, 0.15)',
            border: '2px solid #ffd700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px'
          }}>
            🗄️
          </div>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '11px', color: '#ffd700', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              HISTORICAL POLICE ARCHIVES
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#ffffff', margin: '4px 0' }}>
              SEARCH &amp; OPEN 50+ CASE ARCHIVES
            </h3>
            <p style={{ fontSize: '12px', color: '#7f93b0', lineHeight: 1.4 }}>
              {showCaseRepository ? "Click to collapse active case search repository." : "Tap to open and search 50+ active cases by Crime, Station, Suspect or ID."}
            </p>
          </div>

          <span style={{ fontSize: '24px', color: '#ffd700', fontWeight: 700 }}>
            {showCaseRepository ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* SEARCHABLE 50+ CASES REPOSITORY (OPENS WHEN TAPPED ON OLD CASES FOLDER CARD) */}
      {showCaseRepository && (
        <div className="tactical-card" style={{ padding: '24px', border: '1px solid #00f0ff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#ffffff' }}>
                CENTRAL CASE REPOSITORY ({filteredCases.length} OF {casesList.length} FILES)
              </h3>
              <span style={{ fontSize: '12px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
                Click any case: 'COMPLETED' opens Final Dossier; 'PENDING' resumes investigation pipeline.
              </span>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                style={{
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  background: '#090D16',
                  border: '1px solid #1c2b42',
                  color: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending / Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Search Input */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search 50+ Case Files by ID, Title, Suspect or Police Station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                background: '#090D16',
                border: '1px solid #1c2b42',
                borderRadius: '10px',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                outline: 'none',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)'
              }}
            />
          </div>

          {/* Scrollable Case List */}
          <div style={{
            maxHeight: '440px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingRight: '6px'
          }}>
            {filteredCases.map(c => {
              const isCompleted = c.status === 'COMPLETED';
              const isCritical = c.priority === 'CRITICAL';

              return (
                <div
                  key={c.case_id}
                  onClick={() => selectCaseAndRoute(c)}
                  className="tactical-card"
                  style={{
                    padding: '16px 20px',
                    background: '#090D16',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderLeft: `4px solid ${isCompleted ? '#00f0ff' : (isCritical ? '#ff2a55' : '#ffd700')}`
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isCommander ? '#ffd700' : '#00f0ff'
                      }}>
                        {c.case_id}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: isCritical ? 'rgba(255,42,85,0.15)' : 'rgba(255,215,0,0.15)',
                        color: isCritical ? '#ff2a55' : '#ffd700',
                        border: `1px solid ${isCritical ? '#ff2a55' : '#ffd700'}`
                      }}>
                        {c.priority}
                      </span>
                      <span style={{ fontSize: '11px', color: '#7f93b0' }}>
                        {c.crime_type}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '15px', color: '#ffffff', marginBottom: '4px' }}>
                      {c.title}
                    </h4>

                    <div style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
                      Investigator: <span style={{ color: '#ffffff' }}>{c.investigator}</span> | Station: {c.station} | Suspect: <span style={{ color: '#00f0ff' }}>{c.suspect_name}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      background: isCompleted ? 'rgba(0,240,255,0.15)' : 'rgba(255,215,0,0.15)',
                      color: isCompleted ? '#00f0ff' : '#ffd700',
                      border: `1px solid ${isCompleted ? '#00f0ff' : '#ffd700'}`
                    }}>
                      {isCompleted ? "✓ FINAL REPORT" : `PAUSED AT STEP ${c.current_step || 6}`}
                    </span>
                    <span style={{ fontSize: '11px', color: '#7f93b0', fontFamily: 'var(--font-mono)' }}>
                      Efficiency: {c.efficiency}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};