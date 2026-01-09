# Environment Setup

Complete guide for setting up a local development environment for React + TypeScript library projects.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Node.js and Package Manager](#nodejs-and-package-manager)
- [IDE Configuration](#ide-configuration)
- [Environment Variables](#environment-variables)
- [Git Configuration](#git-configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

**Minimum versions:**

- **Node.js:** v20.9.0 or higher
- **Yarn:** v4.0.0 or higher (managed via Corepack)
- **Git:** v2.30.0 or higher

**Recommended:**

- **IDE:** Visual Studio Code
- **Browser:** Chrome/Firefox with React DevTools

---

## Node.js and Package Manager

### Installing Node.js

**Option 1: nvm (recommended)**

[Node Version Manager](https://github.com/nvm-sh/nvm) allows multiple Node.js versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20.9.0
nvm use 20.9.0
nvm alias default 20.9.0
```

**Option 2: Direct download**

Download from [nodejs.org](https://nodejs.org/) and install.

**Verify installation:**

```bash
node --version
# v20.9.0
```

---

### Configuring Yarn

**Enable Corepack (comes with Node.js 16.10+):**

```bash
corepack enable
```

**Verify Yarn version:**

```bash
yarn --version
# 4.12.0
```

**If project uses specific Yarn version (from `package.json`):**

The project's `packageManager` field enforces the exact version:

```json
{
  "packageManager": "yarn@4.12.0"
}
```

Corepack automatically uses this version.

---

### Project Setup

**Clone and install:**

```bash
# Clone repository
git clone <repository-url>
cd <project-directory>

# Install all workspace dependencies
yarn install
```

**Expected output:**

```
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed in 2s 123ms
➤ YN0000: ┌ Fetch step
➤ YN0000: └ Completed in 5s 456ms
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed in 1s 789ms
➤ YN0000: Done with warnings in 9s 368ms
```

**Verify setup:**

```bash
yarn build
```

Should complete without errors.

---

## IDE Configuration

### Visual Studio Code (Recommended)

**Required extensions:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "stylelint.vscode-stylelint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**Install all recommended extensions:**

1. Open project in VS Code
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Extensions: Show Recommended Extensions"
4. Click "Install All"

---

### Workspace Settings

**`.vscode/settings.json`:**

```json
{
  // Editor
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  // TypeScript
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,

  // Files
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },

  // Search
  "search.exclude": {
    "**/node_modules": true,
    "**/package-lock.json": true,
    "**/yarn.lock": true,
    "**/dist": true,
    "**/.next": true
  }
}
```

---

### ESLint Integration

**Auto-fix on save:**

VS Code will automatically:
- Format code with Prettier
- Fix ESLint issues
- Sort imports

**Manual lint:**

Press `Cmd+Shift+P` → "ESLint: Fix all auto-fixable Problems"

---

### TypeScript IntelliSense

**Using workspace TypeScript:**

When prompted "Use Workspace Version?", click **Yes**.

This ensures VS Code uses the project's TypeScript version (5.x), not the built-in version.

**Restart TypeScript Server:**

If types seem incorrect:
1. Press `Cmd+Shift+P`
2. Type "TypeScript: Restart TS Server"

---

## Environment Variables

### Documentation Site Variables

**Create `.env.local` in `docs/` directory:**

```bash
cd docs
cp .env.example .env.local
```

**Example `.env.local`:**

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API endpoints (if needed)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Feature flags
NEXT_PUBLIC_ENABLE_EXPERIMENTAL=false
```

**⚠️ Never commit `.env.local`**

Add to `.gitignore`:
```
.env*.local
```

---

### CI/CD Variables

**GitHub Actions Secrets:**

For deployments, add secrets in repository settings:

1. Go to `Settings` → `Secrets and variables` → `Actions`
2. Add secrets:
   - `NPM_TOKEN` - For publishing to npm
   - `GH_TOKEN` - For GitHub releases (optional, use `GITHUB_TOKEN` instead)

**Use in workflows:**

```yaml
- name: Publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
  run: npm publish
```

---

## Git Configuration

### Git Hooks (Recommended)

**Install Husky for pre-commit hooks:**

```bash
yarn add -D husky lint-staged
yarn husky install
```

**Pre-commit hook (`.husky/pre-commit`):**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn lint-staged
```

**`package.json` configuration:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.css": [
      "prettier --write",
      "stylelint --fix"
    ]
  }
}
```

**What this does:**

Automatically format and lint staged files before commit.

---

### Commit Message Convention

**Use Conventional Commits:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, missing semi-colons, etc.
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Performance improvement
- `test:` Adding or fixing tests
- `chore:` Maintenance tasks, dependency updates

**Examples:**

```bash
git commit -m "feat(button): add size prop"
git commit -m "fix(dropdown): correct focus management"
git commit -m "docs: update installation instructions"
git commit -m "chore: upgrade dependencies"
```

**Tools:**

```bash
# Install commitlint
yarn add -D @commitlint/cli @commitlint/config-conventional

# commitlint.config.js
module.exports = { extends: ['@commitlint/config-conventional'] };

# Husky hook (.husky/commit-msg)
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn commitlint --edit "$1"
```

---

### Git Ignore

**Essential entries:**

```gitignore
# Dependencies
node_modules/
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Build outputs
dist/
.next/
out/

# Environment
.env*.local

# IDEs
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
temp/
```

---

## Troubleshooting

### "Cannot find module" after install

**Cause:** Workspace links not created

**Solution:**

```bash
rm -rf node_modules package/node_modules docs/node_modules
yarn install
```

---

### TypeScript errors in IDE but build passes

**Cause:** IDE using wrong TypeScript version

**Solution:**

1. Open any `.ts` file
2. Press `Cmd+Shift+P`
3. Type "TypeScript: Select TypeScript Version"
4. Choose "Use Workspace Version"

---

### Prettier and ESLint conflicts

**Cause:** Conflicting formatting rules

**Solution:**

Ensure `eslint-config-prettier` is installed and configured:

```bash
yarn add -D eslint-config-prettier
```

```javascript
// eslint.config.mjs
export default [
  // ... other configs
  require('eslint-config-prettier'), // Must be last
];
```

---

### Port already in use

**Cause:** Dev server port (9281) already taken

**Solution:**

```bash
# Find process using port
lsof -ti:9281

# Kill process
kill -9 <PID>

# Or use different port
cd docs
PORT=9282 yarn dev
```

---

### Yarn cache issues

**Symptoms:** Old versions of packages, stale builds

**Solution:**

```bash
# Clear Yarn cache
yarn cache clean

# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

---

### Build fails with memory error

**Cause:** Large TypeScript compilation, insufficient memory

**Solution:**

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" yarn build
```

Or add to `package.json` scripts:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max-old-space-size=4096 rollup -c && ..."
  }
}
```

---

## Development Tools

### Browser Extensions

**React Developer Tools:**

- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**Features:**

- Inspect React component tree
- View props and state
- Profile performance
- Debug hooks

---

### Command Line Tools

**Useful global installs:**

```bash
# TypeScript compiler
npm install -g typescript

# Check bundle size
npm install -g bundlephobia-cli

# Analyze bundle
npm install -g source-map-explorer
```

---

## Verification Checklist

After setup, verify everything works:

```bash
# 1. Install dependencies
yarn install
# ✅ Should complete without errors

# 2. Type check
yarn typecheck
# ✅ Should show no errors

# 3. Lint
yarn lint
# ✅ Should show no errors

# 4. Build library
yarn build
# ✅ Should generate dist/ folder

# 5. Run tests
yarn test
# ✅ All tests should pass

# 6. Start dev server
yarn dev
# ✅ Should open on localhost:9xxx
```

If all steps pass, your environment is correctly configured! 🎉

---

## Additional Resources

- [Node.js Installation Guide](https://nodejs.org/)
- [Yarn Berry Documentation](https://yarnpkg.com/)
- [VS Code TypeScript Tutorial](https://code.visualstudio.com/docs/typescript/typescript-tutorial)
- [Git Configuration](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)
