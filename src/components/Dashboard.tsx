import { useEffect, useState } from 'react';
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';
import useToast from '../hooks/useToast';
import '../styles/currency.scss';
import useExchangeRates from '../hooks/useExchangeRates';
import { Rates } from '../types/types';

const Dashboard = () => {
  const { data, isLoading, error } = useExchangeRates();
  const [rates, setRates] = useState<Rates>();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const { showToast } = useToast();

  useEffect(() => {
    if (data?.rates) {
      setRates(data.rates);
      console.log('Fetched rates:', data.rates);
      showToast(
        'Exchange rates updated: Latest rates have been fetched successfully',
        'success'
      );
    }
  }, [data]);

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
            rates={rates || null}
            isLoading={isLoading}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={handleCurrencySelect}
          />
          <ExchangeRates
            rates={rates || null}
            isLoading={isLoading}
            onCurrencySelect={handleCurrencySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
