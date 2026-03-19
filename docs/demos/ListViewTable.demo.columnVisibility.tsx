import { useState } from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Button, Code, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { data } from './data-files';

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo() {
  const [hidden, setHidden] = useState<string[]>([]);

  return (
    <Stack>
      <Group>
        <Button
          size="xs"
          variant="light"
          onClick={() =>
            setHidden((prev) =>
              prev.includes('size') ? prev.filter((k) => k !== 'size') : [...prev, 'size']
            )
          }
        >
          Toggle Size Column
        </Button>
        <Button
          size="xs"
          variant="light"
          onClick={() =>
            setHidden((prev) =>
              prev.includes('modified')
                ? prev.filter((k) => k !== 'modified')
                : [...prev, 'modified']
            )
          }
        >
          Toggle Modified Column
        </Button>
        <Text size="sm">
          Hidden: <Code>{JSON.stringify(hidden)}</Code>
        </Text>
      </Group>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        hiddenColumns={hidden}
        onHiddenColumnsChange={setHidden}
        withColumnBorders
        withRowBorders
      />
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Button, Code, Group, Stack, Text } from '@mantine/core';
import { columns } from './columns';
import { data } from './data';

function Demo() {
  const [hidden, setHidden] = useState<string[]>([]);

  return (
    <Stack>
      <Group>
        <Button size="xs" variant="light"
          onClick={() => setHidden(prev =>
            prev.includes('size') ? prev.filter(k => k !== 'size') : [...prev, 'size']
          )}
        >
          Toggle Size Column
        </Button>
        <Button size="xs" variant="light"
          onClick={() => setHidden(prev =>
            prev.includes('modified') ? prev.filter(k => k !== 'modified') : [...prev, 'modified']
          )}
        >
          Toggle Modified Column
        </Button>
        <Text size="sm">Hidden: <Code>{JSON.stringify(hidden)}</Code></Text>
      </Group>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        hiddenColumns={hidden}
        onHiddenColumnsChange={setHidden}
        withColumnBorders
        withRowBorders
      />
    </Stack>
  );
}
`;

export const columnVisibility: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
