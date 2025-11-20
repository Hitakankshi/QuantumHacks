'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function URLForm() {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<{ url: string }>();

  const onSubmit = async (data: { url: string }) => {
    setIsScanning(true);
    toast({
      title: 'Scan Initiated',
      description: `Scanning ${data.url}... This may take a moment.`,
    });

    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsScanning(false);
    
    // In a real app, you'd get a new report ID from the backend.
    // Here we'll just redirect to one of the mock reports.
    const mockReportId = 'report-3';
    router.push(`/report/${mockReportId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Scan</CardTitle>
        <CardDescription>Enter a website URL to begin a comprehensive diagnostic scan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4">
          <div className="flex-grow">
            <Input
              {...register('url', { 
                required: 'URL is required',
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: 'Please enter a valid URL'
                }
              })}
              placeholder="https://example.com"
              disabled={isScanning}
            />
            {errors.url && <p className="text-sm text-destructive mt-1">{errors.url.message}</p>}
          </div>
          <Button type="submit" disabled={isScanning}>
            <Search className="mr-2 h-4 w-4" />
            {isScanning ? 'Scanning...' : 'Scan Website'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
