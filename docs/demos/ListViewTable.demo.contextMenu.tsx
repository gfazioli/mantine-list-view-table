import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconCopy, IconDownload, IconTrash } from '@tabler/icons-react';
import { Badge, Menu } from '@mantine/core';
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
      renderContextMenu={({ record }) => (
        <>
          <Menu.Item
            leftSection={<IconCopy size={14} />}
            // eslint-disable-next-line no-alert, prefer-template
            onClick={() => alert('Copy: ' + record.name)}
          >
            Copy
          </Menu.Item>
          <Menu.Item
            leftSection={<IconDownload size={14} />}
            // eslint-disable-next-line no-alert, prefer-template
            onClick={() => alert('Download: ' + record.name)}
          >
            Download
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            // eslint-disable-next-line no-alert, prefer-template
            onClick={() => alert('Delete: ' + record.name)}
          >
            Delete
          </Menu.Item>
        </>
      )}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Menu } from '@mantine/core';
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
        <>
          <Menu.Item
            leftSection={<IconCopy size={14} />}
            // eslint-disable-next-line no-alert, prefer-template
            onClick={() => alert('Copy: ' + record.name)}
          >
            Copy
          </Menu.Item>
          <Menu.Item
            leftSection={<IconDownload size={14} />}
            // eslint-disable-next-line no-alert, prefer-template
            onClick={() => alert('Download: ' + record.name)}
          >
            Download
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            // eslint-disable-next-line no-alert, prefer-template
            onClick={() => alert('Delete: ' + record.name)}
          >
            Delete
          </Menu.Item>
        </>
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
