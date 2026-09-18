# NEO4J GRAPH INTELLIGENCE & XAI EXPLAINABILITY
from typing import Dict, Any

def get_graph_intelligence_data(case_id: str) -> Dict[str, Any]:
    nodes = [
        {"id": "SUSPECT-01", "label": "Tariq Mahmood @ Tiger", "type": "KINGPIN", "risk": "CRITICAL", "size": 32, "group": "Suspect", "centrality": 0.984},
        {"id": "SUSPECT-02", "label": "Irfan @ Chhotu (Courier)", "type": "OPERATIVE", "risk": "HIGH", "size": 22, "group": "Suspect", "centrality": 0.742},
        {"id": "SUSPECT-03", "label": "Sameer @ Crypto (Mixer)", "type": "FINANCIER", "risk": "HIGH", "size": 24, "group": "Suspect", "centrality": 0.815},
        {"id": "VEHICLE-01", "label": "Scorpio DL8CA9921", "type": "ANPR_TARGET", "risk": "HIGH", "size": 20, "group": "Vehicle", "centrality": 0.690},
        {"id": "BANK-01", "label": "Al-Falah Shell Co (A/C #9188)", "type": "HAWALA_ACCOUNT", "risk": "CRITICAL", "size": 26, "group": "Finance", "centrality": 0.890},
        {"id": "CRYPTO-01", "label": "Mixer Wallet 0x7F9a...4B91", "type": "CRYPTO_HOP", "risk": "CRITICAL", "size": 24, "group": "Finance", "centrality": 0.840},
        {"id": "TOWER-01", "label": "Tower AZADPUR DL-S44", "type": "CDR_CONVERGENCE", "risk": "MEDIUM", "size": 20, "group": "Location", "centrality": 0.610},
        {"id": "SAFEHOUSE-01", "label": "Jaipur Sector 3 Safehouse", "type": "SAFEHOUSE", "risk": "HIGH", "size": 22, "group": "Location", "centrality": 0.720},
        {"id": "PHONE-01", "label": "+91 98110 44921 (Burner)", "type": "BURNER_PHONE", "risk": "HIGH", "size": 18, "group": "Telecom", "centrality": 0.660},
        {"id": "HAWALA-01", "label": "Babu Bhai Chandni Chowk", "type": "BROKER", "risk": "HIGH", "size": 22, "group": "Finance", "centrality": 0.780}
    ]

    links = [
        {"source": "SUSPECT-01", "target": "SUSPECT-02", "label": "COMMANDS", "type": "CONFIRMED", "weight": 4},
        {"source": "SUSPECT-01", "target": "SUSPECT-03", "label": "COMMISSIONS_LAUNDERING", "type": "CONFIRMED", "weight": 5},
        {"source": "SUSPECT-01", "target": "PHONE-01", "label": "OPERATES", "type": "CONFIRMED", "weight": 5},
        {"source": "SUSPECT-02", "target": "VEHICLE-01", "label": "DRIVER", "type": "CONFIRMED", "weight": 4},
        {"source": "SUSPECT-03", "target": "CRYPTO-01", "label": "DEPOSITS", "type": "CONFIRMED", "weight": 5},
        {"source": "CRYPTO-01", "target": "BANK-01", "label": "CASH_OUT", "type": "CONFIRMED", "weight": 4},
        {"source": "BANK-01", "target": "HAWALA-01", "label": "OFFSHORE_REMIT", "type": "CONFIRMED", "weight": 4},
        {"source": "SUSPECT-02", "target": "TOWER-01", "label": "CO-LOCATED", "type": "CONFIRMED", "weight": 3},
        {"source": "SUSPECT-01", "target": "TOWER-01", "label": "CO-LOCATED", "type": "CONFIRMED", "weight": 3},
        {"source": "VEHICLE-01", "target": "SAFEHOUSE-01", "label": "PARKED_AT", "type": "CONFIRMED", "weight": 3},
        {"source": "SUSPECT-01", "target": "BANK-01", "label": "BENEFICIAL_OWNER", "type": "PREDICTED", "weight": 2, "prob": 0.942, "reason": "94.2% Prob: Direct shell company incorporation signatory matches voiceprint on wiretap channel 4."},
        {"source": "SUSPECT-02", "target": "HAWALA-01", "label": "PHYSICAL_CASH_DROPOFF", "type": "PREDICTED", "weight": 2, "prob": 0.910, "reason": "91% Prob: Intermediary Node B used by both nodes within 12 min CDR window near Chandni Chowk."},
        {"source": "SUSPECT-03", "target": "SAFEHOUSE-01", "label": "HARDWARE_WALLET_STORAGE", "type": "PREDICTED", "weight": 2, "prob": 0.885, "reason": "88.5% Prob: Geofenced IP access to crypto exchange occurred from Jaipur safehouse subnet."}
    ]

    mastermind_table = [
        {"rank": 1, "name": "Tariq Mahmood @ Tiger", "role": "Syndicate Mastermind", "centrality": 0.984, "threat_level": "CRITICAL", "cases_linked": 9, "status": "ACTIVE_SURVEILLANCE"},
        {"rank": 2, "name": "Al-Falah Shell Co (A/C #9188)", "role": "Primary Money Laundering Node", "centrality": 0.890, "threat_level": "CRITICAL", "cases_linked": 6, "status": "ASSETS_FROZEN_PENDING"},
        {"rank": 3, "name": "Mixer Wallet 0x7F9a...4B91", "role": "Cross-Chain Crypto Mixer", "centrality": 0.840, "threat_level": "CRITICAL", "cases_linked": 4, "status": "MONITORED_ONCHAIN"},
        {"rank": 4, "name": "Sameer @ Crypto", "role": "Financier & Tech Lead", "centrality": 0.815, "threat_level": "HIGH", "cases_linked": 3, "status": "INTERCEPT_ACTIVE"},
        {"rank": 5, "name": "Babu Bhai Chandni Chowk", "role": "Hawala Cash Distributor", "centrality": 0.780, "threat_level": "HIGH", "cases_linked": 5, "status": "RAID_SCHEDULED"},
        {"rank": 6, "name": "Irfan @ Chhotu", "role": "Field Courier & Logistics", "centrality": 0.742, "threat_level": "HIGH", "cases_linked": 2, "status": "GPS_INTERCEPTED"}
    ]

    graphrag_summary = {
        "en": "GraphRAG synthesis indicates an interconnected 3-tier syndicate led by Tariq Mahmood @ Tiger. Extorted funds are funneled through darknet crypto mixers (0x7F9a) and washed into legitimate bank accounts via shell firm Al-Falah Overseas. Physical cash drops are executed by Irfan @ Chhotu in coordination with Babu Bhai Chandni Chowk. Geofencing and CDR triangulation establish direct meetings at Azadpur cell tower and Jaipur Sector 3 safehouse.",
        "hi": "ग्राफरैग (GraphRAG) विश्लेषण से स्पष्ट होता है कि यह तारिक महमूद उर्फ टाइगर द्वारा संचालित 3-स्तरीय सिंडिकेट है। अवैध फिरौती की रकम को डार्कनेट क्रिप्टो मिक्सर (0x7F9a) के माध्यम से अल-फलाह ओवरसीज जैसी फर्जी शेल कंपनियों के बैंक खातों में सफेद किया जाता है। नकदी का भौतिक वितरण इरफान उर्फ छोटू और बाबू भाई चांदनी चौक द्वारा किया जाता है। टावर सीडीआर और जियोफेंसिंग डेटा आजादपुर व जयपुर सेफहाउस में इनकी सीधी बैठकों की पुष्टि करता है।"
    }

    return {
        "nodes": nodes,
        "links": links,
        "mastermind_table": mastermind_table,
        "graphrag_summary": graphrag_summary
    }
