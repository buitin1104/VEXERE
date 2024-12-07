import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React from 'react';

export function CustomTable({
  columns,
  data,
  page = 1,
  totalPage = 1,
  isLoading,
}) {
  return (
    <Table
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPage}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      aria-label="Custom Table Component"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.id}>
            {column.headCell ? column.headCell() : column.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.renderCell ? column.renderCell(row) : row[column.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
