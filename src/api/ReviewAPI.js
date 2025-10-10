import mock_data from "../data/mock_hostaway_reviews.json";

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

// mock data from local JSON file
let REVIEWS = (mock_data.reviews || []).map((r) => ({
  ...r,
  channel: CHANNELS_MAP[r.channelId] || "unknown",
  rating: r.rating ?? null,
}));

export function applyFilters(reviews, query = {}) {
  const {
    listingName,
    channel,
    type,
    status,
    startDate,
    endDate,
    minRating,
    category,
  } = query;

  return reviews.filter((r) => {
    if (listingName && r.listingName !== listingName) return false;
    if (channel && r.channel !== channel) return false;
    if (type && r.type !== type) return false;
    if (status && r.status !== status) return false;
    if (minRating && r.rating != null && Number(r.rating) < Number(minRating))
      return false;
    if (category && Array.isArray(r.reviewCategory)) {
      const hasCategory = r.reviewCategory.some((c) => c.category === category);
      if (!hasCategory) return false;
    }
    if (startDate && endDate) {
      const overlaps =
        (r.arrivalDate >= startDate && r.arrivalDate <= endDate) ||
        (r.departureDate >= startDate && r.departureDate <= endDate) ||
        (r.arrivalDate <= startDate && r.departureDate >= endDate);

      if (!overlaps) return false;
    }

    return true;
  });
}

export async function fetchReviews(query = {}) {
  try {
    // uncomment to use Hostaway API
    // const res = await fetch("https://api.hostaway.com/v1/reviews", {
    //   headers: {
    //     Authorization: `Bearer ${process.env.REACT_APP_HOSTAWAY_API_KEY}`,
    //   },
    // });
    // if (!res.ok) throw new Error("Failed to fetch Hostaway reviews");
    // const data = await res.json();
    // reviews = data.reviews || [];
    // REVIEWS = reviews.map((r) => ({
    //   ...r,
    //   channel: CHANNELS_MAP[r.channelId] || "unknown",
    //   rating: r.rating ?? null,
    // }));

    let stored = localStorage.getItem("reviews");
    if (stored) {
      REVIEWS = JSON.parse(stored);
    }
    let filtered = applyFilters([...REVIEWS], query);

    if (query.sortBy) {
      const dir = query.sortDir === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        const aVal = a[query.sortBy];
        const bVal = b[query.sortBy];
        if (aVal === undefined || bVal === undefined) return 0;
        if (aVal < bVal) return -1 * dir;
        if (aVal > bVal) return 1 * dir;
        return 0;
      });
    }

    return filtered;
  } catch (err) {
    console.error("Error fetching Hostaway reviews:", err);
    return [];
  }
}

export function fetchApproved(query = {}) {
  // uncomment to use Hostaway API
  // const res = await fetch("https://api.hostaway.com/v1/reviews", {
  //   headers: {
  //     Authorization: `Bearer ${process.env.REACT_APP_HOSTAWAY_API_KEY}`,
  //   },
  // });
  // if (!res.ok) throw new Error("Failed to fetch Hostaway reviews");
  // const data = await res.json();
  // const reviews = data.reviews || [];
  // REVIEWS = reviews.map((r) => ({
  //   ...r,
  //   channel: CHANNELS_MAP[r.channelId] || "unknown",
  //   rating: r.rating ?? null,
  // }));

  let stored = localStorage.getItem("reviews");
  if (stored) {
    REVIEWS = JSON.parse(stored);
  }
  const filtered = applyFilters(
    REVIEWS.filter((r) => r.privateFeedback === 1),
    query
  );
  return filtered;
}

export async function setApproval(id) {
  REVIEWS = REVIEWS.map((r) =>
    r.id === id ? { ...r, privateFeedback: r.privateFeedback === 1 ? 0 : 1 } : r
  );
  localStorage.setItem("reviews", JSON.stringify(REVIEWS));
  return REVIEWS.find((r) => r.id === id);
}

export function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}
