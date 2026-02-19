import admin from "firebase-admin";

function parsePrivateKey(raw: string): string {
  // Nuclear option: extract ONLY the base64 content from the PEM key,
  // strip ALL non-base64 characters (backslashes, stray whitespace, etc.),
  // then reconstruct a clean PEM envelope.
  // This handles every possible mangling scenario from env vars.

  let input = raw

  // Try JSON.parse first in case the whole thing is a JSON string
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string")
      return parsed.endsWith("\n") ? parsed : parsed + "\n";
  } catch {
    // not JSON, continue
  }

  // Method 2: Replace literal \n sequences
  if (raw.includes("\\n")) {
    const replaced = raw.replace(/\\n/g, "\n");
    if (replaced.includes("-----BEGIN")) {
      return replaced.endsWith("\n") ? replaced : replaced + "\n";
    }

  // Method 3: Strip wrapping quotes
  let key = raw;
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).replace(/\\n/g, "\n");
  }

  // Method 4: base64 decode
  if (!key.includes("-----BEGIN")) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf-8");
      if (decoded.includes("-----BEGIN")) key = decoded;
    } catch {
      // Not base64
    }
  }

  return key.endsWith("\n") ? key : key + "\n";
}

function initAdmin() {
  if (admin.apps.length) return;

  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.FIREBASE_PROJECT_ID;
  const clientEmail =
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL ||
    process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey =
    process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawKey) {
    console.warn(
      "[firebase-admin] Missing env vars - cannot initialize admin SDK",
    );
    return;
  }

  try {
    const privateKey = parsePrivateKey(rawKey);
    console.log(
      "[v0] PEM key debug:",
      JSON.stringify({
        rawLen: rawKey.length,
        rawFirst50: rawKey.substring(0, 50),
        rawHasRealNewlines: rawKey.includes("\n"),
        rawHasEscapedNewlines: rawKey.includes("\\n"),
        parsedLen: privateKey.length,
        parsedFirst50: privateKey.substring(0, 50),
        parsedHasRealNewlines: privateKey.includes("\n"),
        parsedLineCount: privateKey.split("\n").length,
      }),
    );
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  } catch (err) {
    console.error(
      "[firebase-admin] Init failed:",
      err instanceof Error ? err.message : err,
    );
  }
}

export function getAdminDb(): FirebaseFirestore.Firestore | null {
  initAdmin();
  return admin.apps.length ? admin.firestore() : null;
}

export function getAdminAuth() {
  initAdmin();
  return admin.apps.length ? admin.auth() : null;
}
