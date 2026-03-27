# CLAUDE.md

## Project
`@gfazioli/mantine-list-view-table` -- a Finder-style list view table component for Mantine 8.x with sorting, column reordering, column resizing, sticky columns, and drag handles.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + prettier + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run ESLint + Stylelint |
| `yarn prettier:write` | Format all files with Prettier |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API, always run `yarn clean && yarn build` before `yarn test`.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
Main component (`ListViewTable.tsx`) using Mantine's `factory` pattern: `factory<ListViewTableFactory> -> useProps -> useStyles -> varsResolver`. Exports a single `ListViewTable` component with no compound components. Responsive CSS variables are managed by `ListViewTableMediaVariables.tsx` following the Mantine-native pattern (`InlineStyles` + CSS media queries).

### Build Pipeline
Rollup bundles to dual ESM/CJS with `'use client'` banner. CSS modules hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS split into `styles.css` and `styles.layer.css`.

## Component Details

### Controlled/Uncontrolled Dual Mode
Sorting, column reordering, and column resizing all support both controlled and uncontrolled modes. If no `onSort`/`onColumnReorder` callback is provided, the component manages state internally.

### Column Widths and Resizing
Column widths are measured from the DOM on first render, then tracked in state for resize constraints. The resize handle allows drag-based column width adjustment.

### Sticky Columns
Sticky columns use inline `position: sticky` with z-index layering (11 for header, 10 for body cells).

### Data Access
`getNestedValue()` supports dot-notation keys for nested data access (e.g., `"user.name"`).

### Styles API
All visual parts are targetable via `stylesNames`: `root`, `table`, `header`, `headerCell`, `headerButton`, `headerTitle`, `sortIcon`, `dragHandle`, `resizeHandle`, `body`, `row`, `cell`, `emptyState`, `loader`, `stickyColumn`, `stickyHeaderColumn`.

CSS variables on root (all support responsive breakpoint values via `StyleProp<T>`): `--list-view-height`, `--list-view-width`, `--list-view-horizontal-spacing`, `--list-view-vertical-spacing`, `--list-view-header-title-font-size`, `--list-view-header-title-font-weight`, `--list-view-cell-font-size`, `--list-view-cell-font-weight`, `--list-view-selected-row-color`, `--list-view-sticky-blur`.

### Responsive CSS (Mantine-native)
Dimension/size props (`height`, `width`, `horizontalSpacing`, `verticalSpacing`, `headerTitleFontSize`, `headerTitleFontWeight`, `cellFontSize`, `cellFontWeight`) use `StyleProp<T>` from `@mantine/core`. Responsive values are resolved via `ListViewTableMediaVariables` component using `InlineStyles` + CSS media queries — no JS re-renders.

### Adding a New Prop
1. Add to `ListViewTableBaseProps` interface (with JSDoc)
2. Add default in `defaultProps` if applicable
3. Destructure in the component and implement
4. Run `yarn docgen` to regenerate API docs
5. Create demo in `docs/demos/`
6. Add test coverage

## Testing
Jest with `jsdom`, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Tests use `@mantine-tests/core` render helper. Test file: `package/src/ListViewTable.test.tsx`.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace CLAUDE.md at `/Users/giovambattistafazioli/Lavoro/GitHub/Mantine Extensions/CLAUDE.md` for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
