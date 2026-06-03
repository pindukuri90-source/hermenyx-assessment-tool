import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/landing";
import Start from "@/pages/start";
import Section from "@/pages/section";
import Review from "@/pages/review";

import Confirmation from "@/pages/confirmation";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminDetail from "@/pages/admin-detail";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/start" component={Start} />
      <Route path="/assessment/:id/section/:sectionNum" component={Section} />
      <Route path="/assessment/:id/review" component={Review} />
      <Route path="/assessment/:id/confirmation" component={Confirmation} />
      
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/assessment/:id" component={AdminDetail} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
