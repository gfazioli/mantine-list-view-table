# CI Pipeline Details

GitHub Actions configuration and best practices for React + TypeScript library projects.

## Table of Contents

- [Pipeline Overview](#pipeline-overview)
- [Workflow Configuration](#workflow-configuration)
- [Optimization Strategies](#optimization-strategies)
- [Troubleshooting CI Failures](#troubleshooting-ci-failures)
- [Security Best Practices](#security-best-practices)

---

## Pipeline Overview

### Standard PR Workflow

Typical CI pipeline for pull requests:

```yaml
name: Pull Request Checks

on:
  pull_request:
    branches: ['**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies (with caching)
      - Build library
      - Build documentation
      - Run test suite
```

**Execution order:**

1. **Checkout:** Clone repository at PR commit
2. **Setup:** Install Node.js, configure package manager
3. **Install:** Download and install dependencies
4. **Build:** Compile library and documentation
5. **Test:** Run linting, type-checking, and unit tests

**Total time:** 2-5 minutes (with caching)

---

## Workflow Configuration

### Basic Pull Request Workflow

```yaml
# .github/workflows/pull_request.yml
name: Pull request workflow

on:
  pull_request:
    branches:
      - '**'

concurrency:
  group: ${{ github.workflow }}-${{ github.event.number || github.sha }}
  cancel-in-progress: true

jobs:
  test_pull_request:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.9.0'
          cache: 'yarn'
          cache-dependency-path: '**/yarn.lock'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build library package
        run: yarn build

      - name: Build documentation
        run: yarn docs:build

      - name: Run test suite
        run: yarn test
```

---

### Key Concepts

**Concurrency control:**

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.event.number }}
  cancel-in-progress: true
```

- Cancels outdated workflow runs when new commits are pushed
- Saves CI minutes and reduces wait time
- Uses PR number for unique grouping

**Frozen lockfile:**

```bash
yarn install --frozen-lockfile
```

- Ensures exact dependency versions from lockfile
- Fails if lockfile is out of sync with `package.json`
- Prevents "works on my machine" issues

---

### Node.js Version Management

**Specify exact Node.js version:**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.9.0'  # Match your local development version
```

**Best practices:**

- Use same version as local development
- Document in README
- Consider using `.nvmrc` file for consistency
- Update regularly (security patches)

**Check your local version:**

```bash
node --version
# v20.9.0
```

---

### Dependency Caching

**Yarn cache configuration:**

```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'yarn'
    cache-dependency-path: '**/yarn.lock'
```

**What gets cached:**

- Yarn global cache directory
- Restored on subsequent runs with same lockfile

**Cache hit:**

```
Cache restored from key: node-cache-Linux-yarn-<hash>
```

**Cache miss:**

```
Cache not found for input keys: node-cache-Linux-yarn-<hash>
Post job: Cache dependencies
Cache saved with key: node-cache-Linux-yarn-<hash>
```

**Benefits:**

- 50-80% faster dependency installation
- Reduces network bandwidth
- More consistent build times

---

## Optimization Strategies

### Parallel Jobs

**Split tests into parallel jobs:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - # Checkout, setup, install
      - name: Build
        run: yarn build

  lint:
    runs-on: ubuntu-latest
    steps:
      - # Checkout, setup, install
      - name: Lint
        run: yarn lint

  test:
    runs-on: ubuntu-latest
    needs: build  # Wait for build to complete
    steps:
      - # Checkout, setup, install, build
      - name: Test
        run: yarn jest
```

**Pros:**

- Faster overall pipeline (parallel execution)
- Better failure isolation

**Cons:**

- More CI minutes used
- Additional setup overhead

---

### Matrix Testing

**Test across multiple Node.js versions:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      # Rest of steps...
```

**Use case:**

- Libraries supporting multiple Node.js versions
- Verify compatibility across versions

---

### Conditional Steps

**Skip docs build on draft PRs:**

```yaml
- name: Build documentation
  if: github.event.pull_request.draft == false
  run: yarn docs:build
```

**Run only on specific paths:**

```yaml
on:
  pull_request:
    paths:
      - 'package/src/**'
      - 'package/package.json'
      - '.github/workflows/**'
```

---

## Troubleshooting CI Failures

### Common Issues and Solutions

#### 1. "Cannot find module" errors

**Symptoms:**

```
Error: Cannot find module 'react'
```

**Causes:**

- Dependency not installed
- Workspace link broken
- Cache corruption

**Solutions:**

```yaml
# Clear cache and reinstall
- name: Install dependencies
  run: |
    rm -rf node_modules
    yarn install --frozen-lockfile
```

Or invalidate cache by updating workflow:

```yaml
cache-dependency-path: '**/yarn.lock'
# Add version to force cache miss
cache-key: v2-${{ hashFiles('**/yarn.lock') }}
```

---

#### 2. Type checking fails in CI but not locally

**Symptoms:**

```
error TS2307: Cannot find module '@types/react'
```

**Causes:**

- Different TypeScript version
- Missing types dependency
- Incorrect tsconfig paths

**Solutions:**

1. **Check TypeScript version consistency:**

```bash
# Local
yarn why typescript

# Add to CI
- name: Debug TypeScript version
  run: yarn why typescript
```

2. **Ensure types are in dependencies:**

```json
// package.json
{
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

#### 3. Tests pass locally but fail in CI

**Symptoms:**

```
FAIL src/Component.test.tsx
  ● Test suite failed to run
    ReferenceError: IntersectionObserver is not defined
```

**Causes:**

- Missing jsdom mocks
- Environment differences (timezone, locale)
- Race conditions in async tests

**Solutions:**

1. **Add jsdom mocks:**

```javascript
// jsdom.mocks.cjs
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
};
```

2. **Use fake timers for time-sensitive tests:**

```typescript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
```

---

#### 4. Out of memory errors

**Symptoms:**

```
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Solutions:**

```yaml
- name: Build with more memory
  run: NODE_OPTIONS="--max-old-space-size=4096" yarn build
```

Or split into smaller steps:

```yaml
- name: Build library
  run: yarn build:library

- name: Build docs
  run: yarn build:docs
```

---

#### 5. Lockfile out of sync

**Symptoms:**

```
error Your lockfile needs to be updated, but yarn was run with --frozen-lockfile
```

**Solutions:**

1. **Locally regenerate lockfile:**

```bash
yarn install
git add yarn.lock
git commit -m "Update lockfile"
```

2. **Or remove `--frozen-lockfile` temporarily** (not recommended for production)

---

### Debugging Failed Workflows

**Enable debug logging:**

```yaml
- name: Install dependencies
  run: yarn install --verbose
```

**Add debug steps:**

```yaml
- name: Debug environment
  run: |
    echo "Node version: $(node --version)"
    echo "Yarn version: $(yarn --version)"
    echo "Working directory: $(pwd)"
    ls -la
    cat package.json
```

**Check uploaded artifacts:**

```yaml
- name: Upload build artifacts
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: package/dist/
```

---

## Security Best Practices

### Dependency Scanning

**Add dependency audit:**

```yaml
- name: Audit dependencies
  run: yarn audit --level moderate
  continue-on-error: true  # Don't fail build, just warn
```

**Use Dependabot:**

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: '/'
    schedule:
      interval: weekly
    open-pull-requests-limit: 10
```

---

### Secret Management

**Never commit secrets:**

- Use GitHub repository secrets
- Reference in workflows with `${{ secrets.SECRET_NAME }}`
- Never echo secrets in logs

```yaml
# ❌ Bad: Secret exposed in logs
- name: Deploy
  run: echo "Token: ${{ secrets.NPM_TOKEN }}"

# ✅ Good: Secret used securely
- name: Publish to npm
  run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

### Permissions

**Use minimal permissions:**

```yaml
permissions:
  contents: read  # Read repository contents
  pull-requests: write  # Comment on PRs
```

**Default (too broad):**

```yaml
permissions: write-all  # Avoid this!
```

---

### Third-Party Actions

**Pin actions to commit SHA:**

```yaml
# ✅ Good: Pinned to specific commit
- uses: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab  # v4.1.1

# ⚠️ Acceptable: Pinned to major version
- uses: actions/checkout@v4

# ❌ Bad: Floating tag
- uses: actions/checkout@main
```

**Verify action sources:**

- Use official GitHub actions when possible
- Review action code before using
- Check action popularity and maintenance

---

## Advanced Workflows

### Release Workflow

**Automated npm publishing:**

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - run: yarn install --frozen-lockfile
      - run: yarn build
      - run: yarn test

      - name: Publish to npm
        run: cd package && npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

### Documentation Deployment

**Deploy docs to GitHub Pages:**

```yaml
name: Deploy Docs

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'yarn'

      - run: yarn install
      - run: yarn docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/out
```

---

## Performance Benchmarks

Typical execution times (with cache):

| Step | Time | Optimization Potential |
|------|------|------------------------|
| Checkout | 2-5s | ❌ Fixed |
| Setup Node | 3-8s | ❌ Fixed |
| Install deps (cached) | 20-40s | ✅ Use cache |
| Install deps (no cache) | 60-120s | ✅ Use cache |
| Build library | 10-30s | ✅ Incremental builds |
| Build docs | 30-90s | ✅ Skip on drafts |
| Run tests | 20-60s | ✅ Parallel jobs |

**Total (optimized):** ~2-3 minutes  
**Total (unoptimized):** ~5-8 minutes

---

## Checklist for New Workflows

Before adding a new workflow:

- [ ] Uses specific Node.js version
- [ ] Enables dependency caching
- [ ] Uses `--frozen-lockfile`
- [ ] Has concurrency control
- [ ] Pins actions to specific versions
- [ ] Uses minimal permissions
- [ ] Handles failures gracefully
- [ ] Documents expected behavior
- [ ] Tested locally with `act` (optional)

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Yarn Caching Strategies](https://github.com/actions/setup-node#caching-global-packages-data)
- [Security Hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [act - Run GitHub Actions locally](https://github.com/nektos/act)
