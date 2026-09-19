/**
 * SHA-256 hashing for phone numbers and other PII.
 * Uses Web Crypto API — available in React Native (Hermes) since RN 0.74.
 */

export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPhone(phone: string): Promise<string> {
  // Normalize: strip spaces, dashes, plus
  const normalized = phone.replace(/[\s\-+]/g, '');
  return sha256(normalized);
}