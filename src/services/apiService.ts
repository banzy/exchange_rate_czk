import axios from 'axios';
import { ExchangeRatesData } from '../types/types';
import { parseExchangeRates } from '../utils/helpers';

const URL_RATES_SOURCE =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const fetchRates = async (): Promise<ExchangeRatesData> => {
  const response = await axios.get<string>(
    `${CORS_PROXY}${encodeURIComponent(URL_RATES_SOURCE)}`,
    {
      headers: {
        Accept: 'text/plain',
      },
    }
  );
  return parseExchangeRates(response.data) || { date: '', rates: null };
};
