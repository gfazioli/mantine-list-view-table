import { Badge } from '@mantine/core';

export const columnsCode = `import { Badge } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right'},
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];`;

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];
