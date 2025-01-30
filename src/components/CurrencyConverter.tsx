import { useState, useEffect } from 'react';
import { Input, Select, Card, Spin, Switch } from 'antd';
import { NumericFormat } from 'react-number-format';
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
                Amount <b>({isReversed ? selectedCurrency : 'CZK'})</b>
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
              <div className="arrow-circle">
                <Switch
                  checkedChildren={`to CZK`}
                  unCheckedChildren={`from CZK`}
                  checked={isReversed}
                  onChange={handleReverseClick}
                  className="conversion-switch"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Converting to</label>
              {isReversed ? (
                <div className="static-currency">CZK</div>
              ) : (
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
              )}
            </div>
          </div>

          <Card className="result-card">
            <div className="result-value">
              {isLoading ? (
                <Spin className="loading" />
              ) : convertedAmount ? (
                <NumericFormat
                  value={convertedAmount}
                  displayType="text"
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  suffix={` ${isReversed ? 'CZK' : selectedCurrency}`}
                />
              ) : (
                '0.00'
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
