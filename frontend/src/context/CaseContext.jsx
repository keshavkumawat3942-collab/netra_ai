import React, { createContext, useContext, useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/apiConfig';

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
  const [casesList, setCasesList] = useState([]);
  const [activeCase, setActiveCase] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1); // Slide 1 (Splash) to 10
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [kpiData, setKpiData] = useState(null);
  
  // ALL EVIDENCE SLOTS STRICTLY EMPTY BY DEFAULT
  const [evidenceSlots, setEvidenceSlots] = useState({
    photo: null,
    cctv: null,
    fingerprint: null,
    audio: null,
    document: null,
    cdr: null,
    anpr: null,
    finance: null
  });
  
  const [scanResults, setScanResults] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [unmaskedPiiData, setUnmaskedPiiData] = useState(null);

  const fetchCases = async () => {
    try {
      const res = await fetch(ENDPOINTS.CASES_LIST);
      const data = await res.json();
      setCasesList(data.cases || []);
      setKpiData(data.kpi_metrics || null);
      if (!activeCase && data.cases?.length > 0) {
        setActiveCase(data.cases[0]);
      }
    } catch (e) {
      console.error("Failed to load cases", e);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(ENDPOINTS.NOTIFICATIONS);
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (e) {
      console.error("Failed to load notifications", e);
    }
  };

  useEffect(() => {
    fetchCases();
    fetchNotifications();
  }, []);

  const selectCaseAndRoute = (caseObj) => {
    setActiveCase(caseObj);
    if (caseObj.status === 'COMPLETED' || caseObj.current_step === 10) {
      setCurrentSlide(10); // Final Report
    } else {
      setCurrentSlide(caseObj.current_step || 6); // Resume paused investigation step
    }
  };

  // Linear Backward Navigation
  const goBack = () => {
    setCurrentSlide(prev => (prev > 3 ? prev - 1 : 3));
  };

  const createNewCase = async (caseData) => {
    const res = await fetch(ENDPOINTS.CASE_CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Failed to create case');
    
    setCasesList(prev => [data.case, ...prev]);
    setActiveCase(data.case);
    setCurrentSlide(6); // Advance to Evidence Ingestion
    return data.case;
  };

  const updateEvidenceSlot = (slotKey, filename) => {
    setEvidenceSlots(prev => ({
      ...prev,
      [slotKey]: filename
    }));
  };

  const executeBatchScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch(ENDPOINTS.SCAN_BATCH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_id: activeCase?.case_id || "CASE-2026-8942",
          evidence_slots: evidenceSlots
        })
      });
      const data = await res.json();
      setScanResults(data);
      return data;
    } finally {
      setIsScanning(false);
    }
  };

  const unlockPii = async (badgeId) => {
    const res = await fetch(ENDPOINTS.VERIFY_PII, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        case_id: activeCase?.case_id || "CASE-2026-8942",
        officer_badge: badgeId,
        suspect_id: activeCase?.suspect_name || "Tariq Mahmood"
      })
    });
    const data = await res.json();
    setUnmaskedPiiData(data.unmasked_pii);
    return data;
  };

  const requestOnboarding = (onboardingData) => {
    const newNotif = {
      id: `ONB-${Date.now()}`,
      title: "NEW ONBOARDING REQUEST",
      message: `Officer ${onboardingData.name} (${onboardingData.badge}) requested access for ${onboardingData.station}.`,
      timestamp: new Date().toLocaleTimeString(),
      unread: true,
      type: "ONBOARDING_REQUEST",
      data: onboardingData
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const approveOnboarding = (notifId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notifId 
        ? { ...n, unread: false, message: n.message + " [✓ APPROVED BY HQ]" } 
        : n
    ));
  };

  const denyOnboarding = (notifId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notifId 
        ? { ...n, unread: false, message: n.message + " [✕ DENIED BY HQ]" } 
        : n
    ));
  };

  return (
    <CaseContext.Provider value={{
      casesList,
      activeCase,
      currentSlide,
      searchQuery,
      filterPriority,
      filterStatus,
      kpiData,
      evidenceSlots,
      scanResults,
      notifications,
      isScanning,
      unmaskedPiiData,
      setCurrentSlide,
      goBack,
      setSearchQuery,
      setFilterPriority,
      setFilterStatus,
      selectCaseAndRoute,
      createNewCase,
      updateEvidenceSlot,
      setEvidenceSlots,
      executeBatchScan,
      unlockPii,
      refreshCases: fetchCases,
      requestOnboarding,
      approveOnboarding,
      denyOnboarding
    }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => useContext(CaseContext);

