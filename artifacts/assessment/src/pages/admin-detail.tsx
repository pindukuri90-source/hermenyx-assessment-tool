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
import { ASSESSMENT_SECTIONS } from "@/config/sections";

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
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm">← Back to Dashboard</Button>
          </Link>
          <h1 className="text-3xl font-serif font-semibold text-primary">Assessment Review</h1>
          <Badge className="ml-auto" variant={assessment.status === 'paid' ? 'default' : 'secondary'}>
            {assessment.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Executive Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Name</div>
                  <div>{assessment.firstName} {assessment.lastName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Email</div>
                  <div>{assessment.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Company</div>
                  <div>{assessment.company}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Title</div>
                  <div>{assessment.jobTitle}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Industry</div>
                  <div>{assessment.industry || "N/A"}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send Results</CardTitle>
                <CardDescription>Provide the executive summary and 30-60-90 day roadmap.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="results"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Executive Summary</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[150px]" placeholder="Key findings..." {...field} />
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
                          <FormLabel>30-60-90 Day Roadmap</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[150px]" placeholder="Action plan..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
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
            <h2 className="text-2xl font-serif font-semibold">Section Responses</h2>
            {ASSESSMENT_SECTIONS.map((sectionConfig) => {
              const response = assessment.sections?.find(s => s.sectionNum === sectionConfig.id);
              if (!response) return null;

              return (
                <Card key={sectionConfig.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">Section {sectionConfig.id}: {sectionConfig.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sectionConfig.fields.map(field => (
                      <div key={field.name} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="font-medium text-sm text-muted-foreground mb-1">{field.label}</div>
                        <div className="text-sm">
                          {response.data?.[field.name] 
                            ? typeof response.data[field.name] === 'object'
                              ? JSON.stringify(response.data[field.name], null, 2)
                              : String(response.data[field.name])
                            : <span className="text-muted-foreground italic">No answer</span>
                          }
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
            {(!assessment.sections || assessment.sections.length === 0) && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No responses recorded yet.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
