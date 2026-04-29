import admin from "firebase-admin";

/**
 * In production (Vercel/Heroku), we parse the JSON string from environment variables.
 * We must ensure the private_key newlines are correctly formatted.
 */
const getServiceAccount = () => {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable");
  }

  let config;
  try {
    config = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } catch (err) {
    throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON: " + err.message);
  }

  return {
    ...config,
    privateKey: config.privateKey ? config.privateKey.replace(/\\n/g, '\n') : undefined,
  };
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
  });
}

const adminAuth = admin.auth();

export { adminAuth };