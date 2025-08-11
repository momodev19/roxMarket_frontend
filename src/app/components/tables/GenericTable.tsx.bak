"use client";

import { Table, Text, TextInput } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

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
  showSearch?: boolean;
};

function displayNone(val: RowValue) {
  return val == null || val === "" ? "" : val;
}

export default function GenericTable({
  data,
  columns,
  renderRows,
  tableOptions = {
    highlightOnHover: true,
    striped: true,
    withTableBorder: true,
  },
  showSearch = true,
}: GenericTableProps) {
  // Get columns from data if not provided
  const resolvedColumns = useMemo(() => {
    if (columns) return columns;
    if (data?.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({ key, label: key }));
  }, [columns, data]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof Row>("id");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  /**
   * Start of sorting logic
   */
  const setSorting = (field: keyof Row) => {
    if (sortBy === field) {
      setReverseSortDirection(!reverseSortDirection);
    } else {
      setSortBy(field);
      setReverseSortDirection(false);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (aVal < bVal) return reverseSortDirection ? 1 : -1;
      if (aVal > bVal) return reverseSortDirection ? -1 : 1;
      return 0;
    });

    return sorted;
  }, [data, sortBy, reverseSortDirection]);

  /**
   * End of sorting logic
   */

  /**
   * Start of filtering logic
   */
  const filteredData = useMemo(() => {
    if (!debouncedSearch) return sortedData;

    const lowerDebouncedSearch = debouncedSearch.toLowerCase();

    return sortedData.filter((item) =>
      resolvedColumns.some((column) =>
        item[column.key]
          ?.toString()
          .toLowerCase()
          .includes(lowerDebouncedSearch)
      )
    );
  }, [debouncedSearch, resolvedColumns, sortedData]);
  /**
   * End of filtering logic
   */

  if (data?.length === 0) {
    return (
      <Text ta="center" c="dimmed" mt="md">
        No data available
      </Text>
    );
  }

  return (
    <>
      {showSearch && (
        <TextInput
          placeholder="Search..."
          mb="sm"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      )}
      <Table stickyHeader stickyHeaderOffset={58} {...tableOptions}>
        <Table.Thead>
          <Table.Tr>
            {resolvedColumns.map((column) => (
              <Table.Th
                tabIndex={0}
                key={column.key}
                style={{ cursor: "pointer" }}
                onClick={() => setSorting(column.key)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSorting(column.key);
                  }
                }}
                aria-sort={
                  sortBy === column.key
                    ? reverseSortDirection
                      ? "descending"
                      : "ascending"
                    : "none"
                }
              >
                {column.label}{" "}
                {sortBy === column.key
                  ? reverseSortDirection
                    ? "▼"
                    : "▲"
                  : ""}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {renderRows
            ? renderRows(filteredData)
            : filteredData.map((row) => (
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
    </>
  );
}
