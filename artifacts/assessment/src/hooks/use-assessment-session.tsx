export function useAssessmentSession() {
  function saveAssessmentSession(id: number) {
    localStorage.setItem("assessmentId", String(id));
  }

  function getAssessmentId(): number | null {
    const stored = localStorage.getItem("assessmentId");
    if (!stored) return null;
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) ? null : parsed;
  }

  function clearAssessmentSession() {
    localStorage.removeItem("assessmentId");
  }

  return { saveAssessmentSession, getAssessmentId, clearAssessmentSession };
}
