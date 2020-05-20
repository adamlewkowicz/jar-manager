import React from 'react';
import css from './index.module.scss';
import { Transaction } from '../../types';

interface TransactionAmountProps extends Transaction {}

export const TransactionAmount = (props: TransactionAmountProps) => {
  return <span className={css.container}></span>;
};
