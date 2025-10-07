import { useEffect, useState } from 'react';
import { fetchReviews } from '../api/Reviews';
import ReviewCard from '../components/ReviewCard';
import ListingSelect from '../components/ListingSelect';

export default function PropertyReviews() {
  const [listing, setListing] = useState('');
  const [reviews, setReviews] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    (async () => {
      const all = await fetchReviews();
      const uniqueListings = Array.from(new Set(all.map(r => r.listingName).filter(Boolean)));
      setListings(uniqueListings);
      const first = uniqueListings[0] || '';
      setListing(first);

      const reviewsForListing = await fetchReviews({ listingName: first });
      setReviews(reviewsForListing.filter(r => r.approved));
    })();
  }, []);

  useEffect(() => {
    if (!listing) return;
    (async () => {
      const data = await fetchReviews({ listingName: listing });
      setReviews(data.filter(r => r.approved));
    })();
  }, [listing]);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero mb-6">
        <h2 className="text-2xl font-bold mb-2">Property Reviews</h2>
        <p className="text-gray-600">
          Only approved reviews are shown here.
        </p>
      </section>

      <ListingSelect listings={listings} value={listing} onChange={setListing} />

      <section className="reviews grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </main>
  );
}
