import React from 'react';
import {
  DataTable,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Table as NativeTable,
  TableHead,
  TableHeader,
} from 'carbon-components-react';
import css from './index.module.scss';

interface TableProps {
  title: string;
  headers: string[];
  data: unknown[];
}

export const Table = (props: TableProps) => {
  const normalizedHeaders = props.headers.map((header) => ({
    header,
    key: header,
  }));
  const normalizedRows = props.data.map((row) => ({
    id: String(row[0]),
    ...Object.fromEntries(
      props.headers.map((header, index) => [header, row[index + 1]]),
    ),
  }));

  return (
    <div className={css.container}>
      <DataTable
        rows={normalizedRows}
        headers={normalizedHeaders}
        isSortable
      >
        {({
          rows,
          headers,
          getRowProps,
          getTableProps,
          getTableContainerProps,
          getHeaderProps,
        }) => (
          <TableContainer
            title={props.title}
            {...getTableContainerProps()}
          >
            <NativeTable {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </NativeTable>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};
