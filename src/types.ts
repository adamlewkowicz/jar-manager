export interface Jar {
  id: number;
  balance: number;
  transactions: Transaction[];
  currency: Currency;
}

export interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: number;
  type?: 'exchange' | 'remove' | 'add';
  currency?: Currency;
}

export type Currency = 'PLN' | 'EUR' | 'USD' | 'GBP';

export type ValueOf<T> = T[keyof T];
