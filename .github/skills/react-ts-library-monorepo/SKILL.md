---
name: react-ts-library-monorepo
description: Development workflows for React + TypeScript library packages with Next.js documentation in a Yarn workspaces monorepo. Use when building, testing, documenting, or releasing component libraries with dual ESM/CJS builds, TypeScript declarations, and static documentation sites.
---

# React TypeScript Library Monorepo Development

This skill provides comprehensive development workflows for React + TypeScript library projects structured as Yarn workspaces monorepos with a separate documentation site. It covers building dual-format packages (ESM/CJS), testing, linting, type-checking, documentation generation, and release workflows.

## When to use this skill

Use this skill when working on projects that:
- Build React component libraries or utility packages with TypeScript
- Use Yarn workspaces to separate library code from documentation
- Bundle with Rollup to produce ESM and CJS outputs
- Generate type declarations (`.d.ts`) for TypeScript consumers
- Include a Next.js-based documentation/demo site
- Run tests with Jest and React Testing Library
- Enforce code quality with ESLint, Prettier, and Stylelint
- Use GitHub Actions for CI/CD
- Follow semantic versioning for releases

Common triggers:
- "How do I run the dev server?"
- "Build the library for production"
- "Run all tests and checks"
- "Deploy the documentation site"
- "Create a new release"
- "Type errors in the build"
- "Linting failures in CI"

---

## Project Structure Overview

Typical workspace layout:
```
├── package.json          # Root workspace configuration
├── package/              # Library source code
│   ├── package.json
│   └── src/
│       ├── index.ts
│       └── ComponentName.tsx
├── docs/                 # Documentation site (Next.js)
│   ├── package.json
│   ├── pages/
│   └── demos/
├── tsconfig.json         # Root TypeScript config
├── rollup.config.mjs     # Bundle configuration
├── jest.config.cjs       # Test configuration
├── eslint.config.mjs     # Linting rules
└── .github/
    └── workflows/        # CI pipelines
```

**Key principles:**
- Root `package.json` orchestrates workspace scripts
- Library package builds to `package/dist/` with ESM/CJS/types
- Documentation site is developed and deployed independently
- Build and release automation through npm scripts

---

## Development Workflows

### 1. Initial Setup

**Clone and install dependencies:**
```bash
# Clone repository (use actual repo URL)
git clone <repository-url>
cd <project-directory>

# Install all workspace dependencies
yarn install
```

**Verify installation:**
```bash
yarn run syncpack
```
This checks for version mismatches across workspace packages.

---

### 2. Development Server (Documentation Site)

**Start the Next.js dev server:**
```bash
yarn dev
# or
cd docs && yarn dev
```

Default port is typically in the `9000-9999` range. Check `docs/package.json` scripts for the exact port.

**What happens:**
- Next.js starts in development mode with hot module replacement
- Changes to library source (`package/src/`) require rebuilding (see below)
- Changes to docs (`docs/pages/`, `docs/demos/`) reload automatically

**Viewing your work:**
Navigate to `http://localhost:<port>` in your browser.

---

### 3. Building the Library

**Full production build:**
```bash
yarn build
```

**What this does:**
1. Cleans `package/dist/`
2. Runs Rollup to bundle source code
3. Generates TypeScript declaration files (`.d.ts`)
4. Processes CSS modules with PostCSS
5. Outputs ESM (`*.mjs`), CJS (`*.cjs`), and type definitions

**Output structure:**
```
package/dist/
├── esm/
│   └── index.mjs
├── cjs/
│   └── index.cjs
└── types/
    └── index.d.ts
```

**When to build:**
- Before testing locally in docs site
- Before running full test suite
- Before publishing to npm
- When debugging module resolution issues

**Incremental workflow:**
```bash
# Build once
yarn build

# Start docs dev server
yarn dev
```

---

### 4. Type Checking

**Check types across all workspaces:**
```bash
yarn typecheck
```

**What this checks:**
- Library source code (`package/src/`)
- Documentation site code (`docs/`)
- Scripts and tooling

