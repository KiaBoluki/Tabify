import { QUOTE_API_URL } from "../constants";
import type { Quote } from "../types";

const CACHE_KEY = "tabify-quote";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface CachedQuote {
  quote: Quote;
  fetchedAt: number;
}

function getCache(): Quote | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedQuote = JSON.parse(raw);
    if (Date.now() - cached.fetchedAt > CACHE_TTL) return null;
    return cached.quote;
  } catch {
    return null;
  }
}

function setCache(quote: Quote) {
  try {
    const payload: CachedQuote = { quote, fetchedAt: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage may be unavailable in extension context
  }
}

export async function fetchQuote(): Promise<Quote | null> {
  const cached = getCache();
  if (cached) return cached;

  try {
    const response = await fetch(QUOTE_API_URL);
    if (!response.ok) throw new Error("Failed to fetch quote");
    const data = await response.json();
    const quote: Quote = { content: data[0].content, author: data[0].author };
    setCache(quote);
    return quote;
  } catch (err) {
    console.error("[quoteService]", err);
    return null;
  }
}
