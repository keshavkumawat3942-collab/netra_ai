# GRAPH ROUTER
from fastapi import APIRouter
from typing import Optional
from services.graph_engine import get_graph_intelligence_data
from services.geo_simulator import get_live_suspect_telemetry

router = APIRouter(prefix="/graph", tags=["Graph Intelligence & Geospatial"])

@router.get("/topology")
def get_graph_topology(case_id: Optional[str] = "CASE-2026-8942"):
    return get_graph_intelligence_data(case_id)

@router.get("/geospatial/live-telemetry")
def get_live_geospatial_telemetry():
    return get_live_suspect_telemetry()
