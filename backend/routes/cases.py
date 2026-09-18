# CASES REPOSITORY ROUTER
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
import random
import config

router = APIRouter(prefix="/cases", tags=["Investigation Cases"])

class CreateCaseRequest(BaseModel):
    title: str
    crime_type: str
    investigator: str
    badge_id: str
    priority: str
    description: str

class UpdateStepRequest(BaseModel):
    current_step: int
    status: Optional[str] = None
    evidence_files: Optional[Dict[str, str]] = None

@router.get("")
@router.get("/")
def list_cases(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None)
):
    filtered = config.GLOBAL_CASES
    if search:
        q = search.lower().strip()
        filtered = [
            c for c in filtered if
            q in c["case_id"].lower() or
            q in c["title"].lower() or
            q in c["crime_type"].lower() or
            q in c["investigator"].lower() or
            q in c.get("suspect_name", "").lower() or
            q in c.get("station", "").lower()
        ]
    if status:
        filtered = [c for c in filtered if c["status"].upper() == status.upper()]
    if priority:
        filtered = [c for c in filtered if c["priority"].upper() == priority.upper()]
        
    return {
        "total_cases_count": len(filtered),
        "kpi_metrics": config.KPI_METRICS,
        "cases": filtered
    }

@router.get("/{case_id}")
def get_case_by_id(case_id: str):
    for c in config.GLOBAL_CASES:
        if c["case_id"].upper() == case_id.upper():
            return c
    raise HTTPException(status_code=404, detail=f"Case ID {case_id} not found.")

@router.post("/create")
def create_case(req: CreateCaseRequest):
    auto_id = f"CASE-2026-{random.randint(2000, 9999)}"
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    new_case = {
        "case_id": auto_id,
        "title": req.title.strip(),
        "crime_type": req.crime_type,
        "investigator": req.investigator,
        "badge_id": req.badge_id,
        "station": "Special Cell HQ Delhi",
        "priority": req.priority.upper(),
        "status": "PENDING",
        "current_step": 6,
        "efficiency": 95.0,
        "date_created": now_str,
        "description": req.description,
        "evidence_count": 0,
        "suspect_name": "Target Unidentified (Under Ingestion)",
        "risk_level": "RED_ALERT" if req.priority.upper() == "CRITICAL" else "ELEVATED",
        "evidence_files": {}
    }
    config.GLOBAL_CASES.insert(0, new_case)
    return {"status": "CASE_CREATED", "case": new_case}

@router.patch("/{case_id}/step")
def update_case_step(case_id: str, req: UpdateStepRequest):
    for c in config.GLOBAL_CASES:
        if c["case_id"].upper() == case_id.upper():
            c["current_step"] = req.current_step
            if req.status:
                c["status"] = req.status
            if req.evidence_files:
                c["evidence_files"].update(req.evidence_files)
                c["evidence_count"] = len(c["evidence_files"])
            return {"status": "UPDATED", "case": c}
    raise HTTPException(status_code=404, detail=f"Case {case_id} not found.")

@router.get("/notifications/list")
def get_notifications():
    return {
        "unread_count": sum(1 for n in config.GLOBAL_NOTIFICATIONS if n["unread"]),
        "notifications": config.GLOBAL_NOTIFICATIONS
    }
