// ==============================================================================
// NETRA-AI: API ENDPOINT CONFIGURATION
// ==============================================================================
export const API_BASE_URL = (typeof window !== "undefined" && window.location.port === "5173")
  ? "http://127.0.0.1:8000/api/v1"
  : ((typeof window !== "undefined" && window.location.origin && window.location.origin !== "null")
      ? `${window.location.origin}/api/v1`
      : "http://127.0.0.1:8000/api/v1");

export const ENDPOINTS = {
  AUTH_STEP1: `${API_BASE_URL}/auth/step1-validate`,
  AUTH_VERIFY_OTP: `${API_BASE_URL}/auth/step3-verify-otp`,
  AUDIT_LOGS: `${API_BASE_URL}/auth/audit-logs`,
  CASES_LIST: `${API_BASE_URL}/cases`,
  CASE_CREATE: `${API_BASE_URL}/cases/create`,
  CASE_DETAIL: (id) => `${API_BASE_URL}/cases/${id}`,
  CASE_STEP_UPDATE: (id) => `${API_BASE_URL}/cases/${id}/step`,
  NOTIFICATIONS: `${API_BASE_URL}/cases/notifications/list`,
  SCAN_BATCH: `${API_BASE_URL}/scan/batch`,
  GRAPH_TOPOLOGY: `${API_BASE_URL}/graph/topology`,
  GEOSPATIAL_TELEMETRY: `${API_BASE_URL}/graph/geospatial/live-telemetry`,
  REPORT_DOSSIER: (id) => `${API_BASE_URL}/report/dossier/${id}`,
  VERIFY_PII: `${API_BASE_URL}/report/verify-pii-identity`,
  DISPATCH_PROTOCOLS: `${API_BASE_URL}/report/dispatch-protocols`,
  EXPORT_PDF_AUTH: (id) => `${API_BASE_URL}/report/export-pdf-auth/${id}`
};