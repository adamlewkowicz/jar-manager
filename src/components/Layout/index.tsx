import React, { ReactNode } from 'react';
import Link from 'next/link';
import css from './index.module.scss';
import { useQueryJarId } from '../../hooks/useQueryJarId';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const jarId = useQueryJarId();

  return (
    <main className={css.container}>
      <h1 className={css.heading}>
        <Link href="/">
          <a className={css.link}>Słoiki</a>
        </Link>
        {jarId !== null && ` / ${jarId}`}
      </h1>
      {props.children}
    </main>
  );
};
