import React from 'react';
import { Badge, Box, ScrollArea, Stack, Switch, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ListViewTable, ListViewTableColumn, ListViewTableSortStatus } from './ListViewTable';

export default {
  title: 'Components/ListViewTable',
  component: ListViewTable,
};

// Sample data that mimics a file explorer
const sampleData = [
  { id: 1, name: 'Documents', type: 'folder', size: '--', modified: '2024-06-01', kind: 'Folder' },
  {
    id: 2,
    name: 'README.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
  },
  { id: 4, name: 'src', type: 'folder', size: '--', modified: '2024-06-04', kind: 'Folder' },
  {
    id: 5,
    name: 'image.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image',
  },
  {
    id: 6,
    name: 'video.mp4',
    type: 'file',
    size: '12.5 MB',
    modified: '2024-06-06',
    kind: 'Video',
  },
  {
    id: 7,
    name: 'archive.zip',
    type: 'file',
    size: '3.4 MB',
    modified: '2024-06-07',
    kind: 'ZIP Archive',
  },
  { id: 8, name: 'Downloads', type: 'folder', size: '--', modified: '2024-06-08', kind: 'Folder' },
  {
    id: 9,
    name: 'notes.txt',
    type: 'file',
    size: '1.2 KB',
    modified: '2024-06-09',
    kind: 'Text File',
  },
];

const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    sticky: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size',
    sortable: true,
    textAlign: 'right',
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];

export function DefaultBehavior() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the default ListViewTable behavior with internal sorting. Click on
        any sortable column header to sort the data automatically.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </div>
  );
}

export function WithoutRowsBorder() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the default ListViewTable behavior with internal sorting. Click on
        any sortable column header to sort the data automatically.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withRowBorders={false}
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </div>
  );
}

export function WithScrollArea() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the default ListViewTable behavior with internal sorting. Click on
        any sortable column header to sort the data automatically.
      </Text>
      <ScrollArea h={250}>
        <ListViewTable
          columns={columns}
          data={sampleData}
          rowKey="id"
          stickyHeader
          onRowClick={(record) => {
            // eslint-disable-next-line no-console
            console.log('Clicked:', record.name);
          }}
        />
      </ScrollArea>
    </div>
  );
}

export function WithTabularNums() {
  const [opened, handlers] = useDisclosure(false);

  return (
    <Stack>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        tabularNums={opened}
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
      <Switch checked={opened} onChange={() => handlers.toggle()} />
    </Stack>
  );
}

export function WithExternalSorting() {
  const [sortStatus, setSortStatus] = React.useState<ListViewTableSortStatus>({
    columnKey: 'name',
    direction: 'asc',
  });

  const sortedData = React.useMemo(() => {
    const sorted = [...sampleData].sort((a, b) => {
      const aValue = a[sortStatus.columnKey as keyof typeof a];
      const bValue = b[sortStatus.columnKey as keyof typeof b];

      if (sortStatus.direction === 'desc') {
        return String(bValue).localeCompare(String(aValue));
      }
      return String(aValue).localeCompare(String(bValue));
    });
    return sorted;
  }, [sortStatus]);

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates external sorting control. The parent component manages the sort
        state and data sorting logic.
      </Text>
      <ListViewTable
        columns={columns}
        data={sortedData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        sortStatus={sortStatus}
        onSort={setSortStatus}
      />
    </div>
  );
}

export function LoadingState() {
  return (
    <ListViewTable columns={columns} data={[]} rowKey="id" height={400} withTableBorder loading />
  );
}

export function EmptyState() {
  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      withTableBorder
      emptyText="No files found"
    />
  );
}

export function WithExternalReorderingAndResizing() {
  const [currentColumns, setCurrentColumns] = React.useState(columns);

  const handleColumnReorder = (fromIndex: number, toIndex: number) => {
    const newColumns = [...currentColumns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setCurrentColumns(newColumns);
    // eslint-disable-next-line no-console
    console.log('Column reordered from', fromIndex, 'to', toIndex);
  };

  const handleColumnResize = (columnKey: string, width: number) => {
    // eslint-disable-next-line no-console
    console.log('Column resized:', columnKey, 'to width:', width);
  };

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates external control of column reordering and resizing. Try dragging
        column headers to reorder them, or drag the right edge of headers to resize columns.
      </Text>
      <ListViewTable
        columns={currentColumns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        enableColumnReordering
        enableColumnResizing
        onColumnReorder={handleColumnReorder}
        onColumnResize={handleColumnResize}
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </div>
  );
}

export function WithInternalReordering() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates internal column reordering. The ListViewTable manages the column
        order state internally. Try dragging column headers to reorder them.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        enableColumnReordering
        enableColumnResizing={false}
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </div>
  );
}

