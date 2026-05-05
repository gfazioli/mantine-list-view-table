import type { ListViewTableFactory } from '@gfazioli/mantine-list-view-table';
import type { StylesApiData } from '../components/styles-api.types';

export const ListViewTableStylesApi: StylesApiData<ListViewTableFactory> = {
  selectors: {
    root: 'Root container element. Owns `withTableBorder`, `borderRadius` and `borderWidth` (border lives here, not on the inner `<table>`)',
    table: 'Mantine `<table>` element',
    header:
      'Table header (`<thead>`). Carries the drop-shadow that fades in via `--lvt-header-shadow-opacity` when `stickyHeader` is engaged',
    headerCell: 'Header cell (`<th>`)',
    headerButton: 'Header title button (sortable column trigger)',
    headerTitle: 'Header title text',
    sortIcon: 'Sort direction icon',
    dragHandle: 'Column drag handle icon',
    resizeHandle: 'Column resize handle',
    body: 'Table body (`<tbody>`)',
    row: 'Table row (`<tr>`)',
    cell: 'Table cell (`<td>`)',
    selectedRow: 'Selected row highlight',
    focusedRow: 'Focused row outline (keyboard navigation)',
    stickyColumn: 'Sticky body cell (`<td>`) for a pinned column',
    stickyHeaderColumn: 'Sticky header cell (`<th>`) for a pinned column',
    scrollViewport:
      "Internal wrapper around the `<table>`. When `scrollProps` is set this element becomes the native scroll viewport; otherwise it just carries the `clip-path` that clips the table content to the wrapper's rounded corners while leaving the outer border on `.root` untouched",
    emptyState: 'Empty state container shown when there is no data',
    loader: 'Loading state container',
  },

  vars: {
    root: {
      '--list-view-height': 'Controls ListView height — supports responsive values',
      '--list-view-width': 'Controls ListView width — supports responsive values',
      '--list-view-horizontal-spacing':
        'Controls horizontal cell padding — supports responsive values',
      '--list-view-vertical-spacing': 'Controls vertical cell padding — supports responsive values',
      '--list-view-header-title-font-size':
        'Controls font size of header titles — supports responsive values',
      '--list-view-header-title-font-weight':
        'Controls font weight of header titles — supports responsive values',
      '--list-view-cell-font-size':
        'Controls font size of cell content — supports responsive values',
      '--list-view-cell-font-weight':
        'Controls font weight of cell content — supports responsive values',
      '--list-view-selected-row-color': 'Controls background color of selected rows',
      '--lvt-border-color':
        'Resolved color of the outer wrapper border when `withTableBorder` is set. Set automatically by the `varsResolver` from the `borderColor` prop; override directly to bypass the prop',
      '--lvt-shadow-color':
        'Color of the sticky-column gradient shadow. Default: `rgba(0, 0, 0, 0.05)` (light) / `rgba(0, 0, 0, 0.25)` (dark)',
      '--lvt-shadow-width':
        'Width of the sticky-column gradient shadow. Accepts any CSS length. Default: `8px`',
      '--lvt-shadow-left-opacity':
        '_Internal._ Opacity of the left-side column shadow. Driven automatically by `useStickyShadow` based on horizontal scroll position',
      '--lvt-shadow-right-opacity':
        '_Internal._ Opacity of the right-side column shadow. Driven automatically by `useStickyShadow` based on horizontal scroll position',
      '--lvt-header-shadow-opacity':
        '_Internal._ Drives the fade in/out of the sticky-header drop shadow. Set to `1` by `useStickyHeaderShadow` while the thead is stuck at `stickyHeaderOffset`, `0` otherwise. To customize the shadow color/blur/spread, override `.mantine-ListViewTable-header` via `classNames`/`styles`',
    },
  },

  modifiers: [
    {
      selector: 'root',
      modifier: 'data-loading',
      condition: '`loading` prop is set to `true`',
    },
    {
      selector: 'root',
      modifier: 'data-with-table-border',
      condition: '`withTableBorder` prop is set to `true`',
    },
    {
      selector: 'root',
      modifier: 'data-with-scroll',
      condition: '`scrollProps` is provided (the inner viewport becomes a native scroller)',
    },
    {
      selector: 'root',
      modifier: 'data-dragging',
      condition: 'a column is currently being dragged',
    },
    {
      selector: 'root',
      modifier: 'data-resizing',
      condition: 'a column is currently being resized',
    },
    {
      selector: 'headerCell',
      modifier: 'data-column-key',
      condition: "always set; value mirrors the column's `key`",
    },
    {
      selector: 'headerCell',
      modifier: 'data-sticky-side',
      condition: '`"left"` or `"right"` when the column is pinned',
    },
    {
      selector: 'headerCell',
      modifier: 'data-sticky-shadow',
      condition:
        '`"left"` on the last sticky-left header cell, `"right"` on the first sticky-right header cell',
    },
    {
      selector: 'headerCell',
      modifier: 'data-dragging',
      condition: 'this column is the one currently being dragged',
    },
    {
      selector: 'headerCell',
      modifier: 'data-drag-over',
      condition: 'this column is the current drop target during a reorder drag',
    },
    {
      selector: 'headerCell',
      modifier: 'data-focused',
      condition: 'the sortable header button has keyboard focus',
    },
    {
      selector: 'cell',
      modifier: 'data-column-key',
      condition: "always set; value mirrors the column's `key`",
    },
    {
      selector: 'cell',
      modifier: 'data-sticky-side',
      condition: '`"left"` or `"right"` when the column is pinned',
    },
    {
      selector: 'cell',
      modifier: 'data-sticky-shadow',
      condition:
        '`"left"` on the last sticky-left body cell, `"right"` on the first sticky-right body cell',
    },
    {
      selector: 'row',
      modifier: 'data-selected',
      condition: 'row is selected (when `selectionMode` is set)',
    },
    {
      selector: 'row',
      modifier: 'data-focused',
      condition: 'row is the current keyboard-navigation focus target',
    },
  ],
};
