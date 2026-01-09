import { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columnsEllipsisCode = `import type { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    width: 180,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: true, // Prevent text wrapping
  },
  {
    key: 'description',
    title: 'Description (ellipsis only)',
    sortable: true,
    width: 200,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: false,
  },
  {
    key: 'note',
    title: 'Note (noWrap only)',
    sortable: true,
    width: 120,
    ellipsis: false, // Disable ellipsis
    noWrap: true, // Prevent text wrapping but allow cut-off
  },
  {
    key: 'address',
    title: 'Address (default)',
    sortable: true,
    width: 80,
    // Default behavior: no ellipsis, wrapping allowed
  },
];
`;

export const columnsEllipsis: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    width: 180,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: true, // Prevent text wrapping
  },
  {
    key: 'description',
    title: 'Description (ellipsis only)',
    sortable: true,
    width: 200,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: false,
  },
  {
    key: 'note',
    title: 'Note (noWrap only)',
    sortable: true,
    width: 120,
    ellipsis: false, // Disable ellipsis
    noWrap: true, // Prevent text wrapping but allow cut-off
  },
  {
    key: 'address',
    title: 'Address (default)',
    sortable: true,
    width: 80,
    // Default behavior: no ellipsis, wrapping allowed
  },
];
