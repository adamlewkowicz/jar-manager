import React, { ReactNode } from 'react';
import { TableContainer, Table } from 'carbon-components-react';
import css from './index.module.scss';

interface ContainerProps {
  title: string;
  children: ReactNode;
}

export const Container = (props: ContainerProps) => (
  <TableContainer title={props.title} className={css.container}>
    <Table isSortable>{props.children}</Table>
  </TableContainer>
);

export {
  TableHead as Head,
  TableRow as Row,
  TableCell as Cell,
  TableBody as Body,
  TableHeader as Header,
} from 'carbon-components-react';
