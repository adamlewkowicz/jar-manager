import React, { ReactNode } from 'react';
import css from './index.module.scss';

interface H2Props {
  children: ReactNode;
}

export const H2 = (props: H2Props) => (
  <h2 className={css.container}>{props.children}</h2>
);
