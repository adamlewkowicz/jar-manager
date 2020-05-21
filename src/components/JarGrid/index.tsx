import React from 'react';
import css from './index.module.scss';
import { Jar } from '../../types';
import { Tile } from 'carbon-components-react';
import { JarLink } from '../JarLink';

interface JarGridProps {
  jars: Jar[];
}

export const JarGrid = (props: JarGridProps) => (
  <ul className={css.container}>
    {props.jars.map((jar) => (
      <li key={jar.id} className={css.item}>
        <Tile>
          <JarLink jarId={jar.id} className={css.link} />
          <p>
            Saldo: {jar.balance} {jar.currency}
          </p>
          <p>Liczba transakcji: {jar.transactions.length}</p>
        </Tile>
      </li>
    ))}
  </ul>
);
