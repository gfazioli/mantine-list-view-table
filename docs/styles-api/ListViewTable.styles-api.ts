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
    selectedRow: 'Selected row highlight',
    focusedRow: 'Focused row outline (keyboard navigation)',
    stickyColumn: 'Sticky column cell (td)',
    stickyHeaderColumn: 'Sticky header column cell (th)',
    scrollViewport:
      'Internal scroll wrapper rendered when `scrollProps` is set; carries the native horizontal/vertical scroll while the outer container holds the (fixed) border and border-radius',
    emptyState: 'Empty state container when no data',
    loader: 'Loading state container',
  },

  vars: {
    root: {
      '--list-view-height': 'Controls ListView height – supports responsive values',
      '--list-view-width': 'Controls ListView width – supports responsive values',
      '--list-view-horizontal-spacing':
        'Controls horizontal cell padding – supports responsive values',
      '--list-view-vertical-spacing': 'Controls vertical cell padding – supports responsive values',
      '--list-view-header-title-font-size':
        'Controls font size of header titles – supports responsive values',
      '--list-view-header-title-font-weight':
        'Controls font weight of header titles – supports responsive values',
      '--list-view-cell-font-size':
        'Controls font size of cell content – supports responsive values',
      '--list-view-cell-font-weight':
        'Controls font weight of cell content – supports responsive values',
      '--list-view-selected-row-color': 'Controls background color of selected rows',
      '--lvt-shadow-color':
        'Color of the sticky-column gradient shadow. Default: `rgba(0, 0, 0, 0.15)` (light) / `rgba(0, 0, 0, 0.4)` (dark)',
      '--lvt-shadow-width': 'Width of the sticky-column gradient shadow in px. Default: `4px`',
      '--lvt-shadow-left-opacity':
        'Opacity of the left-side shadow. Driven automatically by `useStickyShadow` based on horizontal scroll position',
      '--lvt-shadow-right-opacity':
        'Opacity of the right-side shadow. Driven automatically by `useStickyShadow` based on horizontal scroll position',
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
    {
      selector: 'headerCell',
      modifier: 'data-sticky-side',
      condition: '`"left"` or `"right"` when the column is pinned',
    },
    {
      selector: 'cell',
      modifier: 'data-sticky-side',
      condition: '`"left"` or `"right"` when the column is pinned',
    },
    {
      selector: 'cell',
      modifier: 'data-sticky-shadow',
      condition: '`"left"` on the last sticky-left cell, `"right"` on the first sticky-right cell',
    },
    {
      selector: 'headerCell',
      modifier: 'data-sticky-shadow',
      condition: '`"left"` on the last sticky-left cell, `"right"` on the first sticky-right cell',
    },
  ],
};
