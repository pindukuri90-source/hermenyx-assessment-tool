import { useParams } from "wouter";
import { useGetAssessment, getGetAssessmentQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Confirmation() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);

  const { data: assessment } = useGetAssessment(id, {
    query: { enabled: !!id, queryKey: getGetAssessmentQueryKey(id) },
  });

  return (
    <div className="min-h-screen bg-background font-sans py-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-12 text-center">
        <div className="space-y-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-primary flex items-center justify-center mx-auto">
            <div className="w-10 h-10 rounded-full bg-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground lowercase tracking-tight">
            assessment received
          </h1>

          <p className="text-lg text-foreground/80 leading-relaxed">
            Thank you. Your executive data modernization assessment has been received.
            Hermenyx will review your responses and identify the highest-impact opportunities
            across reporting, automation, data intelligence, and AI readiness.
          </p>
        </div>

        <Card className="border border-border bg-card shadow-lg text-left">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-1 pb-2 border-b border-border">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What Happens Next
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                1
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-wide">
                  Consultant Review
                </div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  A Hermenyx consultant will review your responses and assess where your
                  organization may be losing time, visibility, or decision speed.
                </div>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                2
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-wide">
                  Opportunity Summary
                </div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  We will identify practical modernization opportunities across data engineering,
                  reporting, process automation, analytics, and AI readiness.
                </div>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                3
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-wide">
                  Follow-Up
                </div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  We will follow up at{" "}
                  <span className="font-medium text-foreground">
                    {assessment?.email ?? "the email you provided"}
                  </span>{" "}
                  with next steps or a suggested discovery conversation.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {assessment && (
          <p className="text-sm text-muted-foreground tracking-wide">
            Submission ID{" "}
            <span className="font-mono font-medium text-foreground">#{assessment.id}</span>
            {" "}— {assessment.company}
          </p>
        )}
      </div>
    </div>
  );
}