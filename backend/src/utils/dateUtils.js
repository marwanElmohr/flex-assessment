export function toISODate(dateStr) {
  if (!dateStr) return null;
  const normalized = dateStr.replace(" ", "T");
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}
