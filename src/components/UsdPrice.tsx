import { useState, useEffect, useCallback } from "react";

const FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes

async function fetchUsdPrice(): Promise<string | null> {
  try {
    const response = await fetch("https://alanchand.com", {
      headers: { "Accept": "text/html" },
    });
    if (!response.ok) throw new Error("Failed to fetch");
    const html = await response.text();

    // Parse the HTML and extract the sell-price td
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const cell = doc.querySelector("td.sellPrice");
    return cell ? cell.textContent?.trim() ?? null : null;
  } catch (err) {
    console.error("UsdPrice fetch error:", err);
    return null;
  }
}

const UsdPrice = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(false);
    const result = await fetchUsdPrice();
    if (result) {
      setPrice(result);
      setLastUpdated(new Date());
    } else {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="mt-4 flex items-center justify-between text-white">
      <div className="flex items-center gap-2">
        {/* Dollar icon */}
        <span className="text-green-400 text-lg font-bold">$</span>
        <span className="text-sm font-light text-white/70">USD / TMN</span>
      </div>

      <div className="text-right">
        {loading ? (
          <span className="text-sm text-white/50 animate-pulse">Loading...</span>
        ) : error ? (
          <span className="text-sm text-red-400">Unavailable</span>
        ) : (
          <span className="text-lg font-semibold tracking-wide">
            {price} <span className="text-xs text-white/50 font-light">تومان</span>
          </span>
        )}
        {lastUpdated && !loading && (
          <div className="text-xs text-white/40 mt-0.5">
            {lastUpdated.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsdPrice;
