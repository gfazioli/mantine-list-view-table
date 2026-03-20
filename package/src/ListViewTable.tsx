import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconGripVertical,
  IconSelector,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  BoxProps,
  Center,
  Checkbox,
  createVarsResolver,
  factory,
  Factory,
  Group,
  Loader,
  MantineColor,
  MantineSpacing,
  Stack,
  StylesApiProps,
  Table,
  TableProps,
  Text,
  UnstyledButton,
  useProps,
  useStyles,
} from '@mantine/core';
import { useColumnReorder } from './hooks/use-column-reorder';
import { useColumnResize } from './hooks/use-column-resize';
import { useColumnVisibility } from './hooks/use-column-visibility';
import { useKeyboardNavigation } from './hooks/use-keyboard-navigation';
import { useRowSelection } from './hooks/use-row-selection';
import { useSorting } from './hooks/use-sorting';
import type {
  ListViewTableColumn,
  ListViewTableContextMenuInfo,
  ListViewTableCssVariables,
  ListViewTableResizeMode,
  ListViewTableSelectionMode,
  ListViewTableSortStatus,
  ListViewTableStylesNames,
} from './types';
import { getNestedValue, humanize } from './utils';
import classes from './ListViewTable.module.css';

export interface ListViewTableBaseProps<T = any> {
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

  /**
   * Additional props passed directly to the Mantine Table component.
   */
  tableProps?: Partial<TableProps>;

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

  /**
   * Current sort status. When provided with `onSort`, external sorting mode is used.
   */
  sortStatus?: ListViewTableSortStatus;

  /**
   * Callback fired when sort changes.
   */
  onSort?: (sortStatus: ListViewTableSortStatus) => void;

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

  /**
   * Enable keyboard navigation. Default: `true` when `selectionMode` is defined.
   */
  enableKeyboardNavigation?: boolean;

  /**
   * Callback fired when a row is activated (Enter key).
   */
  onRowActivate?: (record: T, index: number) => void;

  /**
   * Render function for the context menu. Return null to prevent the context menu.
   */
  renderContextMenu?: (info: ListViewTableContextMenuInfo<T>) => React.ReactNode;

