# NETRA-AI CONFIGURATION
import os
from typing import Dict, List, Any
from datetime import datetime

API_PREFIX = "/api/v1"
APP_NAME = "NETRA-AI Police Intelligence Suite"
VERSION = "3.2.0-PROD-SECURE"
EVIDENCE_DEFAULT_PATH = r"C:\Users\Keshav Kumawat\Desktop\sih 2026"
LEGAL_BANNER_TEXT = "ORIGIN: [Sender] | DESTINATION: [Recipient] | CONFIDENTIAL LAW ENFORCEMENT RECORD"
FORENSIC_STEGANO_KEY = "NETRA_AI_SHA256_LSB_ENCRYPTED_SIGNATURE_2026"

KPI_METRICS = {
    "total_cases": 1284,
    "solved_rate": 88.4,
    "pending_cases": 149,
    "efficiency_pct": 94.6, # Strictly > 80%
    "active_intercepts": 32,
    "anpr_hits_today": 418,
    "forensic_accuracy": 98.2
}

def init_cases_database() -> List[Dict[str, Any]]:
    cases = []
    cases.append({
        "case_id": "CASE-2026-8942",
        "title": "Operation DarkNet Hawala & Crypto Laundering Syndicate",
        "crime_type": "Hawala Money Laundering",
        "investigator": "Commander Keshav Kumawat",
        "badge_id": "HQ-SUP-KESHAV",
        "station": "Special Cell HQ Delhi",
        "priority": "CRITICAL",
        "status": "PENDING",
        "current_step": 6,
        "efficiency": 96.8,
        "date_created": "2026-08-28 14:32:00",
        "description": "Multi-state hawala cartel operating encrypted communication lines and darknet crypto mixers to launder extortion proceeds. Intercepted calls link to master operative Tariq @ Tiger.",
        "evidence_count": 8,
        "suspect_name": "Tariq Mahmood @ Tiger",
        "risk_level": "RED_ALERT",
        "evidence_files": {
            "photo": "tariq_cctv_crop.png",
            "cctv": "cctv_vault_feed_0828.mp4",
            "fingerprint": "latent_print_vault_handle.dat",
            "audio": "intercepted_wiretap_ch4.wav",
            "document": "fir_and_hawala_ledger.pdf",
            "cdr": "cdr_tower_dump_sector44.csv",
            "anpr": "anpr_plate_DL8CA9921.jpg",
            "finance": "crypto_wallet_flows.xlsx"
        }
    })

    cases.append({
        "case_id": "CASE-2026-1021",
        "title": "NCR Metro ATM Malware Injection & Cash Out Network",
        "crime_type": "Cyber Syndicate",
        "investigator": "Insp. Vikram Rathore",
        "badge_id": "OFFICER-DL-4089",
        "station": "Cyber Crime Branch Mumbai",
        "priority": "HIGH",
        "status": "COMPLETED",
        "current_step": 10,
        "efficiency": 91.5,
        "date_created": "2026-08-10 11:15:00",
        "description": "Black-box hardware tool deployed on standalone ATMs across 14 locations. Forensic image recovery identified foreign payloads.",
        "evidence_count": 6,
        "suspect_name": "Alexei @ Matrix",
        "risk_level": "MODERATE",
        "evidence_files": {
            "cctv": "atm_cam_01.mp4",
            "document": "forensic_log_dump.pdf"
        }
    })

    crime_templates = [
        ("Shadow Route Narcotics Corridor", "Narcotics Trafficking", "CRITICAL", "Intercepted 42kg synthetic contraband along Western Highway corridor."),
        ("Phantom Call Center Extortion Ring", "Cyber Syndicate", "HIGH", "VoIP spoofing network impersonating federal law enforcement agencies."),
        ("Gold Bullion Hawala Transfer", "Hawala Money Laundering", "CRITICAL", "Underground channel moving unbilled bullion via shell logistics firms."),
        ("ANPR Stolen SUV Armed Heist", "ANPR Vehicle Tracking", "HIGH", "Fleeing Scorpio with cloned plates detected at multiple toll plazas."),
        ("SIM Box Relay Station Raid", "Cyber Syndicate", "MEDIUM", "Illegal 256-channel GSM gateway routing international fraud traffic."),
        ("Fake Currency Infiltration Module", "Cross-Border Smuggling", "HIGH", "High quality counterfeit notes circulating through border wholesale markets."),
        ("Encrypted VOIP Hitman Network", "Homicide Investigation", "CRITICAL", "Contract killing conspiracy coordinated via peer-to-peer darknet chatter."),
        ("Micro-Finance Phishing App Ring", "Cyber Syndicate", "MEDIUM", "Instant loan APKs harvesting private contacts and extorting victims."),
        ("Illegal Firearm Milling Unit", "Illegal Weapons Trade", "CRITICAL", "Clandestine workshop manufacturing country-made semi-automatic pistols."),
        ("Deepfake VIP Extortion Blackmail", "Cyber Syndicate", "HIGH", "AI-cloned voice and synthetic media used to extort industrial executives.")
    ]

    stations = [
        "Special Cell HQ Delhi", "Cyber Crime Branch Mumbai", "CID Crime Branch Pune",
        "STF Lucknow", "Anti-Terror Squad Ahmedabad", "Crime Intelligence Bengaluru",
        "Cyber Cell Hyderabad", "SOG Jaipur", "NCB Chandigarh", "Crime Branch Kolkata"
    ]

    for i in range(1, 52):
        tpl = crime_templates[(i - 1) % len(crime_templates)]
        status = "COMPLETED" if i % 3 == 0 else "PENDING"
        step = 10 if status == "COMPLETED" else ((i % 5) + 5)
        cases.append({
            "case_id": f"CASE-2026-{1000 + i * 29}",
            "title": f"{tpl[0]} - Phase #{i}",
            "crime_type": tpl[1],
            "investigator": f"Officer {['Sharma', 'Patel', 'Deshmukh', 'Khan', 'Singh', 'Nair', 'Verma', 'Kumawat'][i % 8]}",
            "badge_id": f"OFFICER-{['DL', 'MH', 'UP', 'RJ', 'KA', 'TS', 'WB', 'GJ'][i % 8]}-{2100 + i}",
            "station": stations[i % len(stations)],
            "priority": tpl[2],
            "status": status,
            "current_step": step,
            "efficiency": round(85.0 + (i * 0.27) % 14.5, 1),
            "date_created": f"2026-0{min(8, (i % 8) + 1):02d}-{((i * 4) % 27) + 1:02d} 11:20:00",
            "description": f"{tpl[3]} Target surveillance underway with multi-modal intelligence correlation.",
            "evidence_count": (i % 7) + 2,
            "suspect_name": f"Suspect-{chr(65 + (i % 26))}{i}",
            "risk_level": "RED_ALERT" if tpl[2] == "CRITICAL" else "ELEVATED",
            "evidence_files": {}
        })

    return cases

