interface ExchangeRate {
  Country: string;
  Currency: string;
  Amount: string;
  Code: string;
  Rate: string;
}

interface ParsedData {
  date: string;
  rates: ExchangeRate[];
}

export function parseExchangeRates(data: string): ParsedData {
  // trusting the data is well formatted form the source
  const lines = data.trim().split('\n');
  const date = lines[0].split('#')[0].trim();
  const headers = lines[1].split('|');
  const rates = lines.slice(2).map((line) => {
    const values = line.split('|');
    return headers.reduce((obj, header, index) => {
      (obj as any)[header] = values[index];
      return obj;
    }, {} as ExchangeRate);
  });

  return {
    date,
    rates,
  };
}

//   const result = parseExchangeRates(sampleData);
//   console.log(JSON.stringify(result, null, 2));
