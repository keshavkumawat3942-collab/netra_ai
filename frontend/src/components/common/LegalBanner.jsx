import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const LegalBanner = () => {
  const { user } = useAuth();
  const sender = user?.badge_id || "HQ-SUP-KESHAV";
  const recipient = "CENTRAL LAW ENFORCEMENT DISPATCH";

  return (
    <footer className="legal-footer">
      <span>
        ORIGIN: [{sender}] | DESTINATION: [{recipient}] | CONFIDENTIAL LAW ENFORCEMENT RECORD // STRICTLY RESTRICTED TO AUTHORIZED POLICE PERSONNEL
      </span>
    </footer>
  );
};
