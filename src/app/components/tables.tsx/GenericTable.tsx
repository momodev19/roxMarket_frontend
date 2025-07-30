"use client";

import { Table, Text } from "@mantine/core";
import React, { useMemo } from "react";

type RowValue = string | number | null | undefined;

type Column = {
  key: string;
  label: string;
};

type Row = {
  id: number;
  [key: string]: RowValue;
};

type GenericTableProps = {
  data: Row[];
  columns?: Column[];
  renderRows?: (rows: Row[]) => React.ReactNode;
  tableOptions?: React.ComponentProps<typeof Table>;
};

function displayNone(val: RowValue) {
  return val == null || val === "" ? "" : val;
}

export default function GenericTable({
  data,
  columns,
  renderRows,
  tableOptions,
}: GenericTableProps) {
  // Get columns from data if not provided
  const resolvedColumns = useMemo(() => {
    if (columns) return columns;
    if (data?.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({ key, label: key }));
  }, [columns, data]);

  if (data?.length === 0) {
    return (
      <Text ta="center" c="dimmed" mt="md">
        No data available
      </Text>
    );
  }

  return (
    <Table {...tableOptions}>
      <Table.Thead>
        <Table.Tr>
          {resolvedColumns.map((column) => (
            <Table.Th key={column.key}>{column.label}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {renderRows
          ? renderRows(data)
          : data.map((row) => (
              <Table.Tr key={row.id}>
                {resolvedColumns.map((column, index) => (
                  <Table.Td key={`${row.id}-${index}`}>
                    {displayNone(row[column.key])}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
      </Table.Tbody>
    </Table>
  );
}
