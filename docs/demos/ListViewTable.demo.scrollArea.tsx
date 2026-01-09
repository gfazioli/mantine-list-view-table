import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { ScrollArea } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { columnsFiles, columnsFilesCode } from './columns-files';
import { dataFilesExtendedLong, dataFilesExtendedLongCode } from './data-files-extended';

const data = dataFilesExtendedLong;
const columns = columnsFiles;

function Demo() {
  return (
    <ScrollArea h={250}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        stickyHeader
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </ScrollArea>
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { ScrollArea } from '@mantine/core';
import { data } from './data';
import { columns } from './columns';

function Demo() {
  return (
    <ScrollArea h={250}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        stickyHeader
        onRowClick={(record) => {
          console.log('Clicked:', record.name);
        }}
      />
    </ScrollArea>
  );
}
`;

export const scrollArea: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedLongCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsFilesCode, language: 'tsx' },
  ],
};
