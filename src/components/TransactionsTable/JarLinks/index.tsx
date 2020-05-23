import React from 'react';
import type { Transaction } from '../../../types';
import { JarLink } from '../../JarLink';

type JarLinksProps = {} & Transaction;

export const JarLinks = (props: JarLinksProps) => {
  if (props.type === 'exchange') {
    return (
      <>
        <JarLink jarId={props.fromJarId} />
        {' -> '}
        <JarLink jarId={props.toJarId} />
      </>
    );
  }
  return <JarLink jarId={props.jarId} />;
};
