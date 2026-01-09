# Commit Message Guide

Following Conventional Commits specification for clear, structured commit history.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation only changes
- **style:** Changes that don't affect code meaning (formatting, missing semicolons)
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **perf:** Performance improvement
- **test:** Adding or correcting tests
- **chore:** Changes to build process, dependencies, or auxiliary tools

## Scope (Optional)

The scope provides additional context:

- Component name: `button`, `dropdown`, `modal`
- Area: `types`, `styles`, `build`, `ci`

## Subject

- Use imperative, present tense: "add" not "added" nor "adds"
- Don't capitalize first letter
- No period at the end
- Max 72 characters

## Body (Optional)

- Explain the motivation for the change
- Contrast with previous behavior
- Wrap at 72 characters

## Footer (Optional)

- Reference issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

## Examples

### Feature

```
feat(button): add size prop

Add small, medium, and large size variants to Button component.
Sizes control padding and font-size.

Closes #42
```

### Bug Fix

```
fix(dropdown): correct focus management on close

Previously, focus was lost when closing dropdown via Escape key.
Now focus returns to trigger button as expected.

Fixes #123
```

### Breaking Change

```
feat(input)!: remove deprecated variant prop

BREAKING CHANGE: The `variant` prop has been removed.
Use `appearance` prop instead.

Migration:
- <Input variant="filled" /> → <Input appearance="filled" />
```

### Documentation

```
docs: update installation instructions

Add instructions for TypeScript setup and peer dependencies.
```

### Refactor

```
refactor(hooks): simplify useToggle implementation

Reduce code complexity without changing external API.
```

### Performance

```
perf(list): optimize rendering for large datasets

Use React.memo and virtualization to improve performance
when rendering lists with 1000+ items.
```

### Tests

```
test(button): add accessibility tests

Add jest-axe tests to verify button has no a11y violations.
```

### Chore

```
chore: upgrade dependencies

- React 18.2.0 → 18.3.0
- TypeScript 5.0.0 → 5.3.0
```

## Tips

1. **Keep commits atomic:** One logical change per commit
2. **Write meaningful subjects:** Clear purpose at a glance
3. **Use body for context:** Explain "why", not "what"
4. **Reference issues:** Link commits to GitHub issues
5. **Mark breaking changes:** Use `!` or `BREAKING CHANGE:` footer

## Tools

### Commitlint

Enforce conventional commits:

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional

# commitlint.config.js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

### Commitizen

Interactive commit CLI:

```bash
yarn add -D commitizen cz-conventional-changelog

# package.json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}

# Usage
yarn git-cz
```

## Pre-commit Hook

Automatically validate commits:

```bash
# .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn commitlint --edit "$1"
```

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitlint](https://commitlint.js.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
