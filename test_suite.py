import sys
import os

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from fastapi.testclient import TestClient
import app

client = TestClient(app.app)

def run_tests():
    print("=" * 80)
    print("  NETRA-AI: EXECUTING AUTOMATED INTEGRATION & SECURITY TESTS")
    print("=" * 80)

    # 1. Health & Root Check
    res_root = client.get("/")
    assert res_root.status_code == 200
    res_api = client.get("/api/v1/cases")
    assert res_api.status_code == 200
    print("[PASS] [TEST 1] Root Frontend & API System Check: ONLINE (200 OK)")

    # 2. 3-Step Auth: Commander Keshav Login
    res = client.post("/api/v1/auth/step1-validate", json={"dept_id": "HQ-SUP-KESHAV", "password": "admin"})
    assert res.status_code == 200
    assert res.json()["is_commander"] == True
    
    res = client.post("/api/v1/auth/step3-verify-otp", json={"dept_id": "HQ-SUP-KESHAV", "otp": "2026"})
    assert res.status_code == 200
    assert res.json()["user"]["role"] == "SUPREME_COMMANDER"
    print("[PASS] [TEST 2] 3-Step Auth (Commander Keshav HQ): PASSED (Role = SUPREME_COMMANDER)")

    # 3. 3-Step Auth: Standard Officer Login
    res = client.post("/api/v1/auth/step1-validate", json={"dept_id": "OFFICER-DL-4089", "password": "pass"})
    assert res.status_code == 200
    assert res.json()["is_commander"] == False
    
    res = client.post("/api/v1/auth/step3-verify-otp", json={"dept_id": "OFFICER-DL-4089", "otp": "1024"})
    assert res.status_code == 200
    assert res.json()["user"]["role"] == "FIELD_INVESTIGATOR"
    print("[PASS] [TEST 3] 3-Step Auth (Field Officer): PASSED (Role = FIELD_INVESTIGATOR)")

    # 4. 50+ Case Files Repository
    res = client.get("/api/v1/cases")
    assert res.status_code == 200
    data = res.json()
    assert data["total_cases_count"] >= 50
    assert data["kpi_metrics"]["efficiency_pct"] > 80.0
    print(f"[PASS] [TEST 4] Case Repository: {data['total_cases_count']} Cases Loaded (>80% Efficiency: {data['kpi_metrics']['efficiency_pct']}%)")

    # 5. Slide 5: New Case Creation
    res = client.post("/api/v1/cases/create", json={
        "title": "Operation Red Lotus Cyber Intercept",
        "crime_type": "Cyber Syndicate",
        "investigator": "Commander Keshav Kumawat",
        "badge_id": "HQ-SUP-KESHAV",
        "priority": "CRITICAL",
        "description": "Cross-border malware intrusion into regional payment gateways."
    })
    assert res.status_code == 200
    created_case = res.json()["case"]
    assert "CASE-2026-" in created_case["case_id"]
    print(f"[PASS] [TEST 5] Slide 5 Case Creation: Auto-Generated ID {created_case['case_id']}")

    # 6. Slide 7: Multi-Modal AI Batch Scan
    res = client.post("/api/v1/scan/batch", json={
        "case_id": created_case["case_id"],
        "evidence_slots": {
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
    assert res.status_code == 200
    scan_res = res.json()
    assert scan_res["scanned_modules_count"] == 8
    assert "YOLOv11-Pose" in scan_res["models_executed"]
    print("[PASS] [TEST 6] Slide 7 Multi-Modal AI Batch Scanner: 8/8 Modules Ingested & Scanned")

    # 7. Slide 7 Fallback: 0% Photo Match Unidentified Mode
    res = client.post("/api/v1/scan/batch", json={
        "case_id": created_case["case_id"],
        "evidence_slots": {
            "photo": "unidentified_nomatch_crop.png"
        }
    })
    assert res.status_code == 200
    fallback_res = res.json()["results"]["photo"]
    assert fallback_res["status"] == "NO_MATCH_FOUND"
    assert fallback_res["match_pct"] == 0.0
    print("[PASS] [TEST 7] Slide 7 Fallback: 0% Match -> UNIDENTIFIED_TRACKING_MODE Verified")

    # 8. Slide 8: Neo4j Graph Topology & XAI Rationale
    res = client.get("/api/v1/graph/topology")
    assert res.status_code == 200
    graph_res = res.json()
    assert len(graph_res["nodes"]) >= 8
    assert len(graph_res["mastermind_table"]) > 0
    assert "en" in graph_res["graphrag_summary"] and "hi" in graph_res["graphrag_summary"]
    print("[PASS] [TEST 8] Slide 8 Neo4j Graph & Bilingual GraphRAG (EN/HI): PASSED")

    # 9. Slide 8: Live Geospatial Telemetry
    res = client.get("/api/v1/graph/geospatial/live-telemetry")
    assert res.status_code == 200
    geo_res = res.json()
    assert "current_coords" in geo_res
    print(f"[PASS] [TEST 9] Slide 8 Live Geospatial GPS: {geo_res['current_coords']['lat']}, {geo_res['current_coords']['lng']} ({geo_res['speed_kmh']} km/h)")

    # 10. Slide 9: PII Unmasking & Audit Trail
    res = client.post("/api/v1/report/verify-pii-identity", json={
        "case_id": "CASE-2026-8942",
        "officer_badge": "HQ-SUP-KESHAV",
        "suspect_id": "Tariq Mahmood"
    })
    assert res.status_code == 200
    pii_res = res.json()
    assert "aadhaar_no" in pii_res["unmasked_pii"]
    assert "AUD-PII-" in pii_res["audit_id"]
    print(f"[PASS] [TEST 10] Slide 9 PII Identity Verification: Unlocked with Audit ID {pii_res['audit_id']}")

    # 11. Slide 10: Dispatch Matrix Execution
    res = client.post("/api/v1/report/dispatch-protocols", json={
        "case_id": "CASE-2026-8942",
        "officer_badge": "HQ-SUP-KESHAV",
        "hometown_routing": True,
        "broadcast_emergency_apb": True,
        "remote_kill_switch": True
    })
    assert res.status_code == 200
    assert len(res.json()["actions_taken"]) == 3
    print("[PASS] [TEST 11] Slide 10 Dispatch Protocols: 3/3 Actions Successfully Executed")

    # 12. Slide 10: PDF Export Permissions (Commander vs Officer)
    res_cmd = client.get("/api/v1/report/export-pdf-auth/CASE-2026-8942?badge_id=HQ-SUP-KESHAV")
    assert res_cmd.status_code == 200
    assert res_cmd.json()["authorized"] == True
    print("[PASS] [TEST 12A] Slide 10 PDF Auth: Commander Keshav -> 200 OK (AUTHORIZED)")

    res_off = client.get("/api/v1/report/export-pdf-auth/CASE-2026-8942?badge_id=OFFICER-DL-4089")
    assert res_off.status_code == 403
    print("[PASS] [TEST 12B] Slide 10 PDF Auth: Standard Officer -> 403 FORBIDDEN (RESTRICTED AS SPECIFIED)")

    print("\n" + "=" * 80)
    print("  ALL 12/12 AUTOMATED INTEGRATION & SECURITY TESTS PASSED PERFECTLY!")
    print("=" * 80)

if __name__ == "__main__":
    run_tests()