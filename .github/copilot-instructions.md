# Mantine ListViewTable - AI Coding Agent Instructions

## Project Overview

This is a **Yarn 4 monorepo** publishing `@gfazioli/mantine-list-view-table`, a Finder-style table component for Mantine 7+. Two workspaces:
- `package/` - React component library with dual ESM/CJS build
- `docs/` - Next.js 15 static documentation site using `@mantinex/demo`

**Key external dependencies:**
- Mantine 8.3.12 (core, hooks) - peer dependency
- React 19.2.3 - development/peer dependency
- @tabler/icons-react - peer dependency for icons

## Architecture

### Build System

**Library Build (Rollup):**
```bash
yarn build  # Runs: rollup → generate-dts → prepare-css
```
- **Input:** `package/src/index.ts`
- **Output:** Dual format in `package/dist/`
  - `esm/` - ES modules (`.mjs`)
  - `cjs/` - CommonJS (`.cjs`)
  - `types/` - TypeScript declarations (`.d.ts`, `.d.mts`)
  - `styles.css` and `styles.layer.css` - PostCSS processed
- **CSS Modules:** Scoped with hash prefix `me` (via `hash-css-selector`)
- **'use client' directive:** Auto-injected for Next.js App Router compatibility

**Docs Build (Next.js):**
```bash
yarn dev          # Development server with HMR
yarn docs:build   # docgen → next build (static export)
yarn docs:deploy  # Build → gh-pages deploy
```
- **Base path:** Auto-configured from `package/package.json` repository field
- **MDX:** Enabled with `remark-slug` for heading anchors
- **Demo system:** Uses `@mantinex/demo` for interactive examples

### Component Structure

**Single-file pattern:** Each feature lives in one file (e.g., `ListViewTable.tsx` is 1199 lines). No fragmentation unless truly necessary.

**Key component concepts:**
1. **Column management:** Draggable reordering, resizable widths, configurable min/max constraints
2. **State control:** Internal or external - component accepts both controlled/uncontrolled patterns
3. **Sticky behavior:** Supports sticky headers and sticky identifier columns in scroll containers
4. **Custom rendering:** `renderCell`, `renderHeader`, `cellStyle` props for per-column customization
5. **Empty/loading states:** Rich configuration - from simple text to full component rendering

## Development Workflows

### Testing

**Run tests:**
```bash
yarn jest        # Run Jest tests only
yarn test        # Full suite: syncpack + prettier + typecheck + lint + jest
```

**Test setup:**
- **Runner:** Jest 29 with jsdom environment
- **Transform:** `esbuild-jest` (fast, no babel)
- **Utilities:** `@mantine-tests/core` provides custom render utilities
- **CSS mocking:** `identity-obj-proxy` for CSS modules
- **Setup:** `jsdom.mocks.cjs` for browser API mocks

**Test conventions:**
- Use `@mantine-tests/core` render instead of RTL directly
- Mock data interfaces at top of test file
- Test empty states, loading states, and custom renderers
- Example: `ListViewTable.test.tsx` shows standard patterns

### Type Checking & Linting

```bash
yarn typecheck    # TSC (no emit) + docs typecheck
yarn lint         # eslint + stylelint
yarn prettier:check  # Or prettier:write
```

**TypeScript configs:**
- `tsconfig.json` - Main config (includes package/, scripts/, @types/)
- `tsconfig.build.json` - Build-specific config for Rollup
- `tsconfig.eslint.json` - ESLint parser config

**Linting:**
- ESLint with `eslint-config-mantine`, React, a11y plugins
- Stylelint for CSS with caching
- All configs use flat config format (ESM)

### Demo Creation

**Critical pattern:** Demos MUST follow the `@mantinex/demo` structure:

```tsx
import { ComponentName } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return <ComponentName prop="value" />;
}

const code = `
import { ComponentName } from '@your-package/name';
// User-facing import path ^^^

function Demo() {
  return <ComponentName prop="value" />;
}
`;

// Named export (NOT default)
export const demoName: MantineDemo = {
  type: 'code', // or 'configurator'
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
```

**Dual export pattern for data/columns:**
```tsx
// Export BOTH code string and actual values
export const dataCode = `export const data = [...]`;
export const data = [...];
```

**File naming:** `ComponentName.demo.feature.tsx` (e.g., `ListViewTable.demo.ellipsis.tsx`)

**Configurator demos:**
- Component receives props via function parameter: `Demo(props: Omit<Props, 'children'>)`
- Code template uses `{{props}}` placeholder
- Controls array defines UI with types: `boolean`, `select`, `segmented`, `color`, `number`, `string`

