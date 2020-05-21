import React from 'react';
import { Transaction } from '../../../types';
import { JarLink } from '../../JarLink';

type JarLinksProps = {} & Transaction;

export const JarLinks = (props: JarLinksProps) => {
  return props.type === 'exchange' ? (
    <>
      <JarLink jarId={props.fromJarId} />
      {' -> '}
      <JarLink jarId={props.toJarId} />
    </>
  ) : (
    <JarLink jarId={props.jarId} />
  );
};