  /**
   * Callback fired on right-click on a row.
   */
  onRowContextMenu?: (record: T, index: number, event: React.MouseEvent) => void;

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

export interface ListViewTableProps<T = any>
  extends BoxProps, ListViewTableBaseProps<T>, StylesApiProps<ListViewTableFactory> {}

export type ListViewTableFactory = Factory<{
  props: ListViewTableProps<any>;
  ref: HTMLDivElement;
  stylesNames: ListViewTableStylesNames;
  vars: ListViewTableCssVariables;
}>;

const defaultProps: Partial<ListViewTableProps> = {
  height: 'auto',
  width: '100%',
  emptyText: 'No data available',
  withTableBorder: false,
  withRowBorders: true,
  withColumnBorders: true,
  highlightOnHover: false,
  enableColumnReordering: false,
  enableColumnResizing: false,
  verticalAlign: 'middle',
  horizontalSpacing: 'sm',
  verticalSpacing: 'xs',
};

const varsResolver = createVarsResolver<ListViewTableFactory>(
  (_, { height, width, selectedRowColor }) => ({
    root: {
      '--list-view-height': typeof height === 'number' ? `${height}px` : height || '400px',
      '--list-view-width': typeof width === 'number' ? `${width}px` : width || '100%',
      '--list-view-header-title-font-size': 'var(--mantine-font-size-sm)',
      '--list-view-header-title-font-weight': '500',
      '--list-view-cell-font-size': 'var(--mantine-font-size-sm)',
      '--list-view-cell-font-weight': '400',
      '--list-view-selected-row-color': selectedRowColor || undefined,
      '--list-view-sticky-blur': undefined,
    },
  })
);

export const ListViewTable = factory<ListViewTableFactory>((_props, ref) => {
  const props = useProps('ListViewTable', defaultProps, _props);
  const {
    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    columns,
    data,
    rowKey = 'id',
    height,
    width,
    layout,
    captionSide,
    borderColor,
    withTableBorder,
    withColumnBorders,
    withRowBorders,
    striped,
    stripedColor,
    highlightOnHover,
    highlightOnHoverColor,
    stickyHeader,
    stickyHeaderOffset,
    tabularNums,
    loading,
    emptyText,
    sortStatus,
    onSort,
    onRowClick,
    onRowDoubleClick,
    onColumnReorder,
    onColumnResize,
    enableColumnReordering,
    enableColumnResizing,
    resizeMode,
    rowClassName,
    rowStyle,
    noWrap,
    verticalAlign,
    horizontalSpacing,
    verticalSpacing,
    loadingProps,
    loadingComponent,
    tableProps,
    // Row selection
    selectionMode,
    selectedRows,
    defaultSelectedRows,
    onSelectionChange,
    selectedRowColor,
    // Keyboard navigation
    enableKeyboardNavigation,
    onRowActivate,
    // Context menu
    renderContextMenu,
    onRowContextMenu,
    // Column visibility
    hiddenColumns,
    defaultHiddenColumns,
    onHiddenColumnsChange,
    enableColumnVisibilityToggle,
    ...others
  } = props;

  const [focusedColumn, setFocusedColumn] = useState<number | null>(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    content: React.ReactNode;
  } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const getStyles = useStyles<ListViewTableFactory>({
    name: 'ListViewTable',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  // Generate row key
  const getRowKey = useCallback(
    (record: any, index: number): React.Key => {
      if (typeof rowKey === 'function') {
        return rowKey(record, index);
      }
      return getNestedValue(record, rowKey as string) ?? index;
    },
    [rowKey]
  );

  // === Hooks ===

  const { sortedData, effectiveSortStatus, handleSort } = useSorting({
    data,
    sortStatus,
    onSort,
  });

  const {
    effectiveColumns,
    draggedColumn,
    dragOverColumn,
    handleColumnDragStart,
    handleColumnDragOver,
    handleColumnDragLeave,
    handleColumnDrop,
    handleColumnDragEnd,
  } = useColumnReorder({
    columns,
    enableColumnReordering: enableColumnReordering!,
    onColumnReorder,
  });

  const { visibleColumns, hiddenColumnKeys, toggleColumn } = useColumnVisibility({
    columns: effectiveColumns,
    hiddenColumns,
    defaultHiddenColumns,
    onHiddenColumnsChange,
  });

  const {
    isResizeActive,
    getColumnStyle,
    getTableStyle,
    handleResizeStart,
    handleResizeDoubleClick,
    tableRef,
  } = useColumnResize({
    visibleColumns,
    resizeMode,
    onColumnResize,
  });

  const {
    handleRowClick: handleSelectionClick,
    isSelected,
    selectAll,
  } = useRowSelection({
    data: sortedData,
    getRowKey,
    selectionMode,
    selectedRows,
    defaultSelectedRows,
    onSelectionChange,
  });

  const kbEnabled = enableKeyboardNavigation ?? selectionMode !== undefined;

  const { focusedRowIndex, setFocusedRowIndex, handleKeyDown } = useKeyboardNavigation({
    enabled: kbEnabled,
    rowCount: sortedData.length,
    onActivateRow: onRowActivate ? (index) => onRowActivate(sortedData[index], index) : undefined,
    onSelectRow: selectionMode
      ? (index, _event) => {
          // Space toggles selection like Cmd+click
          const syntheticEvent = {
            metaKey: true,
            ctrlKey: false,
            shiftKey: false,
          } as React.MouseEvent;
          handleSelectionClick(index, syntheticEvent);
        }
      : undefined,
    onSelectAll: selectionMode === 'multiple' ? selectAll : undefined,
  });

  // Dynamic table-layout (resolves Issue #4)
  const tableLayout = useMemo(() => {
    if (layout) {
      return layout;
    }
    if (isResizeActive) {
      return 'fixed' as const;
    }
    return undefined;
  }, [layout, isResizeActive]);

  // Close context menu on click outside
  useEffect(() => {
    if (!contextMenu) {
      return;
    }
    const handleClick = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [contextMenu]);

  // Handle row context menu
  const handleRowContextMenu = useCallback(
    (record: any, index: number, event: React.MouseEvent) => {
      onRowContextMenu?.(record, index, event);

      if (renderContextMenu) {
        event.preventDefault();

        // Select row if not already selected
        if (!isSelected(getRowKey(record, index))) {
          handleSelectionClick(index, event);
        }

        const content = renderContextMenu({ record, index, event });
        if (content) {
          setContextMenu({ x: event.clientX, y: event.clientY, content });
        }
      }
    },
    [onRowContextMenu, renderContextMenu, isSelected, getRowKey, handleSelectionClick]
  );

  // Handle header context menu for column visibility
  const handleHeaderContextMenu = useCallback(
    (event: React.MouseEvent) => {
      if (!enableColumnVisibilityToggle) {
        return;
      }
      event.preventDefault();

      const content = (
        <Stack gap={0}>
          {effectiveColumns
            .filter((col) => !col.hidden)
            .map((col) => {
              const key = col.key as string;
              const title = col.title || humanize(key);
              return (
                <UnstyledButton
                  key={key}
                  style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}
                  onClick={() => {
                    toggleColumn(key);
                  }}
                >
                  <Checkbox
                    size="xs"
                    checked={!hiddenColumnKeys.has(key)}
                    onChange={() => toggleColumn(key)}
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                  />
                  <Text size="sm">{typeof title === 'string' ? title : key}</Text>
                </UnstyledButton>
              );
            })}
        </Stack>
      );

      setContextMenu({ x: event.clientX, y: event.clientY, content });
    },
    [enableColumnVisibilityToggle, effectiveColumns, hiddenColumnKeys, toggleColumn]
  );

  // Render header cell
  const renderHeaderCell = useCallback(
    (column: ListViewTableColumn, index: number) => {
      const isSorted = effectiveSortStatus?.columnKey === column.key;
      const sortDirection = isSorted ? effectiveSortStatus.direction : null;
      const title = column.title || humanize(column.key as string);
      const columnStyle = getColumnStyle(column, index);

      return (
        <Table.Th
          key={column.key as React.Key}
          {...getStyles('headerCell', {
            className: column.sticky ? getStyles('stickyHeaderColumn').className : undefined,
            style: {
              ...(column.sticky
                ? { position: 'sticky', left: 0, zIndex: 11 }
                : { position: 'relative' }),
              ...columnStyle,
              textAlign: column.textAlign,
              whiteSpace: column.noWrap || noWrap ? 'nowrap' : undefined,
              textOverflow: column.ellipsis ? 'ellipsis' : undefined,
              overflow: column.ellipsis ? 'hidden' : undefined,
              top: 0,
            },
          })}
          draggable={enableColumnReordering && column.draggable !== false}
          onDragStart={(e) => handleColumnDragStart(index, e)}
          onDragOver={(e) => handleColumnDragOver(index, e)}
          onDragLeave={handleColumnDragLeave}
          onDrop={(e) => handleColumnDrop(index, e)}
          onDragEnd={handleColumnDragEnd}
          data-dragging={draggedColumn === index ? 'true' : undefined}
          data-drag-over={dragOverColumn === index ? 'true' : undefined}
          data-focused={focusedColumn === index ? 'true' : undefined}
          data-column-key={column.key as string}
        >
          <Group
            gap={0}
            wrap="nowrap"
            justify={
              column.textAlign === 'center'
                ? 'center'
                : column.textAlign === 'right'
                  ? 'flex-end'
                  : 'flex-start'
            }
          >
            {enableColumnReordering && column.draggable !== false && (
              <ActionIcon size="xs" variant="subtle" {...getStyles('dragHandle')}>
                <IconGripVertical size={12} />
              </ActionIcon>
            )}

            <UnstyledButton
              {...getStyles('headerButton', { style: { flex: 1 } })}
              onClick={() => column.sortable && handleSort(column.key as string)}
              onFocus={() => setFocusedColumn(index)}
              onBlur={() => setFocusedColumn(null)}
              disabled={!column.sortable}
            >
              <Group gap="xs" wrap="nowrap">
                {column.renderHeader ? (
                  column.renderHeader()
                ) : (
                  <Text {...getStyles('headerTitle')}>{title}</Text>
                )}
                {column.sortable &&
                  (isSorted ? (
                    sortDirection === 'asc' ? (
                      <IconChevronUp
                        size={14}
                        {...getStyles('sortIcon', { style: { opacity: 1 } })}
                      />
                    ) : (
                      <IconChevronDown
                        size={14}
                        {...getStyles('sortIcon', { style: { opacity: 1 } })}
                      />
                    )
                  ) : (
                    <IconSelector
                      size={14}
                      {...getStyles('sortIcon', { style: { opacity: 0.5 } })}
                    />
                  ))}
              </Group>
            </UnstyledButton>

            {enableColumnResizing &&
              column.resizable !== false &&
              index < visibleColumns.length - 1 && (
                <Box
                  {...getStyles('resizeHandle')}
                  onMouseDown={(e) => handleResizeStart(index, e)}
                  onDoubleClick={() => handleResizeDoubleClick(index)}
                />
              )}
          </Group>
        </Table.Th>
      );
    },
    [
      effectiveSortStatus,
      enableColumnReordering,
      enableColumnResizing,
      draggedColumn,
      dragOverColumn,
      focusedColumn,
      visibleColumns,
      noWrap,
      handleSort,
      handleColumnDragStart,
      handleColumnDragOver,
      handleColumnDragLeave,
      handleColumnDrop,
      handleColumnDragEnd,
      handleResizeStart,
      handleResizeDoubleClick,
      getColumnStyle,
      getStyles,
    ]
  );

  // Render cell
  const renderCell = useCallback(
    (record: any, column: ListViewTableColumn, rowIndex: number, colIdx: number) => {
      const value = getNestedValue(record, column.key as string);
      const cellContent = column.renderCell ? column.renderCell(record, rowIndex) : value;
      const columnStyle = getColumnStyle(column, colIdx);

      const cellClassName =
        typeof column.cellClassName === 'function'
          ? column.cellClassName(record, rowIndex)
          : column.cellClassName;

      const stickyColumnClass = column.sticky ? getStyles('stickyColumn').className : '';
      const finalCellClassName = [cellClassName, stickyColumnClass].filter(Boolean).join(' ');

      const cellStyle =
        typeof column.cellStyle === 'function'
          ? column.cellStyle(record, rowIndex)
          : column.cellStyle;

      return (
        <Table.Td
          key={column.key as React.Key}
          className={finalCellClassName}
          {...getStyles('cell', {
            className: stickyColumnClass,
            style: {
              ...columnStyle,
              textAlign: column.textAlign,
              whiteSpace: column.noWrap || noWrap ? 'nowrap' : undefined,
              textOverflow: column.ellipsis ? 'ellipsis' : undefined,
              overflow: column.ellipsis ? 'hidden' : 'visible',
              position: column.sticky ? 'sticky' : undefined,
              left: column.sticky ? 0 : undefined,
              zIndex: column.sticky ? 10 : undefined,
              verticalAlign,
              ...cellStyle,
            },
          })}
          data-column-key={column.key as string}
        >
          {cellContent}
        </Table.Td>
      );
    },
    [noWrap, verticalAlign, getStyles, getColumnStyle]
  );

  const isVertical = tableProps?.variant === 'vertical';

  // === Render: Loading ===
  if (loading) {
    return (
      <Box {...getStyles('root')} ref={ref} {...others}>
        <Center h={height} {...getStyles('loader')} role="status">
          {loadingComponent ? (
            React.isValidElement(loadingComponent) ? (
              loadingComponent
            ) : loadingComponent && typeof loadingComponent === 'function' ? (
              React.createElement(loadingComponent, loadingProps)
            ) : null
          ) : (
            <Loader {...loadingProps} />
          )}
        </Center>
      </Box>
    );
  }

  // === Render: Empty ===
  if (!data || data.length === 0) {
    return (
      <Box {...getStyles('root')} ref={ref} {...others}>
        <Center h={height} {...getStyles('emptyState')}>
          <Stack align="center" gap="md">
            {typeof emptyText === 'string' ? (
              <Text size="lg" c="dimmed">
                {emptyText}
              </Text>
            ) : (
              emptyText
            )}
          </Stack>
        </Center>
      </Box>
    );
  }

  // === Render: Vertical variant ===
  if (isVertical) {
    // Bug #6 guard: vertical needs at least 2 columns
    if (visibleColumns.length < 2) {
      return (
        <Box {...getStyles('root')} ref={ref} {...others}>
          <Center h={height} {...getStyles('emptyState')}>
            <Text size="lg" c="dimmed">
              Vertical variant requires at least 2 columns
            </Text>
          </Center>
        </Box>
      );
    }

    return (
      <Box {...getStyles('root')} ref={ref} {...others}>
        <Table
          {...getStyles('table')}
          withTableBorder={withTableBorder}
          layout={layout || 'fixed'}
          variant="vertical"
          {...tableProps}
          ref={tableRef}
        >
          <Table.Tbody {...getStyles('body')}>
            {sortedData.map((row, rowIndex) => (
              <Table.Tr key={getRowKey(row, rowIndex)} {...getStyles('row')}>
                <Table.Th
                  {...getStyles('headerCell', { style: { width: visibleColumns[0]?.width } })}
                >
                  {(row as any)[visibleColumns[0].key as string]}
                </Table.Th>
                <Table.Td {...getStyles('cell', { style: { width: visibleColumns[1]?.width } })}>
                  {(row as any)[visibleColumns[1].key as string]}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    );
  }

  // === Render: Normal table ===
  return (
    <Box
      {...getStyles('root')}
      ref={ref}
      tabIndex={kbEnabled ? 0 : undefined}
      onKeyDown={kbEnabled ? handleKeyDown : undefined}
      {...others}
    >
      <Table
        {...getStyles('table', { style: getTableStyle() })}
        withTableBorder={withTableBorder}
        withColumnBorders={withColumnBorders}
        withRowBorders={withRowBorders}
        striped={striped}
        stripedColor={stripedColor}
        highlightOnHover={highlightOnHover && !selectionMode}
        highlightOnHoverColor={highlightOnHoverColor}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        borderColor={borderColor}
        captionSide={captionSide}
        stickyHeader={stickyHeader}
        stickyHeaderOffset={stickyHeaderOffset}
        tabularNums={tabularNums}
        layout={tableLayout}
        {...tableProps}
        ref={tableRef}
      >
        <Table.Thead
          {...getStyles('header')}
          onContextMenu={enableColumnVisibilityToggle ? handleHeaderContextMenu : undefined}
        >
          <Table.Tr>
            {visibleColumns.map((column, index) => renderHeaderCell(column, index))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody {...getStyles('body')}>
          {sortedData.map((record, rowIndex) => {
            const key = getRowKey(record, rowIndex);
            const rowClassNameValue =
              typeof rowClassName === 'function' ? rowClassName(record, rowIndex) : rowClassName;

            let rowStyleValue: React.CSSProperties = {};
            if (typeof rowStyle === 'function') {
              rowStyleValue = rowStyle(record, rowIndex) || {};
            } else if (rowStyle) {
              rowStyleValue = rowStyle;
            }

            const selected = isSelected(key);
            const focused = focusedRowIndex === rowIndex;

            const combinedStyle: React.CSSProperties = {
              cursor: onRowClick || onRowDoubleClick || selectionMode ? 'pointer' : 'default',
              ...rowStyleValue,
            };

            const rowClasses = [
              rowClassNameValue,
              selected ? getStyles('selectedRow').className : undefined,
              focused ? getStyles('focusedRow').className : undefined,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <Table.Tr
                key={key}
                {...getStyles('row', { style: combinedStyle })}
                className={rowClasses || undefined}
                onClick={(event) => {
                  if (selectionMode) {
                    handleSelectionClick(rowIndex, event);
                    setFocusedRowIndex(rowIndex);
                  }
                  onRowClick?.(record, rowIndex, event);
                }}
                onDoubleClick={(event) => onRowDoubleClick?.(record, rowIndex, event)}
                onContextMenu={
                  renderContextMenu || onRowContextMenu
                    ? (event) => handleRowContextMenu(record, rowIndex, event)
                    : undefined
                }
                data-selected={selected ? 'true' : undefined}
                data-focused={focused ? 'true' : undefined}
              >
                {visibleColumns.map((column, colIdx) =>
                  renderCell(record, column, rowIndex, colIdx)
                )}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          {...getStyles('contextMenu')}
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            zIndex: 1000,
          }}
        >
          {contextMenu.content}
        </div>
      )}
    </Box>
  );
});

ListViewTable.classes = classes;
ListViewTable.displayName = 'ListViewTable';
