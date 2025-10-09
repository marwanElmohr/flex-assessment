import { useEffect, useState } from "react";
import { fetchReviews } from "../api/Reviews";
import Filter from "../components/Filter";
import Reviews from "../components/ReviewsTable";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    listingName: "",
    channel: "",
    minRating: "",
    sortBy: "",
    sortDir: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchReviews({
          sortBy: "submittedAt",
          sortDir: "desc",
        });
        setReviews(data);
        setAllReviews(data);

        const uniqueListings = Array.from(
          new Set(data.map((r) => r.listingName).filter(Boolean))
        );
        setListings(uniqueListings);
      } catch (err) {
        setError("Failed to fetch reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
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

  const handleApprovalChange = async (reviewId, approved) => {
    try {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, approved } : r))
      );

      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v)
      );
      const updated = await fetchReviews(params);
      setReviews(updated);
    } catch (error) {
      console.error("Failed to update approval:", error);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Reviews Dashboard
          </h1>
          <Filter
            listings={listings}
            filters={filters}
            onChange={handleFilterChange}
            onApply={handleApplyFilters}
            reviews={allReviews}
          />
          <Reviews reviews={reviews} onApprovalChange={handleApprovalChange} />
        </div>
      )}
    </>
  );
}
