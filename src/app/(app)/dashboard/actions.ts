'use server';

import { scanWebsite } from '@/ai/flows/scan-website';
import { getFirebaseAdminApp } from '@/firebase/admin';
import { getFirestore } from 'firebase-admin/firestore';
import { FieldValue } from 'firebase-admin/firestore';

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
      scanDate: FieldValue.serverTimestamp(),
      score: scanResult.score,
      summary: scanResult.reportSummary,
      issues: scanResult.issues,
    };
    
    // We are using the Admin SDK here to create the report document
    // because the client-side SDK would require complex security rules
    // to validate the AI-generated data, and we need a server timestamp.
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
