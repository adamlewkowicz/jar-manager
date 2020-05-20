export const generateId = (): number => {
  return Math.floor(
    globalThis.performance ? performance.now() : Date.now(),
  );
};
