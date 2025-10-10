export async function fetchGoogleReviews(placeId) {
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("Missing Google Places API key");
  if (!placeId) throw new Error("Missing Google Place ID");

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating,user_ratings_total,url&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const result = data.result || {};

  return {
    name: result.name,
    rating: result.rating,
    userRatingsTotal: result.user_ratings_total,
    url: result.url,
    reviews: Array.isArray(result.reviews)
      ? result.reviews.map((r) => ({
          id: r.time,
          authorName: r.author_name,
          rating: r.rating,
          relativeTime: r.relative_time_description,
          text: r.text,
          profilePhotoUrl: r.profile_photo_url,
          submittedAt: r.time ? new Date(r.time * 1000).toISOString() : null,
        }))
      : [],
  };
}

// example usage:
// import { fetchGoogleReviews } from "./googleAPI.js";

// Example: merge Google reviews for one property
// const googlePlaceId = "ChIJN1t_tDeuEmsRUsoyG83frY4"; // Replace with google place ID

// const googleReviews = await fetchGoogleReviews(googlePlaceId);
// return [...hostawayReviews, ...googleReviews];
