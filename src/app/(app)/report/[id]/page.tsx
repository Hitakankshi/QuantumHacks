'use client';

import { notFound, useParams } from 'next/navigation';
import ReportDetails from './_components/report-details';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Report } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReportPage() {
  const { id: reportId } = useParams();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const reportRef = useMemoFirebase(() => {
    if (!user || !reportId) return null;
    return doc(firestore, `users/${user.uid}/websiteReports`, reportId as string);
  }, [firestore, user, reportId]);

  const { data: report, isLoading: isReportLoading } = useDoc<Report>(reportRef);

  if (isUserLoading || isReportLoading) {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!report) {
    notFound();
  }

  return <ReportDetails report={report} />;
}
