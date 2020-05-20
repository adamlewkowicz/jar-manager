import React from 'react';
import css from './index.module.scss';
import { Jar } from '../../types';
import { Tile } from 'carbon-components-react';
import Link from 'next/link';

interface JarsProps {
  jars: Jar[];
}

export const Jars = (props: JarsProps) => {
  return (
    <div className={css.container}>
      {props.jars.map((jar) => (
        <Tile key={jar.id}>
          Słoik {jar.id} - {jar.balance} {jar.currency}
          <p>Liczba transakcji: {jar.transactions.length}</p>
          <Link href="/jar/[jarId]" as={`/jar/${jar.id}`}>
            Pokaż
          </Link>
        </Tile>
      ))}
    </div>
  );
};
