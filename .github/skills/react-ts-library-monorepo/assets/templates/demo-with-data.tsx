import { ComponentName } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';
import { columns, columnsCode } from './demo-columns';
import { data, dataCode } from './demo-data';

/**
 * Demo with external data
 *
 * This example shows how to use data imported from external files.
 * This pattern keeps demos clean and data reusable across multiple examples.
 */
function Demo() {
  return <ComponentName data={data} columns={columns} variant="default" withBorder />;
}

const demoCode = `
import { ComponentName } from '@your-package/name';
import { data } from './data';
import { columns } from './columns';

function Demo() {
  return (
    <ComponentName
      data={data}
      columns={columns}
      variant="default"
      withBorder
    />
  );
}
`;

export const withData: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code: demoCode, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
