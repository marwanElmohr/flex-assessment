import fetch from "node-fetch";

export async function fetchGoogleReviews(placeId) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("Missing Google Places API key in .env");
  if (!placeId) throw new Error("Missing Google Place ID");

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Places API error: ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.result?.reviews || [];
}
