import { ListViewTable, ListViewTableProps } from '@gfazioli/mantine-list-view-table';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { columns, columnsCode } from './columns-three';
import { data, dataCode } from './data-files';

function Demo(props: Omit<ListViewTableProps, 'columns' | 'data'>) {
  return (
    <Center w={520}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        onRowClick={(row) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', row.name);
        }}
        {...props}
      />
    </Center>
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data } from './data';
import { columns } from './columns';


function Demo() {
  return (
    <ListViewTable{{props}}
      columns={columns}
      data={data}
      rowKey="id"
      onRowClick={(row) => console.log('Clicked:', row.name)}
    />
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
  controls: [
    {
      prop: 'withTableBorder',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withColumnBorders',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withRowBorders',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'striped',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'highlightOnHover',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'enableColumnReordering',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'enableColumnResizing',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'horizontalSpacing',
      type: 'select',
      data: [
        { value: 'xs', label: 'xs' },
        { value: 'sm', label: 'sm' },
        { value: 'md', label: 'md' },
        { value: 'lg', label: 'lg' },
        { value: 'xl', label: 'xl' },
      ],
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'verticalSpacing',
      type: 'select',
      data: [
        { value: 'xs', label: 'xs' },
        { value: 'sm', label: 'sm' },
        { value: 'md', label: 'md' },
        { value: 'lg', label: 'lg' },
        { value: 'xl', label: 'xl' },
      ],
      initialValue: 'xs',
      libraryValue: 'xs',
    },
    {
      prop: 'verticalAlign',
      type: 'select',
      data: [
        { value: 'top', label: 'top' },
        { value: 'middle', label: 'middle' },
        { value: 'bottom', label: 'bottom' },
      ],
      initialValue: 'middle',
      libraryValue: 'middle',
    },
    {
      prop: 'stripedColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
  ],
};
