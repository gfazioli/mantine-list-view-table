import React from 'react';
import {
  BoxProps,
  Factory,
  MantineColor,
  MantineSpacing,
  MantineStyleProp,
  StylesApiProps,
  TableProps,
} from '@mantine/core';

// === Column ===

export interface ListViewTableColumn<T = any> {
  /**
   * Column accessor key. Can use dot notation for nested properties.
   */
  key: keyof T | (string & NonNullable<unknown>);

  /**
   * Column title. If not provided, will be derived from the key.
   */
  title?: React.ReactNode;

  /**
   * Whether the column is sortable.
   */
  sortable?: boolean;

  /**
   * Whether the column can be resized. Default: `true` when `enableColumnResizing` is active.
   */
  resizable?: boolean;

  /**
   * Whether the column can be dragged to reorder. Default: `true` when `enableColumnReordering` is active.
   */
  draggable?: boolean;

  /**
   * Column width. Can be a number (px) or any CSS value string ("50%", "20rem", "clamp(...)").
   */
  width?: string | number;

  /**
   * Minimum column width when resizing.
   */
  minWidth?: string | number;

  /**
   * Maximum column width when resizing.
   */
  maxWidth?: string | number;

  /**
   * Whether the column is sticky (pinned).
   */
  sticky?: boolean;

  /**
   * Text alignment for the column.
   */
  textAlign?: 'left' | 'center' | 'right';

  /**
   * Whether to prevent text wrapping.
   */
  noWrap?: boolean;

  /**
   * Whether to show ellipsis for overflowing text.
   */
  ellipsis?: boolean;

  /**
   * Whether the column is hidden.
   */
  hidden?: boolean;

  /**
   * Custom cell renderer function.
   */
  renderCell?: (record: T, index: number) => React.ReactNode;

  /**
   * Custom header renderer function.
   */
  renderHeader?: () => React.ReactNode;

  /**
   * Optional class name for cells in this column.
   */
  cellClassName?: string | ((record: T, index: number) => string | undefined);

  /**
   * Optional style for cells in this column.
   */
  cellStyle?: MantineStyleProp | ((record: T, index: number) => MantineStyleProp | undefined);
}

// === Resize ===

/**
 * Column resize behavior mode.
 * - `'standard'`: dragging the handle trades width between the left and right adjacent columns (total table width stays fixed).
 * - `'finder'`: dragging the handle only changes the left column; the table width grows/shrinks freely (wrap in `Table.ScrollContainer` for horizontal scroll).
 */
export type ListViewTableResizeMode = 'standard' | 'finder';

// === Selection ===

export type ListViewTableSelectionMode = 'single' | 'multiple';

// === Sort ===

export type ListViewTableSortDirection = 'asc' | 'desc';

export interface ListViewTableSortStatus {
  columnKey: string;
  direction: ListViewTableSortDirection;
}

// === Context Menu ===

export interface ListViewTableContextMenuInfo<T = any> {
  record: T;
  index: number;
  event: React.MouseEvent;
}

// === Styles ===

export type ListViewTableStylesNames =
  | 'root'
  | 'table'
  | 'header'
  | 'headerCell'
  | 'headerButton'
  | 'headerTitle'
  | 'sortIcon'
  | 'dragHandle'
  | 'resizeHandle'
  | 'body'
  | 'row'
  | 'cell'
  | 'selectedRow'
  | 'focusedRow'
  | 'emptyState'
  | 'loader'
  | 'stickyColumn'
  | 'stickyHeaderColumn'
  | 'contextMenu';

// === CSS Variables ===

export type ListViewTableCssVariables = {
  root:
    | '--list-view-height'
    | '--list-view-width'
    | '--list-view-header-title-font-size'
    | '--list-view-header-title-font-weight'
    | '--list-view-cell-font-size'
    | '--list-view-cell-font-weight'
    | '--list-view-selected-row-color'
    | '--list-view-sticky-blur';
};

// === Props ===

/**
 * v2.0: Does NOT extend TableProps anymore.
 * Commonly used Table props are declared explicitly.
 * For everything else, use the `tableProps` pass-through.
 */
export interface ListViewTableBaseProps<T = any> {
  // === Core ===

  /**
   * Array of column definitions.
   */
  columns: ListViewTableColumn<T>[];

  /**
   * Array of data records.
   */
  data: T[];

  /**
   * Key or function to generate unique row keys.
   */
  rowKey?: keyof T | ((record: T, index: number) => React.Key);

  // === Layout ===

  /**
   * Height of the ListViewTable.
   */
  height?: string | number;

  /**
   * Width of the ListViewTable.
   */
  width?: string | number;

  /**
   * Value of `table-layout` style. When `enableColumnResizing` is active and no explicit value is provided, defaults to `fixed`.
   */
  layout?: React.CSSProperties['tableLayout'];

  // === Table visual props (explicit, most commonly used) ===

  /**
   * Whether to show table borders.
   */
  withTableBorder?: boolean;

  /**
   * Whether to show column borders.
   */
  withColumnBorders?: boolean;

  /**
   * Whether to show row borders.
   */
  withRowBorders?: boolean;

  /**
   * Whether to stripe rows.
   */
  striped?: boolean | 'odd' | 'even';

  /**
   * Background color of striped rows, key of `theme.colors` or any valid CSS color.
   */
  stripedColor?: MantineColor;

  /**
   * Whether to highlight rows on hover.
   */
  highlightOnHover?: boolean;

  /**
   * Background color of table rows when hovered, key of `theme.colors` or any valid CSS color.
   */
  highlightOnHoverColor?: MantineColor;

