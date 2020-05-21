import { CURRENCIES } from './common/consts';

export interface Jar {
  id: number;
  balance: number;
  currency: Currency;
  isDefault: boolean;
  transactions?: Transaction[];
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
