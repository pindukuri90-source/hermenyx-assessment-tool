import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useCreateAssessment } from "@workspace/api-client-react";
import { useAssessmentSession } from "@/hooks/use-assessment-session";
import { cn } from "@/lib/utils";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const COMPANY_SIZES = [
  {
    value: "small",
    label: "Small",
    description: "Under 100 employees",
    detail: "Concise, focused assessment covering your highest-impact opportunities.",
    sections: "6 sections",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Under 500 employees",
    detail: "Balanced assessment for growing organizations navigating data complexity.",
    sections: "9 sections",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Above 500 employees",
    detail: "Comprehensive discovery for complex, multi-department organizations.",
    sections: "11 sections",
  },
] as const;

const formSchema = z.object({
  companySize: z.enum(["small", "medium", "enterprise"], {
    required_error: "Please select your company size to continue.",
  }),
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

  const selectedSize = form.watch("companySize");

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
    <div className="min-h-screen bg-background flex flex-col font-sans py-8 px-4 sm:px-6 items-center justify-center">
      <div className="w-full max-w-2xl">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/hermenyx-logo-secondary.png"
            alt="hermenyx"
            className="h-10 sm:h-12"
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Company Size Selector */}
            <div className="space-y-3">
              <div className="text-center space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold lowercase tracking-tight text-foreground">
                  select your company size
                </h1>
                <p className="text-base text-muted-foreground">
                  your assessment is tailored to your organization's scale
                </p>
              </div>

              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                      {COMPANY_SIZES.map((size) => {
                        const isSelected = field.value === size.value;
                        return (
                          <button
                            key={size.value}
                            type="button"
                            onClick={() => field.onChange(size.value)}
                            className={cn(
                              "relative flex flex-col items-start text-left rounded-lg border-2 p-4 sm:p-5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              isSelected
                                ? "border-primary bg-primary/10"
                                : "border-border bg-card hover:border-primary/40 hover:bg-card/80"
                            )}
                          >
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                            <span className={cn(
                              "text-lg font-bold tracking-tight",
                              isSelected ? "text-primary" : "text-foreground"
                            )}>
                              {size.label}
                            </span>
                            <span className={cn(
                              "text-sm font-medium mt-0.5",
                              isSelected ? "text-primary/80" : "text-muted-foreground"
                            )}>
                              {size.description}
                            </span>
                            <span className="text-xs text-muted-foreground mt-2 leading-relaxed">
                              {size.detail}
                            </span>
                            <span className={cn(
                              "text-xs font-semibold mt-3 tracking-wide",
                              isSelected ? "text-accent" : "text-muted-foreground/60"
                            )}>
                              {size.sections}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage className="text-center mt-2" />
                  </FormItem>
                )}
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-xs text-muted-foreground tracking-widest uppercase">
                  your executive profile
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <Card className="border-border bg-card shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold lowercase tracking-tight text-foreground">
                  tell us about yourself
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  your report will be personalized to your role and organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm">First Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-secondary border-border focus-visible:ring-primary text-foreground"
                            placeholder="Jane"
                            {...field}
                          />
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
                        <FormLabel className="text-foreground text-sm">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-secondary border-border focus-visible:ring-primary text-foreground"
                            placeholder="Doe"
                            {...field}
                          />
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
                      <FormLabel className="text-foreground text-sm">Work Email</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-secondary border-border focus-visible:ring-primary text-foreground"
                          type="email"
                          placeholder="jane.doe@company.com"
                          {...field}
                        />
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
                      <FormLabel className="text-foreground text-sm">Company Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-secondary border-border focus-visible:ring-primary text-foreground"
                          placeholder="Acme Corp"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm">Job Title</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-secondary border-border focus-visible:ring-primary text-foreground"
                            placeholder="Chief Data Officer"
                            {...field}
                          />
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
                        <FormLabel className="text-foreground text-sm">Industry</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-secondary border-border focus-visible:ring-primary text-foreground"
                            placeholder="Financial Services"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-medium tracking-wide bg-primary text-background hover:bg-primary/90"
              disabled={createAssessment.isPending}
            >
              {createAssessment.isPending
                ? "initializing..."
                : selectedSize
                ? `begin ${selectedSize} assessment`
                : "begin assessment"}
            </Button>

            <p className="text-center text-xs text-muted-foreground pb-4">
              accelerate intelligently_
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
