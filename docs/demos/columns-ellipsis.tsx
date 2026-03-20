import { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columnsEllipsisCode = `import type { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    ellipsis: true,
    noWrap: true,
  },
  {
    key: 'description',
    title: 'Description (ellipsis only)',
    sortable: true,
    ellipsis: true,
    noWrap: false,
  },
  {
    key: 'note',
    title: 'Note (noWrap only)',
    sortable: true,
    ellipsis: false,
    noWrap: true,
  },
];
`;

export const columnsEllipsis: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    ellipsis: true,
    noWrap: true,
  },
  {
    key: 'description',
    title: 'Description (ellipsis only)',
    sortable: true,
    ellipsis: true,
    noWrap: false,
  },
  {
    key: 'note',
    title: 'Note (noWrap only)',
    sortable: true,
    ellipsis: false,
    noWrap: true,
  },
];
