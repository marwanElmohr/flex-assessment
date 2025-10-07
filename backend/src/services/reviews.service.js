import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { toISODate } from '../utils/dateUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const APPROVALS_PATH = path.join(DATA_DIR, 'approvals.json');
const MOCK_PATH = path.join(DATA_DIR, 'mock_hostaway_reviews.json');

export function ensureApprovalsFile() {
  if (!fs.existsSync(APPROVALS_PATH)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(APPROVALS_PATH, JSON.stringify({}), 'utf-8');
  }
}

export function readApprovals() {
  ensureApprovalsFile();
  try {
    const raw = fs.readFileSync(APPROVALS_PATH, 'utf-8');
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

export function writeApprovals(approvals) {
  fs.writeFileSync(APPROVALS_PATH, JSON.stringify(approvals, null, 2), 'utf-8');
}

export async function fetchHostawayReviews() {
  try {
    const raw = fs.readFileSync(MOCK_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.result)) return parsed.result;
    return [];
  } catch {
    return [];
  }
}

// export async function fetchHostawayReviews() {
//   const accountId = process.env.HOSTAWAY_ACCOUNT_ID;
//   const apiKey = process.env.HOSTAWAY_API_KEY;
  
//   if (!accountId || !apiKey) {
//     throw new Error("Hostaway credentials are missing in .env");
//   }

//   const url = `https://api.hostaway.com/v1/reviews?accountId=${accountId}`;
//   const response = await fetch(url, {
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const errText = await response.text();
//     throw new Error(`Hostaway API error: ${response.status} - ${errText}`);
//   }

//   const data = await response.json();
//   // Depending on Hostaway’s response structure
//   if (Array.isArray(data.result)) return data.result;
//   if (Array.isArray(data.reviews)) return data.reviews;
//   return [];
// }

export function normalizeHostawayReview(raw, approvalsById) {
  const id = String(raw.id);
  const approved = Boolean(approvalsById[id]);
  let overallRating = raw.rating;
  if (overallRating == null && Array.isArray(raw.reviewCategory) && raw.reviewCategory.length > 0) {
    const sum = raw.reviewCategory.reduce((acc, c) => acc + (Number(c.rating) || 0), 0);
    overallRating = Math.round((sum / raw.reviewCategory.length) * 10) / 10;
  }

  return {
    id,
    listingName: raw.listingName || null,
    type: raw.type || null,
    status: raw.status || null,
    channel: raw.channel || 'hostaway',
    submittedAt: toISODate(raw.submittedAt),
    guestName: raw.guestName || null,
    text: raw.publicReview || raw.privateReview || '',
    overallRating,
    categories: Array.isArray(raw.reviewCategory)
      ? raw.reviewCategory.map(c => ({ key: c.category, rating: c.rating }))
      : [],
    approved,
  };
}

export function applyFilters(reviews, query) {
  const { listingName, channel, type, status, startDate, endDate, minRating } = query;
  return reviews.filter(r => {
    if (listingName && r.listingName !== listingName) return false;
    if (channel && r.channel !== channel) return false;
    if (type && r.type !== type) return false;
    if (status && r.status !== status) return false;
    if (minRating && r.overallRating != null && Number(r.overallRating) < Number(minRating))
      return false;
    if (startDate) {
      const rs = r.submittedAt ? new Date(r.submittedAt).getTime() : 0;
      if (rs < new Date(startDate).getTime()) return false;
    }
    if (endDate) {
      const rs = r.submittedAt ? new Date(r.submittedAt).getTime() : 0;
      if (rs > new Date(endDate).getTime()) return false;
    }
    return true;
  });
}
