import React from 'react';
import css from './index.module.scss';
import { Transaction } from '../../types';
import { csx } from '../../utils';

type TransactionAmountProps = {} & Transaction;

export const TransactionAmount = (props: TransactionAmountProps) => {
  const operationSign =
    props.type === 'exchange'
      ? ''
      : props.type === 'remove'
      ? '-'
      : '+';

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
