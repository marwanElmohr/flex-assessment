import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "../data");
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

export function readApprovals(listingName) {
  const data = JSON.parse(fs.readFileSync(MOCK_PATH, "utf8"));
  const reviews = Array.isArray(data) ? data : data.reviews || [];
  return reviews.filter(
    (review) =>
      review.privateFeedback === 1 && review.listingName === listingName
  );
}

export function writeApprovals(id) {
  const data = JSON.parse(fs.readFileSync(MOCK_PATH, "utf8"));
  const reviews = data.reviews || [];
  const review = reviews.find((r) => r.id === id);

  if (!review) {
    console.error("Review not found!");
    return;
  }

  review.privateFeedback = review.privateFeedback === 1 ? 0 : 1;

  fs.writeFileSync(MOCK_PATH, JSON.stringify(data, null, 2));
  console.log("Approval status updated!", review);
}

export async function fetchHostawayReviews() {
  // Uncomment below to use Hostaway API
  // const apiKey = process.env.HOSTAWAY_API_KEY;

  // if (!apiKey) {
  //   throw new Error("Hostaway credentials are missing in .env");
  // }

  // const url = `https://api.hostaway.com/v1/reviews`;
  // const response = await fetch(url, {
  //   headers: { Authorization: `Bearer ${apiKey}` },
  // });

  // if (!response.ok) {
  //   const errText = await response.text();
  //   throw new Error(`Hostaway API error: ${response.status} - ${errText}`);
  // }

  // const data = await response.json();

  // mock data
  const response = fs.readFileSync(MOCK_PATH, "utf-8");
  const data = JSON.parse(response);

  const reviews = data.reviews || [];

  const transformedReviews = reviews.map((review) => ({
    ...review,
    channel: CHANNELS_MAP[review.channelId] || "unknown",
  }));
  return transformedReviews;
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