See: `.github/skills/react-ts-library-monorepo/assets/templates/` for complete examples

### Release Process

```bash
yarn release:patch  # Bump patch version, build, publish, deploy docs
yarn release:minor  # Bump minor version
yarn release:major  # Bump major version
```

**Release workflow:**
1. Runs `scripts/release.ts` with semantic versioning
2. Updates `package/package.json` version
3. Git commit + tag
4. npm publish (requires auth)
5. Builds and deploys docs to gh-pages

**Documentation generation:**
```bash
yarn docgen  # Generates docs/docgen.json from TypeScript props
```

## Coding Conventions

### Component Props

**Pattern:** Use Mantine's factory pattern with StylesApiProps:
```tsx
export interface ListViewTableProps<T = any>
  extends BoxProps,
    StylesApiProps<ListViewTableFactory>,
    ElementProps<'div'> {
  // Component-specific props
}

export type ListViewTableFactory = Factory<{
  props: ListViewTableProps;
  ref: HTMLDivElement;
  stylesNames: ListViewTableStylesNames;
  vars: ListViewTableCssVariables;
}>;

export const ListViewTable = factory<ListViewTableFactory>((_props, ref) => {
  const props = useProps('ListViewTable', defaultProps, _props);
  const { getStyles } = useStyles<ListViewTableFactory>({
    name: 'ListViewTable',
    props,
    classes,
  });
  // ...
});
```

### CSS Variables

Define CSS variables for themeable values:
```tsx
export type ListViewTableCssVariables = {
  root:
    | '--list-view-height'
    | '--list-view-width'
    | '--list-view-header-title-font-size';
};

const varsResolver = createVarsResolver<ListViewTableFactory>((theme, props) => ({
  root: {
    '--list-view-height': props.height,
    // ...
  },
}));
```

### State Management

**Controlled/uncontrolled pattern:**
```tsx
// Accept external state OR manage internally
const [internalState, setInternalState] = useState(defaultState);
const state = props.externalState ?? internalState;
const setState = props.onStateChange ?? setInternalState;
```

Example: `sortColumn`, `columnOrder`, `columnWidths` all support this pattern.

### TypeScript Practices

- **Strict mode enabled** - handle all type narrowing
- **Generic components:** `<T = any>` for data typing
- **Type exports:** Export all public interfaces/types
- **Dot notation:** Support `keyof T | (string & NonNullable<unknown>)` for nested keys
- **As const:** Use for literal types (e.g., `textAlign: 'left' as const`)

## Common Tasks

**Add a new prop:**
1. Add to interface in component file (with JSDoc)
2. Add to `defaultProps` if needed
3. Update destructuring and usage
4. Run `yarn docgen` to update docs
5. Create demo showing the feature
6. Add test coverage

**Add a demo:**
1. Create `docs/demos/ComponentName.demo.feature.tsx`
2. Follow MantineDemo pattern (named export, dual code/component)
3. Add data files with dual exports if needed
4. Export from `docs/demos/index.ts`
5. Reference in MDX: `<Demo data={demos.feature} />`

**Debug build issues:**
- Check `package/dist/` for output structure
- CSS modules scope: Look for `me-` prefixed classes
- Type declarations: Verify `.d.ts` and `.d.mts` match
- Test import: `node -e "console.log(require('./package/dist/cjs/index.cjs'))"`

**Fix CI failures:**
- `syncpack list-mismatches` - Version mismatches across workspaces
- `prettier --check` - Formatting issues
- Build errors often cascade - fix the first error first

## Project-Specific Patterns

**Mantine Styles API integration:**
- Every visual element has a `stylesNames` entry
- CSS variables for dynamic theming
- `getStyles()` utility for applying Styles API

**Icon usage:**
- Always from `@tabler/icons-react`
- Standard set: `IconSelector`, `IconChevronUp`, `IconChevronDown`, `IconGripVertical`

**Accessibility:**
- All interactive elements have proper ARIA attributes
- Test with `jest-axe` for a11y violations
- Keyboard navigation for drag handles and resize handles

**Performance:**
- `useMemo` for column calculations
- `useCallback` for event handlers passed as props
- Virtualization NOT implemented (intentional - relies on browser scroll)

## Documentation References

- **Main docs:** https://gfazioli.github.io/mantine-list-view-table/
- **Mantine docs:** https://mantine.dev/
- **Agent Skills:** `.github/skills/react-ts-library-monorepo/` - Comprehensive development guides
- **Templates:** `.github/skills/react-ts-library-monorepo/assets/templates/` - Component, demo, config templates
