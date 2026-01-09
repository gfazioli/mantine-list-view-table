import { ComponentName, type ComponentNameProps } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';

/**
 * Interactive configurator demo
 *
 * This type of demo allows users to interactively modify component props
 * and see changes in real-time. Ideal for showcasing component flexibility.
 */
function Demo(props: Omit<ComponentNameProps, 'data' | 'columns'>) {
  return (
    <ComponentName
      data={[
        { id: 1, name: 'Item 1', value: 100 },
        { id: 2, name: 'Item 2', value: 200 },
        { id: 3, name: 'Item 3', value: 300 },
      ]}
      columns={[
        { accessor: 'name', title: 'Name' },
        { accessor: 'value', title: 'Value' },
      ]}
      {...props}
    />
  );
}

const code = `
import { ComponentName } from '@your-package/name';

function Demo({{props}}) {
  return (
    <ComponentName
      data={[
        { id: 1, name: 'Item 1', value: 100 },
        { id: 2, name: 'Item 2', value: 200 },
        { id: 3, name: 'Item 3', value: 300 },
      ]}
      columns={[
        { accessor: 'name', title: 'Name' },
        { accessor: 'value', title: 'Value' },
      ]}{{props}}
    />
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  controls: [
    {
      prop: 'withBorder',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withColumnBorders',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
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
  ],
};
