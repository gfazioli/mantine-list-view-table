import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { columnsFiles, columnsFilesCode } from './columns-files';
import { dataFilesExtendedLong, dataFilesExtendedLongCode } from './data-files-extended';

const data = dataFilesExtendedLong;
const columns = columnsFiles;

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      stickyHeader
      stickyHeaderOffset={60}
      onRowClick={(record) => {
        // eslint-disable-next-line no-console
        console.log('Clicked:', record.name);
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
      stickyHeader
      stickyHeaderOffset={60}
      onRowClick={(record) => {
        console.log('Clicked:', record.name);
      }}
    />
  );
}
`;

export const stickyHeader: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedLongCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsFilesCode, language: 'tsx' },
  ],
};
