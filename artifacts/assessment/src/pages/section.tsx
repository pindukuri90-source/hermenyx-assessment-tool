import { useEffect, useCallback } from "react";
import { useParams, useLocation } from "wouter";
import { useForm, Controller } from "react-hook-form";
import { useGetAssessment, useSaveSectionResponse, getGetAssessmentQueryKey } from "@workspace/api-client-react";
import { ASSESSMENT_SECTIONS, TOTAL_SECTIONS, type SectionField } from "@/config/sections";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Section() {
  const params = useParams<{ id: string; sectionNum: string }>();
  const [, setLocation] = useLocation();
  const id = parseInt(params.id ?? "0", 10);
  const sectionNum = parseInt(params.sectionNum ?? "1", 10);

  const sectionConfig = ASSESSMENT_SECTIONS.find((s) => s.id === sectionNum);

  const { data: assessment } = useGetAssessment(id, {
    query: { enabled: !!id, queryKey: getGetAssessmentQueryKey(id) },
  });

  const saveSection = useSaveSectionResponse();

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
            if (sectionNum < TOTAL_SECTIONS) {
              setLocation(`/assessment/${id}/section/${sectionNum + 1}`);
            } else {
              setLocation(`/assessment/${id}/review`);
            }
          },
        }
      );
    },
    [id, sectionNum, saveSection, setLocation]
  );

  if (!sectionConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Section not found.
      </div>
    );
  }

  const progressPct = Math.round(((sectionNum - 1) / TOTAL_SECTIONS) * 100);
  const isLast = sectionNum === TOTAL_SECTIONS;

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Top Nav */}
      <nav className="w-full px-6 py-4 border-b border-border flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <img src="/images/hermenyx-icon.png" alt="hermenyx" className="w-6 h-6" />
          <span className="font-semibold tracking-wide text-sm text-foreground">hermenyx</span>
        </div>
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          {sectionConfig.title}
        </div>
      </nav>

      {/* Progress bar */}
      <div className="w-full bg-border h-1">
        <div
          className="bg-primary h-1 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-accent tracking-widest uppercase">
              Section {sectionNum} of {TOTAL_SECTIONS}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground lowercase">
              {sectionConfig.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{sectionConfig.subtitle}</p>
          </div>

          {/* Questions */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {sectionConfig.fields.map((field) => (
              <Card key={field.name} className="border-border bg-card shadow-sm border-l-4 border-l-primary rounded-r-lg rounded-l-none">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold leading-snug text-foreground">
                    {field.label}
                    {field.required && <span className="text-primary ml-1">*</span>}
                  </CardTitle>
                  {field.description && (
                    <CardDescription className="text-sm text-muted-foreground mt-1">{field.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <FieldRenderer field={field} control={control} watch={watch} setValue={setValue} />
                </CardContent>
              </Card>
            ))}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 pb-12 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="px-8 h-12 text-foreground border-border hover:bg-muted hover:text-foreground tracking-wide font-medium"
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
              <Button type="submit" className="px-10 h-12 bg-primary text-background hover:bg-primary/90 tracking-wide font-medium" disabled={saveSection.isPending}>
                {saveSection.isPending
                  ? "Saving..."
                  : isLast
                  ? "review submission"
                  : "next section"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  control,
  watch,
  setValue,
}: {
  field: SectionField;
  control: any;
  watch: any;
  setValue: any;
}) {
  if (field.type === "multiselect") {
    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={[]}
        render={({ field: f }) => {
          const selected: string[] = Array.isArray(f.value) ? f.value : [];
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {field.options?.map((option) => {
                const checked = selected.includes(option);
                return (
                  <label
                    key={option}
                    className={cn(
                      "flex items-start gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors text-sm",
                      checked
                        ? "border-primary bg-primary/10 text-foreground font-medium"
                        : "border-border hover:border-primary/40 hover:bg-muted/50 text-foreground/80"
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(val) => {
                        if (val) {
                          f.onChange([...selected, option]);
                        } else {
                          f.onChange(selected.filter((s) => s !== option));
                        }
                      }}
                      className={cn(
                        "mt-0.5 shrink-0",
                        checked ? "border-primary text-primary" : "border-muted-foreground"
                      )}
                    />
                    <span>{option}</span>
                  </label>
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
        name={field.name}
        control={control}
        defaultValue=""
        render={({ field: f }) => (
          <div className="flex flex-col gap-2">
            {field.options?.map((option) => {
              const selected = f.value === option;
              return (
                <label
                  key={option}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors text-sm",
                    selected
                      ? "border-primary bg-primary/10 text-foreground font-medium"
                      : "border-border hover:border-primary/40 hover:bg-muted/50 text-foreground/80"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                      selected ? "border-primary" : "border-muted-foreground/40"
                    )}
                  >
                    {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    value={option}
                    checked={selected}
                    onChange={() => f.onChange(option)}
                  />
                  <span>{option}</span>
                </label>
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
        name={field.name}
        control={control}
        defaultValue=""
        render={({ field: f }) => (
          <div className="flex gap-3">
            {field.options?.map((val) => {
              const selected = f.value === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => f.onChange(val)}
                  className={cn(
                    "flex-1 h-14 rounded-none border-2 text-lg font-semibold transition-all",
                    selected
                      ? "border-primary bg-primary text-background shadow-md"
                      : "border-border bg-secondary hover:border-primary/50 text-muted-foreground hover:text-foreground"
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
        name={field.name}
        control={control}
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
        name={field.name}
        control={control}
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

  if (field.type === "table") {
    const rows = field.tableRows ?? 3;
    const cols = field.columns ?? [];
    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={Array.from({ length: rows }, () =>
          Object.fromEntries(cols.map((c) => [c.key, ""]))
        )}
        render={({ field: f }) => {
          const tableData: Record<string, string>[] = Array.isArray(f.value)
            ? f.value
            : Array.from({ length: rows }, () =>
                Object.fromEntries(cols.map((c) => [c.key, ""]))
              );

          const updateCell = (rowIdx: number, colKey: string, val: string) => {
            const updated = tableData.map((row, i) =>
              i === rowIdx ? { ...row, [colKey]: val } : row
            );
            f.onChange(updated);
          };

          return (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-2 pr-2 w-6">#</th>
                    {cols.map((col) => (
                      <th
                        key={col.key}
                        className="text-left text-xs font-medium text-muted-foreground pb-2 px-2"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: rows }, (_, rowIdx) => (
                    <tr key={rowIdx} className="border-t border-border">
                      <td className="py-2 pr-2 text-xs text-muted-foreground">{rowIdx + 1}</td>
                      {cols.map((col) => (
                        <td key={col.key} className="py-2 px-2">
                          <Input
                            value={tableData[rowIdx]?.[col.key] ?? ""}
                            onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                            placeholder={col.placeholder}
                            className="h-8 text-xs bg-secondary border-border focus-visible:ring-primary text-foreground"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }}
      />
    );
  }

  return null;
}
