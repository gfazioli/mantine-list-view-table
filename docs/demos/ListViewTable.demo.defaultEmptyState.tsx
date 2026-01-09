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
      // emptyText prop is not specified, so it will use the default: "No data available"
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
      // emptyText prop is not specified, so it will use the default: "No data available"
    />
  );
}
`;

export const defaultEmptyState: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
