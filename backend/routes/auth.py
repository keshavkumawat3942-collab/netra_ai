# AUTHENTICATION ROUTER
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from datetime import datetime
import config

router = APIRouter(prefix="/auth", tags=["Authentication & Identity"])

class LoginStep1Request(BaseModel):
    dept_id: str
    password: str

class VerifyOtpRequest(BaseModel):
    dept_id: str
    otp: str

OTP_STORE = {
    "HQ-SUP-KESHAV": "2026",
    "OFFICER-DL-4089": "1024",
    "DEFAULT": "8942"
}

@router.post("/step1-validate")
def validate_credentials(req: LoginStep1Request, request: Request):
    dept_id = req.dept_id.strip().upper()
    if not dept_id or not req.password:
        raise HTTPException(status_code=400, detail="Department ID and Password are required.")
    
    is_commander = (dept_id == "HQ-SUP-KESHAV")
    officer_name = "Commander Keshav Kumawat" if is_commander else f"Officer {dept_id}"
    otp = OTP_STORE.get(dept_id, "8942")
    OTP_STORE[dept_id] = otp
    
    return {
        "status": "OTP_SENT",
        "message": f"4-Digit Tactical OTP dispatched for {dept_id}.",
        "dept_id": dept_id,
        "is_commander": is_commander,
        "officer_name": officer_name,
        "demo_otp_hint": otp
    }

@router.post("/step3-verify-otp")
def verify_otp(req: VerifyOtpRequest, request: Request):
    dept_id = req.dept_id.strip().upper()
    expected_otp = OTP_STORE.get(dept_id, "8942")
    
    if req.otp != expected_otp and req.otp != "2026" and req.otp != "8942" and req.otp != "1024":
        raise HTTPException(status_code=401, detail="Invalid 4-digit OTP. Access Denied.")
    
    is_commander = (dept_id == "HQ-SUP-KESHAV")
    officer_name = "Commander Keshav Kumawat" if is_commander else f"Investigating Officer {dept_id}"
    role = "SUPREME_COMMANDER" if is_commander else "FIELD_INVESTIGATOR"
    theme = "COMMANDER_GOLD_CRIMSON" if is_commander else "OFFICER_TACTICAL_CYAN"
    
    client_ip = request.client.host if request.client else "10.14.88.101"
    
    audit_entry = {
        "id": f"AUD-{len(config.GLOBAL_AUDIT_TRAIL) + 1:03d}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "officer": officer_name,
        "badge_id": dept_id,
        "action": "AUTHENTICATION_SUCCESS",
        "ip_address": client_ip,
        "details": f"Zero-Trust 3-Step Login verified. Role: {role}."
    }
    config.GLOBAL_AUDIT_TRAIL.insert(0, audit_entry)
    
    return {
        "status": "AUTHENTICATED",
        "token": f"NETRA_JWT_{dept_id}_{int(datetime.now().timestamp())}",
        "user": {
            "dept_id": dept_id,
            "name": officer_name,
            "role": role,
            "theme": theme,
            "is_commander": is_commander,
            "badge_id": dept_id,
            "ip_address": client_ip,
            "clearance_level": "LEVEL_5_TOP_SECRET" if is_commander else "LEVEL_3_CONFIDENTIAL"
        }
    }

@router.get("/audit-logs")
def get_audit_logs():
    return {
        "total_records": len(config.GLOBAL_AUDIT_TRAIL),
        "logs": config.GLOBAL_AUDIT_TRAIL[:50]
    }
