import { useParams, useLocation } from "wouter";
import { useGetAssessment, useCreateCheckout, getGetAssessmentQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Payment() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const id = parseInt(params.id ?? "0", 10);

  const { data: assessment, isLoading } = useGetAssessment(id, {
    query: { enabled: !!id, queryKey: getGetAssessmentQueryKey(id) },
  });

  const createCheckout = useCreateCheckout();

  const handlePay = () => {
    createCheckout.mutate(
      { id },
      {
        onSuccess: (data) => {
          window.location.href = data.checkoutUrl;
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            Assessment Complete
          </div>
          <h1 className="text-4xl font-serif font-semibold text-primary">
            Unlock Your Executive Report
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your responses have been captured. Our consulting team will now analyze your assessment
            and prepare a personalized executive summary and 30-60-90 day modernization roadmap.
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader className="border-b border-border bg-card/50">
            <CardTitle className="text-xl">What You Will Receive</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <div className="font-semibold">Personalized Executive Summary</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  A consultant-authored analysis of your current state, key gaps, and highest-value opportunities based on your specific responses.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <div className="font-semibold">30-60-90 Day Modernization Roadmap</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  A practical, phased action plan covering quick wins, medium-term priorities, and strategic long-term initiatives tailored to your organization.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <div className="font-semibold">Prioritized Initiative Recommendations</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  Ranked modernization opportunities by effort, impact, and ROI — ready to present to your leadership team or board.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">One-time investment</div>
                <div className="text-3xl font-bold text-primary mt-0.5">$497</div>
              </div>
              <Button
                size="lg"
                className="px-8 h-12 text-base"
                onClick={handlePay}
                disabled={createCheckout.isPending}
              >
                {createCheckout.isPending ? "Processing..." : "Pay and Unlock Report"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {assessment && (
          <p className="text-center text-sm text-muted-foreground">
            Submission for{" "}
            <span className="font-medium text-foreground">
              {assessment.firstName} {assessment.lastName}
            </span>{" "}
            at{" "}
            <span className="font-medium text-foreground">{assessment.company}</span>
          </p>
        )}
      </div>
    </div>
  );
}
