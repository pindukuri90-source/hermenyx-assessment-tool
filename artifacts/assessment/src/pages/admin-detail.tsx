import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { 
  useGetAdminAssessment, 
  useSendResults,
  getGetAdminAssessmentQueryKey 
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getSections } from "@/config/sections";

export default function AdminDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const id = parseInt(params.id || "0", 10);
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "admin123") {
      setIsAuthenticated(true);
    } else {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data: assessment, isLoading } = useGetAdminAssessment(id, {
    query: { enabled: !!id && isAuthenticated, queryKey: getGetAdminAssessmentQueryKey(id) }
  });

  const sendResults = useSendResults();
  
  const form = useForm({
    defaultValues: {
      results: assessment?.results || "",
      roadmap: assessment?.roadmap || "",
    }
  });

  // Update default values when data loads
  useEffect(() => {
    if (assessment) {
      form.reset({
        results: assessment.results || "",
        roadmap: assessment.roadmap || "",
      });
    }
  }, [assessment, form]);

  const onSubmit = (values: { results: string; roadmap: string }) => {
    sendResults.mutate(
      { id, data: values },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(getGetAdminAssessmentQueryKey(id), data);
          alert("Results sent successfully");
        }
      }
    );
  };

  if (!isAuthenticated || isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!assessment) {
    return <div className="p-8 text-center text-destructive">Assessment not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background font-sans p-8">
      <div className="max-w-7xl mx-auto space-y-6 flex flex-col">
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">← Back</Button>
          </Link>
          <div className="h-6 w-px bg-border"></div>
          <h1 className="text-xl font-bold tracking-widest uppercase text-foreground">Assessment Review</h1>
          <Badge className="ml-auto uppercase tracking-widest text-[10px] px-3 py-1" variant="outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
            {assessment.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="text-sm font-semibold tracking-widest uppercase text-foreground">Executive Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Name</div>
                  <div className="text-foreground">{assessment.firstName} {assessment.lastName}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Email</div>
                  <div className="text-foreground break-all">{assessment.email}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Company</div>
                  <div className="text-foreground">{assessment.company}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Title</div>
                  <div className="text-foreground">{assessment.jobTitle}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Industry</div>
                  <div className="text-foreground">{assessment.industry || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Company Size</div>
                  <div className="text-foreground capitalize">{assessment.companySize || "N/A"}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/30 border-t-2 border-t-primary">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="text-sm font-semibold tracking-widest uppercase text-foreground">Send Results</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-2">Provide the executive summary and 30-60-90 day roadmap.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="results"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Executive Summary</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[150px] bg-secondary border-border focus-visible:ring-primary text-foreground text-sm" placeholder="Key findings..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="roadmap"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">30-60-90 Day Roadmap</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[150px] bg-secondary border-border focus-visible:ring-primary text-foreground text-sm" placeholder="Action plan..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-background font-medium tracking-wide h-12"
                      disabled={sendResults.isPending || !['paid', 'submitted', 'approved'].includes(assessment.status)}
                    >
                      {sendResults.isPending ? "Sending..." : "Approve & Send"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold lowercase tracking-tight text-foreground mb-6">section responses</h2>
            {getSections(assessment.companySize).map((sectionConfig, idx) => {
              const sectionNum = idx + 1;
              const response = assessment.sections?.find(s => s.sectionNum === sectionNum);
              if (!response) return null;

              return (
                <Card key={sectionConfig.id} className="bg-card border-border overflow-hidden">
                  <CardHeader className="bg-secondary/30 border-b border-border py-4 px-6 flex flex-row items-center gap-4 space-y-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                      {sectionConfig.id}
                    </div>
                    <CardTitle className="text-base text-foreground font-medium">{sectionConfig.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {sectionConfig.fields.map(field => (
                      <div key={field.name} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="font-semibold text-sm text-muted-foreground mb-2">{field.label}</div>
                        <div className="text-sm text-foreground bg-secondary/20 p-4 rounded-md border border-border/50">
                          {response.data?.[field.name] 
                            ? typeof response.data[field.name] === 'object'
                              ? <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(response.data[field.name], null, 2)}</pre>
                              : String(response.data[field.name])
                            : <span className="text-muted-foreground/60 italic">No answer provided</span>
                          }
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
            {(!assessment.sections || assessment.sections.length === 0) && (
              <Card className="bg-card border-border border-dashed">
                <CardContent className="py-16 text-center text-muted-foreground">
                  <p>No responses recorded yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
