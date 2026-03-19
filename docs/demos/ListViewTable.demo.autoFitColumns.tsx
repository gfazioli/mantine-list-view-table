import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { data } from './data-files';

const columns = [
  { key: 'name', title: 'Name', sortable: true, width: 200 },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const, width: 100 },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    width: 150,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      enableColumnResizing
      withColumnBorders
      withRowBorders
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { columns } from './columns';
import { data } from './data';

// Double-click on a column resize handle to auto-fit the column width to its content.
function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      enableColumnResizing
      withColumnBorders
      withRowBorders
    />
  );
}
`;

export const autoFitColumns: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
