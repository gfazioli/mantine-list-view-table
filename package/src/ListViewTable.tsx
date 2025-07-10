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
  createVarsResolver,
  factory,
  Factory,
  Group,
  Loader,
  MantineColor,
  MantineSpacing,
  MantineStyleProp,
  MantineTheme,
  Stack,
  StylesApiProps,
  Table,
  TableProps,
  Text,
  UnstyledButton,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './ListViewTable.module.css';

export type ListViewTableStylesNames =
  | 'root'
  | 'table'
  | 'header'
  | 'headerCell'
  | 'headerTitle'
  | 'sortIcon'
  | 'dragHandle'
  | 'resizeHandle'
  | 'body'
  | 'row'
  | 'cell'
  | 'emptyState'
  | 'loader';

export type ListViewTableCssVariables = {
  root: '--list-view-height' | '--list-view-width';
};

export type ListViewTableSortDirection = 'asc' | 'desc';

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
   * Whether the column can be resized.
   */
  resizable?: boolean;

  /**
   * Whether the column can be dragged to reorder.
   */
  draggable?: boolean;

  /**
   * Column width. Can be string or number.
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

  /**
   * Whether the column is hidden.
   */
  hidden?: boolean;

  /**
   * Media query for responsive visibility.
   */
  visibleMediaQuery?: string | ((theme: MantineTheme) => string);
}

export interface ListViewTableSortStatus {
  columnKey: string;
  direction: ListViewTableSortDirection;
}

export interface ListViewTableBaseProps<T = any>
  extends Omit<
    TableProps,
    | 'data'
    | 'children'
    | 'withTableBorder'
    | 'withColumnBorders'
    | 'withRowBorders'
    | 'striped'
    | 'stripedColor'
    | 'highlightOnHover'
    | 'highlightOnHoverColor'
    | 'horizontalSpacing'
    | 'verticalSpacing'
    | 'borderColor'
    | 'captionSide'
    | 'stickyHeader'
    | 'stickyHeaderOffset'
    | 'tabularNums'
    | 'layout'
    | 'variant'
    | 'style'
    | 'className'
    | 'classNames'
    | 'styles'
    | 'vars'
    | 'unstyled'
  > {
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
   * Value of `table-layout` style, `auto` by default
   */
  layout?: React.CSSProperties['tableLayout'];

  /**
   * Determines on which side `Table.Caption` is displayed, `bottom` by default
   */
  captionSide?: 'top' | 'bottom';

  /**
   * Color of table borders, key of `theme.colors` or any valid CSS color
   */
  borderColor?: MantineColor;

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
   * Background color of striped rows, key of `theme.colors` or any valid CSS color
   */
  stripedColor?: MantineColor;

  /**
   * Whether to highlight rows on hover.
   */
  highlightOnHover?: boolean;

  /**
   * Background color of table rows when hovered, key of `theme.colors` or any valid CSS color
   */
  highlightOnHoverColor?: MantineColor;

  /**
   * Determines whether `Table.Thead` should be sticky, `false` by default
   */
  stickyHeader?: boolean;

  /**
   * Offset from top at which `Table.Thead` should become sticky, `0` by default
   */
  stickyHeaderOffset?: number | string;

  /**
   * Determines whether `font-variant-numeric: tabular-nums` style should be set, `false` by default
   */
  tabularNums?: boolean;

  /**
   * Loading state.
   */
  loading?: boolean;

  /**
   * Text to show when no data is available.
   */
  emptyText?: string;

  /**
   * Current sort status.
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
   * Callback fired when columns are reordered.
   */
  onColumnReorder?: (fromIndex: number, toIndex: number) => void;

  /**
   * Callback fired when a column is resized.
   */
  onColumnResize?: (columnKey: string, width: number) => void;

  /**
   * Whether to enable column reordering via drag and drop.
   */
  enableColumnReordering?: boolean;

  /**
   * Whether to enable column resizing.
   */
  enableColumnResizing?: boolean;

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
   * Horizontal spacing between columns.
   */
  horizontalSpacing?: MantineSpacing;

  /**
   * Vertical spacing between rows.
   */
  verticalSpacing?: MantineSpacing;
}

export interface ListViewTableProps<T = any>
  extends BoxProps,
    ListViewTableBaseProps<T>,
    StylesApiProps<ListViewTableFactory> {}

