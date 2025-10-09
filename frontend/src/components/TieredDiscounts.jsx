import { useEffect, useRef, useState } from "react";

export default function TieredDiscounts() {
  const tiers = [
    { label: "1 Week", pct: 10 },
    { label: "2 Weeks", pct: 15 },
    { label: "1 Month", pct: 20 },
    { label: "3 Months", pct: 29 },
    { label: "6 Months", pct: 30 },
    { label: "1 Year", pct: 38 },
  ];

  const [animated, setAnimated] = useState(tiers.map(() => 0));
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let rafId;
    const start = performance.now();
    const duration = 1500;

    const step = (ts) => {
      const t = Math.min(1, (ts - start) / duration);
      setAnimated(tiers.map((x) => Math.round(x.pct * t)));
      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mx-4 my-12"
    >
      {tiers.map((t, i) => (
        <div
          key={t.label}
          className="p-6 text-center bg-white rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-gray-900 mb-1">{t.label}</h4>
          <div className="text-4xl font-bold">{animated[i]}%</div>
          <div className="text-sm text-gray-600">discount</div>
        </div>
      ))}
    </div>
  );
}