**Common type errors:**
- Missing TypeScript types for dependencies (install `@types/*` packages)
- Incorrect prop types or interface mismatches
- `any` usage (prefer `unknown` with type guards)
- Module resolution failures (check `tsconfig.json` paths)

**Fix strategies:**
- Use explicit type annotations for exported APIs
- Enable `strict: true` in `tsconfig.json` for safety
- Use type guards: `if (typeof x === 'string') { ... }`
- Leverage `unknown` instead of `any` for better type safety

---

### 5. Linting and Formatting

**Run all linters:**
```bash
yarn lint
```

This typically runs:
- ESLint (JavaScript/TypeScript/React)
- Stylelint (CSS/PostCSS)

**Run individually:**
```bash
# ESLint only
yarn eslint

# Stylelint only
yarn stylelint
```

**Format code with Prettier:**
```bash
# Check formatting
yarn prettier:check

# Fix formatting issues
yarn prettier:write
```

**Pre-commit recommendations:**
- Run `yarn prettier:write` to auto-format
- Run `yarn lint` to catch issues early
- Fix ESLint errors before pushing (CI will fail otherwise)

**Common linting issues:**
- Missing `key` props in lists
- Unused variables/imports
- Accessibility violations (missing ARIA labels, roles)
- React Hooks rules violations

See [references/coding-standards.md](./references/coding-standards.md) for detailed guidelines.

---

### 6. Testing

**Run all tests:**
```bash
yarn jest
# or
yarn test  # Runs full suite: syncpack, prettier, typecheck, lint, jest
```

**Test configuration:**
- Framework: Jest with `jsdom` environment
- React: React Testing Library
- Coverage: Configured in `jest.config.cjs`
- Mocking: CSS modules mocked with `identity-obj-proxy`

**Writing tests:**
```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

**Best practices:**
- Use semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Use `data-testid` only for dynamic content without stable roles
- Test accessibility: `import { axe, toHaveNoViolations } from 'jest-axe'`
- Mock external dependencies in `jsdom.mocks.cjs`

See [assets/templates/test-example.test.tsx](./assets/templates/test-example.test.tsx) for a template.

---

### 7. Documentation Generation

**Generate API documentation:**
```bash
yarn docgen
```

This runs `mantine-docgen-script` to extract component props and generate documentation metadata.

**Build documentation site:**
```bash
yarn docs:build
```

**What this does:**
1. Runs `docgen` to update prop tables
2. Builds Next.js app for production
3. Outputs static files to `docs/out/`

**Deploy documentation:**
```bash
yarn docs:deploy
```

This typically:
1. Builds the docs site
2. Creates `.nojekyll` file for GitHub Pages compatibility
3. Pushes `docs/out/` to `gh-pages` branch

**Environment variables:**
Check if the docs site requires environment variables (e.g., analytics, API keys). Set them in `.env.local` (never commit this file).

---

### 8. Release Workflow

**Create a new release:**
```bash
# Patch release (1.2.3 -> 1.2.4)
yarn release:patch

# Minor release (1.2.3 -> 1.3.0)
yarn release:minor