export function NoReorderNoResize() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the ListViewTable with column reordering and resizing disabled. Only
        internal sorting is available.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        enableColumnReordering={false}
        enableColumnResizing={false}
      />
    </div>
  );
}

export function NoSorted() {
  // Create columns with sorting disabled
  const columnsNoSort: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: false,
      sticky: true,
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: false,
      width: 120,
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size',
      sortable: false,
      textAlign: 'right',
      width: 80,
    },
    {
      key: 'modified',
      title: 'Date Modified',
      sortable: false,
      width: 120,
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the ListViewTable with sorting disabled on all columns. Column
        headers are not clickable for sorting.
      </Text>
      <ListViewTable
        columns={columnsNoSort}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
      />
    </div>
  );
}

export function WithColumnBorders() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates <b>withColumnBorders</b> prop from Mantine Table.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
      />
    </div>
  );
}

export function WithStripedRows() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates <b>striped</b> prop from Mantine Table.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        striped
        highlightOnHover
      />
    </div>
  );
}

export function WithCustomStripedColor() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates <b>striped</b> and <b>stripedColor</b> props from Mantine Table.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        striped
        stripedColor="blue.0"
        highlightOnHover
      />
    </div>
  );
}

export function WithHorizontalSpacing() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>horizontalSpacing</b> prop. The table uses <b>xl</b> spacing
        between columns, making them more spaced out.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        horizontalSpacing="xl"
      />
    </div>
  );
}

export function WithVerticalSpacing() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>verticalSpacing</b> prop. The table uses <b>lg</b> spacing
        between rows, making them taller.
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        highlightOnHover
        verticalSpacing="lg"
      />
    </div>
  );
}

export function VerticalVariant() {
  const verticalData = [
    { label: 'Epic name', value: '7.x migration' },
    { label: 'Status', value: 'Open' },
    { label: 'Total issues', value: 135 },
    { label: 'Total story points', value: 874 },
    { label: 'Last updated at', value: 'September 26, 2024 17:41:26' },
  ];
  const verticalColumns = [
    { key: 'label', title: '' },
    { key: 'value', title: '' },
  ];
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>variant="vertical"</b> prop from Mantine Table, rendered with
        ListViewTable.
      </Text>
      <ListViewTable
        columns={verticalColumns}
        data={verticalData}
        rowKey={(row, i) => row.label + i}
        withTableBorder
        variant="vertical"
        layout="fixed"
      />
    </div>
  );
}

export function WithMinWidth() {
  // Create columns with minWidth and maxWidth constraints
  const columnsWithMinWidth: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      minWidth: 200, // Minimum width of 200px
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: true,
      width: 80, // Small initial width, but will be adjusted to minWidth
      minWidth: 150, // But minimum width of 150px (will override width)
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      textAlign: 'right',
      width: 60, // Very small initial width, but will be adjusted to minWidth
      minWidth: 150, // But minimum width of 100px (will override width)
    },
    {
      key: 'modified',
      title: 'Date Modified',
      sortable: true,
      width: 300, // Large initial width, but will be adjusted to maxWidth
      maxWidth: 220, // Maximum width of 220px (will override width)
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>minWidth</b> and <b>maxWidth</b> properties on columns. The
        component automatically adjusts initial widths to respect these constraints:
      </Text>
      <ul style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)', marginBottom: '16px' }}>
        <li>
          <b>Name:</b> minWidth: 200px (auto width)
        </li>
        <li>
          <b>Kind:</b> width: 80px → <b>adjusted to 150px</b> (minWidth: 150px)
        </li>
        <li>
          <b>Size:</b> width: 60px → <b>adjusted to 150px</b> (minWidth: 150px)
        </li>
        <li>
          <b>Date Modified:</b> width: 300px → <b>adjusted to 220px</b> (maxWidth: 220px)
        </li>
      </ul>
      <Text size="sm" c="dimmed" mb="md">
        Try resizing the columns by dragging their edges - they won't go below their minimum width
        or above their maximum width.
      </Text>
      <ListViewTable
        columns={columnsWithMinWidth}
        data={sampleData}
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
    </div>
  );
}

