import { CURRENCIES } from './common/consts';

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
  jarId: number;
  type: 'exchange' | 'remove' | 'add';
  currency?: Currency;
}

export type Currency = typeof CURRENCIES[number];

export type ValueOf<T> = T[keyof T];
