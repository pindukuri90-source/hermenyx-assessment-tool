import { useState, useEffect } from "react";

export function useAssessmentSession() {
  const [assessmentId, setAssessmentId] = useState<number | null>(() => {
    const saved = localStorage.getItem("assessmentId");
    return saved ? parseInt(saved, 10) : null;
  });

  const saveAssessmentSession = (id: number) => {
    localStorage.setItem("assessmentId", id.toString());
    setAssessmentId(id);
  };

  const clearAssessmentSession = () => {
    localStorage.removeItem("assessmentId");
    setAssessmentId(null);
  };

  return {
    assessmentId,
    saveAssessmentSession,
    clearAssessmentSession
  };
}
