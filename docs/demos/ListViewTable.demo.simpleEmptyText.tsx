import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <ListViewTable
      columns={[]}
      data={[]}
      rowKey="id"
      withTableBorder
      height={200}
      emptyText="No files found in this directory"
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      withTableBorder
      height={200}
      emptyText="No files found in this directory"
    />
  );
}
`;

export const simpleEmptyText: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