export function WithMaxWidth() {
  // Create columns with maxWidth constraints
  const columnsWithMaxWidth: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      width: 400, // Large initial width
      maxWidth: 250, // But maximum width of 250px (will override width)
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: true,
      width: 200, // Large initial width
      maxWidth: 120, // But maximum width of 120px (will override width)
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      textAlign: 'right',
      maxWidth: 180, // Maximum width of 180px (auto width)
    },
    {
      key: 'modified',
      title: 'Date Modified',
      sortable: true,
      width: 100, // This is within maxWidth, so will be kept
      maxWidth: 200, // Maximum width of 200px
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>maxWidth</b> property on columns. The component automatically
        adjusts initial widths to respect maximum width constraints:
      </Text>
      <ul style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)', marginBottom: '16px' }}>
        <li>
          <b>Name:</b> width: 400px → <b>adjusted to 250px</b> (maxWidth: 250px)
        </li>
        <li>
          <b>Kind:</b> width: 200px → <b>adjusted to 120px</b> (maxWidth: 120px)
        </li>
        <li>
          <b>Size:</b> maxWidth: 180px (auto width)
        </li>
        <li>
          <b>Date Modified:</b> width: 100px (within maxWidth: 200px, so kept as is)
        </li>
      </ul>
      <Text size="sm" c="dimmed" mb="md">
        Try resizing the columns by dragging their edges - they won't go above their maximum width.
      </Text>
      <ListViewTable
        columns={columnsWithMaxWidth}
        data={sampleData}
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
    </div>
  );
}

export function WithMinAndMaxWidth() {
  // Create columns with both minWidth and maxWidth constraints
  const columnsWithBothConstraints: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      width: 50, // Too small, will be adjusted to minWidth
      minWidth: 150,
      maxWidth: 300,
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: true,
      width: 500, // Too large, will be adjusted to maxWidth
      minWidth: 80,
      maxWidth: 120,
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      textAlign: 'right',
      width: 130, // Perfect, within min and max
      minWidth: 120,
      maxWidth: 150,
    },
    {
      key: 'modified',
      title: 'Date Modified',
      sortable: true,
      minWidth: 120,
      maxWidth: 400, // Auto width, should respect both constraints
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates columns with both <b>minWidth</b> and <b>maxWidth</b> constraints:
      </Text>
      <ul style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)', marginBottom: '16px' }}>
        <li>
          <b>Name:</b> width: 50px → <b>150px</b> (minWidth: 150px, maxWidth: 300px)
        </li>
        <li>
          <b>Kind:</b> width: 500px → <b>120px</b> (minWidth: 80px, maxWidth: 120px)
        </li>
        <li>
          <b>Size:</b> width: 130px (within minWidth: 120px, maxWidth: 150px)
        </li>
        <li>
          <b>Date Modified:</b> auto width (minWidth: 120px, maxWidth: 400px)
        </li>
      </ul>
      <Text size="sm" c="dimmed" mb="md">
        The resize range is constrained between minWidth and maxWidth for each column.
      </Text>
      <ListViewTable
        columns={columnsWithBothConstraints}
        data={sampleData}
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
    </div>
  );
}

export function WithBorderColor() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>borderColor</b> property. You can use any Mantine color key
        or valid CSS color.
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        The border color is applied to table borders, column borders, and row borders when enabled.
      </Text>

      <Text fw={600} mb="sm">
        Red borders (Mantine color key):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="red.6"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Blue borders (CSS color):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="#228be6"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Green borders (Mantine color key):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="green.7"
      />
    </div>
  );
}

