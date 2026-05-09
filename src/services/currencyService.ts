import { USD_API_URL } from "../constants";

export async function fetchUsdTmnPrice(): Promise<number | null> {
  try {
    const response = await fetch(USD_API_URL, {
      headers: { Accept: "text/html" },
    });
    if (!response.ok) throw new Error("Failed to fetch");

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const cell = doc.querySelector("td.sellPrice");
    const raw = cell?.textContent?.trim() ?? null;
    if (!raw) return null;

    // Strip commas and parse to number
    const numeric = parseFloat(raw.replace(/,/g, ""));
    return isNaN(numeric) ? null : numeric;
  } catch (err) {
    console.error("[currencyService]", err);
    return null;
  }
}
