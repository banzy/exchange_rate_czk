import { Card } from 'antd';
import { RefreshCcw, BadgeCent } from 'lucide-react';
import { Rates } from '../types/types';

interface ExchangeRatesProps {
  rates: Rates;
  isLoading: boolean;
  onCurrencySelect: (currency: string) => void;
  activeCurrency?: string;
}

const ExchangeRates = ({
  rates,
  isLoading,
  onCurrencySelect,
  activeCurrency,
}: ExchangeRatesProps) => {
  return (
    <>
      {!rates && <div>error...</div>}
      <div>
        <h2 className="section-title">Exchange Rates</h2>
        <div className="rate-list">
          {isLoading ? (
            <div className="loading">
              <RefreshCcw className="icon" />
              Loading rates...
            </div>
          ) : rates ? (
            Object.entries(rates).map(([code, rate]) => (
              <Card
                key={code}
                className={`rate-card ${code === activeCurrency ? 'active' : ''}`}
                onClick={() => onCurrencySelect(code)}
              >
                <div className="rate-content">
                  <div className="currency-code">
                    <BadgeCent className="icon" size={20} />
                    {code}
                  </div>
                  <div className="rate-value">{rate.rate.toFixed(3)} CZK</div>
                </div>
              </Card>
            ))
          ) : (
            <div>No rates available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExchangeRates;
