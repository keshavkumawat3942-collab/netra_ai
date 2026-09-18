# SCAN ROUTER
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from services.ai_scanner import run_multimodal_batch_scan
import config

router = APIRouter(prefix="/scan", tags=["AI Evidence Scanner"])

class BatchScanRequest(BaseModel):
    case_id: str
    evidence_slots: Dict[str, Any]

@router.post("/batch")
def execute_batch_scan(req: BatchScanRequest):
    if not req.evidence_slots:
        raise HTTPException(status_code=400, detail="No evidence slots provided for batch scan.")
        
    scan_results = run_multimodal_batch_scan(req.evidence_slots)
    
    for c in config.GLOBAL_CASES:
        if c["case_id"].upper() == req.case_id.upper():
            c["current_step"] = 8
            c["evidence_files"] = req.evidence_slots
            c["evidence_count"] = len(req.evidence_slots)
            break
            
    return scan_results
