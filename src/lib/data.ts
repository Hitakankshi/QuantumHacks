import type { Report } from './types';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  DocumentData,
  CollectionReference,
  orderBy
} from 'firebase/firestore';
import { getFirebaseAdminApp } from '@/firebase/admin';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

// This file uses the Admin SDK and is primarily for server-side data fetching.
// For client-side data fetching, use the `useCollection` and `useDoc` hooks.

export async function getReports(userId: string): Promise<Report[]> {
  const adminFirestore = getAdminFirestore(getFirebaseAdminApp());
  const reportsRef = adminFirestore.collection(`users/${userId}/websiteReports`);
  const snapshot = await reportsRef.orderBy('scanDate', 'desc').get();
  
  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Report[];
}

export async function getReportById(userId: string, id: string): Promise<Report | null> {
  const adminFirestore = getAdminFirestore(getFirebaseAdminApp());
  const reportRef = adminFirestore.doc(`users/${userId}/websiteReports/${id}`);
  const docSnap = await reportRef.get();

  if (!docSnap.exists) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() } as Report;
}
