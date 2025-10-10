export default function RatingBadge({ value }) {
  if (value == null)
    return (
      <span className="px-2 py-1 rounded-md text-gray-400 bg-gray-100 text-sm">
        —
      </span>
    );

  const color =
    value >= 9
      ? "bg-green-100 text-green-700"
      : value >= 7
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded-md text-sm font-medium ${color}`}>
      {value}
    </span>
  );
}
