import { getReports } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BarChart, FileText, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { URLForm } from './_components/url-form';
import { Progress } from '@/components/ui/progress';
import { auth } from 'firebase-admin';
import { headers } from 'next/headers';
import { getFirebaseAdminApp } from '@/firebase/admin';

async function getUserId() {
  const sessionCookie = headers().get('__session');
  if (!sessionCookie) {
    return null;
  }
  try {
    const adminApp = getFirebaseAdminApp();
    const decodedClaims = await auth(adminApp).verifySessionCookie(sessionCookie, true);
    return decodedClaims.uid;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const userId = await getUserId();
  
  // Fetch reports only if a user is logged in
  const reports = userId ? await getReports(userId) : [];

  const averageScore =
    reports.length > 0
      ? reports.reduce((acc, r) => acc + r.score, 0) / reports.length
      : 0;

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
            <p className="text-xs text-muted-foreground">
              Number of websites scanned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              Across all scanned websites
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Recent Scan
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {reports.length > 0 ? (
              <>
                <div className="truncate text-2xl font-bold">
                  {new URL(reports[0].url).hostname}
                </div>
                <p className="text-xs text-muted-foreground">
                  on {format(new Date(reports[0].scanDate), 'MMM d, yyyy')}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No scans yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            An overview of your latest website diagnostic reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length > 0 ? (
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
                    <TableCell className="font-medium">
                      {new URL(report.url).hostname}
                    </TableCell>
                    <TableCell>
                      {format(new Date(report.scanDate), 'PPP')}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={report.score} className="h-2 w-24" />
                        <span
                          className={`font-semibold ${getScoreColor(
                            report.score
                          )}`}
                        >
                          {report.score}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={getSeverityVariant(
                          report.issues[0]?.severity || 'default'
                        )}
                      >
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
          ) : (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">You haven&apos;t scanned any websites yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
