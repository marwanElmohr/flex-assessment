import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { toISODate } from "../utils/dateUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "../data");
const APPROVALS_PATH = path.join(DATA_DIR, "approvals.json");
const MOCK_PATH = path.join(DATA_DIR, "mock_hostaway_reviews.json");

const CHANNELS_MAP = {
  2018: "airbnbOfficial",
  2002: "homeaway",
  2005: "bookingcom",
  2007: "expedia",
  2009: "homeawayical",
  2010: "vrboical",
  2000: "direct",
  2013: "bookingengine",
  2015: "customIcal",
  2016: "tripadvisorical",
  2017: "wordpress",
  2019: "marriott",
  2020: "partner",
  2021: "gds",
  2022: "google",
};

export function ensureApprovalsFile() {
  if (!fs.existsSync(APPROVALS_PATH)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(APPROVALS_PATH, JSON.stringify({}), "utf-8");
  }
}

export function readApprovals() {
  ensureApprovalsFile();
  try {
    const raw = fs.readFileSync(APPROVALS_PATH, "utf-8");
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

export function writeApprovals(approvals) {
  fs.writeFileSync(APPROVALS_PATH, JSON.stringify(approvals, null, 2), "utf-8");
}

export async function fetchHostawayReviews() {
  try {
    const raw = fs.readFileSync(MOCK_PATH, "utf-8");
    const parsed = JSON.parse(raw);

    const reviews = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.result)
      ? parsed.result
      : [];

    const transformedReviews = reviews.map((review) => ({
      ...review,
      channel: CHANNELS_MAP[review.channelId] || "unknown",
    }));

    return transformedReviews;
  } catch (error) {
    console.error("Error reading mock file:", error);
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
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const errText = await response.text();
//     throw new Error(`Hostaway API error: ${response.status} - ${errText}`);
//   }

//   const data = await response.json();

//   const reviews = Array.isArray(data.result)
//     ? data.result
//     : Array.isArray(data.reviews)
//     ? data.reviews
//     : [];

//   const transformedReviews = reviews.map((review) => ({
//     ...review,
//     channel: CHANNELS_MAP[review.channelId] || "unknown",
//   }));
//   return transformedReviews;
// }

export function normalizeHostawayReview(raw, approvalsById) {
  const id = String(raw.id);
  const approved = Boolean(approvalsById[id]);
  let overallRating = raw.rating;
  if (
    overallRating == null &&
    Array.isArray(raw.reviewCategory) &&
    raw.reviewCategory.length > 0
  ) {
    const sum = raw.reviewCategory.reduce(
      (acc, c) => acc + (Number(c.rating) || 0),
      0
    );
    overallRating = Math.round((sum / raw.reviewCategory.length) * 10) / 10;
  }

  return {
    id,
    listingName: raw.listingName || null,
    type: raw.type || null,
    status: raw.status || null,
    channel: raw.channel || "hostaway",
    submittedAt: toISODate(raw.submittedAt),
    guestName: raw.guestName || null,
    text: raw.publicReview || raw.privateReview || "",
    overallRating,
    categories: Array.isArray(raw.reviewCategory)
      ? raw.reviewCategory.map((c) => ({ key: c.category, rating: c.rating }))
      : [],
    approved,
  };
}

export function applyFilters(reviews, query) {
  const { listingName, channel, type, status, startDate, endDate, minRating } =
    query;
  return reviews.filter((r) => {
    if (listingName && r.listingName !== listingName) return false;
    if (channel && r.channel !== channel) return false;
    if (type && r.type !== type) return false;
    if (status && r.status !== status) return false;
    if (
      minRating &&
      r.overallRating != null &&
      Number(r.overallRating) < Number(minRating)
    )
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






// import { fetchGoogleReviews } from "./google.service.js";


// Example: merge Google reviews for one property
// const googlePlaceId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Replace with real Place ID

// const googleReviews = await fetchGoogleReviews(googlePlaceId);
// return [...hostawayReviews, ...googleReviews];

