import { useEffect, useState } from 'react';
import { fetchReviews } from '../api/Reviews';
import Filter from '../components/Filter';
import Reviews from '../components/ReviewsTable';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    listingName: '',
    channel: '',
    minRating: '',
    sortBy: '',
    sortDir: '',
  });

  useEffect(() => {
    (async () => {
      const data = await fetchReviews({ sortBy: 'submittedAt', sortDir: 'desc' });
      setReviews(data);

      const uniqueListings = Array.from(
        new Set(data.map((r) => r.listingName).filter(Boolean))
      );
      setListings(uniqueListings);
    })();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = async () => {
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );
    const filtered = await fetchReviews(params);
    setReviews(filtered);
  };

  const handleApprovalChange = (reviewId, approved) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, approved } : r))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Reviews Dashboard
      </h1>
      <Filter
        listings={listings}
        filters={filters}
        onChange={handleFilterChange}
        onApply={handleApplyFilters}
      />
      <Reviews
        reviews={reviews}
        onApprovalChange={handleApprovalChange}
      />
    </div>
  );
}
