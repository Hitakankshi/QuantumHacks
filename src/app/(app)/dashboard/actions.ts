'use server';

import { scanWebsite } from '@/ai/flows/scan-website';
import { addDocumentNonBlocking } from '@/firebase';
import { auth } from 'firebase-admin';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { getFirebaseAdminApp } from '@/firebase/admin';

type ScanResult = {
  reportId?: string;
  error?: string;
};

export async function createReport(
  userId: string,
  url: string
): Promise<ScanResult> {
  try {
    const scanResult = await scanWebsite({ url });

    const reportData = {
      userId,
      url,
      scanDate: new Date().toISOString(),
      score: scanResult.score,
      summary: scanResult.reportSummary,
      issues: scanResult.issues,
    };
    
    // We are using the Admin SDK here to create the report document
    // because the client-side SDK would require complex security rules
    // to validate the AI-generated data.
    const adminApp = getFirebaseAdminApp();
    const adminFirestore = getFirestore(adminApp);
    const reportRef = await adminFirestore.collection(`users/${userId}/websiteReports`).add(reportData);

    return { reportId: reportRef.id };
  } catch (error: any) {
    console.error('Error creating report:', error);
    return {
      error: 'Failed to generate a report. Please try again.',
    };
  }
}
