export default function Filter({ listings, filters, onChange, onApply }) {
  const inputClass =
    "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const selectClass =
    "border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-3 mb-6">
      <select
        id="listingFilter"
        value={filters.listingName}
        onChange={(e) => onChange("listingName", e.target.value)}
        className={selectClass}
      >
        <option value="">All Listings</option>
        {listings.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select
        id="channelFilter"
        value={filters.channel}
        onChange={(e) => onChange("channel", e.target.value)}
        className={selectClass}
      >
        <option value="">All Channels</option>
        <option value="Airbnb">Airbnb</option>
        <option value="Booking.com">Booking.com</option>
        <option value="Direct">Direct</option>
      </select>

      <input
        id="minRating"
        type="number"
        min="0"
        max="10"
        placeholder="Min Rating"
        value={filters.minRating}
        onChange={(e) => onChange("minRating", e.target.value)}
        className={inputClass}
      />

      <select
        id="sortBy"
        value={filters.sortBy}
        onChange={(e) => onChange("sortBy", e.target.value)}
        className={selectClass}
      >
        <option value="">Sort By</option>
        <option value="submittedAt">Date</option>
        <option value="overallRating">Rating</option>
      </select>

      <select
        id="sortDir"
        value={filters.sortDir}
        onChange={(e) => onChange("sortDir", e.target.value)}
        className={selectClass}
      >
        <option value="">Direction</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <button
        id="applyFilters"
        onClick={onApply}
        className="bg-[#284e4c] text-white text-sm font-semibold px-4 py-2 rounded-md shadow"
      >
        Apply Filters
      </button>
    </div>
  );
}
