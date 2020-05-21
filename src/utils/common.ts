import dayjs from 'dayjs';
import { Jar } from '../types';

export const generateId = (): number =>
  Math.round((Date.now() + Math.random()) * 100);

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');

export const getJarTitle = (jar: Jar): string =>
  `Słoik ${jar.id} - ${jar.balance} ${jar.currency}`;
