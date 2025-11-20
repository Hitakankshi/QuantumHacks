import { getReportById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ReportDetails from './_components/report-details';
import { headers } from 'next/headers';
import { auth } from 'firebase-admin';
import { getFirebaseAdminApp } from '@/firebase/admin';

type ReportPageProps = {
  params: {
    id: string;
  };
};

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

export default async function ReportPage({ params }: ReportPageProps) {
  const userId = await getUserId();
  if (!userId) {
    // Or redirect to login
    return notFound();
  }
  
  const report = await getReportById(userId, params.id);

  if (!report) {
    notFound();
  }

  return <ReportDetails report={report} />;
}
