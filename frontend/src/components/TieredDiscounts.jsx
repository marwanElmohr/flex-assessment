import { useEffect, useState } from "react";

export default function TieredDiscounts() {
  const tiers = [
    { label: "1 Week", pct: 10 },
    { label: "2 Weeks", pct: 15 },
    { label: "1 Month", pct: 20 },
    { label: "3 Months", pct: 29 },
    { label: "6 Months", pct: 30 },
  ];

  const [animated, setAnimated] = useState(tiers.map(() => 0));

  useEffect(() => {
    let rafId;
    const start = performance.now();
    const duration = 900;

    const step = (ts) => {
      const t = Math.min(1, (ts - start) / duration);
      setAnimated(tiers.map((x) => Math.round(x.pct * t)));
      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {tiers.map((t, i) => (
        <div
          key={t.label}
          className="p-4 text-center bg-white rounded-lg shadow hover:shadow-xl hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-gray-900 mb-1">{t.label}</h4>
          <div className="text-3xl font-bold text-yellow-500">{animated[i]}%</div>
          <div className="text-sm text-gray-600">discount</div>
        </div>
      ))}
    </div>
  );
}