GLOBAL_CASES: List[Dict[str, Any]] = init_cases_database()

GLOBAL_AUDIT_TRAIL: List[Dict[str, Any]] = [
    {
        "id": "AUD-INIT-001",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "officer": "Commander Keshav Kumawat",
        "badge_id": "HQ-SUP-KESHAV",
        "action": "SYSTEM_BOOT_INITIALIZATION",
        "ip_address": "10.14.88.101",
        "details": "NETRA-AI Zero-Trust Security Kernel Online. Triple-layer watermark active."
    }
]

GLOBAL_NOTIFICATIONS: List[Dict[str, Any]] = [
    {
        "id": "NOTIF-01",
        "type": "TRANSFER",
        "title": "Case Dossier Transfer Request",
        "message": "Special Cell Delhi transferred CASE-2026-8942 with Dual-Identity Watermark.",
        "timestamp": "Just now",
        "unread": True
    },
    {
        "id": "NOTIF-02",
        "type": "ONBOARDING",
        "title": "Officer Clearance Pending",
        "message": "Sub-Inspector Rajesh Verma requested biometric workspace provisioning.",
        "timestamp": "12 min ago",
        "unread": True
    },
    {
        "id": "NOTIF-03",
        "type": "ALERT",
        "title": "ANPR Live Camera Alert",
        "message": "Target Vehicle DL8CA9921 triggered NH-48 Toll Tollgate ANPR sensor.",
        "timestamp": "25 min ago",
        "unread": True
    }
]
