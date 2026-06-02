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
    <div className="min-h-screen bg-muted/30 py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto">
            <div className="w-6 h-6 rounded-full bg-primary" />
          </div>
          <h1 className="text-4xl font-serif font-semibold text-primary">
            Thank You
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your assessment has been received and your payment is confirmed. Our consulting team
            will review your responses and prepare your personalized executive report.
          </p>
        </div>

        <Card className="border-border shadow-sm text-left">
          <CardContent className="pt-6 space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What Happens Next</div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                1
              </div>
              <div>
                <div className="font-semibold text-sm">Review by Consulting Team</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  A senior consultant will analyze your complete assessment responses, typically within 1–2 business days.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                2
              </div>
              <div>
                <div className="font-semibold text-sm">Executive Summary Prepared</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  Your personalized executive summary and 30-60-90 day roadmap will be authored and quality-reviewed.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                3
              </div>
              <div>
                <div className="font-semibold text-sm">Report Delivered</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  You will receive your report via your preferred delivery method at{" "}
                  <span className="font-medium text-foreground">{assessment?.email ?? "the email you provided"}</span>.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {assessment && (
          <p className="text-sm text-muted-foreground">
            Submission ID{" "}
            <span className="font-mono font-medium text-foreground">#{assessment.id}</span>
            {" "}— {assessment.company}
          </p>
        )}
      </div>
    </div>
  );
}
