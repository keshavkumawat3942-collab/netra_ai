# REPORT ROUTER
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from services.zero_trust import generate_watermark_metadata
import config

router = APIRouter(prefix="/report", tags=["Final Intelligence Dossier & Dispatch"])

class DispatchRequest(BaseModel):
    case_id: str
    officer_badge: str
    hometown_routing: bool
    broadcast_emergency_apb: bool
    remote_kill_switch: bool

class VerifyIdentityRequest(BaseModel):
    case_id: str
    officer_badge: str
    suspect_id: str

@router.get("/dossier/{case_id}")
def generate_dossier(case_id: str, x_badge_id: Optional[str] = Header("HQ-SUP-KESHAV")):
    officer_name = "Commander Keshav Kumawat" if x_badge_id == "HQ-SUP-KESHAV" else f"Officer {x_badge_id}"
    watermark = generate_watermark_metadata(officer_name, x_badge_id, "10.14.88.101")
    
    return {
        "case_id": case_id,
        "title": "Operation DarkNet Hawala & Crypto Laundering Syndicate",
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC+05:30"),
        "pages_count": 6,
        "immutable_dossier_hash": "SHA256:7D9F88A109C2E341BF89A900821EFA0892019488",
        "classification": "TOP SECRET // LAW ENFORCEMENT SENSITIVE // NO FORN",
        "no_delete_guarantee": "ZERO_TRUST_APPEND_ONLY_AUDIT_TRAIL",
        "watermark": watermark,
        "sections": {
            "page1_executive_summary": {
                "title": "Page 1: Executive Intelligence Summary & Incident Genesis",
                "lead_suspect": "Tariq Mahmood @ Tiger (DOB: 14/09/1984)",
                "threat_score": "98.4 / 100 (EXTREME THREAT)",
                "summary": "Multi-jurisdictional financial nexus coordinating illicit hawala conduits and crypto tumbling pipelines. Intercepted telecom and forensic ledger corroboration establish direct leadership hierarchy."
            },
            "page2_multimodal_evidence": {
                "title": "Page 2: Multi-Modal Evidence & AI Forensics",
                "yolo_weapons": "Concealed 9mm Glock-19 detected with 94% confidence in CCTV Vault Feed #0828.",
                "insightface_match": "Biometric 512-D ArcFace match at 98.4% against National AFIS Database.",
                "audio_wiretap": "Whisper-X voiceprint confirms voice match at 128.4 Hz fundamental frequency.",
                "spacy_ner": "Entity extraction parsed 3 shell corporations, 4 hawala dealers, and ₹4.5 Cr unbilled cash movements."
            },
            "page3_graph_centrality": {
                "title": "Page 3: Network Topology & Centrality Matrix",
                "top_nodes": [
                    {"node": "Tariq Mahmood @ Tiger", "centrality": 0.984, "role": "Syndicate Head"},
                    {"node": "Al-Falah Shell Co (A/C #9188)", "centrality": 0.890, "role": "Laundering Node"},
                    {"node": "Mixer Wallet 0x7F9a...4B91", "centrality": 0.840, "role": "Crypto Tumbler"}
                ]
            },
            "page4_geospatial_telemetry": {
                "title": "Page 4: Geospatial Route & ANPR Convergence Corridor",
                "target_vehicle": "Mahindra Scorpio-N (DL 8C A 9921)",
                "anpr_sightings": "Toll Plaza Kherki Daula -> Dharuhera Overbridge -> Shahpura Checkpost",
                "destination_safehouse": "Jaipur Sector-3 Safehouse Perimeter"
            },
            "page5_chain_of_custody": {
                "title": "Page 5: Chain of Custody & Steganographic Forensic Hashes",
                "digital_custody_officer": "Commander Keshav Kumawat (Badge: HQ-SUP-KESHAV)",
                "timestamp_lock": datetime.now().isoformat(),
                "steganographic_signature": "LSB-SHA256:9A81-CC20-0019-FE89-BBD7-4491-0023"
            }
        }
    }

@router.post("/verify-pii-identity")
def verify_pii_identity(req: VerifyIdentityRequest):
    audit_id = f"AUD-PII-{len(config.GLOBAL_AUDIT_TRAIL) + 1:03d}"
    audit_entry = {
        "id": audit_id,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "officer": "Commander Keshav Kumawat" if req.officer_badge == "HQ-SUP-KESHAV" else f"Officer {req.officer_badge}",
        "badge_id": req.officer_badge,
        "action": "PII_DE_ANONYMIZATION_AUDIT",
        "ip_address": "10.14.88.101",
        "details": f"Officer unlocked confidential Aadhaar, Banking and Geolocation PII for Suspect {req.suspect_id}."
    }
    config.GLOBAL_AUDIT_TRAIL.insert(0, audit_entry)
    
    return {
        "status": "IDENTITY_CONFIRMED_UNMASKED",
        "audit_id": audit_id,
        "unmasked_pii": {
            "full_name": "Tariq Mahmood @ Tiger (Alias: Sultan Bhai)",
            "aadhaar_no": "7812 9044 1829",
            "passport_no": "Z-4910291 (Republic of India)",
            "primary_bank": "Yes Bank Current A/C #009188200192 (IFSC: YESB0000091)",
            "residential_address": "Flat #402, Al-Madina Residency, Chandni Chowk, Delhi - 110006",
            "family_relatives": [
                {"relation": "Brother", "name": "Zubair Mahmood (Hawala Courier)", "contact": "+91 98221 00912"},
                {"relation": "Spouse", "name": "Farhana Mahmood", "contact": "+91 98110 44921"}
            ],
            "vehicle_registered": "Mahindra Scorpio-N (DL 8C A 9921)",
            "known_safehouse": "House #24, Lane 3, Sector 3, Mansarovar, Jaipur"
        }
    }

@router.post("/dispatch-protocols")
def execute_dispatch_protocols(req: DispatchRequest):
    actions_taken = []
    if req.hometown_routing:
        actions_taken.append("Automated warrant package dispatched to Kotputli & Jaipur Police Control Rooms.")
    if req.broadcast_emergency_apb:
        actions_taken.append("EMERGENCY APB BROADCAST: Level-1 Intercept Alert flashed to all State Toll Plazas.")
    if req.remote_kill_switch:
        actions_taken.append("REMOTE KILL SWITCH ACTIVATED: Bank accounts frozen & mobile burner SIMs revoked.")
        
    for c in config.GLOBAL_CASES:
        if c["case_id"].upper() == req.case_id.upper():
            c["status"] = "COMPLETED"
            c["current_step"] = 10
            break
            
    return {
        "status": "DISPATCH_EXECUTED",
        "case_id": req.case_id,
        "actions_taken": actions_taken,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

@router.get("/export-pdf-auth/{case_id}")
def export_pdf_authorization(case_id: str, badge_id: str = "HQ-SUP-KESHAV"):
    if badge_id.strip().upper() != "HQ-SUP-KESHAV":
        raise HTTPException(
            status_code=403, 
            detail="ACCESS DENIED (403): PDF Forensic Dossier Download is exclusively restricted to Commander Keshav HQ credentials. Audit event logged."
        )
        
    return {
        "authorized": True,
        "officer": "Commander Keshav Kumawat",
        "clearance": "SUPREME_HQ_COMMANDER_AUTHORIZED",
        "download_url": f"/api/v1/report/download-file/{case_id}.pdf",
        "timestamp": datetime.now().isoformat()
    }
