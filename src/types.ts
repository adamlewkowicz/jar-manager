export interface Jar {
  id: number;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: number;
  type?: 'exchange' | 'remove' | 'add';
  currency?: Currency;
}

type Currency = 'PLN' | 'EUR' | 'USD' | 'GBP';
