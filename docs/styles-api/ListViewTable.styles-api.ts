import type { ListViewTableFactory } from '@gfazioli/mantine-list-view-table';
import type { StylesApiData } from '../components/styles-api.types';

export const ListViewTableStylesApi: StylesApiData<ListViewTableFactory> = {
  selectors: {
    root: 'Root container element',
    table: 'Table element',
    header: 'Table header',
    headerCell: 'Header cell (th)',
    headerButton: 'Header title button',
    headerTitle: 'Header title text',
    sortIcon: 'Sort direction icon',
    dragHandle: 'Column drag handle icon',
    resizeHandle: 'Column resize handle',
    body: 'Table body',
    row: 'Table row (tr)',
    cell: 'Table cell (td)',
    stickyColumn: 'Sticky column cell (td)',
    stickyHeaderColumn: 'Sticky header column cell (th)',
    emptyState: 'Empty state container when no data',
    loader: 'Loading state container',
  },

  vars: {
    root: {
      '--list-view-height': 'Controls ListView height',
      '--list-view-width': 'Controls ListView width',
      '--list-view-header-title-font-size': 'Controls font size of header titles',
      '--list-view-header-title-font-weight': 'Controls font weight of header titles',
      '--list-view-cell-font-size': 'Controls font size of cell content',
      '--list-view-cell-font-weight': 'Controls font weight of cell content',
    },
  },

  modifiers: [
    {
      selector: 'root',
      modifier: 'data-loading',
      condition: '`loading` prop is set to true',
    },
    {
      selector: 'headerCell',
      modifier: 'data-sticky',
      condition: 'column has `sticky` prop set to true',
    },
    {
      selector: 'headerCell',
      modifier: 'data-column-key',
      condition: 'column has `columnKey` prop set',
    },
    {
      selector: 'cell',
      modifier: 'data-sticky',
      condition: 'column has `sticky` prop set to true',
    },
    {
      selector: 'cell',
      modifier: 'data-column-key',
      condition: 'column has `columnKey` prop set',
    },
    {
      selector: 'row',
      modifier: 'data-selected',
      condition: 'row is selected (if selection is enabled)',
    },
    {
      selector: 'headerCell',
      modifier: 'data-dragging',
      condition: 'column is being dragged',
    },
    {
      selector: 'headerCell',
      modifier: 'data-drag-over',
      condition: 'column is drag target',
    },
  ],
};
