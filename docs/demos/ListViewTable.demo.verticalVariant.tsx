import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';

const data = [
  { label: 'Epic name', value: '7.x migration' },
  { label: 'Status', value: 'Open' },
  { label: 'Total issues', value: 135 },
  { label: 'Total story points', value: 874 },
  { label: 'Last updated at', value: 'September 26, 2024 17:41:26' },
];

const columns = [
  { key: 'label', title: '' },
  { key: 'value', title: '' },
];

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey={(row, i) => row.label + i}
      withTableBorder
      variant="vertical"
      layout="fixed"
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data, columns } from './data';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey={(row, i) => row.label + i}
      withTableBorder
      variant="vertical"
      layout="fixed"
    />
  );
}
`;

const dataCode = `
export const data = [
  { label: 'Epic name', value: '7.x migration' },
  { label: 'Status', value: 'Open' },
  { label: 'Total issues', value: 135 },
  { label: 'Total story points', value: 874 },
  { label: 'Last updated at', value: 'September 26, 2024 17:41:26' },
];

export const columns = [
  { key: 'label', title: '' },
  { key: 'value', title: '' },
];
`;

export const verticalVariant: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
