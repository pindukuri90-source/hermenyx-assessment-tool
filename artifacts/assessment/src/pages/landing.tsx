import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <nav className="w-full px-8 py-6">
        <a
          href="https://hermenyx.com"
          aria-label="Return to Hermenyx website"
          className="inline-flex items-center hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/hermenyx-logo-secondary.png"
            alt="hermenyx"
            className="h-8"
          />
        </a>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center space-y-4">
          <div className="flex justify-center">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase px-3 py-1 border border-accent/20 rounded-full bg-accent/10">executive assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            data modernization & ai readiness assessment
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Assess your organization’s data foundation, reporting maturity, automation opportunities, and AI readiness. 
            Receive practical insight into the gaps, priorities, and next steps required to accelerate intelligently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 pb-12 text-left">
            <div className="p-8 border-t-2 border-t-primary border-x border-b border-border rounded-lg bg-card shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-foreground lowercase">evaluate infrastructure</h3>
              <p className="text-base text-muted-foreground">Assess your current reporting pain points, manual processes, and systems landscape.</p>
            </div>
            <div className="p-8 border-t-2 border-t-primary border-x border-b border-border rounded-lg bg-card shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-foreground lowercase">identify opportunities</h3>
              <p className="text-base text-muted-foreground">Uncover high-ROI initiatives for automation and decision intelligence.</p>
            </div>
            <div className="p-8 border-t-2 border-t-primary border-x border-b border-border rounded-lg bg-card shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-foreground lowercase">receive your roadmap</h3>
              <p className="text-base text-muted-foreground">Get a tailored 30-60-90 day execution plan from our consulting team.</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <Link href="/start" asChild>
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-semibold shadow-md bg-primary text-background hover:bg-primary/90 tracking-wide"
              >
                begin assessment
              </Button>
            </Link>
            
            <div className="text-center font-medium tracking-widest text-base">
              <span className="text-[#E96A15]">accelerate intelligently</span>
              <span className="text-[#27D3C3]">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
