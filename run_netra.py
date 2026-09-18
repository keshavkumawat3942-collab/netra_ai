"""
================================================================================
NETRA-AI: POLICE INTELLIGENCE SUITE - MASTER APPLICATION LAUNCHER
================================================================================
Starts FastAPI Backend and launches the web interface in your default browser.
"""

import os
import sys
import subprocess
import time
import socket
import webbrowser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

def is_port_in_use(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def find_available_port(start_port: int = 8000) -> int:
    port = start_port
    while port < 8100:
        if not is_port_in_use(port):
            return port
        port += 1
    return start_port

def main():
    print("=" * 80)
    print("  NETRA-AI: POLICE INTELLIGENCE SUITE // ZERO-TRUST LAUNCHER")
    print("=" * 80)
    
    backend_port = 8000 if not is_port_in_use(8000) else find_available_port(8000)
    print(f"[*] Starting FastAPI Backend on http://127.0.0.1:{backend_port} ...")

    # Launch FastAPI backend
    backend_proc = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app:app", "--host", "127.0.0.1", "--port", str(backend_port), "--reload"],
        cwd=BACKEND_DIR
    )

    time.sleep(2)

    app_url = f"http://127.0.0.1:{backend_port}/"
    print("\n" + "=" * 80)
    print("  NETRA-AI SUITE IS NOW ONLINE!")
    print(f"  -> Application Web Portal: {app_url}")
    print(f"  -> FastAPI Backend Docs:   http://127.0.0.1:{backend_port}/docs")
    print("=" * 80)
    print("  Press Ctrl+C in this terminal to stop the server anytime.\n")

    # Automatically open in browser
    try:
        webbrowser.open(app_url)
    except Exception:
        pass

    try:
        backend_proc.wait()
    except KeyboardInterrupt:
        print("\n[!] Shutting down NETRA-AI services...")
        backend_proc.terminate()

if __name__ == "__main__":
    main()