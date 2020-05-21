import React from 'react';
import css from './index.module.scss';
import { Jar } from '../../types';
import { Tile } from 'carbon-components-react';
import Link from 'next/link';

interface JarsProps {
  jars: Jar[];
}

export const Jars = (props: JarsProps) => (
  <div className={css.container}>
    {props.jars.map((jar) => (
      <Tile key={jar.id} className={css.item}>
        <Link href="/jar/[jarId]" as={`/jar/${jar.id}`}>
          <a className={css.link}>Słoik {jar.id}</a>
        </Link>
        <p>
          Saldo: {jar.balance} {jar.currency}
        </p>
        <p>Liczba transakcji: {jar.transactions.length}</p>
      </Tile>
    ))}
  </div>
);
