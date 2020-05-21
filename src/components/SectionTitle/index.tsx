import React, { ReactNode } from 'react';
import css from './index.module.scss';

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = (props: SectionTitleProps) => {
  return <p className={css.container}>{props.children}</p>;
};
