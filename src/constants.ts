import type { CurrencyRate } from "./types";

export const FETCH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const USD_API_URL = import.meta.env.DEV
  ? "/api/usd"
  : "https://alanchand.com/currencies-price/usd";

export const QUOTE_API_URL = "https://api.realinspire.tech/v1/quotes/random";

export const CURRENCIES: CurrencyRate[] = [
  { code: "USD", label: "دلار", symbol: "$", rate: 1 },
  { code: "OMR", label: "ریال عمان", symbol: "﷼", rate: 2.65 },
];
