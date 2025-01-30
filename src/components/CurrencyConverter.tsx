import { useState, useEffect } from 'react';
import { Input, Select, Card, Spin } from 'antd';
import { ArrowRight } from 'lucide-react';
import { Rate } from '../types/types';
const { Option } = Select;

interface CurrencyConverterProps {
  rates: { [key: string]: Rate } | null | undefined;
  isLoading: boolean;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencyConverter = ({
  rates,
  isLoading,
  selectedCurrency,
  onCurrencyChange,
}: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    if (amount && selectedCurrency) {
      const rate = rates?.[selectedCurrency]?.rate;
      if (rate) {
        const converted = isReversed
          ? parseFloat(amount) * rate
          : parseFloat(amount) / rate;
        setConvertedAmount(converted);
        console.log(
          `Converting ${amount} ${isReversed ? selectedCurrency : 'CZK'} to ${isReversed ? 'CZK' : selectedCurrency}:`,
          converted
        );
      }
    } else {
      setConvertedAmount(null);
    }
  }, [amount, selectedCurrency, rates, isReversed]);

  const handleReverseClick = () => {
    setIsReversed(!isReversed);
    setAmount('');
    setConvertedAmount(null);
  };

  return (
    <>
      {!rates && <div>error loading rates...</div>}

      <div>
        <h2 className="section-title">Currency Converter</h2>

        <div className="converter-container">
          <div className="inputs-row">
            <div className="input-group">
              <label className="input-label">
                Amount ({isReversed ? selectedCurrency : 'CZK'})
              </label>
              <Input
                type="number"
                placeholder={`Enter amount in ${isReversed ? selectedCurrency : 'CZK'}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="currency-input"
                disabled={isLoading}
              />
            </div>

            <div className="arrow-container">
              <div className="arrow-circle" onClick={handleReverseClick}>
                <ArrowRight className="icon" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Convert to</label>
              <Select
                value={selectedCurrency}
                onChange={onCurrencyChange}
                disabled={isLoading}
                className="currency-input"
              >
                {Object.entries(rates || {}).map(([code, rate]) => (
                  <Option key={code} value={code}>
                    {code} - {rate.country} {rate.currency}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <Card className="result-card">
            <div>
              <div className="result-label">Converted Amount</div>
              <div className="result-value">
                {isLoading ? (
                  <Spin className="loading" />
                ) : convertedAmount ? (
                  `${convertedAmount.toFixed(2)} ${isReversed ? 'CZK' : selectedCurrency}`
                ) : (
                  '0.00'
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
