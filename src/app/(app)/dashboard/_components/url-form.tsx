'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createReport } from '../actions';
import { useUser } from '@/firebase';

export function URLForm() {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ url: string }>();
  const { user } = useUser();

  const onSubmit = async (data: { url: string }) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to start a scan.',
      });
      return;
    }

    setIsScanning(true);
    toast({
      title: 'Scan Initiated',
      description: `Scanning ${data.url}... This may take a moment.`,
    });

    const result = await createReport(user.uid, data.url);

    setIsScanning(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Scan Failed',
        description: result.error,
      });
    } else if (result.reportId) {
      toast({
        title: 'Scan Complete!',
        description: 'Redirecting to your new report.',
      });
      router.push(`/report/${result.reportId}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a New Scan</CardTitle>
        <CardDescription>
          Enter a website URL to begin a comprehensive diagnostic scan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-start gap-4"
        >
          <div className="flex-grow">
            <Input
              {...register('url', {
                required: 'URL is required',
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: 'Please enter a valid URL',
                },
              })}
              placeholder="https://example.com"
              disabled={isScanning}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-destructive">
                {errors.url.message}
              </p>
            )}
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
