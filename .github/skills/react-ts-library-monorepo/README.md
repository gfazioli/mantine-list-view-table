# React TypeScript Library Monorepo Skill

A comprehensive Agent Skill for developing, testing, building, and releasing React + TypeScript component libraries in a Yarn workspaces monorepo with Next.js documentation.

## 📁 Structure

```
react-ts-library-monorepo/
├── SKILL.md                    # Main skill documentation
├── references/                 # Detailed documentation
│   ├── coding-standards.md    # TypeScript, React, a11y patterns
│   ├── architecture.md        # Workspace structure, build pipeline
│   ├── creating-demos.md      # Demo patterns and best practices
│   ├── ci-pipeline.md         # GitHub Actions configuration
│   ├── release-process.md     # Versioning and publishing guide
│   └── environment-setup.md   # Local dev environment setup
└── assets/templates/           # Reusable templates
    ├── pr-checklist.md        # Pull request template
    ├── issue-bug.md           # Bug report template
    ├── issue-feature.md       # Feature request template
    ├── commit-guide.md        # Commit message conventions
    ├── component.tsx          # React component template
    ├── hook.ts                # Custom hook template
    ├── test-example.test.tsx  # Test file template
    ├── demo-simple.tsx        # Simple demo template
    ├── demo-interactive.tsx   # Interactive demo template
    ├── demo-configurator-advanced.tsx  # Advanced configurator
    ├── demo-configurator.tsx  # Configurator demo template
    ├── demo-with-data.tsx     # Demo with external data
    ├── demo-data.ts           # Mock data template
    ├── .env.example           # Environment variables example
    ├── eslint.config.mjs      # ESLint configuration
    ├── prettier.config.js     # Prettier configuration
    └── jest.config.ts         # Jest configuration
```

## 🚀 Quick Start

### Using the Skill

Reference this skill in your conversations with GitHub Copilot:

```
@workspace Use the react-ts-library-monorepo skill to build the library
```

or

```
How do I run tests? (Check react-ts-library-monorepo skill)
```

### Using Templates

Templates are in `assets/templates/`:

- **Component:** Copy `component.tsx` when creating new components
- **Test:** Use `test-example.test.tsx` as testing reference
- **Demos:** Use `demo-*.tsx` templates for component demonstrations
- **Configs:** Reference config templates for ESLint, Prettier, Jest setup
- **GitHub:** Use issue/PR templates for standardized contributions

## 📖 Documentation

### SKILL.md

The main entry point with:
- When to use this skill
- Development workflows (dev, build, test, deploy)
- Common tasks and troubleshooting
- Scripts reference
- Quick access to all resources

### References

Detailed guides in `references/`:

1. **[coding-standards.md](./references/coding-standards.md)**
   - TypeScript patterns
   - React component patterns
   - Accessibility guidelines
   - Testing patterns
   - CSS/styling guidelines

2. **[architecture.md](./references/architecture.md)**
   - Workspace structure
   - Build pipeline
   - Module system (ESM/CJS)
   - Type generation
   - Documentation architecture

3. **[ci-pipeline.md](./references/ci-pipeline.md)**
   - GitHub Actions workflows
   - Optimization strategies
   - Troubleshooting CI failures
   - Security best practices

4. **[release-process.md](./references/release-process.md)**
   - Semantic versioning
   - Pre-release checklist
   - npm publishing
   - Documentation deployment
   - Rollback procedures

5. **[environment-setup.md](./references/environment-setup.md)**
   - Node.js and package manager setup
   - IDE configuration
   - Environment variables
   - Git configuration
   - Troubleshooting

6. **[creating-demos.md](./references/creating-demos.md)**
   - Demo types and patterns
   - Simple, interactive, and configurator demos
   - Best practices for demonstrations
   - Organizing demo files

## 🎯 Common Use Cases

### Development

```bash
# Start dev server
yarn dev

# Build library
yarn build

# Run tests
yarn test
```

### Creating Components

Manually copy and adapt templates:

```bash
# Copy component template
cp .github/skills/react-ts-library-monorepo/assets/templates/component.tsx package/src/MyComponent.tsx

# Copy test template
cp .github/skills/react-ts-library-monorepo/assets/templates/test-example.test.tsx package/src/MyComponent.test.tsx
```

### Creating Demos

Use demo templates for documentation:

```bash
# Simple static demo
cp .github/skills/react-ts-library-monorepo/assets/templates/demo-simple.tsx docs/demos/MyComponent.demo.basic.tsx

# Interactive demo with state
cp .github/skills/react-ts-library-monorepo/assets/templates/demo-interactive.tsx docs/demos/MyComponent.demo.interactive.tsx

# Configurator demo
cp .github/skills/react-ts-library-monorepo/assets/templates/demo-configurator.tsx docs/demos/MyComponent.demo.configurator.tsx
```

### Quality Checks

```bash
# Run all checks
yarn test

# Or individually
yarn typecheck
yarn lint
yarn j

## 🔧 Customization

This skill is **generic and portable**. To adapt it:

1. **Update port numbers:** Change development server ports in SKILL.md if different
2. **Adjust commands:** Modify script commands to match your project's scripts
3. **Add project-specific notes:** Extend troubleshooting or add special considerations
4. **Customize templates:** Modify templates in `assets/templates/` for your conventions
code examples and demos
- Reference **demo templates** when creating component demonstrations

### External Resources

- [Yarn Documentation](https://yarnpkg.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Testing Library](https://testing-library.com/)

## ✅ Skill Adoption Checklist

- [ ] Skill files copied to `.github/skills/react-ts-library-monorepo/`
- [ ] SKILL.md reviewed and customized
- [ ] Templates adapted for project conventions
- [ ] Demo templates reviewed and understood
- [ ] Team trained on using the skill
- [ ] Verified with `yarn testes
- Run **scripts/verify.sh** to validate setup

### External Resources

- [Yarn Documentation](https://yarnpkg.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Testing Library](https://testing-library.com/)

## ✅ Skill Adoption Checklist

- [ ] Skill files copied to `.github/skills/react-ts-library-monorepo/`
- [ ] Scripts marked executable (`chmod +x scripts/*.sh`)
- [ ] SKILL.md reviewed and customized
- [ ] Templates adapted for project conventions
- [ ] Team trained on using the skill
- [ ] Verified with `scripts/verify.sh`

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-09  
**Compatible:** Yarn 4+, Node 20+, React 18-19, TypeScript 5+, Next.js 15+
