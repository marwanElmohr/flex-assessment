import RatingBadge from "./RatingBadge";
import { setApproval, formatDate } from "../api/ReviewAPI";

export default function Reviews({ reviews, onApprovalChange }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Approve</th>
            <th className="px-4 py-3 text-left">Listing</th>
            <th className="px-4 py-3 text-left">Channel</th>
            <th className="px-4 py-3 text-left">Categories</th>
            <th className="px-4 py-3 text-left">Guest</th>
            <th className="px-4 py-3 text-left">Rating</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Review</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reviews.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={r.privateFeedback === 1}
                  onChange={async (e) => {
                    await setApproval(r.id);
                    onApprovalChange?.();
                  }}
                  className="w-4 h-4 accent-[#284e4c]"
                />
              </td>
              <td className="px-4 py-3">{r.listingName || "—"}</td>
              <td className="px-4 py-3">{r.channel || "—"}</td>
              <td className="px-4 py-3">
                {Array.isArray(r.reviewCategory)
                  ? r.reviewCategory.map((c) => c.category).join(", ")
                  : "—"}
              </td>
              <td className="px-4 py-3">{r.guestName || "—"}</td>
              <td className="px-4 py-3">
                <RatingBadge value={r.rating} />
              </td>
              <td className="px-4 py-3">{formatDate(r.arrivalDate)}</td>
              <td className="px-4 py-3 text-gray-700">{r.publicReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
