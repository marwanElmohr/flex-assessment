export default function ListingSelect({ listings, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Select Listing</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
      >
        {listings.length === 0 ? (
          <option disabled>No listings available</option>
        ) : (
          listings.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
