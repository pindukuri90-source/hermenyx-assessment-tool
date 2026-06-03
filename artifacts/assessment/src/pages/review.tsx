import { useParams, useLocation } from "wouter";
import { useGetAssessment, useSubmitAssessment, getGetAssessmentQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSections } from "@/config/sections";
import { ArrowRight } from "lucide-react";

export default function Review() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const id = parseInt(params.id || "0", 10);

  const { data: assessment, isLoading } = useGetAssessment(id, {
    query: { enabled: !!id, queryKey: getGetAssessmentQueryKey(id) },
  });

  const submitAssessment = useSubmitAssessment();

  const handleSubmit = () => {
    submitAssessment.mutate(
      { id },
      {
        onSuccess: () => {
          setLocation(`/assessment/${id}/confirmation`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm tracking-wide">loading assessment...</div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Assessment not found.
      </div>
    );
  }

  const activeSections = getSections(assessment.companySize);
  const totalSections = activeSections.length;
  const completedSectionNums = new Set(assessment.sections?.map((s) => s.sectionNum) ?? []);
  const completedCount = activeSections.filter((_, i) => completedSectionNums.has(i + 1)).length;
  const isFullyComplete = completedCount === totalSections;

  const sizeBadge: Record<string, string> = {
    small: "Small — Under 100 employees",
    medium: "Medium — Under 500 employees",
    enterprise: "Enterprise — Above 500 employees",
  };

  return (
    <div className="min-h-screen bg-background font-sans py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Logo */}
        <div className="flex justify-center">
          <img src="/images/hermenyx-logo-secondary.png" alt="hermenyx" className="h-8 sm:h-10" />
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground lowercase">
            review submission
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {completedCount} of {totalSections} sections completed
          </p>
          {assessment.companySize && (
            <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
              {sizeBadge[assessment.companySize] ?? assessment.companySize}
            </div>
          )}
        </div>

        {/* Section List */}
        <Card className="bg-card border-border shadow-lg overflow-hidden">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base sm:text-lg text-foreground lowercase tracking-tight">
              completion status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {activeSections.map((section, idx) => {
                const sectionNum = idx + 1;
                const isDone = completedSectionNums.has(sectionNum);
                return (
                  <div
                    key={section.id}
                    className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {isDone ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full border border-muted-foreground/40 shrink-0" />
                      )}
                      <span
                        className={`text-sm font-medium tracking-wide truncate ${
                          isDone ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span className="text-muted-foreground/60 mr-1">{sectionNum}.</span>
                        {section.title}
                      </span>
                    </div>
                    {!isDone && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0 text-accent hover:text-accent/80 hover:bg-transparent ml-2 px-2"
                        onClick={() => setLocation(`/assessment/${id}/section/${sectionNum}`)}
                      >
                        <span className="hidden sm:inline">Complete</span>
                        <ArrowRight className="w-4 h-4 sm:ml-1" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedCount} completed</span>
            <span>{totalSections - completedCount} remaining</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalSections) * 100}%` }}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 pb-8">
          <Button
            size="lg"
            className="w-full h-14 text-base sm:text-lg font-medium tracking-wide bg-primary text-background hover:bg-primary/90"
            disabled={!isFullyComplete || submitAssessment.isPending}
            onClick={handleSubmit}
          >
            {submitAssessment.isPending ? "submitting..." : "submit and request my executive summary"}
          </Button>
          {!isFullyComplete && (
            <p className="text-center text-sm text-destructive font-medium tracking-wide">
              Please complete all {totalSections} sections before submitting.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
