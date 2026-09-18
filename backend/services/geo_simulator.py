# GEOSPATIAL SIMULATOR
import time
import math
from typing import Dict, Any

ROUTE_WAYPOINTS = [
    {"lat": 28.5244, "lng": 77.0988, "location_name": "Mahipalpur Flyover Junction, Delhi", "speed_kmh": 68},
    {"lat": 28.4595, "lng": 77.0266, "location_name": "IFFCO Chowk, Gurugram NH-48", "speed_kmh": 82},
    {"lat": 28.3512, "lng": 76.9421, "location_name": "Kherki Daula Toll Plaza Checkpoint", "speed_kmh": 45},
    {"lat": 28.2144, "lng": 76.8122, "location_name": "Bilaspur Industrial Belt Corridor", "speed_kmh": 79},
    {"lat": 28.0921, "lng": 76.6543, "location_name": "Dharuhera Overbridge CCTV-14", "speed_kmh": 84},
    {"lat": 27.9123, "lng": 76.4912, "location_name": "Bawal Intersection ANPR Camera 09", "speed_kmh": 76},
    {"lat": 27.7214, "lng": 76.3211, "location_name": "Neemrana Border Post Rajasthan", "speed_kmh": 62},
    {"lat": 27.5512, "lng": 76.1822, "location_name": "Kotputli Bypass Highway Section", "speed_kmh": 88},
    {"lat": 27.3411, "lng": 75.9812, "location_name": "Shahpura Checkpost Toll", "speed_kmh": 55},
    {"lat": 26.9124, "lng": 75.7873, "location_name": "Jaipur Safehouse Perimeter Sector-3", "speed_kmh": 28}
]

def get_live_suspect_telemetry() -> Dict[str, Any]:
    current_time_sec = time.time()
    step_idx = int((current_time_sec / 3.0) % len(ROUTE_WAYPOINTS))
    current_wp = ROUTE_WAYPOINTS[step_idx]
    
    jitter_lat = (math.sin(current_time_sec * 1.5) * 0.0008)
    jitter_lng = (math.cos(current_time_sec * 1.5) * 0.0008)
    
    live_lat = round(current_wp["lat"] + jitter_lat, 5)
    live_lng = round(current_wp["lng"] + jitter_lng, 5)
    
    return {
        "target_id": "TARGET-ALPHA-TARIQ",
        "suspect_name": "Tariq Mahmood @ Tiger",
        "vehicle_plate": "DL 8C A 9921 (Mahindra Scorpio-N)",
        "current_coords": {"lat": live_lat, "lng": live_lng},
        "location_name": current_wp["location_name"],
        "speed_kmh": current_wp["speed_kmh"] + int(math.sin(current_time_sec) * 5),
        "heading_deg": 215,
        "signal_strength": "98% (4G/GPS Dual-Lock)",
        "status": "LIVE_TRACKING_ACTIVE",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "route_trail": ROUTE_WAYPOINTS[:step_idx + 1]
    }
