import { Card } from 'antd';
import { RefreshCcw, TrendingUp, CurrencyIcon } from 'lucide-react';
import { Rate } from './Dashboard';

interface ExchangeRatesProps {
  rates: Rate[];
  isLoading: boolean;
  onCurrencySelect: (currency: string) => void;
}

const ExchangeRates = ({
  rates,
  isLoading,
  onCurrencySelect,
}: ExchangeRatesProps) => {
  return (
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
        ) : (
          rates.map((rate) => (
            <Card
              key={rate.currency}
              className="rate-card"
              onClick={() => onCurrencySelect(rate.currency)}
            >
              <div className="rate-content">
                <div className="currency-code">
                  <CurrencyIcon className="icon" size={20} />
                  {rate.currency}
                </div>
                <div className="rate-value">{rate.rate.toFixed(3)} CZK</div>
              </div>
            </Card>
          ))
        )}
      </div>
      <div className="update-note">
        <RefreshCcw size={12} className="icon" />
        Rates are updated every minute
      </div>
    </div>
  );
};

export default ExchangeRates;