export function WithHighlightOnHoverColor() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>highlightOnHoverColor</b> property. Hover over the rows to
        see the custom highlight colors.
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        You can use any Mantine color key or valid CSS color to customize the hover background.
      </Text>

      <Text fw={600} mb="sm">
        Blue hover highlight (Mantine color key):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        highlightOnHoverColor="blue.1"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Yellow hover highlight (CSS color with alpha):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        highlightOnHoverColor="rgba(255, 212, 59, 0.3)"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Green hover highlight (Mantine color key):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        highlightOnHoverColor="green.1"
      />
    </div>
  );
}

export function WithStripedColor() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>stripedColor</b> property with different striping patterns.
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        You can use any Mantine color key or valid CSS color to customize striped row backgrounds.
      </Text>

      <Text fw={600} mb="sm">
        Odd rows striped with blue (Mantine color key):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        striped="odd"
        stripedColor="blue.0"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Even rows striped with gray (Mantine color key):
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        striped="even"
        stripedColor="gray.1"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        All rows striped with custom CSS color:
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        striped
        stripedColor="rgba(233, 19, 65, 0.29)"
      />
    </div>
  );
}

export function WithAllColorCustomizations() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates all color customization properties working together:
      </Text>
      <ul style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)', marginBottom: '16px' }}>
        <li>
          <b>borderColor:</b> Purple borders
        </li>
        <li>
          <b>stripedColor:</b> Light purple striped rows (odd)
        </li>
        <li>
          <b>highlightOnHoverColor:</b> Orange hover highlight
        </li>
      </ul>
      <Text size="sm" c="dimmed" mb="md">
        Try hovering over the rows to see the interaction between striped and hover colors.
      </Text>

      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="grape.6"
        striped="odd"
        stripedColor="grape.1"
        highlightOnHover
        highlightOnHoverColor="orange.2"
      />
    </div>
  );
}

export function DarkModeColorDemo() {
  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates how color customizations work in both light and dark modes. Switch
        your browser/Storybook theme to see the differences.
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        Colors are carefully chosen to provide good contrast in both themes.
      </Text>

      <Text fw={600} mb="sm">
        Dark mode optimized colors:
      </Text>
      <Text size="xs" c="dimmed" mb="md">
        Using dark.4 for borders, dark.6 for stripes, and yellow.2 for hover
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="dark.4"
        striped="odd"
        stripedColor="dark.6"
        highlightOnHover
        highlightOnHoverColor="yellow.2"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Light mode optimized colors:
      </Text>
      <Text size="xs" c="dimmed" mb="md">
        Using gray.4 for borders, gray.0 for stripes, and blue.0 for hover
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="gray.4"
        striped="even"
        stripedColor="gray.0"
        highlightOnHover
        highlightOnHoverColor="blue.0"
        mb="xl"
      />

      <Text fw={600} mb="sm">
        Universal colors (work well in both modes):
      </Text>
      <Text size="xs" c="dimmed" mb="md">
        Using CSS colors with appropriate alpha values
      </Text>
      <ListViewTable
        columns={columns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        withRowBorders
        borderColor="rgba(134, 142, 150, 0.6)"
        striped="odd"
        stripedColor="rgba(134, 142, 150, 0.1)"
        highlightOnHover
        highlightOnHoverColor="rgba(34, 139, 230, 0.15)"
      />
    </div>
  );
}

