import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  useGetAdminStats, 
  useListAdminAssessments,
  getGetAdminStatsQueryKey,
  getListAdminAssessmentsQueryKey,
  AssessmentSummary
} from "@workspace/api-client-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "admin123") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "admin123");
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const { data: stats, isLoading: statsLoading } = useGetAdminStats({
    query: { enabled: isAuthenticated, queryKey: getGetAdminStatsQueryKey() }
  });

  const { data: assessments, isLoading: listLoading } = useListAdminAssessments(undefined, {
    query: { enabled: isAuthenticated, queryKey: getListAdminAssessmentsQueryKey() }
  });

    if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background font-sans flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-card border-border shadow-lg">
          <CardHeader className="text-center pb-4 flex flex-col items-center">
            <img src="/images/hermenyx-icon.png" alt="hermenyx icon" className="w-10 h-10 mb-4" />
            <CardTitle className="text-2xl font-bold tracking-tight lowercase">admin portal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input 
                type="password" 
                placeholder="Enter admin password" 
                className="bg-secondary border-border focus-visible:ring-primary text-center"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full bg-primary text-background font-medium tracking-wide">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent/20 text-accent border border-accent/30';
      case 'paid': return 'bg-primary/20 text-primary border border-primary/30';
      case 'submitted': return 'bg-accent/10 text-accent border border-accent/20';
      case 'approved': return 'bg-primary/10 text-primary border border-primary/20';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <img src="/images/hermenyx-logo-secondary.png" alt="hermenyx" className="h-6" />
            <div className="h-6 w-px bg-border"></div>
            <h1 className="text-xl font-semibold tracking-widest uppercase text-foreground">admin dashboard</h1>
          </div>
          <Button variant="outline" className="border-border text-foreground hover:bg-muted tracking-wide" onClick={() => {
            localStorage.removeItem("adminAuth");
            setIsAuthenticated(false);
          }}>
            Sign Out
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Total</CardHeader>
              <CardContent className="text-3xl font-bold text-primary">{stats.total}</CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Draft</CardHeader>
              <CardContent className="text-3xl font-bold text-foreground">{stats.draft}</CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Submitted</CardHeader>
              <CardContent className="text-3xl font-bold text-accent">{stats.submitted}</CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Paid</CardHeader>
              <CardContent className="text-3xl font-bold text-primary">{stats.paid}</CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Approved</CardHeader>
              <CardContent className="text-3xl font-bold text-primary/80">{stats.approved}</CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Completed</CardHeader>
              <CardContent className="text-3xl font-bold text-accent">{stats.completed}</CardContent>
            </Card>
          </div>
        )}

        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg text-foreground tracking-wide font-medium">Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {listLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground font-medium uppercase tracking-widest text-xs py-4">Executive</TableHead>
                    <TableHead className="text-muted-foreground font-medium uppercase tracking-widest text-xs py-4">Company</TableHead>
                    <TableHead className="text-muted-foreground font-medium uppercase tracking-widest text-xs py-4">Status</TableHead>
                    <TableHead className="text-muted-foreground font-medium uppercase tracking-widest text-xs py-4">Date</TableHead>
                    <TableHead className="text-right text-muted-foreground font-medium uppercase tracking-widest text-xs py-4">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments?.map((assessment) => (
                    <TableRow key={assessment.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="py-4">
                        <div className="font-medium text-foreground">{assessment.firstName} {assessment.lastName}</div>
                        <div className="text-xs text-muted-foreground">{assessment.email}</div>
                      </TableCell>
                      <TableCell className="text-foreground">{assessment.company}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`uppercase tracking-wider text-[10px] px-2 py-0.5 ${getStatusColor(assessment.status)}`}>
                          {assessment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{new Date(assessment.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/assessment/${assessment.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 tracking-wide">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {assessments?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No assessments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
