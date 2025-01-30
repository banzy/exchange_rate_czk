import { Rate } from '../types/types';

interface ParsedData {
  date: string;
  rates: any;
}

export function parseExchangeRates(data: string): ParsedData {
  if (!data) return { date: '', rates: null };
  const lines = data.trim().split('\n');
  const date = lines[0].split('#')[0].trim();
  const headers = lines[1].split('|').map((header) => header.toLowerCase());
  const rates = lines.slice(2).reduce(
    (acc, line) => {
      const values = line.split('|');
      const rateObj = headers.reduce((obj, header, index) => {
        const value = values[index];
        obj[header] = isNaN(Number(value)) ? value : Number(value);
        return obj;
      }, {} as any);

      // Use the code as the key in the rates object
      acc[rateObj.code] = rateObj;
      return acc;
    },
    {} as Record<string, any>
  );

  return {
    date,
    rates,
  };
}
