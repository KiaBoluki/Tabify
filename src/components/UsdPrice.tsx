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
  const [omrPrice, setOmrPrice] = useState<string | null>(null);

  // Constants
  const USD_TO_OMR_RATE = 0.3845; //
  const FETCH_INTERVAL = 60000; // Example 1 minute

  const toEnglishDigits = (str: string) => {
    return str.replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString());
  };

  const calculateOmrPrice = useCallback((usdPriceStr: string) => {
    // Clean string of commas and convert Arabic digits
    const normalizedStr = toEnglishDigits(usdPriceStr).replace(/,/g, "");
    const usdValue = parseFloat(normalizedStr);

    if (!isNaN(usdValue)) {
      const converted = (usdValue * USD_TO_OMR_RATE).toFixed(3);
      setOmrPrice(converted);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchUsdPrice();
      if (result) {
        setPrice(result);
        calculateOmrPrice(result);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [calculateOmrPrice]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="mt-4 flex items-center justify-between text-white">
      <div className="text-right w-full">
        {loading && !price ? (
          <span className="text-sm text-white/50 animate-pulse">
            Loading...
          </span>
        ) : error ? (
          <span className="text-sm text-red-400">Failed to fetch price</span>
        ) : (
          <div className="w-full flex items-center justify-between space-x-5">
            <div>
              <span className="text-xs text-white/50 font-light">USD: </span>
              <span className="text-lg font-semibold tracking-wide">
                ${price}
              </span>
            </div>
            <div>
              <span className="text-xs text-white/50 font-light">OMR: </span>
              <span className="text-lg font-semibold tracking-wide">
                {omrPrice} <span className="text-xs">ر.ع.</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default UsdPrice;
