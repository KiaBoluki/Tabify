export interface Quote {
  content: string;
  author: string;
}

export interface CurrencyRate {
  code: string;
  label: string;
  symbol: string;
  rate: number; // multiplier against USD/TMN base price
}

export interface PriceState {
  value: number | null;
  loading: boolean;
  error: boolean;
}
