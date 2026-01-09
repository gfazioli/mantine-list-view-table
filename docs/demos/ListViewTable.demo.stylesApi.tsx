import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { ListViewTableStylesApi } from '../styles-api/ListViewTable.styles-api';
import { columns } from './columns-three';
import { data } from './data-files';

const code = `
import { Compare } from "@gfazioli/mantine-compare";
import { data } from './data';

function Demo() {
  return (
      <ListViewTable{{props}}
        columns={columns}
        data={data}
        rowKey="id"
      />
  );
}
`;

function Demo(props: any) {
  return <ListViewTable columns={columns} data={data} rowKey="id" {...props} />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: ListViewTableStylesApi,
  component: Demo,
  code,
};
