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
            thank you
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Your assessment has been received and your payment is confirmed. Our consulting team
            will review your responses and prepare your personalized executive report.
          </p>
        </div>

        <Card className="border border-border bg-card shadow-lg text-left">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-1 pb-2 border-b border-border">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What Happens Next</div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                1
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-wide">Review by Consulting Team</div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  A senior consultant will analyze your complete assessment responses, typically within 1–2 business days.
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                2
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-wide">Executive Summary Prepared</div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Your personalized executive summary and 30-60-90 day roadmap will be authored and quality-reviewed.
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-background text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                3
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-wide">Report Delivered</div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  You will receive your report via your preferred delivery method at{" "}
                  <span className="font-medium text-foreground">{assessment?.email ?? "the email you provided"}</span>.
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
