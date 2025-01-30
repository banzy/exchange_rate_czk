import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { parseExchangeRates } from '../utils/helpers';

const URL_RATES_SOURCE =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export interface Rate {
  Country: string;
  Currency: string;
  Amount: string;
  Code: string;
  Rate: string;
}

interface ExchangeRatesData {
  date: string;
  rates: Rate[];
}

const fetchRates = async (): Promise<ExchangeRatesData> => {
  const response = await axios.get<string>(URL_RATES_SOURCE, {
    headers: {
      Accept: 'text/plain',
    },
  });
  return parseExchangeRates(response.data);
};

const useExchangeRates = () => {
  return useQuery<ExchangeRatesData, AxiosError>({
    queryKey: ['exchangeRates'],
    queryFn: fetchRates,
    onSuccess: (data: ExchangeRatesData) => {
      console.log('Fetched rates:', data);
    },
    onError: (error: AxiosError) => {
      console.error('Error fetching rates:', error.message);
    },
  });
};

export default useExchangeRates;
