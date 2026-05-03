import { useState, useEffect, useCallback } from "react";

const FETCH_INTERVAL = 1 * 60 * 1000; // 1 minute

async function fetchUsdPrice(): Promise<string | null> {
  try {
    const url = import.meta.env.DEV
      ? "/api/usd"
      : "https://alanchand.com/currencies-price/usd";

    const response = await fetch(url, { headers: { Accept: "text/html" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // First span.fw-bold.text-success.fs-5 is the sell price
    const cell = doc.querySelector("span.fw-bold.text-success.fs-5");
    return cell ? (cell.textContent?.trim() ?? null) : null;
  } catch (err) {
    console.error("[UsdPrice] Fetch error:", err);
    return null;
  }
}

const UsdPrice = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(false);
    const result = await fetchUsdPrice();
    if (result) {
      setPrice(result);
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
      <div className="text-right">
        {loading ? (
          <span className="text-sm text-white/50 animate-pulse">
            Loading...
          </span>
        ) : error ? (
          <span className="text-sm text-red-400">Failed</span>
        ) : (
          <div>
            <span className="text-xs text-white/50 font-light">USD: </span>
            <span className="text-lg font-semibold tracking-wide">
              {price}{" "}
              <span className="text-xs text-white/50 font-light">تومان</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsdPrice;
