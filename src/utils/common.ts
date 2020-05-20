import dayjs from 'dayjs';

export const generateId = (): number => {
  return Math.floor(
    globalThis.performance ? performance.now() : Date.now(),
  );
};

export const formatDate = (dateISO: string): string =>
  dayjs(dateISO).format('YYYY-MM-DD HH:mm:ss');
