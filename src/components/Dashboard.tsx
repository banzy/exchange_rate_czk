import { useEffect, useState } from 'react';
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';
import useToast from '../hooks/useToast';
import '../styles/currency.scss';
import useExchangeRates from '../hooks/useExchangeRates';

export interface Rate {
  currency: string;
  rate: number;
}

const Dashboard = () => {
  const { data, isLoading, error } = useExchangeRates();
  const [rates, setRates] = useState<Rate[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
  const { showToast } = useToast();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const sampleRates: Rate[] = [
          { currency: 'EUR', rate: 24.52 },
          { currency: 'USD', rate: 22.61 },
          { currency: 'GBP', rate: 28.65 },
          { currency: 'JPY', rate: 0.152 },
          { currency: 'CHF', rate: 25.83 },
          { currency: 'AUD', rate: 14.72 },
        ];

        setRates(sampleRates);
        console.log('Fetched rates:', sampleRates);

        showToast(
          'Exchange rates updated: Latest rates have been fetched successfully',
          'success'
        );
      } catch (error) {
        console.error('Error fetching rates:', error);
        showToast('Failed to fetch exchange rates', 'error');
      }
    };

    fetchRates();
  }, []);

  const handleCurrencySelect = (currency: string) => {
    console.log('Currency selected:', currency);
    setSelectedCurrency(currency);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Fetched rates:', data);

  return (
    <div className="container">
      <div className="wrapper">
        <header className="header">
          <h1 className="header-title">Currency Exchange</h1>
          <p className="header-subtitle">
            Fast and reliable currency conversion form the Czech National Bank
          </p>
        </header>

        <div className="grid-layout">
          <CurrencyConverter
            rates={rates}
            isLoading={isLoading}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencySelect}
          />
          <ExchangeRates
            rates={rates}
            isLoading={isLoading}
            onCurrencySelect={handleCurrencySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
