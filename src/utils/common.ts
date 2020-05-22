import dayjs from 'dayjs';
import { Jar, Transaction } from '../types';

const createIdGenerator = () => {
  let count = 0;
  return () => Date.now() + count++;
};

export const generateId = createIdGenerator();

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');

export const getJarTitle = (jar: Jar): string =>
  `Słoik ${jar.id} - ${jar.balance} ${jar.currency}`;

export const sortCompare = (a: unknown, b: unknown): -1 | 0 | 1 => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export const getJarIdFromTransaction = (transaction: Transaction) => {
  if (transaction.type === 'exchange') {
    return transaction.fromJarId;
  }
  return transaction.jarId;
};