  /**
   * Determines whether `Table.Thead` should be sticky. Default: `false`.
   */
  stickyHeader?: boolean;

  /**
   * Offset from top at which `Table.Thead` should become sticky. Default: `0`.
   */
  stickyHeaderOffset?: number | string;

  /**
   * Determines whether `font-variant-numeric: tabular-nums` style should be set. Default: `false`.
   */
  tabularNums?: boolean;

  /**
   * Determines on which side `Table.Caption` is displayed. Default: `bottom`.
   */
  captionSide?: 'top' | 'bottom';

  /**
   * Color of table borders, key of `theme.colors` or any valid CSS color.
   */
  borderColor?: MantineColor;

  /**
   * Horizontal spacing between columns.
   */
  horizontalSpacing?: MantineSpacing;

  /**
   * Vertical spacing between rows.
   */
  verticalSpacing?: MantineSpacing;

  // === Pass-through for non-explicit Table props ===

  /**
   * Additional props passed directly to the Mantine Table component.
   */
  tableProps?: Partial<TableProps>;

  // === Column features ===

  /**
   * Whether to enable column reordering via drag and drop. Default: `false`.
   */
  enableColumnReordering?: boolean;

  /**
   * Whether to enable column resizing. Default: `false`.
   */
  enableColumnResizing?: boolean;

  /**
   * Column resize behavior mode. Default: `'standard'`.
   * - `'standard'`: width is traded between the dragged column and its right neighbor (total width stays fixed).
   * - `'finder'`: only the dragged column changes width; the table grows freely (use with `Table.ScrollContainer` for horizontal scroll).
   */
  resizeMode?: ListViewTableResizeMode;

  /**
   * Callback fired when columns are reordered.
   */
  onColumnReorder?: (fromIndex: number, toIndex: number) => void;

  /**
   * Callback fired when a column is resized.
   */
  onColumnResize?: (columnKey: string, width: number) => void;

  // === Sorting ===

  /**
   * Current sort status. When provided with `onSort`, external sorting mode is used.
   */
  sortStatus?: ListViewTableSortStatus;

  /**
   * Callback fired when sort changes.
   */
  onSort?: (sortStatus: ListViewTableSortStatus) => void;

  // === Row interaction ===

  /**
   * Callback fired when a row is clicked.
   */
  onRowClick?: (record: T, index: number, event: React.MouseEvent) => void;

  /**
   * Callback fired when a row is double-clicked.
   */
  onRowDoubleClick?: (record: T, index: number, event: React.MouseEvent) => void;

  /**
   * Optional custom row class name.
   */
  rowClassName?: string | ((record: T, index: number) => string | undefined);

  /**
   * Optional custom row style.
   */
  rowStyle?: React.CSSProperties | ((record: T, index: number) => React.CSSProperties | undefined);

  /**
   * Whether rows should not wrap content.
   */
  noWrap?: boolean;

  /**
   * Vertical alignment for cells.
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';

  // === States ===

  /**
   * Loading state.
   */
  loading?: boolean;

  /**
   * Custom props for the default loading state.
   */
  loadingProps?: Record<string, any>;

  /**
   * Custom loading component to render instead of the default loader. Accepts a React element or a component type.
   */
  loadingComponent?: React.ElementType | React.ReactNode;

  /**
   * Content to show when no data is available. Can be a string or a React component.
   */
  emptyText?: React.ReactNode;

  // === Row Selection ===

  /**
   * Selection mode: 'single' or 'multiple'. When not set, row selection is disabled.
   */
  selectionMode?: ListViewTableSelectionMode;

  /**
   * Controlled selected row keys.
   */
  selectedRows?: React.Key[];

  /**
   * Default selected row keys (uncontrolled).
   */
  defaultSelectedRows?: React.Key[];

  /**
   * Callback fired when selection changes.
   */
  onSelectionChange?: (selectedKeys: React.Key[], records: T[]) => void;

  /**
   * Color for selected rows. Key of `theme.colors` or any valid CSS color.
   */
  selectedRowColor?: MantineColor;

  // === Keyboard Navigation ===

  /**
   * Enable keyboard navigation. Default: `true` when `selectionMode` is defined.
   */
  enableKeyboardNavigation?: boolean;

  /**
   * Callback fired when a row is activated (Enter key).
   */
  onRowActivate?: (record: T, index: number) => void;

  // === Context Menu ===

  /**
   * Render function for the context menu. Return null to prevent the context menu.
   */
  renderContextMenu?: (info: ListViewTableContextMenuInfo<T>) => React.ReactNode;

  /**
   * Callback fired on right-click on a row.
   */
  onRowContextMenu?: (record: T, index: number, event: React.MouseEvent) => void;

  // === Column Visibility ===

  /**
   * Controlled hidden column keys.
   */
  hiddenColumns?: string[];

  /**
   * Default hidden column keys (uncontrolled).
   */
  defaultHiddenColumns?: string[];

  /**
   * Callback fired when hidden columns change.
   */
  onHiddenColumnsChange?: (hiddenKeys: string[]) => void;

  /**
   * Enable column visibility toggle via right-click on header. Default: `false`.
   */
  enableColumnVisibilityToggle?: boolean;
}

// === Component types ===

export interface ListViewTableProps<T = any>
  extends BoxProps, ListViewTableBaseProps<T>, StylesApiProps<ListViewTableFactory> {}

export type ListViewTableFactory = Factory<{
  props: ListViewTableProps<any>;
  ref: HTMLDivElement;
  stylesNames: ListViewTableStylesNames;
  vars: ListViewTableCssVariables;
}>;
