import React from 'react';
import { ListViewTable, ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { columnsFiles, columnsFilesCode } from './columns-files';
import { dataFilesExtended, dataFilesExtendedCode } from './data-files-extended';

const data = dataFilesExtended;
const initialColumns: ListViewTableColumn[] = columnsFiles;

function Demo() {
  const [currentColumns, setCurrentColumns] = React.useState(initialColumns);

  const handleColumnReorder = (fromIndex: number, toIndex: number) => {
    const newColumns = [...currentColumns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setCurrentColumns(newColumns);
    // eslint-disable-next-line no-console
    console.log('Column reordered from', fromIndex, 'to', toIndex);
  };

  const handleColumnResize = (columnKey: string, width: number) => {
    // eslint-disable-next-line no-console
    console.log('Column resized:', columnKey, 'to width:', width);
  };

  return (
    <ListViewTable
      columns={currentColumns}
      data={data}
      rowKey="id"
      withTableBorder
      highlightOnHover
      enableColumnReordering
      enableColumnResizing
      onColumnReorder={handleColumnReorder}
      onColumnResize={handleColumnResize}
      onRowClick={(record) => {
        // eslint-disable-next-line no-console
        console.log('Clicked:', record.name);
      }}
    />
  );
}

const code = `
import React from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data, initialColumns } from './data';

function Demo() {
  const [currentColumns, setCurrentColumns] = React.useState(initialColumns);

  const handleColumnReorder = (fromIndex: number, toIndex: number) => {
    const newColumns = [...currentColumns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setCurrentColumns(newColumns);
    console.log('Column reordered from', fromIndex, 'to', toIndex);
  };

  const handleColumnResize = (columnKey: string, width: number) => {
    console.log('Column resized:', columnKey, 'to width:', width);
  };

  return (
    <ListViewTable
      columns={currentColumns}
      data={data}
      rowKey="id"
      withTableBorder
      highlightOnHover
      enableColumnReordering
      enableColumnResizing
      onColumnReorder={handleColumnReorder}
      onColumnResize={handleColumnResize}
      onRowClick={(record) => {
        console.log('Clicked:', record.name);
      }}
    />
  );
}
`;

export const externalReorderingAndResizing: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsFilesCode, language: 'tsx' },
  ],
};
