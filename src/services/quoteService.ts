import type { Quote } from "../types";

const QUOTE_URL = import.meta.env.DEV
  ? "/api/quote"
  : "https://dummyjson.com/quotes/random";

export async function fetchQuote(): Promise<Quote | null> {
  try {
    const response = await fetch(QUOTE_URL);
    if (!response.ok) throw new Error("Failed to fetch quote");
    const data = await response.json();
    // dummyjson returns { id, quote, author }
    return { content: data.quote, author: data.author };
  } catch (err) {
    console.error("[quoteService]", err);
    return null;
  }
}