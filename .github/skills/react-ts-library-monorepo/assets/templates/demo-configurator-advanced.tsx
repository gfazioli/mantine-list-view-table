import { ComponentName, type ComponentNameProps } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';

/**
 * Advanced configurator demo
 *
 * A more comprehensive configurator showing various types of controls
 * and how to map them to component props.
 */
function Demo(props: Omit<ComponentNameProps, 'data' | 'columns'>) {
  return (
    <ComponentName
      data={[
        { id: 1, name: 'Item 1', value: 100, status: 'active' },
        { id: 2, name: 'Item 2', value: 200, status: 'inactive' },
        { id: 3, name: 'Item 3', value: 300, status: 'pending' },
        { id: 4, name: 'Item 4', value: 400, status: 'active' },
      ]}
      columns={[
        { accessor: 'name', title: 'Name' },
        { accessor: 'value', title: 'Value' },
        { accessor: 'status', title: 'Status' },
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
        { id: 1, name: 'Item 1', value: 100, status: 'active' },
        { id: 2, name: 'Item 2', value: 200, status: 'inactive' },
        { id: 3, name: 'Item 3', value: 300, status: 'pending' },
        { id: 4, name: 'Item 4', value: 400, status: 'active' },
      ]}
      columns={[
        { accessor: 'name', title: 'Name' },
        { accessor: 'value', title: 'Value' },
        { accessor: 'status', title: 'Status' },
      ]}{{props}}
    />
  );
}
`;

export const configuratorAdvanced: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  controls: [
    // Boolean controls
    {
      prop: 'withBorder',
      type: 'boolean',
      initialValue: true,
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
      initialValue: true,
      libraryValue: false,
    },
    // Select controls
    {
      prop: 'variant',
      type: 'select',
      data: [
        { value: 'default', label: 'Default' },
        { value: 'filled', label: 'Filled' },
        { value: 'outline', label: 'Outline' },
      ],
      initialValue: 'default',
      libraryValue: 'default',
    },
    // Segmented controls
    {
      prop: 'size',
      type: 'segmented',
      data: [
        { value: 'xs', label: 'XS' },
        { value: 'sm', label: 'SM' },
        { value: 'md', label: 'MD' },
        { value: 'lg', label: 'LG' },
        { value: 'xl', label: 'XL' },
      ],
      initialValue: 'md',
      libraryValue: 'md',
    },
    // Color control
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    // Number control
    {
      prop: 'spacing',
      type: 'number',
      initialValue: 8,
      libraryValue: 8,
      min: 0,
      max: 32,
      step: 4,
    },
    // String control
    {
      prop: 'emptyState',
      type: 'string',
      initialValue: 'No data available',
      libraryValue: 'No records found',
    },
  ],
};
