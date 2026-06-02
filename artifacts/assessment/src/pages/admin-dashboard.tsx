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
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex gap-4">
              <Input 
                type="password" 
                placeholder="Enter admin password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-semibold text-primary">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => {
            localStorage.removeItem("adminAuth");
            setIsAuthenticated(false);
          }}>
            Sign Out
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-2 text-sm text-muted-foreground">Total</CardHeader>
              <CardContent className="text-2xl font-bold">{stats.total}</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-sm text-muted-foreground">Draft</CardHeader>
              <CardContent className="text-2xl font-bold">{stats.draft}</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-sm text-muted-foreground">Submitted</CardHeader>
              <CardContent className="text-2xl font-bold">{stats.submitted}</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-sm text-muted-foreground">Paid</CardHeader>
              <CardContent className="text-2xl font-bold">{stats.paid}</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-sm text-muted-foreground">Approved</CardHeader>
              <CardContent className="text-2xl font-bold">{stats.approved}</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2 text-sm text-muted-foreground">Completed</CardHeader>
              <CardContent className="text-2xl font-bold">{stats.completed}</CardContent>
            </Card>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            {listLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Executive</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments?.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell>
                        <div className="font-medium">{assessment.firstName} {assessment.lastName}</div>
                        <div className="text-sm text-muted-foreground">{assessment.email}</div>
                      </TableCell>
                      <TableCell>{assessment.company}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(assessment.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/assessment/${assessment.id}`}>
                          <Button variant="outline" size="sm">View</Button>
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
