'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Issue, Report } from '@/lib/types';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, Flame, Gauge, Lightbulb, Search, Shield, TriangleAlert, Zap } from 'lucide-re';
import { SolutionGenerator } from './solution-generator';

const categoryIcons = {
  Performance: <Gauge className="h-5 w-5" />,
  SEO: <Search className="h-5 w-5" />,
  Security: <Shield className="h-5 w-5" />,
  Accessibility: <Lightbulb className="h-5 w-5" />,
};

const severityIcons = {
  Critical: <Flame className="h-4 w-4" />,
  High: <AlertCircle className="h-4 w-4" />,
  Medium: <TriangleAlert className="h-4 w-4" />,
  Low: <CheckCircle className="h-4 w-4" />,
};

const getSeverityVariant = (severity: Issue['severity']) => {
  switch (severity) {
    case 'Critical': return 'destructive';
    case 'High': return 'destructive';
    case 'Medium': return 'secondary';
    default: return 'outline';
  }
};

const getScoreColor = (score: number) => {
  if (score < 50) return 'bg-red-500';
  if (score < 80) return 'bg-yellow-500';
  return 'bg-primary';
};

export default function ReportDetails({ report }: { report: Report }) {
  const issuesByCategory = (category: Issue['category']) =>
    report.issues.filter((issue) => issue.category === category);

  const categories: Issue['category'][] = ['Performance', 'SEO', 'Security', 'Accessibility'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold break-all">{new URL(report.url).hostname}</h1>
        <p className="text-muted-foreground">
          Report generated on {format(new Date(report.scanDate), 'PPP')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Site Score</CardTitle>
          <CardDescription>A measure of your site's health across all categories.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="text-5xl font-bold">{report.score}</div>
          <div className="flex-grow">
            <Progress value={report.score} className="h-4" indicatorClassName={getScoreColor(report.score)} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Issues Found</CardTitle>
          <CardDescription>Here are the details of the issues we found on your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} disabled={issuesByCategory(cat).length === 0}>
                  {cat} ({issuesByCategory(cat).length})
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat}>
                <Accordion type="single" collapsible className="w-full">
                  {issuesByCategory(cat).map((issue) => (
                    <AccordionItem key={issue.id} value={issue.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4 text-left">
                          <span className="text-primary">{categoryIcons[issue.category]}</span>
                          <span>{issue.title}</span>
                        </div>
                        <Badge variant={getSeverityVariant(issue.severity)} className="ml-auto mr-4">
                          {severityIcons[issue.severity]}
                          <span className="ml-2">{issue.severity}</span>
                        </Badge>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <p className="text-muted-foreground">{issue.description}</p>
                        <SolutionGenerator issue={issue} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
