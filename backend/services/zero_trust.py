# ZERO-TRUST WATERMARKING
import hashlib
import time
from typing import Dict, Any

def generate_watermark_metadata(officer_name: str, badge_id: str, client_ip: str, recipient: str = "SELF") -> Dict[str, Any]:
    timestamp_str = time.strftime("%Y-%m-%d %H:%M:%S UTC+05:30")
    raw_sig = f"{officer_name}::{badge_id}::{client_ip}::{recipient}::{timestamp_str}::NETRA_SECURE_2026"
    forensic_hash = hashlib.sha256(raw_sig.encode()).hexdigest()
    
    layer1_text = f"NETRA-SECURE | {officer_name} | BADGE: {badge_id} | IP: {client_ip} | {timestamp_str}"
    layer2_text = f"CONFIDENTIAL TRANSFER | SENDER: {badge_id} -> RECIPIENT: {recipient} | RESTRICTED LAW ENFORCEMENT DISPATCH"
    
    return {
        "layer1_dynamic_overlay": layer1_text,
        "layer2_dual_identity": layer2_text,
        "layer3_forensic_stegano_hash": f"SHA256-LSB:{forensic_hash.upper()}",
        "legal_footer": "ORIGIN: [Sender] | DESTINATION: [Recipient] | CONFIDENTIAL LAW ENFORCEMENT RECORD",
        "flag_secure_enforced": True,
        "timestamp": timestamp_str
    }
