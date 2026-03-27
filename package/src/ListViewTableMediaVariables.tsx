import React from 'react';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  MantineBreakpoint,
  useMantineTheme,
  type MantineSpacing,
  type StyleProp,
} from '@mantine/core';

function toCssValue(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
}

const FONT_SIZE_MAP: Record<string, string> = {
  xs: 'var(--mantine-font-size-xs)',
  sm: 'var(--mantine-font-size-sm)',
  md: 'var(--mantine-font-size-md)',
  lg: 'var(--mantine-font-size-lg)',
  xl: 'var(--mantine-font-size-xl)',
};

function toFontSizeValue(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return FONT_SIZE_MAP[value] ?? value;
}

function toFontWeightValue(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return String(value);
}

const SPACING_MAP: Record<string, string> = {
  xs: 'var(--mantine-spacing-xs)',
  sm: 'var(--mantine-spacing-sm)',
  md: 'var(--mantine-spacing-md)',
  lg: 'var(--mantine-spacing-lg)',
  xl: 'var(--mantine-spacing-xl)',
};

function toSpacingValue(value: MantineSpacing | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return SPACING_MAP[value] ?? value;
}

interface ListViewTableMediaVariablesProps {
  height?: StyleProp<React.CSSProperties['height']>;
  width?: StyleProp<React.CSSProperties['width']>;
  horizontalSpacing?: StyleProp<MantineSpacing>;
  verticalSpacing?: StyleProp<MantineSpacing>;
  headerTitleFontSize?: StyleProp<string | number>;
  headerTitleFontWeight?: StyleProp<React.CSSProperties['fontWeight']>;
  cellFontSize?: StyleProp<string | number>;
  cellFontWeight?: StyleProp<React.CSSProperties['fontWeight']>;
  selector: string;
}

export function ListViewTableMediaVariables({
  height,
  width,
  horizontalSpacing,
  verticalSpacing,
  headerTitleFontSize,
  headerTitleFontWeight,
  cellFontSize,
  cellFontWeight,
  selector,
}: ListViewTableMediaVariablesProps) {
  const theme = useMantineTheme();

  const baseStyles: Record<string, string | undefined> = filterProps({
    '--list-view-height': toCssValue(getBaseValue(height)),
    '--list-view-width': toCssValue(getBaseValue(width)),
    '--list-view-horizontal-spacing': toSpacingValue(
      getBaseValue(horizontalSpacing) as MantineSpacing | undefined
    ),
    '--list-view-vertical-spacing': toSpacingValue(
      getBaseValue(verticalSpacing) as MantineSpacing | undefined
    ),
    '--list-view-header-title-font-size': toFontSizeValue(getBaseValue(headerTitleFontSize)),
    '--list-view-header-title-font-weight': toFontWeightValue(getBaseValue(headerTitleFontWeight)),
    '--list-view-cell-font-size': toFontSizeValue(getBaseValue(cellFontSize)),
    '--list-view-cell-font-weight': toFontWeightValue(getBaseValue(cellFontWeight)),
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof height === 'object' && height[breakpoint] !== undefined) {
        acc[breakpoint]['--list-view-height'] = toCssValue(height[breakpoint])!;
      }

      if (typeof width === 'object' && width[breakpoint] !== undefined) {
        acc[breakpoint]['--list-view-width'] = toCssValue(width[breakpoint])!;
      }

      if (typeof horizontalSpacing === 'object' && horizontalSpacing[breakpoint] !== undefined) {
        acc[breakpoint]['--list-view-horizontal-spacing'] = toSpacingValue(
          horizontalSpacing[breakpoint] as MantineSpacing
        )!;
      }

      if (typeof verticalSpacing === 'object' && verticalSpacing[breakpoint] !== undefined) {
        acc[breakpoint]['--list-view-vertical-spacing'] = toSpacingValue(
          verticalSpacing[breakpoint] as MantineSpacing
        )!;
      }

      if (
        typeof headerTitleFontSize === 'object' &&
        headerTitleFontSize[breakpoint] !== undefined
      ) {
        acc[breakpoint]['--list-view-header-title-font-size'] = toFontSizeValue(
          headerTitleFontSize[breakpoint]
        )!;
      }

      if (
        typeof headerTitleFontWeight === 'object' &&
        headerTitleFontWeight[breakpoint] !== undefined
      ) {
        acc[breakpoint]['--list-view-header-title-font-weight'] = toFontWeightValue(
          headerTitleFontWeight[breakpoint]
        )!;
      }

      if (typeof cellFontSize === 'object' && cellFontSize[breakpoint] !== undefined) {
        acc[breakpoint]['--list-view-cell-font-size'] = toFontSizeValue(cellFontSize[breakpoint])!;
      }

      if (typeof cellFontWeight === 'object' && cellFontWeight[breakpoint] !== undefined) {
        acc[breakpoint]['--list-view-cell-font-weight'] = toFontWeightValue(
          cellFontWeight[breakpoint]
        )!;
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
    styles: queries[breakpoint.value],
  }));

  return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}