# Major release (1.2.3 -> 2.0.0)
yarn release:major
```

**What happens:**
1. Updates version in `package/package.json`
2. Runs build process
3. Creates git tag
4. Deploys documentation

**Manual publishing to npm:**
```bash
cd package
npm publish --access public
```

**Pre-release checklist:**
- [ ] All tests pass (`yarn test`)
- [ ] Documentation is up to date
- [ ] CHANGELOG updated with user-facing changes
- [ ] Breaking changes documented in upgrade guide
- [ ] Version bump follows semantic versioning

See [references/release-process.md](./references/release-process.md) for detailed steps.

---

## CI/CD Integration

### GitHub Actions Workflow

Typical CI pipeline on pull requests:
1. Checkout code
2. Setup Node.js (usually v20+)
3. Install dependencies with Yarn cache
4. Build library package
5. Build documentation site
6. Run full test suite

**Environment:**
- Node version: Specified in workflow file (e.g., `20.9.0`)
- Package manager: Yarn with lock file caching
- OS: `ubuntu-latest`

**Debugging CI failures:**
- Check Node version matches your local environment
- Clear Yarn cache if seeing stale dependencies
- Verify all workspace dependencies are properly declared
- Check for environment-specific issues (file paths, line endings)

**Scripts to run locally before pushing:**
```bash
# Mimics CI checks
yarn test
```

See [references/ci-pipeline.md](./references/ci-pipeline.md) for details.

---

## Storybook Development (if configured)

**Start Storybook:**
```bash
yarn storybook
```

Runs on port `8271` (or configured port).

**Use case:**
- Isolated component development
- Visual regression testing
- Component documentation
- Sharing work-in-progress with team

**Story file structure:**
```typescript
// ComponentName.story.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {},
};
```

---

## Common Tasks

### Adding a New Component

1. Create component file in `package/src/`:
   ```
   package/src/NewComponent.tsx
   package/src/NewComponent.module.css
   package/src/NewComponent.test.tsx
   package/src/NewComponent.story.tsx (optional)
   ```

2. Export from `package/src/index.ts`:
   ```typescript
   export { NewComponent } from './NewComponent';
   export type { NewComponentProps } from './NewComponent';
   ```

3. Rebuild library:
   ```bash
   yarn build
   ```

4. Add demo/documentation in `docs/demos/`

5. Run `yarn docgen` to update API docs

See [assets/templates/component.tsx](./assets/templates/component.tsx) for a template.

---

### Adding a New Dependency

**To library package:**
```bash
cd package
yarn add <dependency>
# or for dev dependency
yarn add -D <dependency>
```

**To documentation site:**
```bash
cd docs
yarn add <dependency>
```

**After adding dependencies:**
```bash
# Return to root
cd ..

# Check for version consistency
yarn syncpack
```

---

### Fixing Type Declaration Issues

**Problem:** Types not exported or incorrect in `dist/types/`

**Solution:**
1. Ensure exports are explicit in source files:
   ```typescript
   export type { MyProps } from './Component';
   ```

2. Check `tsconfig.build.json` includes the file

3. Rebuild:
   ```bash
   yarn build
   ```

4. Verify output in `package/dist/types/index.d.ts`

---

### Debugging CSS Module Issues

**Problem:** CSS classes not applying or wrong hash

**Solution:**
1. Check PostCSS configuration in `postcss.config.js`
2. Verify CSS module import:
   ```typescript
   import classes from './Component.module.css';
   ```
3. Ensure Rollup PostCSS plugin is configured
4. Rebuild and check `package/dist/esm/` for extracted CSS

---

## Troubleshooting

### Build fails with "Cannot find module"

**Causes:**
- Missing dependency installation
- Incorrect import paths
- Workspace link issues

**Fix:**
```bash
# Clean and reinstall
rm -rf node_modules package/node_modules docs/node_modules
rm -rf .yarn/cache
yarn install
```

---

### Tests fail with "Cannot find module" for CSS

**Cause:** CSS imports not mocked

**Fix:**
Ensure `jest.config.cjs` has:
```javascript
moduleNameMapper: {
  '\\.(css)$': 'identity-obj-proxy',
}
```

---

### Documentation site doesn't reflect library changes

**Cause:** Library not rebuilt after changes

**Fix:**
```bash
# Rebuild library
yarn build

