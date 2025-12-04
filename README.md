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

[![Mantine UI Library](https://img.shields.io/badge/-MANTINE_UI_LIBRARY-blue?style=for-the-badge&labelColor=black&logo=mantine
)](https://mantine.dev/)

This component extends [Mantine UI](https://mantine.dev/) by adding advanced table features inspired by the List View in macOS Finder. It enhances the [Mantine Table component](https://mantine.dev/core/table/) with a familiar, intuitive interface for displaying item lists in a structured, table-like format. Users can **reorder** and **resize** columns dynamically, providing greater flexibility and control over data presentation. This makes it ideal for applications needing a modern, customizable list view with enhanced interactivity.

[![Mantine Extensions](https://img.shields.io/badge/-Watch_the_Video-blue?style=for-the-badge&labelColor=black&logo=youtube
)](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4)
[![Demo and Documentation](https://img.shields.io/badge/-Demo_%26_Documentation-blue?style=for-the-badge&labelColor=black&logo=typescript
)](https://gfazioli.github.io/mantine-list-view-table/)
[![Mantine Extensions HUB](https://img.shields.io/badge/-Mantine_Extensions_Hub-blue?style=for-the-badge&labelColor=blue
)](https://mantine-extensions.vercel.app/)

👉 You can find more components on the [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) library.


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
<div align="center">
  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-list-view-table&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-list-view-table&Timeline)

</div>

https://github.com/user-attachments/assets/f4b7281c-eea0-41f9-b168-80d0f8374929

https://github.com/user-attachments/assets/a220d834-6787-429a-aab3-15e0c504f39c
