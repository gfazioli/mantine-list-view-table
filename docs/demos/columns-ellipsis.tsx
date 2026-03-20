import { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columnsEllipsisCode = `import type { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    width: 200,
    ellipsis: true,
    noWrap: true,
  },
  {
    key: 'description',
    title: 'Description (ellipsis)',
    sortable: true,
    width: 180,
    ellipsis: true,
    noWrap: false,
  },
  {
    key: 'note',
    title: 'Note (noWrap)',
    sortable: true,
    width: 150,
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
    width: 200,
    ellipsis: true,
    noWrap: true,
  },
  {
    key: 'description',
    title: 'Description (ellipsis)',
    sortable: true,
    width: 180,
    ellipsis: true,
    noWrap: false,
  },
  {
    key: 'note',
    title: 'Note (noWrap)',
    sortable: true,
    width: 150,
    ellipsis: false,
    noWrap: true,
  },
];
