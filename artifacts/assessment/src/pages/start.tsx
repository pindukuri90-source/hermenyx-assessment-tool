import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useCreateAssessment } from "@workspace/api-client-react";
import { useAssessmentSession } from "@/hooks/use-assessment-session";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  industry: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Start() {
  const [, setLocation] = useLocation();
  const { saveAssessmentSession } = useAssessmentSession();
  const createAssessment = useCreateAssessment();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      industry: "",
    },
  });

  function onSubmit(values: FormValues) {
    createAssessment.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          saveAssessmentSession(data.id);
          setLocation(`/assessment/${data.id}/section/1`);
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans py-12 px-4 sm:px-6 items-center justify-center">
      <div className="max-w-xl w-full">
        <Card className="shadow-lg border-border bg-card">
          <CardHeader className="space-y-4 border-b border-border pb-6 flex flex-col items-center text-center">
            <img src="/images/hermenyx-icon.png" alt="hermenyx icon" className="w-12 h-12" />
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold lowercase tracking-tight">your executive profile</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                tell us about yourself to begin the assessment
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">First Name</FormLabel>
                        <FormControl>
                          <Input className="bg-secondary border-border focus-visible:ring-primary text-foreground" placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Last Name</FormLabel>
                        <FormControl>
                          <Input className="bg-secondary border-border focus-visible:ring-primary text-foreground" placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Work Email</FormLabel>
                      <FormControl>
                        <Input className="bg-secondary border-border focus-visible:ring-primary text-foreground" type="email" placeholder="jane.doe@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Company Name</FormLabel>
                      <FormControl>
                        <Input className="bg-secondary border-border focus-visible:ring-primary text-foreground" placeholder="Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Job Title</FormLabel>
                        <FormControl>
                          <Input className="bg-secondary border-border focus-visible:ring-primary text-foreground" placeholder="Chief Data Officer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Industry</FormLabel>
                        <FormControl>
                          <Input className="bg-secondary border-border focus-visible:ring-primary text-foreground" placeholder="Financial Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-medium tracking-wide bg-primary text-background hover:bg-primary/90 mt-4" 
                  disabled={createAssessment.isPending}
                >
                  {createAssessment.isPending ? "Initializing..." : "begin assessment"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
