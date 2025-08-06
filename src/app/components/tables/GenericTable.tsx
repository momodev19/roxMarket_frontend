"use client";

import { useState, useMemo } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import classes from "./GenericTable.module.css";

type RowValue = string | number | null | undefined;

type Column = {
  key: string;
  label: string;
};

type RowData = {
  id: number;
  [key: string]: RowValue;
};

type GenericTableProps = {
  data: RowData[];
  columns?: Column[];
  tableOptions?: React.ComponentProps<typeof Table>;
  showSearch?: boolean;
};

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key]?.toString().toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (aVal < bVal) return payload.reversed ? 1 : -1;
      if (aVal > bVal) return payload.reversed ? -1 : 1;
      return 0;
    }),
    payload.search
  );
}

export default function GenericTable({
  data,
  columns,
  tableOptions = {
    highlightOnHover: true,
    striped: true,
    withTableBorder: true,
  },
  showSearch = true,
}: GenericTableProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // Get columns from data if not provided
  const resolvedColumns = useMemo(() => {
    if (columns) return columns;
    if (data?.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({ key, label: key }));
  }, [columns, data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      {resolvedColumns.map((column) => (
        <Table.Td key={column.key}>{row[column.key]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      {showSearch && (
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
      )}

      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
        {...tableOptions}
        stickyHeader
        stickyHeaderOffset={60}
      >
        {rows.length > 0 ? (
          <Table.Thead>
            <Table.Tr>
              {resolvedColumns.map((column) => (
                <Th
                  key={column.key}
                  sorted={sortBy === column.key}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(column.key as keyof RowData)}
                >
                  {column.label}
                </Th>
              ))}
            </Table.Tr>
          </Table.Thead>
        ) : null}
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
