import { useState, useEffect, useCallback } from "react";
import { fetchUsdTmnPrice } from "../services/currencyService";
import { FETCH_INTERVAL } from "../constants";
import type { PriceState } from "../types";

export function useUsdPrice(): PriceState & { refresh: () => void } {
  const [state, setState] = useState<PriceState>({
    value: null,
    loading: true,
    error: false,
  });

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: false }));
    const value = await fetchUsdTmnPrice();
    setState({
      value,
      loading: false,
      error: value === null,
    });
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return { ...state, refresh };
}
