import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { RingProgress, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  // Custom loading component as React element
  const customLoader = (
    <Stack align="center" gap="md">
      <RingProgress size={80} thickness={6} sections={[{ value: 10, color: 'grape' }]} />
      <Text size="sm" c="dimmed">
        Loading files from server...
      </Text>
    </Stack>
  );

  return (
    <ListViewTable
      columns={[]}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingComponent={customLoader}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { RingProgress, Stack, Text } from '@mantine/core';

function Demo() {
  // Custom loading component as React element
  const customLoader = (
    <Stack align="center" gap="md">
      <RingProgress
        size={80}
        thickness={6}
        sections={[{ value: 100, color: 'grape' }]}
      />
      <Text size="sm" c="dimmed">
        Loading files from server...
      </Text>
    </Stack>
  );

  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingComponent={customLoader}
    />
  );
}
`;

export const customLoadingElement: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