export function WithStickyHeader() {
  // Create more data to demonstrate scrolling
  const extendedData = [
    ...sampleData,
    {
      id: 7,
      name: 'node_modules',
      type: 'folder',
      size: '--',
      modified: '2024-06-07',
      kind: 'Folder',
    },
    { id: 8, name: 'dist', type: 'folder', size: '--', modified: '2024-06-08', kind: 'Folder' },
    { id: 9, name: 'LICENSE', type: 'file', size: '1.1 KB', modified: '2024-06-09', kind: 'Text' },
    {
      id: 10,
      name: '.gitignore',
      type: 'file',
      size: '0.5 KB',
      modified: '2024-06-10',
      kind: 'Text',
    },
    {
      id: 11,
      name: 'tsconfig.json',
      type: 'file',
      size: '2.3 KB',
      modified: '2024-06-11',
      kind: 'JSON',
    },
    {
      id: 12,
      name: 'vite.config.ts',
      type: 'file',
      size: '1.9 KB',
      modified: '2024-06-12',
      kind: 'TypeScript',
    },
    {
      id: 13,
      name: 'eslint.config.js',
      type: 'file',
      size: '0.8 KB',
      modified: '2024-06-13',
      kind: 'JavaScript',
    },
    {
      id: 14,
      name: 'yarn.lock',
      type: 'file',
      size: '456.7 KB',
      modified: '2024-06-14',
      kind: 'Lock File',
    },
    {
      id: 15,
      name: 'pnpm-lock.yaml',
      type: 'file',
      size: '234.1 KB',
      modified: '2024-06-15',
      kind: 'Lock File',
    },
    {
      id: 16,
      name: 'rollup.config.js',
      type: 'file',
      size: '3.2 KB',
      modified: '2024-06-16',
      kind: 'JavaScript',
    },
    {
      id: 17,
      name: 'jest.config.js',
      type: 'file',
      size: '1.4 KB',
      modified: '2024-06-17',
      kind: 'JavaScript',
    },
    {
      id: 18,
      name: 'babel.config.js',
      type: 'file',
      size: '0.7 KB',
      modified: '2024-06-18',
      kind: 'JavaScript',
    },
    {
      id: 19,
      name: 'webpack.config.js',
      type: 'file',
      size: '4.1 KB',
      modified: '2024-06-19',
      kind: 'JavaScript',
    },
    {
      id: 20,
      name: 'postcss.config.js',
      type: 'file',
      size: '0.3 KB',
      modified: '2024-06-20',
      kind: 'JavaScript',
    },
  ];

  return (
    <Box h={16000}>
      <Stack>
        <Text size="sm" c="dimmed" mb="md">
          This story demonstrates the <b>stickyHeader</b> property. The table header remains visible
          at the top when scrolling through the data.
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          Scroll down through the table to see how the header stays in place. The table height is
          limited to 300px to enable scrolling.
        </Text>

        <ListViewTable
          columns={columns}
          data={extendedData}
          rowKey="id"
          withTableBorder
          withColumnBorders
          highlightOnHover
          stickyHeader
          onRowClick={(record) => {
            // eslint-disable-next-line no-console
            console.log('Clicked:', record.name);
          }}
        />
      </Stack>
    </Box>
  );
}

export function WithStickyHeaderOffset() {
  // Create more data to demonstrate scrolling
  const extendedData = [
    ...sampleData,
    {
      id: 7,
      name: 'node_modules',
      type: 'folder',
      size: '--',
      modified: '2024-06-07',
      kind: 'Folder',
    },
    { id: 8, name: 'dist', type: 'folder', size: '--', modified: '2024-06-08', kind: 'Folder' },
    { id: 9, name: 'LICENSE', type: 'file', size: '1.1 KB', modified: '2024-06-09', kind: 'Text' },
    {
      id: 10,
      name: '.gitignore',
      type: 'file',
      size: '0.5 KB',
      modified: '2024-06-10',
      kind: 'Text',
    },
    {
      id: 11,
      name: 'tsconfig.json',
      type: 'file',
      size: '2.3 KB',
      modified: '2024-06-11',
      kind: 'JSON',
    },
    {
      id: 12,
      name: 'vite.config.ts',
      type: 'file',
      size: '1.9 KB',
      modified: '2024-06-12',
      kind: 'TypeScript',
    },
    {
      id: 13,
      name: 'eslint.config.js',
      type: 'file',
      size: '0.8 KB',
      modified: '2024-06-13',
      kind: 'JavaScript',
    },
    {
      id: 14,
      name: 'yarn.lock',
      type: 'file',
      size: '456.7 KB',
      modified: '2024-06-14',
      kind: 'Lock File',
    },
    {
      id: 15,
      name: 'pnpm-lock.yaml',
      type: 'file',
      size: '234.1 KB',
      modified: '2024-06-15',
      kind: 'Lock File',
    },
    {
      id: 16,
      name: 'rollup.config.js',
      type: 'file',
      size: '3.2 KB',
      modified: '2024-06-16',
      kind: 'JavaScript',
    },
    {
      id: 17,
      name: 'jest.config.js',
      type: 'file',
      size: '1.4 KB',
      modified: '2024-06-17',
      kind: 'JavaScript',
    },
    {
      id: 18,
      name: 'babel.config.js',
      type: 'file',
      size: '0.7 KB',
      modified: '2024-06-18',
      kind: 'JavaScript',
    },
    {
      id: 19,
      name: 'webpack.config.js',
      type: 'file',
      size: '4.1 KB',
      modified: '2024-06-19',
      kind: 'JavaScript',
    },
    {
      id: 20,
      name: 'postcss.config.js',
      type: 'file',
      size: '0.3 KB',
      modified: '2024-06-20',
      kind: 'JavaScript',
    },
  ];

  return (
    <Box h={16000}>
      <div
        style={{
          height: '60px',
          backgroundColor: 'var(--mantine-color-blue-1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          borderRadius: '8px',
        }}
      >
        <Text fw={600} c="blue.8">
          Simulated Fixed Navigation Bar (60px height)
        </Text>
      </div>

      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the <b>stickyHeaderOffset</b> property. The sticky header is
        positioned 60px from the top to account for a fixed navigation bar.
      </Text>
      <Text size="sm" c="dimmed" mb="md">
        Scroll down to see how the header stops at the blue navigation bar instead of going to the
        very top of the viewport.
      </Text>

      <ListViewTable
        columns={columns}
        data={extendedData}
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
    </Box>
  );
}

