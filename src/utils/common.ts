import dayjs from 'dayjs';

export const generateId = (): number => Date.now();

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');
