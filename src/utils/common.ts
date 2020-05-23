import dayjs from 'dayjs';
import type { Jar, Transaction } from '../types';

const createIdGenerator = () => {
  let count = 0;
  return () => Date.now() + count++;
};

export const generateId = createIdGenerator();

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');

export const getJarTitle = (jar: Jar): string =>
  `Słoik ${jar.id} - ${jar.balance} ${jar.currency}`;

export const sortCompare = (a: string | number, b: string | number): -1 | 0 | 1 => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const getJarIdsFromTransaction = (transaction: Transaction) => {
  if (transaction.type === 'exchange') {
    return [transaction.fromJarId, transaction.toJarId] as const;
  }
  return [transaction.jarId] as const;
};
