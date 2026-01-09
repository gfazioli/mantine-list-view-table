import { ListViewTable, type ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { columnsEllipsis, columnsEllipsisCode } from './columns-ellipsis';
import { dataEllipsis, dataEllipsisCode } from './data-ellipsis';

const data = dataEllipsis;
const columns: ListViewTableColumn[] = columnsEllipsis;

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

export const ellipsis: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataEllipsisCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsEllipsisCode, language: 'tsx' },
  ],
};
