import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-serif text-primary tracking-tight">Executive Data Modernization Assessment</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Evaluate your organization's readiness for data automation, advanced reporting, and AI. 
          Gain actionable insights and a roadmap for modernization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 pb-12 text-left">
          <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Evaluate Infrastructure</h3>
            <p className="text-sm text-muted-foreground">Assess your current reporting pain points, manual processes, and systems landscape.</p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Identify Opportunities</h3>
            <p className="text-sm text-muted-foreground">Uncover high-ROI initiatives for automation and decision intelligence.</p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Receive Roadmap</h3>
            <p className="text-sm text-muted-foreground">Get a tailored 30-60-90 day execution plan from our consulting team.</p>
          </div>
        </div>

        <Link href="/start">
          <Button size="lg" className="h-14 px-8 text-lg font-medium shadow-md">
            Begin Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}
