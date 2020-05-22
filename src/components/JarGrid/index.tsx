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
        <Tile className={css.tile}>
          <JarLink jarId={jar.id} className={css.link} />
          <p>
            Saldo: <strong>{jar.balance}</strong> {jar.currency}
          </p>
          <p>Liczba transakcji: {jar.transactions.length}</p>
          {jar.isDefault && <p className={css.info_default}>Domyślny</p>}
        </Tile>
      </li>
    ))}
  </ul>
);
