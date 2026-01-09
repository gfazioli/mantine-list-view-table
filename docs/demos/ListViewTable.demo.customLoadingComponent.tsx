import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconRefresh } from '@tabler/icons-react';
import { Button, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

// Custom loading component
const CustomLoadingScreen = ({
  title = 'Loading Files',
  subtitle = 'Please wait while we fetch your data...',
  onRetry,
}: {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
}) => (
  <Stack align="center" gap="lg" p="xl">
    <ThemeIcon size="xl" variant="light" color="blue">
      <IconRefresh size={24} />
    </ThemeIcon>
    <Stack align="center" gap="xs">
      <Title order={4}>{title}</Title>
      <Text size="sm" c="dimmed" ta="center">
        {subtitle}
      </Text>
    </Stack>
    {onRetry && (
      <Button variant="light" size="sm" onClick={onRetry}>
        Retry
      </Button>
    )}
  </Stack>
);

function Demo() {
  return (
    <ListViewTable
      columns={[]}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingComponent={CustomLoadingScreen}
      loadingProps={{
        title: 'Synchronizing Data',
        subtitle: 'This may take a few moments depending on your connection',
        onRetry: () => {
          // eslint-disable-next-line no-console
          console.log('Retry clicked');
        },
      }}
      // Note: When using a component function, it receives loadingProps as props
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconRefresh } from '@tabler/icons-react';
import { Button, Stack, Text, ThemeIcon, Title } from '@mantine/core';

// Custom loading component
const CustomLoadingScreen = ({ 
  title = 'Loading Files', 
  subtitle = 'Please wait while we fetch your data...',
  onRetry 
}: { 
  title?: string; 
  subtitle?: string; 
  onRetry?: () => void;
}) => (
  <Stack align="center" gap="lg" p="xl">
    <ThemeIcon size="xl" variant="light" color="blue">
      <IconRefresh size={24} />
    </ThemeIcon>
    <Stack align="center" gap="xs">
      <Title order={4}>{title}</Title>
      <Text size="sm" c="dimmed" ta="center">
        {subtitle}
      </Text>
    </Stack>
    {onRetry && (
      <Button variant="light" size="sm" onClick={onRetry}>
        Retry
      </Button>
    )}
  </Stack>
);

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingComponent={CustomLoadingScreen}
      loadingProps={{
        title: 'Synchronizing Data',
        subtitle: 'This may take a few moments depending on your connection',
        onRetry: () => console.log('Retry clicked')
      }}
    />
  );
}
`;

export const customLoadingComponent: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
