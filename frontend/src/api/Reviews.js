export async function fetchReviews(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(
    `http://localhost:5000/api/reviews/hostaway${qs ? `?${qs}` : ""}`
  );
  const data = await res.json();
  return data.result || [];
}

export async function fetchApproved(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(
    `http://localhost:5000/api/reviews/approved${qs ? `?${qs}` : ""}`
  );
  const data = await res.json();
  console.log("Approved reviews:", data);
  return data.approved || [];
}

export async function setApproval(reviewId) {
  await fetch("http://localhost:5000/api/reviews/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewId }),
  });
}

export function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}
