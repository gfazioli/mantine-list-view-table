import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return <ListViewTable columns={[]} data={[]} rowKey="id" height={400} withTableBorder loading />;
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
    />
  );
}
`;

export const loadingState: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
