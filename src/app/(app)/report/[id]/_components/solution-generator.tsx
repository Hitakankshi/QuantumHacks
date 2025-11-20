'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Issue } from '@/lib/types';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { getSolution } from '../actions';

export function SolutionGenerator({ issue }: { issue: Issue }) {
  const [solution, setSolution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSolution = async () => {
    setIsLoading(true);
    setSolution(null);
    try {
      const result = await getSolution(issue);
      setSolution(result.actionableSolution);
    } catch (error) {
      setSolution('Failed to generate a solution. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleGenerateSolution} disabled={isLoading}>
        <Sparkles className="mr-2 h-4 w-4" />
        {isLoading ? 'Thinking...' : 'Generate Actionable Solution'}
      </Button>

      {isLoading && (
        <Card className="mt-4 bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Generating Solution...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </CardContent>
        </Card>
      )}

      {solution && (
        <Card className="mt-4 border-primary/50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Generated Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none prose-headings:font-semibold prose-p:text-foreground prose-ul:text-foreground prose-li:text-foreground"
              dangerouslySetInnerHTML={{
                __html: solution.replace(/\n/g, '<br />'),
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
