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
      enableColumnReordering
      withColumnBorders
      withRowBorders
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { columns } from './columns';
import { data } from './data';

// Drag the grip handle on any column header to rearrange columns.
// Works on mouse, touch, and pen — press Escape during a drag to cancel.
function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      enableColumnReordering
      withColumnBorders
      withRowBorders
    />
  );
}
`;

export const reordering: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
