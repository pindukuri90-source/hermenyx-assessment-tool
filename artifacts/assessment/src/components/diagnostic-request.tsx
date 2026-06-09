import { useState } from "react";
import { Button } from "@/components/ui/button";

type DiagnosticRequestProps = {
  pageContext?: string;
};

export function DiagnosticRequest({
  pageContext = "Hermenyx assessment",
}: DiagnosticRequestProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto text-center space-y-4">
      {!isOpen ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Not sure where to start? 
            Share a few details and hermenyx can help assess the right diagnostic path forward.
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className=" text-sm font-medium tracking-wide text-[#27D3C3] underline underline-offset-4 hover:text-primary/80"
          >
            request a hermenyx-led diagnostic assessment
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-primary/30 bg-card/70 px-5 py-6 text-left shadow-sm">
          <div className="mb-5 text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Request a hermenyx-led diagnostic assessment
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-1">
              <p>
                Share a few details about your reporting, data, automation, or AI readiness environment.
              </p>
              <p>
                hermenyx will review the context and follow up on the best diagnostic path forward.
              </p>
            </div>
            
          </div>

          <form
            action="https://formspree.io/f/xojbznjk"
            method="POST"
            className="space-y-4"
          >
            <input
              type="hidden"
              name="request_type"
              value="Hermenyx-led diagnostic assessment"
            />

            <input type="hidden" name="source" value={pageContext} />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="first_name"
                placeholder="First name"
                required
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              />

              <input
                name="last_name"
                placeholder="Last name"
                required
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Work email"
              required
              className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="company"
                placeholder="Company"
                required
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              />

              <input
                name="job_title"
                placeholder="Job title"
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>

            <textarea
              name="message"
              placeholder="What would you like Hermenyx to assess? Reporting, data readiness, automation, AI readiness, finance operations, or another area?"
              rows={4}
              className="w-full rounded-md border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                className="flex-1 h-12 text-base font-semibold bg-primary text-background hover:bg-primary/90 tracking-wide"
              >
                request diagnostic assessment
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-12 border-border text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}