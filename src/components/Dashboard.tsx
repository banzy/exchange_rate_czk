import { useEffect, useState } from 'react';
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';
import useToast from '../hooks/useToast';
import useExchangeRates from '../hooks/useExchangeRates';
import { Rates } from '../types/types';
import { RefreshCcw } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/currency.scss';

const Dashboard = () => {
  const { data, isLoading, error, refetch } = useExchangeRates();
  const [rates, setRates] = useState<Rates>();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const { showToast } = useToast();

  useEffect(() => {
    if (data?.rates) {
      setRates(data.rates);
    }
  }, [data]);

  const handleCurrencySelect = (currency: string) => {
    console.log('Currency selected:', currency);
    setSelectedCurrency(currency);
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      showToast('Exchange rates updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to refresh rates. Please try again later.', 'error');
      console.error('Refresh error:', error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  console.log('Fetched rates:', data);

  return (
    <div className="container">
      <ToastContainer />
      <div className="wrapper">
        <header className="header">
          <h1 className="header-title">Currency Exchange</h1>
          <p className="header-subtitle">
            Fast and reliable currency conversion form the Czech National Bank
          </p>
        </header>

        <div className="flex-layout">
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
            activeCurrency={selectedCurrency}
          />
        </div>
        <div
          className="update-note"
          onClick={handleRefresh}
          role="button"
          tabIndex={0}
        >
          <RefreshCcw size={12} className="icon" />
          Refresh rates now
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
