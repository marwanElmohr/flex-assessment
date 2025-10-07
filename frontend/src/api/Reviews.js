export async function fetchReviews(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`http://localhost:5000/api/reviews/hostaway${qs ? `?${qs}` : ''}`);
  const data = await res.json();
  return data.result || [];
}

export async function fetchApprovedIds() {
  const res = await fetch('http://localhost:5000/api/reviews/approved');
  const data = await res.json();
  return new Set(data.approvedIds || []);
}

export async function setApproval(reviewId, approved) {
  await fetch('http://localhost:5000/api/reviews/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewId, approved }),
  });
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}