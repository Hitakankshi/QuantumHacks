import { getReportById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ReportDetails from './_components/report-details';

type ReportPageProps = {
  params: {
    id: string;
  };
};

export default async function ReportPage({ params }: ReportPageProps) {
  const report = getReportById(params.id);

  if (!report) {
    notFound();
  }

  return <ReportDetails report={report} />;
}
