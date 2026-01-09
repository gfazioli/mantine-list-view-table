# Release Process

Comprehensive guide for versioning, publishing, and deploying React + TypeScript library packages.

## Table of Contents

- [Versioning Strategy](#versioning-strategy)
- [Pre-Release Checklist](#pre-release-checklist)
- [Release Workflow](#release-workflow)
- [npm Publishing](#npm-publishing)
- [Documentation Deployment](#documentation-deployment)
- [Post-Release Tasks](#post-release-tasks)
- [Rollback Procedure](#rollback-procedure)

---

## Versioning Strategy

### Semantic Versioning (SemVer)

Follow **[Semantic Versioning 2.0.0](https://semver.org/)** for version numbers:

```
MAJOR.MINOR.PATCH

Example: 2.3.1
```

**Version increments:**

- **MAJOR (2.x.x):** Breaking changes (incompatible API changes)
- **MINOR (x.3.x):** New features (backward-compatible)
- **PATCH (x.x.1):** Bug fixes (backward-compatible)

---

### When to Bump Each Version

**MAJOR (Breaking Changes):**

- Removing public APIs
- Changing function signatures
- Renaming props or components
- Removing support for older React versions
- Changing default behavior that affects existing code

Examples:
```
1.5.2 → 2.0.0  (removed deprecated `variant` prop)
2.1.0 → 3.0.0  (requires React 18+, dropped React 17)
```

**MINOR (New Features):**

- Adding new components or hooks
- Adding new optional props
- Adding new public APIs
- Deprecating APIs (with backward compatibility)

Examples:
```
1.2.3 → 1.3.0  (added `size` prop)
2.1.0 → 2.2.0  (added new `useMedia` hook)
```

**PATCH (Bug Fixes):**

- Fixing bugs without changing APIs
- Performance improvements
- Documentation updates
- Type definition fixes
- CSS/styling fixes

Examples:
```
1.2.3 → 1.2.4  (fixed focus management bug)
2.1.0 → 2.1.1  (corrected TypeScript types)
```

---

### Pre-Release Versions

**Alpha (unstable, early testing):**
```
2.0.0-alpha.1
2.0.0-alpha.2
```

**Beta (feature-complete, testing):**
```
2.0.0-beta.1
2.0.0-beta.2
```

**Release Candidate (final testing):**
```
2.0.0-rc.1
2.0.0-rc.2
```

**Publishing pre-releases:**
```bash
npm publish --tag next
```

Users install with:
```bash
yarn add library@next
```

---

## Pre-Release Checklist

### Code Quality

- [ ] All tests pass (`yarn test`)
- [ ] No linting errors (`yarn lint`)
- [ ] No type errors (`yarn typecheck`)
- [ ] Code formatted (`yarn prettier:write`)
- [ ] No console warnings in browser

### Functionality

- [ ] Library builds successfully (`yarn build`)
- [ ] Documentation builds successfully (`yarn docs:build`)
- [ ] All demos work correctly in docs site
- [ ] Tested in target browsers (Chrome, Firefox, Safari, Edge)
- [ ] Tested in example consuming application
- [ ] No accessibility violations (`jest-axe` passes)

### Documentation

- [ ] CHANGELOG updated with user-facing changes
- [ ] Breaking changes documented in upgrade guide
- [ ] README updated (if API changes)
- [ ] JSDoc comments accurate and complete
- [ ] Migration guide created (for major versions)

### Dependencies

- [ ] Dependencies up to date (`yarn upgrade-interactive`)
- [ ] No security vulnerabilities (`yarn audit`)
- [ ] Peer dependencies correctly specified
- [ ] Bundle size acceptable (check with `bundlephobia`)

### Version & Metadata

- [ ] Version bumped in `package/package.json`
- [ ] Git tag created (or will be created by script)
- [ ] Release notes prepared

---

## Release Workflow

### Automated Release (Recommended)

**Use release scripts:**

```bash
# Patch release (1.2.3 → 1.2.4)
yarn release:patch

# Minor release (1.2.3 → 1.3.0)
yarn release:minor

# Major release (1.2.3 → 2.0.0)
yarn release:major
```

**What these scripts do:**

1. Update version in `package/package.json`
2. Commit version change
3. Create git tag (e.g., `v1.2.4`)
4. Build library
5. Run tests
6. Deploy documentation
7. Push changes and tags to remote

**Script implementation example:**

```typescript
// scripts/release.ts
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const versionType = process.argv[2]; // 'patch' | 'minor' | 'major'

// Read current version
const pkgPath = path.join(process.cwd(), 'package/package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version;

// Bump version
const [major, minor, patch] = currentVersion.split('.').map(Number);
let newVersion: string;

switch (versionType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
  default:
    throw new Error('Invalid version type');
}

// Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

// Git operations
execSync(`git add ${pkgPath}`);
execSync(`git commit -m "Release v${newVersion}"`);
execSync(`git tag v${newVersion}`);

// Build and test
execSync('yarn build', { stdio: 'inherit' });
execSync('yarn test', { stdio: 'inherit' });

console.log(`✅ Released v${newVersion}`);
console.log('Next steps:');
console.log('  1. Push: git push && git push --tags');
console.log('  2. Publish: cd package && npm publish');
console.log('  3. Create GitHub release');
```

---

### Manual Release

**Step-by-step process:**

1. **Update version:**

```bash
cd package
npm version patch  # or minor, major
cd ..
```

2. **Update CHANGELOG:**

```markdown
## [1.2.4] - 2026-01-09

### Fixed
- Fixed focus management in dropdown component
- Corrected TypeScript types for `onChange` callback

### Changed
- Improved accessibility for modal component
```

3. **Commit and tag:**

```bash
git add package/package.json CHANGELOG.md
git commit -m "Release v1.2.4"
git tag v1.2.4
```

4. **Build and test:**

```bash
yarn build
yarn test
```

5. **Push to remote:**

```bash
git push origin main
git push origin v1.2.4
```

6. **Continue with publishing steps below...**

---

## npm Publishing

### Initial Setup

**One-time setup:**

1. **Create npm account:** https://www.npmjs.com/signup

2. **Login locally:**

```bash
npm login
```

3. **Verify authentication:**

```bash
npm whoami
```

---

### Publishing the Package

**From package directory:**

```bash
cd package

# Dry run (check what will be published)
npm publish --dry-run

# Publish to npm
npm publish --access public
```

**What gets published:**

- `dist/` directory (built files)
- `package.json`
- `README.md`
- `LICENSE`

**What's excluded (via `.npmignore` or `package.json` `files` field):**

- `src/` (source files)
- `*.test.tsx` (tests)
- `*.story.tsx` (stories)
- Development configs

---

### Verify Publication

**Check on npm:**

```bash
# View package info
npm info your-package-name

# Install and test
npm install your-package-name@latest
```

**Test in a consuming app:**

```bash
mkdir test-app
cd test-app
npm init -y
npm install your-package-name

# Create test file
cat > test.js << 'EOF'
const { Component } = require('your-package-name');
console.log('Component:', Component);
EOF

node test.js
```

---

### Scoped Packages

**If using scoped package name (e.g., `@username/package`):**

```json
// package.json
{
  "name": "@username/package-name",
  "publishConfig": {
    "access": "public"
  }
}
```

**Publish:**

```bash
npm publish --access public
```

---

## Documentation Deployment

### GitHub Pages Deployment

**Automated (recommended):**

```bash
yarn docs:deploy
```

**Manual:**

```bash
# Build docs
yarn docs:build

# Create .nojekyll file (for GitHub Pages)
touch docs/out/.nojekyll

# Deploy with gh-pages
npx gh-pages -d docs/out -t
```

**What this does:**

1. Builds static Next.js site
2. Pushes to `gh-pages` branch
3. GitHub Pages serves at `https://username.github.io/repo-name/`

---

### Custom Domain

**Add `CNAME` file:**

```bash
echo "docs.yourpackage.com" > docs/public/CNAME
```

**Configure DNS:**

Add CNAME record pointing to `username.github.io`

**Verify:**

Visit `https://docs.yourpackage.com` after DNS propagation

---

### Alternative Hosting

**Vercel:**

```bash
cd docs
vercel --prod
```

**Netlify:**

```bash
cd docs
netlify deploy --prod
```

---

## Post-Release Tasks

### Create GitHub Release

1. Go to `https://github.com/username/repo/releases/new`

2. **Tag:** Select existing tag (e.g., `v1.2.4`)

3. **Release title:** `v1.2.4`

4. **Description:**

```markdown
## What's Changed

### Fixed
- Fixed focus management in dropdown component (#123)
- Corrected TypeScript types for `onChange` callback (#124)

### Changed
- Improved accessibility for modal component (#125)

**Full Changelog**: https://github.com/username/repo/compare/v1.2.3...v1.2.4

## Installation

\`\`\`bash
npm install your-package-name@1.2.4
\`\`\`

## Documentation

https://username.github.io/repo
```

5. **Publish release**

---

### Update Examples

**Update example projects:**

```bash
cd examples/basic-usage
npm install your-package-name@latest
# Test and commit
```

---

### Announce Release

**Where to announce:**

- Twitter/X
- GitHub Discussions
- Discord/Slack community
- Dev.to blog post (for major releases)
- Product Hunt (for major milestones)

**Example announcement:**

```
🎉 just-released v1.2.4 of @yourpackage!

✨ Highlights:
• Fixed focus management in dropdowns
• Improved accessibility
• Better TypeScript types

📦 npm install your-package-name@latest
📚 Docs: https://...

Full changelog: https://...
```

---

### Monitor for Issues

**After release:**

- [ ] Watch GitHub issues for bug reports
- [ ] Monitor npm download stats
- [ ] Check for automated security alerts
- [ ] Review user feedback

---

## Rollback Procedure

### Unpublish (within 72 hours)

**⚠️ Use with caution!**

```bash
npm unpublish your-package-name@1.2.4
```

**Limitations:**

- Only works within 72 hours
- Cannot unpublish if package has significant downloads
- Version number is burned (cannot reuse)

---

### Deprecate (preferred method)

**Deprecate broken version:**

```bash
npm deprecate your-package-name@1.2.4 "This version has critical bugs. Use 1.2.5 instead."
```

**Users see:**

```
npm WARN deprecated your-package-name@1.2.4: This version has critical bugs. Use 1.2.5 instead.
```

---

### Hotfix Release

**Quick fix process:**

1. **Create hotfix branch:**

```bash
git checkout -b hotfix/1.2.5
```

2. **Fix the issue:**

```bash
# Make fix
# Test thoroughly
```

3. **Release patch version:**

```bash
yarn release:patch  # 1.2.4 → 1.2.5
```

4. **Publish immediately:**

```bash
cd package
npm publish
```

5. **Deprecate broken version:**

```bash
npm deprecate your-package-name@1.2.4 "Buggy release. Use 1.2.5+"
```

---

## Release Schedule

### Suggested Cadence

- **Patch releases:** As needed (bug fixes)
- **Minor releases:** Every 2-4 weeks
- **Major releases:** Every 6-12 months

### Beta Periods

**For major versions:**

1. **Alpha:** 2-4 weeks (internal testing)
2. **Beta:** 2-4 weeks (community testing)
3. **RC:** 1 week (final verification)
4. **Stable:** Release!

---

## Checklist Template

Use this for each release:

```markdown
## Release Checklist v1.2.4

### Pre-Release
- [ ] All tests pass
- [ ] No linting/type errors
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Built successfully

### Release
- [ ] Git tag created
- [ ] Published to npm
- [ ] Documentation deployed
- [ ] GitHub release created

### Post-Release
- [ ] Examples updated
- [ ] Announcement posted
- [ ] Monitoring for issues
```

---

## Additional Resources

- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Keep a Changelog](https://keepachangelog.com/)
