import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CaseProvider, useCase } from './context/CaseContext';

import { WatermarkOverlay } from './components/common/WatermarkOverlay';
import { LegalBanner } from './components/common/LegalBanner';
import { NavigationBar } from './components/common/NavigationBar';
import { SidebarNav } from './components/common/SidebarNav';

import { Slide1Splash } from './components/slides/Slide1Splash';
import { Slide2Auth } from './components/slides/Slide2Auth';
import { Slide3Dashboard } from './components/slides/Slide3Dashboard';
import { Slide4Insights } from './components/slides/Slide4Insights';
import { Slide5NewCase } from './components/slides/Slide5NewCase';
import { Slide6EvidenceGrid } from './components/slides/Slide6EvidenceGrid';
import { Slide7BatchScan } from './components/slides/Slide7BatchScan';
import { Slide8GraphIntel } from './components/slides/Slide8GraphIntel';
import { Slide9SuspectPII } from './components/slides/Slide9SuspectPII';
import { Slide10FinalReport } from './components/slides/Slide10FinalReport';

import './styles/tactical.css';

const MainAppOrchestrator = () => {
  const { user, isCommander } = useAuth();
  const { currentSlide } = useCase();

  // Slide 1: Animated Splash Screen
  if (currentSlide === 1) {
    return <Slide1Splash />;
  }

  // Slide 2: 3-Step Glassmorphic Authentication
  if (currentSlide === 2 || !user) {
    return <Slide2Auth />;
  }

  // Active Slide Selector for Slides 3 to 10
  const renderActiveSlide = () => {
    switch (currentSlide) {
      case 3:
        return <Slide3Dashboard />;
      case 4:
        return <Slide4Insights />;
      case 5:
        return <Slide5NewCase />;
      case 6:
        return <Slide6EvidenceGrid />;
      case 7:
        return <Slide7BatchScan />;
      case 8:
        return <Slide8GraphIntel />;
      case 9:
        return <Slide9SuspectPII />;
      case 10:
        return <Slide10FinalReport />;
      default:
        return <Slide3Dashboard />;
    }
  };

  return (
    <div className={isCommander ? 'commander-mode' : 'officer-mode'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Zero-Trust Triple-Layer Dynamic Watermark & OS-Level Flag Secure Overlay */}
      <WatermarkOverlay />

      {/* Top Application Bar with Language Globe & Notification Bell */}
      <NavigationBar />

      <div style={{ display: 'flex', flex: 1, paddingBottom: '30px' }}>
        {/* Left Side Navigation */}
        <SidebarNav />

        {/* Main 10-Slide Interactive Content Area */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderActiveSlide()}
        </main>
      </div>

      {/* Hardcoded Legal Banner Footer */}
      <LegalBanner />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CaseProvider>
          <MainAppOrchestrator />
        </CaseProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}