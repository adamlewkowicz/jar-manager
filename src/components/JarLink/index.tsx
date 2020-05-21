import React from 'react';
import Link from 'next/link';

interface JarLinkProps {
  jarId: number;
}

export const JarLink = (props: JarLinkProps) => (
  <Link href="/jar/[jarId]" as={`/jar/${props.jarId}`}>
    <a>Słoik {props.jarId}</a>
  </Link>
);
