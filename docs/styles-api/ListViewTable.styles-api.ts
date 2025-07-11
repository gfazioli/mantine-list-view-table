import type { ListViewTableFactory } from '@gfazioli/mantine-list-view-table';
import type { StylesApiData } from '../components/styles-api.types';

export const ListViewTableStylesApi: StylesApiData<ListViewTableFactory> = {
  selectors: {
    root: 'Root container element',
    table: 'Table element',
    header: 'Table header',
    headerCell: 'Header cell (th)',
    headerTitle: 'Header title button',
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
    },
  },

  modifiers: [
    { modifier: 'data-loading', selector: 'root', condition: '`loading` prop is set to true' },
    {
      modifier: 'data-sticky',
      selector: 'headerCell',
      condition: 'column has `sticky` prop set to true',
    },
    {
      modifier: 'data-sticky',
      selector: 'cell',
      condition: 'column has `sticky` prop set to true',
    },
    {
      modifier: 'data-selected',
      selector: 'row',
      condition: 'row is selected (if selection is enabled)',
    },
    { modifier: 'data-dragging', selector: 'headerCell', condition: 'column is being dragged' },
    { modifier: 'data-drag-over', selector: 'headerCell', condition: 'column is drag target' },
  ],
};
