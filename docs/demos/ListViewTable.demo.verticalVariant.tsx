import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { columnsVertical, columnsVerticalCode } from './columns-vertical';
import { dataVertical, dataVerticalCode } from './data-vertical';

const data = dataVertical;
const columns = columnsVertical;

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
import { data } from './data';
import { columns } from './columns';

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

export const verticalVariant: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataVerticalCode, language: 'tsx' },
    { fileName: 'columns.ts', code: columnsVerticalCode, language: 'tsx' },
  ],
};
