import {
  JAR_CREATED,
  JAR_FUNDS_ADDED,
  JAR_FUNDS_TRANSFERRED,
  JAR_FUNDS_REMOVED,
} from './consts';
import { Jar } from '../../../types';

export const jarCreated = (jar: Jar) => ({
  type: JAR_CREATED,
  payload: jar,
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

export const jarFundsTransferred = ({
  fromJarId,
  toJarId,
  amount,
}: {
  fromJarId: number;
  toJarId: number;
  amount: number;
}) => ({
  type: JAR_FUNDS_TRANSFERRED,
  payload: { amount },
  meta: {
    fromJarId,
    toJarId,
  },
});
