import dayjs from 'dayjs';
import { Jar, Currency } from '../types';

export const generateId = (): number => Date.now();

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');

export const getJarTitle = (
  jar: Jar,
  transferCurrency?: Currency,
): string => {
  const isNotEqualCurrency =
    transferCurrency && transferCurrency !== jar.currency;

  return (
    `Słoik ${jar.id} - ${jar.balance} ${jar.currency}` +
    `${isNotEqualCurrency ? 'Waluta musi być taka sama' : ''}`
  );
};
