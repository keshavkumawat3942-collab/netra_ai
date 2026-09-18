import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide4Insights = () => {
  const { t } = useLanguage();

  const monthlyTrends = [
    { month: 'Jan 2026', cases: 94, solved: 86, rate: '91.4%' },
    { month: 'Feb 2026', cases: 112, solved: 104, rate: '92.8%' },
    { month: 'Mar 2026', cases: 128, solved: 119, rate: '92.9%' },
    { month: 'Apr 2026', cases: 145, solved: 138, rate: '95.1%' },
    { month: 'May 2026', cases: 160, solved: 152, rate: '95.0%' },
    { month: 'Jun 2026', cases: 172, solved: 165, rate: '95.9%' },
    { month: 'Jul 2026', cases: 188, solved: 180, rate: '95.7%' },
    { month: 'Aug 2026', cases: 204, solved: 196, rate: '96.0%' }
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#ffffff' }}>
          {t('insights')}
        </h2>
        <p style={{ color: '#7f93b0', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
          INTELLIGENCE TRENDS, CLEARANCE RATES & FORENSIC ACCURACY ANALYTICS
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="tactical-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#00f0ff', marginBottom: '16px' }}>
            MONTHLY CASE RESOLUTION & AI ACCURACY TREND (2026)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {monthlyTrends.map(item => (
              <div key={item.month}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{item.month}</span>
                  <span style={{ color: '#00f0ff', fontFamily: 'var(--font-mono)' }}>
                    {item.solved}/{item.cases} Cases ({item.rate})
                  </span>
                </div>
                <div style={{ height: '8px', background: '#090D16', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: item.rate,
                    background: 'linear-gradient(90deg, #005577 0%, #00f0ff 100%)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tactical-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#ffd700', marginBottom: '16px' }}>
            CRIME THREAT PROFILE
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Hawala & Crypto Laundering', pct: 34, color: '#ff2a55' },
              { label: 'Cyber Phishing & SIM Box', pct: 26, color: '#00f0ff' },
              { label: 'Narcotics Highway Corridor', pct: 20, color: '#ffd700' },
              { label: 'ANPR Vehicle Heists', pct: 12, color: '#00ffaa' },
              { label: 'Weapons Milling Trade', pct: 8, color: '#b366ff' }
            ].map(c => (
              <div key={c.label} style={{ background: '#090D16', padding: '10px', borderRadius: '8px', border: '1px solid #1c2b42' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#ffffff' }}>
                  <span>{c.label}</span>
                  <span style={{ color: c.color, fontWeight: 700 }}>{c.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};