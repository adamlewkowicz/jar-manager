export interface Jar {
  id: number;
  balance: number;
  transactions: Transaction[];
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  currency?: Currency;
}

type Currency = 'PLN' | 'EUR' | 'USD' | 'GBP';
