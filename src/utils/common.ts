import dayjs from 'dayjs';
import { Jar } from '../types';

const createIdGenerator = () => {
  let count = 0;
  return () => Date.now() + count++;
};

export const generateId = createIdGenerator();

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');

export const getJarTitle = (jar: Jar): string =>
  `Słoik ${jar.id} - ${jar.balance} ${jar.currency}`;
