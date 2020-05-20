import React, { ReactNode } from 'react';
import css from './index.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return <main className={css.container}>{props.children}</main>;
};
