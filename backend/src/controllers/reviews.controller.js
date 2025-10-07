import {
  fetchHostawayReviews,
  normalizeHostawayReview,
  applyFilters,
  readApprovals,
  writeApprovals,
} from '../services/reviews.service.js';
import fetch from 'node-fetch';

export async function getHostawayReviews(req, res) {
  try {
    const approvals = readApprovals();
    const raw = await fetchHostawayReviews();
    const normalized = raw.map(item => normalizeHostawayReview(item, approvals));
    const filtered = applyFilters(normalized, req.query);

    const { sortBy, sortDir } = req.query;
    if (sortBy) {
      const dir = sortDir === 'asc' ? 1 : -1;
      filtered.sort((a, b) => {
        const va = a[sortBy];
        const vb = b[sortBy];
        if (va == null && vb == null) return 0;
        if (va == null) return 1;
        if (vb == null) return -1;
        return va < vb ? -1 * dir : va > vb ? 1 * dir : 0;
      });
    }

    res.json({ status: 'success', count: filtered.length, result: filtered });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 'error', message: 'Failed to fetch reviews' });
  }
}

export function getApprovedReviews(req, res) {
  const approvals = readApprovals();
  res.json({
    status: 'success',
    approvedIds: Object.keys(approvals).filter(k => approvals[k]),
  });
}

export function approveReview(req, res) {
  const { reviewId, approved } = req.body || {};
  if (!reviewId)
    return res.status(400).json({ status: 'error', message: 'reviewId required' });
  const approvals = readApprovals();
  approvals[String(reviewId)] = Boolean(approved);
  writeApprovals(approvals);
  res.json({ status: 'success', reviewId: String(reviewId), approved: Boolean(approved) });
}

export async function getGoogleReviews(req, res) {
  const { placeId } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      status: 'unconfigured',
      message: 'Set GOOGLE_PLACES_API_KEY to enable Google Reviews fetch.',
    });
  }
  if (!placeId) {
    return res.status(400).json({ status: 'error', message: 'placeId is required' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
      placeId
    )}&fields=name,reviews,rating,user_ratings_total,url&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.result || {};

    const normalized = {
      name: result.name,
      rating: result.rating,
      userRatingsTotal: result.user_ratings_total,
      url: result.url,
      reviews: Array.isArray(result.reviews)
        ? result.reviews.map(r => ({
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

    res.json({ status: 'success', result: normalized });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 'error', message: 'Failed to fetch Google Reviews' });
  }
}
