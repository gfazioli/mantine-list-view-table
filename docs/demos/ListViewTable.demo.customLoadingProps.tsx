import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <ListViewTable
      columns={[]}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingProps={{ size: 'xs', color: 'green', type: 'bars' }}
      // Note: loadingProps customizes the default Mantine Loader component
      // Available props: size, color, type, etc.
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
      height={400}
      withTableBorder
      loading
      loadingProps={{ size: 'xs', color: 'green', type: 'bars' }}
      // Note: loadingProps customizes the default Mantine Loader component
      // Available props: size, color, type, etc.
    />
  );
}
`;

export const customLoadingProps: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
