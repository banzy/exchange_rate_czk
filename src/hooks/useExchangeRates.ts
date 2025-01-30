import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { parseExchangeRates } from '../utils/helpers';
import { Rates } from '../types/types';
const URL_RATES_SOURCE =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

interface ExchangeRatesData {
  date: string;
  rates: Rates;
}

const fetchRates = async (): Promise<ExchangeRatesData> => {
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

const useExchangeRates = () => {
  return useQuery<ExchangeRatesData, AxiosError>({
    queryKey: ['exchangeRates'],
    queryFn: fetchRates,
    networkMode: 'always',
  });
};

export default useExchangeRates;
