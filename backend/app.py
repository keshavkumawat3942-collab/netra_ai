# ==============================================================================
# NETRA-AI: POLICE INTELLIGENCE SUITE - MASTER FASTAPI SERVER
# ==============================================================================
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
import os

import config
from routes.auth import router as auth_router
from routes.cases import router as cases_router
from routes.scan import router as scan_router
from routes.graph import router as graph_router
from routes.report import router as report_router

app = FastAPI(
    title="NETRA-AI Police Intelligence Suite",
    description="High-Assurance Zero-Trust Police Intelligence Platform with Multi-Modal AI & Neo4j Graph Intelligence.",
    version="3.2.0-PROD-SECURE"
)

# Enable CORS for React Frontend (Port 5173 / localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Modular Routers under /api/v1
app.include_router(auth_router, prefix=config.API_PREFIX)
app.include_router(cases_router, prefix=config.API_PREFIX)
app.include_router(scan_router, prefix=config.API_PREFIX)
app.include_router(graph_router, prefix=config.API_PREFIX)
app.include_router(report_router, prefix=config.API_PREFIX)

@app.get("/api/v1/status")
def system_status():
    return {
        "status": "ONLINE",
        "system": config.APP_NAME,
        "version": config.VERSION,
        "api_docs": "/docs",
        "kpi_metrics": config.KPI_METRICS
    }

# Serve React Frontend Build if available
DIST_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.exists(DIST_PATH):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_PATH, "assets")), name="assets")

    @app.get("/")
    def serve_frontend_root():
        return FileResponse(os.path.join(DIST_PATH, "index.html"))

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        if full_path.startswith("api") or full_path.startswith("docs") or full_path.startswith("openapi"):
            return JSONResponse(status_code=404, content={"detail": f"API endpoint /{full_path} not found"})
        index_file = os.path.join(DIST_PATH, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return JSONResponse(status_code=404, content={"detail": "Frontend index.html not found"})
else:
    @app.get("/")
    def root_status():
        return {
            "status": "ONLINE",
            "system": config.APP_NAME,
            "version": config.VERSION,
            "api_docs": "/docs"
        }

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)