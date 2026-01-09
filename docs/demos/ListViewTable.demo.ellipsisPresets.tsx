import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { IconFile, IconFolder } from '@tabler/icons-react';
import { Badge, Group, Text, ThemeIcon } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { dataProjects, dataProjectsCode } from './data-projects';

// Import our text truncation utilities
const TEXT_TRUNCATION_PRESETS = {
  SINGLE_LINE_ELLIPSIS: { ellipsis: true, noWrap: true },
  MULTI_LINE_ELLIPSIS: { ellipsis: true, noWrap: false },
  SINGLE_LINE_CUTOFF: { ellipsis: false, noWrap: true },
  NO_TRUNCATION: {},
};

const data = dataProjects;

const columnsCode = `import { Badge, Text, Group, ThemeIcon } from '@mantine/core';
import { IconFile, IconFolder } from '@tabler/icons-react';

// Text truncation presets for consistent behavior
const TEXT_TRUNCATION_PRESETS = {
  SINGLE_LINE_ELLIPSIS: { ellipsis: true, noWrap: true },
  MULTI_LINE_ELLIPSIS: { ellipsis: true, noWrap: false },
  SINGLE_LINE_CUTOFF: { ellipsis: false, noWrap: true },
  NO_TRUNCATION: {},
};

export const columns = [
  {
    key: 'name',
    title: 'Project Name',
    sortable: true,
    width: 180,
    ...TEXT_TRUNCATION_PRESETS.SINGLE_LINE_ELLIPSIS, // Single line with ellipsis
    renderCell: (record: any) => (
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon
          size="sm"
          variant="light"
          color={record.type === 'project' ? 'blue' : record.type === 'design' ? 'pink' : 'green'}
        >
          {record.type === 'documentation' ? <IconFile size={12} /> : <IconFolder size={12} />}
        </ThemeIcon>
        <Text fw={500} fz="inherit" title={record.name}>
          {record.name}
        </Text>
      </Group>
    ),
  },
  {
    key: 'description',
    title: 'Description',
    sortable: true,
    width: 250,
    ...TEXT_TRUNCATION_PRESETS.MULTI_LINE_ELLIPSIS, // Multi-line with ellipsis
    renderCell: (record: any) => (
      <Text size="sm" fz="inherit" c="dimmed" title={record.description}>
        {record.description}
      </Text>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    width: 120,
    ...TEXT_TRUNCATION_PRESETS.SINGLE_LINE_CUTOFF, // Cut off without ellipsis
    renderCell: (record: any) => (
      <Badge
        variant="light"
        color={
          record.status === 'Completed' ? 'green' : record.status === 'Review' ? 'yellow' : 'blue'
        }
        size="sm"
        title={record.status}
      >
        {record.status}
      </Badge>
    ),
  },
  {
    key: 'priority',
    title: 'Priority',
    sortable: true,
    width: 100,
    ...TEXT_TRUNCATION_PRESETS.SINGLE_LINE_CUTOFF, // Cut off without ellipsis
    renderCell: (record: any) => (
      <Text
        fz="inherit"
        fw={500}
        c={
          record.priority === 'High Priority Item'
            ? 'red'
            : record.priority === 'Medium'
              ? 'orange'
              : 'gray'
        }
        title={record.priority}
      >
        {record.priority}
      </Text>
    ),
  },
  {
    key: 'created',
    title: 'Created',
    sortable: true,
    width: 100,
    ...TEXT_TRUNCATION_PRESETS.NO_TRUNCATION, // No special truncation
    textAlign: 'center' as const,
  },
];
`;

const columns = [
  {
    key: 'name',
    title: 'Project Name',
    sortable: true,
    width: 180,
    ...TEXT_TRUNCATION_PRESETS.SINGLE_LINE_ELLIPSIS, // Single line with ellipsis
    renderCell: (record: any) => (
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon
          size="sm"
          variant="light"
          color={record.type === 'project' ? 'blue' : record.type === 'design' ? 'pink' : 'green'}
        >
          {record.type === 'documentation' ? <IconFile size={12} /> : <IconFolder size={12} />}
        </ThemeIcon>
        <Text fw={500} fz="inherit" title={record.name}>
          {record.name}
        </Text>
      </Group>
    ),
  },
  {
    key: 'description',
    title: 'Description',
    sortable: true,
    width: 250,
    ...TEXT_TRUNCATION_PRESETS.MULTI_LINE_ELLIPSIS, // Multi-line with ellipsis
    renderCell: (record: any) => (
      <Text size="sm" fz="inherit" c="dimmed" title={record.description}>
        {record.description}
      </Text>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    width: 120,
    ...TEXT_TRUNCATION_PRESETS.SINGLE_LINE_CUTOFF, // Cut off without ellipsis
    renderCell: (record: any) => (
      <Badge
        variant="light"
        color={
          record.status === 'Completed' ? 'green' : record.status === 'Review' ? 'yellow' : 'blue'
        }
        size="sm"
        title={record.status}
      >
        {record.status}
      </Badge>
    ),
  },
  {
    key: 'priority',
    title: 'Priority',
    sortable: true,
    width: 100,
    ...TEXT_TRUNCATION_PRESETS.SINGLE_LINE_CUTOFF, // Cut off without ellipsis
    renderCell: (record: any) => (
      <Text
        fz="inherit"
        fw={500}
        c={
          record.priority === 'High Priority Item'
            ? 'red'
            : record.priority === 'Medium'
              ? 'orange'
              : 'gray'
        }
        title={record.priority}
      >
        {record.priority}
      </Text>
    ),
  },
  {
    key: 'created',
    title: 'Created',
    sortable: true,
    width: 100,
    ...TEXT_TRUNCATION_PRESETS.NO_TRUNCATION, // No special truncation
    textAlign: 'center' as const,
  },
];

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      enableColumnResizing
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data } from './data';
import { columns } from './columns';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      enableColumnResizing
    />
  );
}
`;

export const ellipsisPresets: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataProjectsCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
