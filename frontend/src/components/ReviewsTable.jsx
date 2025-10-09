import RatingBadge from "./RatingBadge";
import { setApproval, formatDate } from "../api/Reviews";

export default function Reviews({ reviews, onApprovalChange }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3 text-left">Approve</th>
            <th className="px-4 py-3 text-left">Listing</th>
            <th className="px-4 py-3 text-left">Channel</th>
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
                  checked={!!r.approved}
                  onChange={async (e) => {
                    await setApproval(r.id, e.target.checked);
                    onApprovalChange?.(r.id, e.target.checked);
                  }}
                  className="w-4 h-4 accent-[#284e4c]"
                />
              </td>
              <td className="px-4 py-3">{r.listingName || "—"}</td>
              <td className="px-4 py-3">{r.channel || "—"}</td>
              <td className="px-4 py-3">{r.guestName || "—"}</td>
              <td className="px-4 py-3">
                <RatingBadge value={r.overallRating} />
              </td>
              <td className="px-4 py-3">{formatDate(r.submittedAt)}</td>
              <td className="px-4 py-3 text-gray-700">{r.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
