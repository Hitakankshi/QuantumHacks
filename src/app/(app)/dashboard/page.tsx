import { getReports } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BarChart, FileText, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { URLForm } from './_components/url-form';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const reports = getReports();
  const averageScore = reports.reduce((acc, r) => acc + r.score, 0) / reports.length;

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 50) return 'text-red-500';
    if (score < 80) return 'text-yellow-500';
    return 'text-primary';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <URLForm />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Number of websites scanned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Across all scanned websites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Recent Scan</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{new URL(reports[0].url).hostname}</div>
            <p className="text-xs text-muted-foreground">
              on {format(new Date(reports[0].scanDate), 'MMM d, yyyy')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>An overview of your latest website diagnostic reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Website</TableHead>
                <TableHead>Scan Date</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Issues</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{new URL(report.url).hostname}</TableCell>
                  <TableCell>{format(new Date(report.scanDate), 'PPP')}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Progress value={report.score} className="w-24 h-2" />
                      <span className={`font-semibold ${getScoreColor(report.score)}`}>
                        {report.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getSeverityVariant(report.issues[0]?.severity || 'default')}>
                      {report.issues.length}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/report/${report.id}`}>
                        View Report
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
