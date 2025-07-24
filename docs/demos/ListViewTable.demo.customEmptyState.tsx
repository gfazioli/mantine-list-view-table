import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconFileX, IconFolderOpen, IconPlus } from '@tabler/icons-react';
import { Badge, Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size',
    sortable: true,
    textAlign: 'right' as const,
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];

// Custom empty state component with icon and action buttons
const CustomEmptyState = () => (
  <Stack align="center" gap="md">
    <ThemeIcon size={64} variant="light" color="gray">
      <IconFileX size={32} />
    </ThemeIcon>
    <Stack align="center" gap="xs">
      <Text size="lg" fw={500} c="dimmed">
        No files found
      </Text>
      <Text size="sm" c="dimmed" ta="center">
        Your folder is empty. Start by adding some files to see them here.
      </Text>
    </Stack>
    <Group gap="sm">
      <Button leftSection={<IconPlus size={16} />} size="sm">
        Add File
      </Button>
      <Button variant="outline" leftSection={<IconFolderOpen size={16} />} size="sm">
        Browse Files
      </Button>
    </Group>
  </Stack>
);

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      withTableBorder
      height={300}
      emptyText={<CustomEmptyState />}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text, Stack, Button, Group, ThemeIcon } from '@mantine/core';
import { IconFileX, IconPlus, IconFolderOpen } from '@tabler/icons-react';

// Custom empty state component with icon and action buttons
const CustomEmptyState = () => (
  <Stack align="center" gap="md">
    <ThemeIcon size={64} variant="light" color="gray">
      <IconFileX size={32} />
    </ThemeIcon>
    <Stack align="center" gap="xs">
      <Text size="lg" fw={500} c="dimmed">
        No files found
      </Text>
      <Text size="sm" c="dimmed" ta="center">
        Your folder is empty. Start by adding some files to see them here.
      </Text>
    </Stack>
    <Group gap="sm">
      <Button leftSection={<IconPlus size={16} />} size="sm">
        Add File
      </Button>
      <Button variant="outline" leftSection={<IconFolderOpen size={16} />} size="sm">
        Browse Files
      </Button>
    </Group>
  </Stack>
);

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      withTableBorder
      height={300}
      emptyText={<CustomEmptyState />}
    />
  );
}
`;

const dataCode = `
export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size',
    sortable: true,
    textAlign: 'right',
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];
`;

export const customEmptyState: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
