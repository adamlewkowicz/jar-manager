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

interface TableProps {
  title: string;
  headers: string[];
  rows: any;
}

export const Table = (props: TableProps) => {
  const normalizedHeaders = props.headers.map((header, index) => ({
    header,
    key: header,
  }));
  return (
    <DataTable rows={props.rows} headers={normalizedHeaders}>
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
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </NativeTable>
        </TableContainer>
      )}
    </DataTable>
  );
};
