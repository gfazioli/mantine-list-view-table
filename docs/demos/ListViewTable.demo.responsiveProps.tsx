import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = [
  { id: 1, name: 'File.txt', size: '12 KB', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', size: '2 MB', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', size: '125 MB', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', size: '500 KB', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', size: '1.5 GB', modified: '2024-06-05' },
];

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
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
      horizontalSpacing={{ base: 'xs', md: 'sm', lg: 'md' }}
      verticalSpacing={{ base: 'xs', md: 'sm' }}
      headerTitleFontSize={{ base: 'xs', md: 'sm' }}
      headerTitleFontWeight={{ base: 500, lg: 600 }}
      cellFontSize={{ base: 'xs', md: 'sm' }}
      onRowClick={(record) => {
        // eslint-disable-next-line no-alert
        alert(`Clicked: ${record.name}`);
      }}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';

const data = [
  { id: 1, name: 'File.txt', size: '12 KB', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', size: '2 MB', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', size: '125 MB', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', size: '500 KB', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', size: '1.5 GB', modified: '2024-06-05' },
];

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row) => <Badge variant="light">{row.modified}</Badge>,
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
      horizontalSpacing={{ base: 'xs', md: 'sm', lg: 'md' }}
      verticalSpacing={{ base: 'xs', md: 'sm' }}
      headerTitleFontSize={{ base: 'xs', md: 'sm' }}
      headerTitleFontWeight={{ base: 500, lg: 600 }}
      cellFontSize={{ base: 'xs', md: 'sm' }}
      onRowClick={(record) => {
        alert(\`Clicked: \${record.name}\`);
      }}
    />
  );
}
`;

export const responsiveProps: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
