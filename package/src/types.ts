import React from 'react';
import { MantineStyleProp } from '@mantine/core';

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

// Note: ListViewTableBaseProps, ListViewTableProps, and ListViewTableFactory
// are defined in ListViewTable.tsx because mantine-docgen-script requires
// all prop interfaces in the same file as the factory component.