export type ListViewTableFactory = Factory<{
  props: ListViewTableProps<any>;
  ref: HTMLTableElement;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
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
  enableColumnReordering: true,
  enableColumnResizing: true,
  verticalAlign: 'middle',
  horizontalSpacing: 'sm',
  verticalSpacing: 'xs',
};

const varsResolver = createVarsResolver<ListViewTableFactory>((_, { height, width }) => ({
  root: {
    '--list-view-height': typeof height === 'number' ? `${height}px` : height || '400px',
    '--list-view-width': typeof width === 'number' ? `${width}px` : width || '100%',
  },
}));

// Helper function to get nested value
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper function to humanize column keys
const humanize = (str: string): string => {
  return str
    .split('.')
    .pop()!
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

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
    rowClassName,
    rowStyle,
    noWrap,
    verticalAlign,
    horizontalSpacing,
    verticalSpacing,
    // Separate Box props from Table props
    id,
    onClick,
    onContextMenu,
    onDoubleClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    ...tableProps
  } = props;

  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const [focusedColumn, setFocusedColumn] = useState<number | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Internal state for sorting if onSort is not provided
  const [internalSortStatus, setInternalSortStatus] = useState<ListViewTableSortStatus | undefined>(
    undefined
  );

  // Internal columns state for reordering if onColumnReorder is not provided
  const [internalColumns, setInternalColumns] = useState<ListViewTableColumn[]>(columns);

  // Reset internal columns if columns prop changes
  useEffect(() => {
    setInternalColumns(columns);
  }, [columns]);

  const tableRef = useRef<HTMLTableElement>(null);
  const isFirstRenderRef = useRef(true);

  // Separate Box props for the container
  const boxProps = {
    id,
    onClick,
    onContextMenu,
    onDoubleClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
  };

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

  // Initialize column widths
  useEffect(() => {
    const initialWidths: Record<string, number> = {};
    columns.forEach((column) => {
      if (column.width && !columnWidths[column.key as string]) {
        let widthValue =
          typeof column.width === 'string' ? parseInt(column.width, 10) || 150 : column.width;

        // Apply minWidth constraint
        if (column.minWidth) {
          const minWidthValue =
            typeof column.minWidth === 'string' ? parseInt(column.minWidth, 10) : column.minWidth;
          widthValue = Math.max(widthValue, minWidthValue);
        }

        // Apply maxWidth constraint
        if (column.maxWidth) {
          const maxWidthValue =
            typeof column.maxWidth === 'string' ? parseInt(column.maxWidth, 10) : column.maxWidth;
          widthValue = Math.min(widthValue, maxWidthValue);
        }

        initialWidths[column.key as string] = widthValue;
      }
    });

    if (Object.keys(initialWidths).length > 0) {
      setColumnWidths((prev) => ({ ...prev, ...initialWidths }));
    }
  }, [columns, columnWidths]);

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

  // Determine the effective sort status (external or internal)
  const effectiveSortStatus = sortStatus || internalSortStatus;

  // Handle sort
  const handleSort = useCallback(
    (columnKey: string) => {
      const newDirection: ListViewTableSortDirection =
        effectiveSortStatus?.columnKey === columnKey && effectiveSortStatus.direction === 'asc'
          ? 'desc'
          : 'asc';
      const newSortStatus = { columnKey, direction: newDirection };

      if (onSort) {
        onSort(newSortStatus);
      } else {
        setInternalSortStatus(newSortStatus);
      }
    },
    [onSort, effectiveSortStatus]
  );

  // Handle column drag start
  const handleColumnDragStart = useCallback((index: number, event: React.DragEvent) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', index.toString());
    setDraggedColumn(index);
  }, []);

  // Handle column drag over
  const handleColumnDragOver = useCallback((index: number, event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverColumn(index);
  }, []);

  // Handle column drag leave
  const handleColumnDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  // Handle column drop
  const handleColumnDrop = useCallback(
    (toIndex: number, event: React.DragEvent) => {
      event.preventDefault();
      if (draggedColumn !== null && draggedColumn !== toIndex) {
        if (onColumnReorder) {
          onColumnReorder(draggedColumn, toIndex);
        } else if (enableColumnReordering) {
          // Internal reorder logic
          setInternalColumns((prev) => {
            const newColumns = [...prev];
            const [moved] = newColumns.splice(draggedColumn, 1);
            newColumns.splice(toIndex, 0, moved);
            return newColumns;
          });
        }
      }
      setDraggedColumn(null);
      setDragOverColumn(null);
    },
    [draggedColumn, onColumnReorder, enableColumnReordering]
  );

  // Handle drag end
  const handleColumnDragEnd = useCallback(() => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  }, []);

  // Handle resize start

  const handleResizeStart = useCallback(
    (index: number, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const startX = event.clientX;
      const headerCell = event.currentTarget.closest('th');
      const startWidth = headerCell?.offsetWidth || 100;
      // Use correct columns order after reorder, without relying on block-scoped variable
      const column = (enableColumnReordering && !onColumnReorder ? internalColumns : columns)[
        index
      ];

      const handleMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        let newWidth = startWidth + diff;

        // Apply min/max width constraints
        const minWidth = column.minWidth
          ? typeof column.minWidth === 'string'
            ? parseInt(column.minWidth, 10)
            : column.minWidth
          : 50;
        const maxWidth = column.maxWidth
          ? typeof column.maxWidth === 'string'
            ? parseInt(column.maxWidth, 10)
            : column.maxWidth
          : 1000;

        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

        setColumnWidths((prev) => ({ ...prev, [column.key as string]: newWidth }));

        // Call onColumnResize callback if provided
        if (onColumnResize) {
          onColumnResize(column.key as string, newWidth);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [enableColumnReordering, onColumnReorder, internalColumns, columns, onColumnResize]
  );

  // Use internal columns if managing reorder internally
  const effectiveColumns = enableColumnReordering && !onColumnReorder ? internalColumns : columns;

  // Sort data if sorting is enabled (either internal or external)
  const sortedData = useMemo(() => {
    if (!effectiveSortStatus) {
      return data;
    }

    const { columnKey, direction } = effectiveSortStatus;
    const sorted = [...data].sort((a, b) => {
      const aValue = getNestedValue(a, columnKey);
      const bValue = getNestedValue(b, columnKey);

      if (aValue === null || aValue === undefined) {
        return 1;
      }
      if (bValue === null || bValue === undefined) {
        return -1;
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [data, effectiveSortStatus]);

  // Helper: get visible columns
  const visibleColumns = useMemo(
    () => effectiveColumns.filter((col) => !col.hidden),
    [effectiveColumns]
  );

  // Calculate actual column widths after first rendering
  useEffect(() => {
    if (isFirstRenderRef.current && tableRef.current && data.length > 0) {
      // Add a small delay to ensure the table is fully rendered
      const timeoutId = setTimeout(() => {
        const headerCells = tableRef.current?.querySelectorAll('thead th');
        if (headerCells) {
          const actualWidths: Record<string, number> = {};

          visibleColumns.forEach((column, index) => {
            const cell = headerCells[index];
            if (cell) {
              const rect = cell.getBoundingClientRect();
              actualWidths[column.key as string] = Math.round(rect.width);
            }
          });

          // Update column widths with actual measured values
          setColumnWidths((prev) => ({ ...prev, ...actualWidths }));
        }

        isFirstRenderRef.current = false;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [data, visibleColumns]);

  // Helper: get column width (in px for all except last column in certain cases)
  const getColumnWidth = (col: ListViewTableColumn, idx: number): string | undefined => {
    const w = columnWidths[col.key as string] || col.width;

    // For the last column, we need to be smart about when to force auto width
    if (idx === visibleColumns.length - 1) {
      // Check if ALL columns (including this last one) would have explicit widths
      const allColumnsHaveWidths = visibleColumns.every((column) => {
        const columnWidth = columnWidths[column.key as string] || column.width;
        return columnWidth !== undefined;
      });

      // Only force last column to auto if:
      // 1. ALL columns would have fixed widths AND
      // 2. Column resizing is enabled (meaning the table needs to be flexible)
      // This prevents the table from becoming completely rigid when resizing is needed
      if (allColumnsHaveWidths && enableColumnResizing) {
        return undefined; // auto width
      }

      // If at least one other column is auto, OR resizing is disabled,
      // allow last column to have its specified width
      // This supports these use cases:
      // 1. All auto columns + last fixed column
      // 2. Mixed auto/fixed columns + last fixed column
      // 3. All fixed columns with resizing disabled (e.g., in ScrollContainer)
    }

    if (typeof w === 'number') {
      return `${w}px`;
    }
    if (typeof w === 'string' && w.match(/^[0-9]+$/)) {
      return `${parseInt(w, 10)}px`;
    }
    // If no width, minWidth, or maxWidth is specified, return "auto"
    if (!w && !col.minWidth && !col.maxWidth) {
      return 'auto';
    }
    return w;
  };

  // Calculate actual column widths after first rendering
  useEffect(() => {
    if (isFirstRenderRef.current && tableRef.current && data.length > 0) {
      // Add a small delay to ensure the table is fully rendered
      const timeoutId = setTimeout(() => {
        const headerCells = tableRef.current?.querySelectorAll('thead th');
        if (headerCells) {
          const actualWidths: Record<string, number> = {};

          visibleColumns.forEach((column, index) => {
            const cell = headerCells[index];
            if (cell) {
              const rect = cell.getBoundingClientRect();
              actualWidths[column.key as string] = Math.round(rect.width);
            }
          });

          // Update column widths with actual measured values
          setColumnWidths((prev) => ({ ...prev, ...actualWidths }));
        }

        isFirstRenderRef.current = false;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [data, visibleColumns]);

  // Render header cell
  const renderHeaderCell = useCallback(
    (column: ListViewTableColumn, index: number) => {
      const isSorted = effectiveSortStatus?.columnKey === column.key;
      const sortDirection = isSorted ? effectiveSortStatus.direction : null;
      const title = column.title || humanize(column.key as string);
      const width = getColumnWidth(column, index);
      const isFocused = focusedColumn === index;

      // Get base styles and add conditional classes for focus state
      const headerCellStyles = getStyles('headerCell');
      const className = isFocused
        ? `${headerCellStyles.className} ${headerCellStyles.className}--focused`
        : headerCellStyles.className;

      return (
        <Table.Th
          key={column.key as React.Key}
          {...headerCellStyles}
          className={className}
          style={{
            ...headerCellStyles.style,
            width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            textAlign: column.textAlign,
            position: column.sticky ? 'sticky' : 'relative',
            left: column.sticky ? 0 : undefined,
            zIndex: column.sticky ? 1 : undefined,
          }}
          draggable={enableColumnReordering && column.draggable !== false}
          onDragStart={(e) => handleColumnDragStart(index, e)}
          onDragOver={(e) => handleColumnDragOver(index, e)}
          onDragLeave={handleColumnDragLeave}
          onDrop={(e) => handleColumnDrop(index, e)}
          onDragEnd={handleColumnDragEnd}
          data-dragging={draggedColumn === index ? 'true' : undefined}
          data-drag-over={dragOverColumn === index ? 'true' : undefined}
          data-focused={isFocused ? 'true' : undefined}
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
              {...getStyles('headerTitle')}
              onClick={() => column.sortable && handleSort(column.key as string)}
              onFocus={() => setFocusedColumn(index)}
              onBlur={() => setFocusedColumn(null)}
              style={{ flex: 1 }}
              disabled={!column.sortable}
            >
              <Group gap="xs" wrap="nowrap">
                {column.renderHeader ? (
                  column.renderHeader()
                ) : (
                  <Text size="sm" fw={500}>
                    {title}
                  </Text>
                )}
                {column.sortable &&
                  (isSorted ? (
                    sortDirection === 'asc' ? (
                      <IconChevronUp size={14} {...getStyles('sortIcon')} style={{ opacity: 1 }} />
                    ) : (
                      <IconChevronDown
                        size={14}
                        {...getStyles('sortIcon')}
                        style={{ opacity: 1 }}
                      />
                    )
                  ) : (
                    <IconSelector size={14} {...getStyles('sortIcon')} style={{ opacity: 0.5 }} />
                  ))}
              </Group>
            </UnstyledButton>

            {enableColumnResizing &&
              column.resizable !== false &&
              index < visibleColumns.length - 1 && (
                <Box
                  {...getStyles('resizeHandle')}
                  onMouseDown={(e) => handleResizeStart(index, e)}
                  style={{
                    cursor: 'col-resize',
                    width: 4,
                    height: '100%',
                    position: 'absolute',
                    right: withColumnBorders ? -2 : 0, // Offset to avoid covering the border
                    top: 0,
                  }}
                />
              )}
          </Group>
        </Table.Th>
      );
    },
    [
      effectiveSortStatus,
      columnWidths,
      enableColumnReordering,
      enableColumnResizing,
      draggedColumn,
      dragOverColumn,
      focusedColumn,
      visibleColumns,
      handleSort,
      handleColumnDragStart,
      handleColumnDragOver,
      handleColumnDragLeave,
      handleColumnDrop,
      handleColumnDragEnd,
      handleResizeStart,
      getStyles,
      withColumnBorders,
    ]
  );

  // Render cell
  const renderCell = useCallback(
    (record: any, column: ListViewTableColumn, rowIndex: number, colIdx: number) => {
      const value = getNestedValue(record, column.key as string);
      const cellContent = column.renderCell ? column.renderCell(record, rowIndex) : value;
      const width = getColumnWidth(column, colIdx);

      const cellClassName =
        typeof column.cellClassName === 'function'
          ? column.cellClassName(record, rowIndex)
          : column.cellClassName;

      const cellStyle =
        typeof column.cellStyle === 'function'
          ? column.cellStyle(record, rowIndex)
          : column.cellStyle;

      return (
        <Table.Td
          key={column.key as React.Key}
          {...getStyles('cell')}
          className={cellClassName}
          style={{
            width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            textAlign: column.textAlign,
            whiteSpace: column.noWrap || noWrap ? 'nowrap' : 'normal',
            textOverflow: column.ellipsis ? 'ellipsis' : 'clip',
            overflow: column.ellipsis ? 'hidden' : 'visible',
            position: column.sticky ? 'sticky' : 'relative',
            left: column.sticky ? 0 : undefined,
            zIndex: column.sticky ? 1 : undefined,
            verticalAlign,
            ...cellStyle,
          }}
        >
          {cellContent}
        </Table.Td>
      );
    },
    [columnWidths, noWrap, verticalAlign, getStyles, visibleColumns]
  );

  const isVertical = tableProps.variant === 'vertical';

  if (loading) {
    return (
      <Box {...getStyles('root')} ref={ref} {...boxProps}>
        <Center h={height} {...getStyles('loader')} role="status">
          <Loader size="lg" />
        </Center>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box {...getStyles('root')} ref={ref} {...boxProps}>
        <Center h={height} {...getStyles('emptyState')}>
          <Stack align="center" gap="md">
            <Text size="lg" c="dimmed">
              {emptyText}
            </Text>
          </Stack>
        </Center>
      </Box>
    );
  }

  if (isVertical) {
    // Render vertical variant: each row is a Th/Td pair
    return (
      <Box {...getStyles('root')} ref={ref} {...boxProps}>
        <Table
          {...getStyles('table')}
          withTableBorder={withTableBorder}
          layout={layout || 'fixed'}
          variant="vertical"
          {...tableProps}
          ref={tableRef}
        >
          <Table.Tbody {...getStyles('body')}>
            {data.map((row, rowIndex) => (
              <Table.Tr key={getRowKey(row, rowIndex)} {...getStyles('row')}>
                <Table.Th {...getStyles('headerCell')} style={{ width: visibleColumns[0]?.width }}>
                  {row[visibleColumns[0].key as string]}
                </Table.Th>
                <Table.Td {...getStyles('cell')} style={{ width: visibleColumns[1]?.width }}>
                  {row[visibleColumns[1].key as string]}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    );
  }

  return (
    <Box {...getStyles('root')} ref={ref} {...boxProps}>
      <Table
        {...getStyles('table')}
        withTableBorder={withTableBorder}
        withColumnBorders={withColumnBorders}
        withRowBorders={withRowBorders}
        striped={striped}
        stripedColor={stripedColor}
        highlightOnHover={highlightOnHover}
        highlightOnHoverColor={highlightOnHoverColor}
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
        borderColor={borderColor}
        captionSide={captionSide}
        stickyHeader={stickyHeader}
        stickyHeaderOffset={stickyHeaderOffset}
        tabularNums={tabularNums}
        layout={layout}
        {...tableProps}
        ref={tableRef}
      >
        <Table.Thead {...getStyles('header')}>
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

            const combinedStyle: React.CSSProperties = {
              cursor: onRowClick || onRowDoubleClick ? 'pointer' : 'default',
              ...rowStyleValue,
            };

            return (
              <Table.Tr
                key={key}
                {...getStyles('row')}
                className={rowClassNameValue}
                style={combinedStyle}
                onClick={(event) => onRowClick?.(record, rowIndex, event)}
                onDoubleClick={(event) => onRowDoubleClick?.(record, rowIndex, event)}
              >
                {visibleColumns.map((column, colIdx) =>
                  renderCell(record, column, rowIndex, colIdx)
                )}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Box>
  );
});

ListViewTable.classes = classes;
ListViewTable.displayName = 'ListViewTable';
