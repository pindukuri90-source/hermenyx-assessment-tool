import { useParams, useLocation } from "wouter";
import { useGetAssessment, useSubmitAssessment, getGetAssessmentQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_SECTIONS } from "@/config/sections";
import { CheckCircle2, ArrowRight } from "lucide-react";

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
          setLocation(`/assessment/${id}/payment`);
        }
      }
    );
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!assessment) {
    return <div className="min-h-screen flex items-center justify-center">Assessment not found.</div>;
  }

  const completedSections = assessment.sections?.length || 0;
  const totalSections = ASSESSMENT_SECTIONS.length;
  const isFullyComplete = completedSections === totalSections;

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-semibold text-primary">Review Submission</h1>
          <p className="text-lg text-muted-foreground">
            You have completed {completedSections} of {totalSections} sections.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Completion Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ASSESSMENT_SECTIONS.map((section) => {
              const isDone = assessment.sections?.some(s => s.sectionNum === section.id);
              return (
                <div key={section.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <span className={`font-medium ${!isDone && 'text-muted-foreground'}`}>
                      Section {section.id}: {section.title}
                    </span>
                  </div>
                  {!isDone && (
                    <Button variant="ghost" size="sm" onClick={() => setLocation(`/assessment/${id}/section/${section.id}`)}>
                      Complete <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Button 
            size="lg" 
            className="w-full h-14 text-lg" 
            disabled={!isFullyComplete || submitAssessment.isPending}
            onClick={handleSubmit}
          >
            {submitAssessment.isPending ? "Submitting..." : "Submit Assessment"}
          </Button>
          {!isFullyComplete && (
            <p className="text-center text-sm text-destructive">
              Please complete all sections before submitting.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
