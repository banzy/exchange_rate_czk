import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fetchRates } from '../services/apiService';
import { ExchangeRatesData } from '../types/types';

const useExchangeRates = () => {
  return useQuery<ExchangeRatesData, AxiosError>({
    queryKey: ['exchangeRates'],
    queryFn: fetchRates,
    networkMode: 'always',
  });
};

export default useExchangeRates;
