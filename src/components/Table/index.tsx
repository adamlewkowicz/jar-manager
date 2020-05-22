import React from 'react';
import {
  DataTable,
  DataTableProps,
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
  data: unknown[][];
  sortRow?: DataTableProps['sortRow'];
  onSortPropChange?: (sortProp: string) => void;
  onSortDirChange?: (sortDir: string) => void;
}

export const Table = (props: TableProps) => {
  const normalizedHeaders = props.headers.map((header) => ({
    header,
    key: header,
  }));
  const normalizedRows = props.data.map((values) => {
    const idValue = String(values[0]);
    const mappedValues = Object.fromEntries(
      props.headers.map((header, index) => [header, values[index]]),
    );

    return {
      id: idValue,
      ...mappedValues,
    };
  });

  return (
    <div className={css.container}>
      <DataTable
        rows={normalizedRows}
        headers={normalizedHeaders}
        isSortable
        sortRow={props.sortRow}
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