export function WidthConstraintsWithoutResizing() {
  // Create columns with various width, minWidth, and maxWidth settings
  const constrainedColumns: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name (Auto)',
      // width: 100,
      // No width specified, should use auto width
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind (Auto)',
      // No width specified, should use auto width
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size (Auto)',
      textAlign: 'right',
      // width: 100,
      // No width specified, should use auto width
    },
    {
      key: 'modified',
      title: 'Modified (Fixed 100px)',
      width: 100, // Fixed width at 100px
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates width behavior with column resizing and drag disabled. Only the last
        column has a fixed width, all others use auto width:
      </Text>

      <ul style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)', marginBottom: '16px' }}>
        <li>
          <b>Name:</b> Auto width (no constraints)
        </li>
        <li>
          <b>Kind:</b> Auto width (no constraints)
        </li>
        <li>
          <b>Size:</b> Auto width (no constraints)
        </li>
        <li>
          <b>Modified:</b> Fixed width: 100px (should be exactly 100px)
        </li>
      </ul>

      <Text size="sm" c="dimmed" mb="md">
        Since resizing and dragging are disabled, you cannot modify the column widths. The last
        column should have exactly 100px width applied in the styles.
      </Text>

      <ListViewTable
        columns={constrainedColumns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        // enableColumnResizing={false}
        enableColumnReordering={false}
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </div>
  );
}

export function MixedWidthConstraints() {
  // Create columns with mixed width constraints: auto, fixed, auto, fixed
  const mixedColumns: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name (Auto)',
      // No width specified, should use auto width
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind (120px)',
      width: 120, // Fixed width at 120px
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size (Auto)',
      textAlign: 'right',
      // No width specified, should use auto width
    },
    {
      key: 'modified',
      title: 'Modified (200px)',
      width: 200, // Fixed width at 200px
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates mixed width constraints: auto + fixed + auto + fixed. Since at least
        one column is auto, the last column should maintain its fixed width:
      </Text>

      <ul style={{ fontSize: '14px', color: 'var(--mantine-color-dimmed)', marginBottom: '16px' }}>
        <li>
          <b>Name:</b> Auto width (flexible)
        </li>
        <li>
          <b>Kind:</b> Fixed width: 120px
        </li>
        <li>
          <b>Size:</b> Auto width (flexible)
        </li>
        <li>
          <b>Modified:</b> Fixed width: 200px (should be exactly 200px)
        </li>
      </ul>

      <Text size="sm" c="dimmed" mb="md">
        Since there are auto-width columns, the table remains flexible and the last column can
        maintain its specified 200px width.
      </Text>

      <ListViewTable
        columns={mixedColumns}
        data={sampleData}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        enableColumnReordering={false}
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </div>
  );
}

