import React from 'react';
import css from './index.module.scss';
import type { Transaction } from '../../../types';
import { csx } from '../../../utils';

type TransactionAmountProps = {} & Transaction;

export const TransactionAmount = (props: TransactionAmountProps) => {
  const operationSign = SIGN_TYPE[props.type];

  return (
    <span
      className={csx(css.container, {
        [css.green]: props.type === 'add',
        [css.red]: props.type === 'remove',
      })}
    >
      {operationSign}
      {props.amount}
    </span>
  );
};

const SIGN_TYPE = {
  add: '+',
  remove: '-',
  exchange: '',
};
