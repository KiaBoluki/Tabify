import { USD_API_URL } from "../constants";

// Try multiple strategies to extract the sell price from alanchand.com
function extractPrice(html: string): number | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Strategy 1: original selector
  const byClass = doc.querySelector("td.sellPrice");
  if (byClass?.textContent?.trim()) {
    const n = parseFloat(byClass.textContent.trim().replace(/,/g, ""));
    if (!isNaN(n)) return n;
  }

  // Strategy 2: any element with sellPrice in class
  const byPartialClass = doc.querySelector("[class*='sellPrice']");
  if (byPartialClass?.textContent?.trim()) {
    const n = parseFloat(byPartialClass.textContent.trim().replace(/,/g, ""));
    if (!isNaN(n)) return n;
  }

  // Strategy 3: regex on raw HTML — finds the first large number (6 digits+)
  // alanchand always shows the sell price first as a prominent heading
  const match = html.match(/[\u06F0-\u06F90-9,]{5,}(?=\s*(?:تومان|٪|<))/);
  if (match) {
    // Convert Persian/Arabic-Indic digits to ASCII
    const ascii = match[0]
      .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
      .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
      .replace(/,/g, "");
    const n = parseFloat(ascii);
    if (!isNaN(n) && n > 1000) return n;
  }

  // Strategy 4: regex on ASCII digits followed by common suffixes
  const asciiMatch = html.match(/([0-9]{2,3},[0-9]{3})(?=\s*(?:تومان|٪|<|\s*<))/);
  if (asciiMatch) {
    const n = parseFloat(asciiMatch[1].replace(/,/g, ""));
    if (!isNaN(n)) return n;
  }

  return null;
}

export async function fetchUsdTmnPrice(): Promise<number | null> {
  try {
    const response = await fetch(USD_API_URL, {
      headers: { Accept: "text/html" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const html = await response.text();
    const price = extractPrice(html);

    if (price === null) {
      console.error("[currencyService] Could not extract price from HTML");
    }

    return price;
  } catch (err) {
    console.error("[currencyService]", err);
    return null;
  }
}