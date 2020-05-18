import {
  JAR_CREATED,
  JAR_FUNDS_ADDED,
  JAR_FUNDS_REMOVED,
} from './consts';

export const jarCreated = () => ({
  type: JAR_CREATED,
});

export const jarFundsAdded = (jarId: number, amount: number) => ({
  type: JAR_FUNDS_ADDED,
  payload: { amount },
  meta: { jarId },
});

export const jarFundsRemoved = (jarId: number, amount: number) => ({
  type: JAR_FUNDS_REMOVED,
  payload: { amount },
  meta: { jarId },
});
