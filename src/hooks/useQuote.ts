import { useState, useEffect } from "react";
import { fetchQuote } from "../services/quoteService";
import type { Quote } from "../types";

interface QuoteState {
  quote: Quote | null;
  loading: boolean;
  error: boolean;
}

export function useQuote(): QuoteState {
  const [state, setState] = useState<QuoteState>({
    quote: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    fetchQuote().then((quote) => {
      setState({
        quote,
        loading: false,
        error: quote === null,
      });
    });
  }, []);

  return state;
}
