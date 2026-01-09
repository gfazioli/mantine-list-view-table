import React from 'react';
import { ListViewTable, ListViewTableSortStatus } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { columnsFiles, columnsFilesCode } from './columns-files';
import { dataFilesExtended, dataFilesExtendedCode } from './data-files-extended';

const data = dataFilesExtended;
const columns = columnsFiles;

function Demo() {
  const [sortStatus, setSortStatus] = React.useState<ListViewTableSortStatus>({
    columnKey: 'name',
    direction: 'asc',
  });

  const sortedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortStatus.columnKey as keyof typeof a];
      const bValue = b[sortStatus.columnKey as keyof typeof b];

      if (sortStatus.direction === 'desc') {
        return String(bValue).localeCompare(String(aValue));
      }
      return String(aValue).localeCompare(String(bValue));
    });
    return sorted;
  }, [sortStatus]);

  return (
    <ListViewTable
      columns={columns}
      data={sortedData}
      rowKey="id"
      withTableBorder
      highlightOnHover
      sortStatus={sortStatus}
      onSort={setSortStatus}
    />
  );
}

const code = `
import React from 'react';
import { ListViewTable, ListViewTableSortStatus } from '@gfazioli/mantine-list-view-table';
import { data } from './data';
import { columns } from './columns';

function Demo() {
  const [sortStatus, setSortStatus] = React.useState<ListViewTableSortStatus>({
    columnKey: 'name',
    direction: 'asc',
  });

  const sortedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortStatus.columnKey as keyof typeof a];
      const bValue = b[sortStatus.columnKey as keyof typeof b];

      if (sortStatus.direction === 'desc') {
        return String(bValue).localeCompare(String(aValue));
      }
      return String(aValue).localeCompare(String(bValue));
    });
    return sorted;
  }, [sortStatus]);

  return (
    <ListViewTable
      columns={columns}
      data={sortedData}
      rowKey="id"
      withTableBorder
      highlightOnHover
      sortStatus={sortStatus}
      onSort={setSortStatus}
    />
  );
}
`;

export const externalSorting: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsFilesCode, language: 'tsx' },
  ],
};
