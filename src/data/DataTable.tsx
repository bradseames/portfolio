// src/components/data/DataTable.tsx

import { Table } from '@mantine/core';

interface TableProps {
  data: any[];
  columns: { key: string; header: string; render?: (item: any) => React.ReactNode }[];
}

const DataTable: React.FC<TableProps> = ({ data, columns }) => {
  // Use Mantine's styling for consistent look
  const rows = data.map((item, index) => (
      <Table.Tr key={index}>
        {columns.map((col) => (
            <Table.Td key={col.key}>
              {col.render ? col.render(item) : item[col.key]}
            </Table.Td>
        ))}
      </Table.Tr>
  ));

  const ths = columns.map((col) => (
      <Table.Th key={col.key}>{col.header}</Table.Th>
  ));

  return (
      <Table striped withRowBorders>
        <Table.Thead><Table.Tr>{ths}</Table.Tr></Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
  );
};
