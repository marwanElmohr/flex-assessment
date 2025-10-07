import { formatDate } from '../api/Reviews';

export default function ReviewCard({ review }) {
  return (
    <div className="card bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition">
      <div className="meta flex justify-between text-sm text-gray-600 mb-2">
        <span>{review.guestName || 'Guest'}</span>
        <span className="rating font-semibold text-yellow-600">
          {review.overallRating ?? '—'}
        </span>
      </div>

      <p className="text-gray-800 mb-3">{review.text}</p>

      <div className="meta flex justify-between text-xs text-gray-500">
        <span>{formatDate(review.submittedAt)}</span>
        <span>{review.channel}</span>
      </div>
    </div>
  );
}
