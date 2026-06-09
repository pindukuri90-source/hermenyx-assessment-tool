import { useEffect, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { useForm, Controller } from "react-hook-form";
import { useGetAssessment, useSaveSectionResponse, getGetAssessmentQueryKey } from "@workspace/api-client-react";
import { getSections, type SectionField } from "@/config/sections";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { DiagnosticRequest } from "@/components/diagnostic-request";

export default function Section() {
  const params = useParams<{ id: string; sectionNum: string }>();
  const [, setLocation] = useLocation();
  const id = parseInt(params.id ?? "0", 10);
  const sectionNum = parseInt(params.sectionNum ?? "1", 10);

  const { data: assessment, isLoading } = useGetAssessment(id, {
    query: { enabled: !!id, queryKey: getGetAssessmentQueryKey(id) },
  });

  const saveSection = useSaveSectionResponse();

  // Derive sections from the assessment's company size
  const activeSections = getSections(assessment?.companySize);
  const totalSections = activeSections.length;
  const sectionConfig = activeSections[sectionNum - 1];

  const existingSection = assessment?.sections?.find((s) => s.sectionNum === sectionNum);

  const { control, handleSubmit, reset, watch, setValue } = useForm<Record<string, unknown>>({
    defaultValues: {},
  });

  useEffect(() => {
    if (existingSection?.data && typeof existingSection.data === "object") {
      reset(existingSection.data as Record<string, unknown>);
    }
  }, [existingSection, reset]);

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      saveSection.mutate(
        { id, sectionNum, data: { data } },
        {
          onSuccess: () => {
            if (sectionNum < totalSections) {
              setLocation(`/assessment/${id}/section/${sectionNum + 1}`);
            } else {
              setLocation(`/assessment/${id}/review`);
            }
          },
        }
      );
    },
    [id, sectionNum, saveSection, setLocation, totalSections]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground text-sm tracking-wide">loading assessment...</div>
      </div>
    );
  }

  if (!sectionConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground bg-background">
        Section not found.
      </div>
    );
  }

  const progressPct = Math.round(((sectionNum - 1) / totalSections) * 100);
  const isLast = sectionNum === totalSections;

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Top Nav */}
      <nav className="w-full px-4 sm:px-6 py-3 border-b border-border flex items-center justify-between bg-background sticky top-0 z-10">
        <div className="flex items-center">
          <img
            src="/images/hermenyx-logo-secondary.png"
            alt="hermenyx"
            className="h-7 sm:h-8"
          />
        </div>
        <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest truncate max-w-[180px] sm:max-w-none">
          {sectionConfig.title}
        </div>
      </nav>

      {/* Progress bar */}
      <div className="w-full bg-border h-0.5">
        <div
          className="bg-primary h-0.5 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-medium text-accent tracking-widest uppercase">
              Section {sectionNum} of {totalSections}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground lowercase">
              {sectionConfig.title}
            </h1>
            <p className="mt-1 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {sectionConfig.subtitle}
            </p>
          </div>

          {/* Questions */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {sectionConfig.fields.map((field) => (
              <Card
                key={field.name}
                className="border-border bg-card shadow-sm border-l-4 border-l-primary rounded-r-lg rounded-l-none"
              >
                <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                  <CardTitle className="text-base sm:text-lg font-semibold leading-snug text-foreground">
                    {field.label}
                    {field.required && <span className="text-primary ml-1">*</span>}
                  </CardTitle>
                  {field.description && (
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {field.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <FieldRenderer field={field} control={control} watch={watch} setValue={setValue} />
                </CardContent>
              </Card>
            ))}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 pb-10 border-t border-border gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none px-6 sm:px-8 h-12 text-foreground border-border hover:bg-muted hover:text-foreground tracking-wide font-medium"
                onClick={() => {
                  if (sectionNum > 1) {
                    setLocation(`/assessment/${id}/section/${sectionNum - 1}`);
                  } else {
                    setLocation(`/start`);
                  }
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 sm:flex-none px-8 sm:px-10 h-12 bg-primary text-background hover:bg-primary/90 tracking-wide font-medium"
                disabled={saveSection.isPending}
              >
                {saveSection.isPending
                  ? "Saving..."
                  : isLast
                  ? "review submission"
                  : "next section"}
              </Button>
            </div>
          </form>
          </div>
        <DiagnosticRequest pageContext="Hermenyx assessment section page" />

          <div className="text-center font-medium tracking-widest text-base">
            <span className="text-[#E96A15]">accelerate intelligently</span>
            <span className="text-[#27D3C3]">_</span>
          
        </div>
      </div>
    </div>
  );
}

// ─── Field Renderer ────────────────────────────────────────────────────────────

interface FieldRendererProps {
  field: SectionField;
  control: ReturnType<typeof useForm>["control"];
  watch: ReturnType<typeof useForm>["watch"];
  setValue: ReturnType<typeof useForm>["setValue"];
}

function FieldRenderer({ field, control, watch, setValue }: FieldRendererProps) {
  if (field.type === "multiselect") {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue={[]}
        render={({ field: f }) => {
          const selected: string[] = Array.isArray(f.value) ? (f.value as string[]) : [];
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {field.options?.map((option) => {
                const checked = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const next = checked
                        ? selected.filter((v) => v !== option)
                        : [...selected, option];
                      f.onChange(next);
                    }}
                    className={cn(
                      "flex items-start gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors text-left text-sm",
                      checked
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background hover:border-primary/40 hover:bg-muted/20 text-foreground"
                    )}
                  >
                    <div className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 rounded-sm border flex items-center justify-center",
                      checked ? "bg-primary border-primary" : "border-muted-foreground/40"
                    )}>
                      {checked && (
                        <svg className="h-3 w-3 text-background" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>
          );
        }}
      />
    );
  }

  if (field.type === "radio") {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue=""
        render={({ field: f }) => (
          <div className="flex flex-col gap-2">
            {field.options?.map((option) => {
              const checked = f.value === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => f.onChange(option)}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors text-left text-sm",
                    checked
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/20 text-foreground"
                  )}
                >
                  <div className={cn(
                    "h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center",
                    checked ? "border-primary" : "border-muted-foreground/40"
                  )}>
                    {checked && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>
        )}
      />
    );
  }

  if (field.type === "scale") {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue=""
        render={({ field: f }) => (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {field.options?.map((val) => {
              const selected = f.value === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => f.onChange(val)}
                  className={cn(
                    "h-12 w-12 sm:h-14 sm:w-14 rounded-md border-2 font-semibold text-base transition-colors",
                    selected
                      ? "bg-primary border-primary text-background"
                      : "border-border bg-background text-foreground hover:border-primary/60"
                  )}
                >
                  {val}
                </button>
              );
            })}
          </div>
        )}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue=""
        render={({ field: f }) => (
          <Textarea
            {...f}
            value={typeof f.value === "string" ? f.value : ""}
            placeholder={field.placeholder}
            className="min-h-[120px] resize-y text-base bg-secondary border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/70"
          />
        )}
      />
    );
  }

  if (field.type === "text" || field.type === "number") {
    return (
      <Controller
        control={control}
        name={field.name}
        defaultValue=""
        render={({ field: f }) => (
          <Input
            {...f}
            value={typeof f.value === "string" || typeof f.value === "number" ? f.value : ""}
            type={field.type}
            placeholder={field.placeholder}
            className="text-base bg-secondary border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/70"
          />
        )}
      />
    );
  }

  if (field.type === "table" && field.columns && field.tableRows) {
    return (
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full text-sm border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground pb-2 pr-2 w-6">#</th>
              {field.columns.map((col) => (
                <th key={col.key} className="text-left text-xs font-medium text-muted-foreground pb-2 px-2">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: field.tableRows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t border-border">
                <td className="py-2 pr-2 text-xs text-muted-foreground align-middle">{rowIdx + 1}</td>
                {field.columns!.map((col) => (
                  <td key={col.key} className="py-1.5 px-1">
                    <Controller
                      control={control}
                      name={`${field.name}_${rowIdx}_${col.key}`}
                      defaultValue=""
                      render={({ field: f }) => (
                        <Input
                          {...f}
                          value={typeof f.value === "string" ? f.value : ""}
                          placeholder={col.placeholder}
                          className="h-9 text-sm bg-secondary border-border focus-visible:ring-primary text-foreground placeholder:text-muted-foreground/60"
                        />
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}
