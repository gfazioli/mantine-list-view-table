import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconFileX, IconFolderOpen, IconPlus } from '@tabler/icons-react';
import { Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

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
      columns={[]}
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
import { IconFileX, IconFolderOpen, IconPlus } from '@tabler/icons-react';
import { Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';

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

export const customEmptyState: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
