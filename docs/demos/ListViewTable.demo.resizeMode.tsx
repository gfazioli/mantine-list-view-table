import { useState } from 'react';
import { ListViewTable, ListViewTableResizeMode } from '@gfazioli/mantine-list-view-table';
import { Badge, SegmentedControl, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { data } from './data-files';

const columns = [
  { key: 'name', title: 'Name', sortable: true, width: 200 },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const, width: 120 },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    width: 150,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo() {
  const [mode, setMode] = useState<ListViewTableResizeMode>('standard');

  return (
    <Stack>
      <SegmentedControl
        value={mode}
        onChange={(val) => setMode(val as ListViewTableResizeMode)}
        data={[
          { label: 'Standard', value: 'standard' },
          { label: 'Finder', value: 'finder' },
        ]}
      />
      <Text size="xs" c="dimmed">
        {mode === 'standard'
          ? 'Drag trades width between adjacent columns — total table width stays fixed.'
          : 'Drag only changes the left column — the table grows freely.'}
      </Text>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        enableColumnResizing
        resizeMode={mode}
        withColumnBorders
        withRowBorders
      />
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { ListViewTable, ListViewTableResizeMode } from '@gfazioli/mantine-list-view-table';
import { SegmentedControl, Stack, Text } from '@mantine/core';
import { columns } from './columns';
import { data } from './data';

function Demo() {
  const [mode, setMode] = useState<ListViewTableResizeMode>('standard');

  return (
    <Stack>
      <SegmentedControl
        value={mode}
        onChange={(val) => setMode(val as ListViewTableResizeMode)}
        data={[
          { label: 'Standard', value: 'standard' },
          { label: 'Finder', value: 'finder' },
        ]}
      />
      <Text size="xs" c="dimmed">
        {mode === 'standard'
          ? 'Drag trades width between adjacent columns — total table width stays fixed.'
          : 'Drag only changes the left column — the table grows freely.'}
      </Text>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        enableColumnResizing
        resizeMode={mode}
        withColumnBorders
        withRowBorders
      />
    </Stack>
  );
}
`;

export const resizeMode: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
