import { getApps, initializeApp, cert, App } from 'firebase-admin/app';

function getServiceAccount() {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
  }
  return JSON.parse(serviceAccount);
}

export function getFirebaseAdminApp(): App {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }
  return initializeApp({
    credential: cert(getServiceAccount()),
  });
}
