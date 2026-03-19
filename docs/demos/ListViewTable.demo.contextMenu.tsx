import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconCopy, IconDownload, IconTrash } from '@tabler/icons-react';
import { Badge, Stack, Text, UnstyledButton } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { data } from './data-files';

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      selectionMode="single"
      withColumnBorders
      withRowBorders
      renderContextMenu={() => (
        <Stack gap={0}>
          {[
            { icon: <IconCopy size={14} />, label: 'Copy', action: () => {} },
            { icon: <IconDownload size={14} />, label: 'Download', action: () => {} },
            { icon: <IconTrash size={14} />, label: 'Delete', action: () => {} },
          ].map((item) => (
            <UnstyledButton
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                width: '100%',
              }}
              onClick={item.action}
            >
              {item.icon}
              <Text size="sm">{item.label}</Text>
            </UnstyledButton>
          ))}
        </Stack>
      )}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Stack, Text, UnstyledButton } from '@mantine/core';
import { IconCopy, IconDownload, IconTrash } from '@tabler/icons-react';
import { columns } from './columns';
import { data } from './data';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      selectionMode="single"
      withColumnBorders
      withRowBorders
      renderContextMenu={({ record }) => (
        <Stack gap={0}>
          {[
            { icon: <IconCopy size={14} />, label: 'Copy' },
            { icon: <IconDownload size={14} />, label: 'Download' },
            { icon: <IconTrash size={14} />, label: 'Delete' },
          ].map((item) => (
            <UnstyledButton
              key={item.label}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', width: '100%' }}
              onClick={() => console.log(item.label, record.name)}
            >
              {item.icon}
              <Text size="sm">{item.label}</Text>
            </UnstyledButton>
          ))}
        </Stack>
      )}
    />
  );
}
`;

export const contextMenu: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