# Restart docs dev server
yarn dev
```

---

### CI passes locally but fails in GitHub Actions

**Common causes:**
- Node version mismatch
- Yarn cache issues
- Environment variables not set
- Case-sensitive file paths (Linux vs macOS/Windows)

**Fix:**
1. Check Node version in workflow file
2. Run `yarn test` from clean state
3. Ensure no `.env` files are required (or use GitHub Secrets)

---

## Security Best Practices

### Environment Variables

- Never commit `.env` files
- Use `.env.example` as a template (see [assets/templates/.env.example](./assets/templates/.env.example))
- For CI: Use GitHub repository secrets
- For local dev: Copy `.env.example` to `.env.local`

### Dependency Management

- Run `yarn audit` regularly
- Keep dependencies up to date
- Review lockfile changes in PRs
- Use `syncpack` to ensure version consistency

### CI/CD

- Use minimal token permissions (read/write only what's needed)
- Don't expose secrets in logs
- Use GitHub's OIDC for cloud deployments when possible
- Review third-party Actions before using

---

## Scripts Reference

Comprehensive script listing from root `package.json`:

| Script | Purpose |
|--------|---------|
| `clean` | Remove build artifacts |
| `build` | Build library (Rollup + types + CSS) |
| `prettier:check` | Check code formatting |
| `prettier:write` | Auto-format code |
| `typecheck` | Type-check all workspaces |
| `lint` | Run ESLint + Stylelint |
| `eslint` | Run ESLint only |
| `stylelint` | Run Stylelint only |
| `jest` | Run Jest tests |
| `test` | Full test suite (format, types, lint, tests) |
| `dev` | Start docs dev server |
| `docs:build` | Build docs site for production |
| `docs:deploy` | Build and deploy docs to GitHub Pages |
| `docgen` | Generate API documentation |
| `release:patch` | Bump patch version and deploy |
| `release:minor` | Bump minor version and deploy |
| `release:major` | Bump major version and deploy |
| `storybook` | Start Storybook dev server |
| `syncpack` | Check dependency version consistency |

Execute with `yarn <script-name>` from root directory.

---

## Demo Templates

For creating component demonstrations, use the templates in `assets/templates/`:

- **[demo-simple.tsx](./assets/templates/demo-simple.tsx)** - Basic static demo
- **[demo-interactive.tsx](./assets/templates/demo-interactive.tsx)** - Demo with state and interactions
- **[demo-configurator.tsx](./assets/templates/demo-configurator.tsx)** - Interactive props playground
- **[demo-with-data.tsx](./assets/templates/demo-with-data.tsx)** - Demo using external data
- **[demo-data.ts](./assets/templates/demo-data.ts)** - Centralized mock data for demos

---

## Additional Resources

- [Coding Standards](./references/coding-standards.md) - TypeScript, React, and accessibility patterns
- [Architecture Overview](./references/architecture.md) - Workspace structure and build pipeline
- [Creating Demos](./references/creating-demos.md) - Component demonstration patterns and best practices
- [CI Pipeline Details](./references/ci-pipeline.md) - GitHub Actions configuration
- [Release Process](./references/release-process.md) - Detailed release checklist
- [Environment Setup](./references/environment-setup.md) - Node, Yarn, and IDE configuration

---

## Adoption Checklist

### Installation
- [ ] Skill added to `.github/skills/react-ts-library-monorepo/`
- [ ] SKILL.md reviewed and customized for your project
- [ ] Templates reviewed in `assets/templates/`

### Usage
- [ ] Reference this skill when starting development: "Use react-ts-library-monorepo skill"
- [ ] Follow workflows for common tasks (build, test, release)
- [ ] Use demo templates when creating component examples
- [ ] Consult troubleshooting section for issues

### Verification
- [ ] Run `yarn test` - all checks pass
- [ ] Run `yarn build` - library builds successfully
- [ ] Run `yarn dev` - documentation site starts
- [ ] Run `yarn docs:build` - static site generates

### Customization
- [ ] Update environment variable examples in [assets/templates/.env.example](./assets/templates/.env.example)
- [ ] Customize demo templates for your component patterns
- [ ] Adjust port numbers and commands if they differ
- [ ] Add project-specific troubleshooting tips
- [ ] Update CI workflow references to match your setup

---

**Last Updated:** 2026-01-09  
**Skill Version:** 1.0.0  
**Compatible With:** Yarn 4+, Node 20+, React 18-19, TypeScript 5+, Next.js 15+
