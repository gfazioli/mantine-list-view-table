import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconFolderOpen } from '@tabler/icons-react';
import { Group, Text, ThemeIcon } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <ListViewTable
      columns={[]}
      data={[]}
      rowKey="id"
      withTableBorder
      height={200}
      emptyText={
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconFolderOpen size={14} />
          </ThemeIcon>
          <Text c="dimmed">No documents available</Text>
        </Group>
      }
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Group, Text, ThemeIcon } from '@mantine/core';
import { IconFolderOpen } from '@tabler/icons-react';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      withTableBorder
      height={200}
      emptyText={
        <Group gap="sm">
          <ThemeIcon size="sm" variant="light" color="blue">
            <IconFolderOpen size={14} />
          </ThemeIcon>
          <Text c="dimmed">No documents available</Text>
        </Group>
      }
    />
  );
}
`;

export const inlineJsxEmptyState: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
