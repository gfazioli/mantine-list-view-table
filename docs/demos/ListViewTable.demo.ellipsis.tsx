import { ListViewTable, type ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';

const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width',
    description:
      'This is a very long description that demonstrates how text can be truncated with ellipsis when the column is too narrow to fit all the content.',
    note: 'Additional note for document 1',
    address: '1234 Long Address Street, Some City, Some Country',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated.md',
    description:
      'A comprehensive guide explaining all the features and functionality of this component library with detailed examples and use cases.',
    note: 'Additional note for README',
    address: '5678 Another Long Address Avenue, Another City, Another Country',
  },
  {
    id: 3,
    name: 'package.json',
    description: 'Configuration file',
    note: 'Additional note for package.json',
    address: '91011 Short St, City, Country',
  },
];

const columns: ListViewTableColumn[] = [
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
      onColumnResize={(columnKey, width) => {
        // eslint-disable-next-line no-console
        console.log(`Column '${columnKey}' resized to: ${width}px`);
      }}
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
      onColumnResize={(columnKey, width) => {
        console.log(\`Column '\${columnKey}' resized to: \${width}px\`);
      }}
    />
  );
}
`;

const dataCode = `export const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width',
    description:
      'This is a very long description that demonstrates how text can be truncated with ellipsis when the column is too narrow to fit all the content.',
    note: 'Additional note for document 1',
    address: '1234 Long Address Street, Some City, Some Country',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated.md',
    description:
      'A comprehensive guide explaining all the features and functionality of this component library with detailed examples and use cases.',
    note: 'Additional note for README',
    address: '5678 Another Long Address Avenue, Another City, Another Country',
  },
  {
    id: 3,
    name: 'package.json',
    description: 'Configuration file',
    note: 'Additional note for package.json',
    address: '91011 Short St, City, Country',
  },
];
`;

const columnsCode = `import type { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

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

export const ellipsis: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.ts', code: columnsCode, language: 'tsx' },
  ],
};
