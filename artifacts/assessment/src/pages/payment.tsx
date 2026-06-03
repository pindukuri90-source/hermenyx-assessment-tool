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
    <div className="min-h-screen bg-background font-sans py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-block border border-accent/20 bg-accent/10 text-accent text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-2">
            assessment complete
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground lowercase tracking-tight">
            unlock your executive report
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Your responses have been captured. Our consulting team will now analyze your assessment
            and prepare a personalized executive summary and 30-60-90 day modernization roadmap.
          </p>
        </div>

        <Card className="border-t-4 border-t-primary border-x border-b border-border shadow-lg bg-card">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <div className="font-semibold text-foreground tracking-wide">Personalized Executive Summary</div>
                  <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    A consultant-authored analysis of your current state, key gaps, and highest-value opportunities based on your specific responses.
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <div className="font-semibold text-foreground tracking-wide">30-60-90 Day Modernization Roadmap</div>
                  <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    A practical, phased action plan covering quick wins, medium-term priorities, and strategic long-term initiatives tailored to your organization.
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <div className="font-semibold text-foreground tracking-wide">Prioritized Initiative Recommendations</div>
                  <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Ranked modernization opportunities by effort, impact, and ROI — ready to present to your leadership team or board.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-sm text-muted-foreground tracking-wide uppercase font-medium">One-time investment</div>
                <div className="text-4xl font-bold text-primary mt-1">$497</div>
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 h-14 text-base font-medium tracking-wide bg-primary text-background hover:bg-primary/90"
                onClick={handlePay}
                disabled={createCheckout.isPending}
              >
                {createCheckout.isPending ? "Processing..." : "pay and unlock report"}
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
