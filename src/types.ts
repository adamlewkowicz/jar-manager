import { CURRENCIES } from './common/consts';

export interface Jar {
  id: number;
  balance: number;
  currency: Currency;
  isDefault: boolean;
  transactions?: Transaction[];
}

interface BaseTransaction {
  id: number;
  title: string;
  date: string;
  amount: number;
  currency?: Currency;
}

export interface FundsTransaction extends BaseTransaction {
  jarId: number;
  type: 'remove' | 'add';
}

export interface ExchangeTransaction extends BaseTransaction {
  fromJarId: number;
  toJarId: number;
  type: 'exchange';
}

export type Transaction = FundsTransaction | ExchangeTransaction;

export type Currency = typeof CURRENCIES[number];

export type ValueOf<T> = T[keyof T];

export type SortDir = 'ASC' | 'DESC';
