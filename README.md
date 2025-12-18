# Mantine ListViewTable Component

<img width="2752" height="1536" alt="mantine List View Table" src="https://github.com/user-attachments/assets/ad21d078-ece9-4cb7-b06a-dc5883f47ab1" />

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-list-view-table?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-list-view-table)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-list-view-table?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-list-view-table)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-list-view-table?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-list-view-table)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-list-view-table?style=for-the-badge)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

[Mantine ListViewTable](https://gfazioli.github.io/mantine-list-view-table/) is a robust React component that enhances Mantine’s Table to deliver a modern, macOS Finder–style list view with advanced interactivity and layout control. Users can reorder and resize columns, while developers can choose internal behaviors or fully manage state externally for sorting, column reordering, and resizing. 

The component provides fine‑grained typography control—via ellipsis and noWrap—and allows distinct header vs. cell presentation using cellStyle. It supports wide datasets through Table.ScrollContainer for horizontal scrolling, with optional sticky identifier columns, and works seamlessly inside ScrollArea with sticky headers and adjustable offsets. 

For UX polish, it ships with configurable loading overlays (including custom loaders) and rich empty states ranging from simple messages to fully styled components with actions. These features make ListViewTable ideal for applications that need a clear, scalable, and highly interactive tabular list experience.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-list-view-table/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)


## Installation

```sh
npm install @gfazioli/mantine-list-view-table
```
or 

```sh
yarn add @gfazioli/mantine-list-view-table
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-list-view-table/styles.css';
```

## Usage

```tsx
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';

function Demo() {
  const data = [
    { id: 1, name: 'Documents', type: 'folder', size: '--', modified: '2024-06-01', kind: 'Folder' },
    { id: 2, name: 'README.md', type: 'file', size: '2.1 KB', modified: '2024-06-02', kind: 'Markdown' },
    { id: 3, name: 'package.json', type: 'file', size: '1.8 KB', modified: '2024-06-03', kind: 'JSON' },
    { id: 4, name: 'src', type: 'folder', size: '--', modified: '2024-06-04', kind: 'Folder' },
  ];

  const columns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      renderCell: (record) => (
        <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
      ),
    },
    {
      key: 'kind',
      title: 'Kind',
      sortable: true,
      width: 120,
      renderCell: (record) => (
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

  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      highlightOnHover
      onRowClick={(record) => {
        console.log('Clicked:', record.name);
      }}
    />
  );
}
```

---
  
https://github.com/user-attachments/assets/f4b7281c-eea0-41f9-b168-80d0f8374929

https://github.com/user-attachments/assets/a220d834-6787-429a-aab3-15e0c504f39c

---
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-list-view-table&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-list-view-table&Timeline)



