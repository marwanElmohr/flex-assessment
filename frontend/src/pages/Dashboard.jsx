import { useEffect, useState } from "react";
import { fetchReviews, setApproval } from "../api/ReviewAPI";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    sortBy: "submittedAt",
    sortDir: "desc",
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchReviews(filters);
      setRows(data);
    })();
  }, [filters]);

  return (
    <main className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Manager Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          className="border p-2 rounded"
          placeholder="Listing"
          value={filters.listingName || ""}
          onChange={(e) =>
            setFilters({ ...filters, listingName: e.target.value || undefined })
          }
        />
        <select
          className="border p-2 rounded"
          value={filters.channel || ""}
          onChange={(e) =>
            setFilters({ ...filters, channel: e.target.value || undefined })
          }
        >
          <option value="">All Channels</option>
          <option value="airbnb">Airbnb</option>
          <option value="booking">Booking</option>
          <option value="direct">Direct</option>
          <option value="hostaway">Hostaway</option>
        </select>
        <input
          className="border p-2 rounded"
          type="number"
          min={0}
          max={10}
          step={1}
          placeholder="Min Rating"
          value={filters.minRating || ""}
          onChange={(e) =>
            setFilters({ ...filters, minRating: e.target.value || undefined })
          }
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Approve",
                "Listing",
                "Channel",
                "Guest",
                "Rating",
                "Date",
                "Text",
              ].map((h) => (
                <th key={h} className="text-left px-4 py-2 border-b">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    defaultChecked={r.approved}
                    onChange={(e) => setApproval(r.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-2 border-b">{r.listingName || ""}</td>
                <td className="px-4 py-2 border-b">{r.channel || ""}</td>
                <td className="px-4 py-2 border-b">{r.guestName || ""}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      r.overallRating >= 9
                        ? "bg-green-500"
                        : r.overallRating >= 7
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {r.overallRating ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  {r.submittedAt
                    ? new Date(r.submittedAt).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-4 py-2 border-b">{r.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
