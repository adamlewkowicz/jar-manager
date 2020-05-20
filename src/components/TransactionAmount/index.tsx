import React from 'react';
import css from './index.module.scss';
import { Transaction } from '../../types';
import { csx } from '../../utils';

interface TransactionAmountProps extends Transaction {}

export const TransactionAmount = (props: TransactionAmountProps) => {
  return (
    <span
      className={csx(css.container, {
        [css.green]: props.type === 'add',
        [css.red]: props.type === 'remove',
      })}
    >
      {props.type === 'remove' ? '-' : '+'}
      {props.amount}
    </span>
  );
};
