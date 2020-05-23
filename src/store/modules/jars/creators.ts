import {
  JAR_CREATED,
  JAR_FUNDS_ADDED,
  JAR_FUNDS_TRANSFERRED,
  JAR_FUNDS_REMOVED,
  JAR_DEFAULT_UPDATED,
} from './consts';
import type { Currency } from '../../../types';

export const jarCreated = (data: { currency: Currency; balance: number }) => ({
  type: JAR_CREATED,
  payload: data,
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

export const jarDefaultUpdated = (jarId: number) => ({
  type: JAR_DEFAULT_UPDATED,
  meta: { jarId },
});

export const jarFundsTransferred = ({
  fromJarId,
  toJarId,
  amount,
}: JarFundsTransferPayload) => ({
  type: JAR_FUNDS_TRANSFERRED,
  payload: { amount },
  meta: {
    fromJarId,
    toJarId,
  },
});

export interface JarFundsTransferPayload {
  fromJarId: number;
  toJarId: number;
  amount: number;
}
