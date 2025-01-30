export interface Rate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export type Rates = { [key: string]: Rate } | null;

export interface ExchangeRatesData {
  date: string;
  rates: Rates;
}
