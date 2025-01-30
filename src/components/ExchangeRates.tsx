import { Card } from 'antd';
import { RefreshCcw, TrendingUp, CurrencyIcon } from 'lucide-react';
import { Rates } from '../types/types';

interface ExchangeRatesProps {
  rates: Rates;
  isLoading: boolean;
  onCurrencySelect: (currency: string) => void;
}

const ExchangeRates = ({
  rates,
  isLoading,
  onCurrencySelect,
}: ExchangeRatesProps) => {
  return (
    <>
      {!rates && <div>error...</div>}
      <div>
        <h2 className="section-title">
          <TrendingUp className="icon" />
          Exchange Rates
        </h2>
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
                className="rate-card"
                onClick={() => onCurrencySelect(code)}
              >
                <div className="rate-content">
                  <div className="currency-code">
                    <CurrencyIcon className="icon" size={20} />
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
        <div className="update-note">
          <RefreshCcw size={12} className="icon" />
          Rates are updated every minute
        </div>
      </div>
    </>
  );
};

export default ExchangeRates;
