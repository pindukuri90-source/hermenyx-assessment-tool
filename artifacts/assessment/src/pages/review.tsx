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
    <div className="min-h-screen bg-background font-sans py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground lowercase">review submission</h1>
          <p className="text-lg text-muted-foreground">
            You have completed {completedSections} of {totalSections} sections.
          </p>
        </div>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-xl text-foreground">Completion Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {ASSESSMENT_SECTIONS.map((section) => {
                const isDone = assessment.sections?.some(s => s.sectionNum === section.id);
                return (
                  <div key={section.id} className="flex items-center justify-between p-4 px-6 hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-4">
                      {isDone ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full border border-muted-foreground/40 shrink-0" />
                      )}
                      <span className={`font-medium text-sm tracking-wide ${!isDone ? 'text-muted-foreground' : 'text-foreground'}`}>
                        Section {section.id}: {section.title}
                      </span>
                    </div>
                    {!isDone && (
                      <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 hover:bg-transparent" onClick={() => setLocation(`/assessment/${id}/section/${section.id}`)}>
                        Complete <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Button 
            size="lg" 
            className="w-full h-14 text-lg font-medium tracking-wide bg-primary text-background hover:bg-primary/90" 
            disabled={!isFullyComplete || submitAssessment.isPending}
            onClick={handleSubmit}
          >
            {submitAssessment.isPending ? "submitting..." : "submit assessment"}
          </Button>
          {!isFullyComplete && (
            <p className="text-center text-sm text-destructive font-medium tracking-wide">
              Please complete all sections before submitting.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