export function WithScrollContainer() {
  // Create columns with wider widths to force horizontal scrolling
  const wideColumns: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      width: 200,
      // No sticky property - allow all columns to scroll together
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: true,
      width: 150,
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      textAlign: 'right',
      width: 120,
    },
    {
      key: 'modified',
      title: 'Date Modified',
      sortable: true,
      width: 180,
    },
    {
      key: 'extra1',
      title: 'Extra Column 1',
      width: 150,
      renderCell: () => <Text size="sm">Extra content 1</Text>,
    },
    {
      key: 'extra2',
      title: 'Extra Column 2',
      width: 150,
      renderCell: () => <Text size="sm">Extra content 2</Text>,
    },
    {
      key: 'extra3',
      title: 'Extra Column 3',
      width: 150,
      renderCell: () => <Text size="sm">Extra content 3</Text>,
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates the use of <b>Table.ScrollContainer</b> component from Mantine to
        handle horizontal scrolling when the table content is wider than the container.
      </Text>

      <Text size="sm" c="dimmed" mb="md">
        The ScrollContainer has a <b>minWidth of 800px</b>, so if your screen is smaller or the
        table content exceeds this width, you'll see horizontal scrollbars. All columns will scroll
        together horizontally for a smooth viewing experience.
      </Text>

      <Text size="sm" c="dimmed" mb="md">
        Column resizing is <b>disabled</b> in this example to maintain fixed column widths and rely
        on horizontal scrolling for overflow content.
      </Text>

      <Table.ScrollContainer minWidth={800}>
        <ListViewTable
          columns={wideColumns}
          data={sampleData}
          rowKey="id"
          withTableBorder
          withColumnBorders
          highlightOnHover
          enableColumnResizing={false}
          onRowClick={(record) => {
            // eslint-disable-next-line no-console
            console.log('Clicked:', record.name);
          }}
        />
      </Table.ScrollContainer>

      <Text size="xs" c="dimmed" mt="md">
        <b>Note:</b> Try resizing your browser window to see the horizontal scroll behavior. All
        columns will scroll together smoothly.
      </Text>
    </div>
  );
}

export function WithScrollContainerAndStickyColumn() {
  // Create columns with wider widths and a sticky first column
  const wideColumnsWithSticky: ListViewTableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      width: 200,
      sticky: true, // This column will remain visible during horizontal scroll
      renderCell: (record: any) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: true,
      width: 150,
      renderCell: (record: any) => (
        <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
          {record.kind}
        </Badge>
      ),
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      textAlign: 'right',
      width: 120,
    },
    {
      key: 'modified',
      title: 'Date Modified',
      sortable: true,
      width: 180,
    },
    {
      key: 'extra1',
      title: 'Extra Column 1',
      width: 150,
      renderCell: () => <Text size="sm">Extra content 1</Text>,
    },
    {
      key: 'extra2',
      title: 'Extra Column 2',
      width: 150,
      renderCell: () => <Text size="sm">Extra content 2</Text>,
    },
    {
      key: 'extra3',
      title: 'Extra Column 3',
      width: 150,
      renderCell: () => <Text size="sm">Extra content 3</Text>,
    },
  ];

  return (
    <div>
      <Text size="sm" c="dimmed" mb="md">
        This story demonstrates <b>Table.ScrollContainer</b> with a <b>sticky first column</b>. The
        Name column will remain visible while other columns scroll horizontally.
      </Text>

      <Text size="sm" c="dimmed" mb="md">
        This is useful when you have an important identifier column (like Name, ID, etc.) that
        should always remain visible for context.
      </Text>

      <Text size="sm" c="dimmed" mb="md">
        Column resizing is <b>disabled</b> to maintain the fixed layout.
      </Text>

      <Table.ScrollContainer minWidth={800}>
        <ListViewTable
          columns={wideColumnsWithSticky}
          data={sampleData}
          rowKey="id"
          withTableBorder
          withColumnBorders
          highlightOnHover
          enableColumnResizing={false}
          onRowClick={(record) => {
            // eslint-disable-next-line no-console
            console.log('Clicked:', record.name);
          }}
        />
      </Table.ScrollContainer>

      <Text size="xs" c="dimmed" mt="md">
        <b>Note:</b> Scroll horizontally to see how the Name column stays fixed while other columns
        scroll.
      </Text>
    </div>
  );
}
