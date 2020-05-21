import React from 'react';
import Link from 'next/link';

interface JarLinkProps {
  jarId: number;
  className?: string;
}

export const JarLink = (props: JarLinkProps) => (
  <Link href="/jar/[jarId]" as={`/jar/${props.jarId}`}>
    <a className={props.className}>Słoik {props.jarId}</a>
  </Link>
);
