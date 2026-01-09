# Creating Component Demos

Guide for creating effective component demonstrations using the Mantine demo system.

## Table of Contents

- [Demo Types](#demo-types)
- [Demo Structure](#demo-structure)
- [Simple Code Demos](#simple-code-demos)
- [Configurator Demos](#configurator-demos)
- [Working with Data](#working-with-data)
- [Best Practices](#best-practices)

---

## Demo Types

The project uses `@mantinex/demo` for component demonstrations. All demos must:

1. Export a named constant (not default export)
2. Use the `MantineDemo` type
3. Specify a demo type (`'code'` or `'configurator'`)
4. Include both component and code representation

### Available Demo Types

- **`'code'`**: Static or interactive demos showing code examples
- **`'configurator'`**: Interactive playground with controls for props

---

## Demo Structure

### Basic Pattern

```tsx
import { ComponentName } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return <ComponentName variant="default" size="md" />;
}

const code = `
import { ComponentName } from '@your-package/name';

function Demo() {
  return <ComponentName variant="default" size="md" />;
}
`;

export const basicUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
```

**Key points:**
- Named export (`export const basicUsage`)
- Type annotation (`: MantineDemo`)
- Code as array of file objects
- Separate code string for documentation

---

## Simple Code Demos

### Static Example

**Template:** [demo-simple.tsx](../assets/templates/demo-simple.tsx)

```tsx
import { Button } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return <Button variant="filled">Click me</Button>;
}

const code = `
import { Button } from '@your-package/name';

function Demo() {
  return <Button variant="filled">Click me</Button>;
}
`;

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
```

### Interactive with State

**Template:** [demo-interactive.tsx](../assets/templates/demo-interactive.tsx)

```tsx
import { useState } from 'react';
import { Counter } from '@workspace/package';
import { MantineDemo } from '@mantinex/demo';
import { Text } from '@mantine/core';

function Demo() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter value={count} onChange={setCount} />
      <Text mt="md">Count: {count}</Text>
    </>
  );
}

const code = `
import { useState } from 'react';
import { Counter } from '@your-package/name';
import { Text } from '@mantine/core';

function Demo() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter value={count} onChange={setCount} />
      <Text mt="md">Count: {count}</Text>
    </>
  );
}
`;

export const interactive: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
```

---

## Configurator Demos
      
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Demo Modal"
      >
        Modal content here
      </Modal>
    </>
  );
}

export default Demo;
```

---

## Configurator Demos

### Basic Configurator

```tsx
import type { MantineDemo } from '@mantinex/demo';
import { Button } from '@workspace/package';

const code = `
import { Button } from '@your-package/name';

function Demo() {
  return (
    <Button{{props}}>
      {{children}}
    </Button>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Button,
  code,
  centered: true,
  controls: [
    {
      prop: 'variant',
      type: 'segmented',
      data: ['default', 'filled', 'outline'],
      initialValue: 'default',
      libraryValue: 'default',
    },
    {
      prop: 'size',
      type: 'segmented',
      data: ['sm', 'md', 'lg'],
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'children',
      type: 'string',
      initialValue: 'Button',
    },
  ],
};
```

### Control Types

**Segmented (Radio buttons):**
```tsx
{
  prop: 'variant',
  type: 'segmented',
  data: [
    { value: 'default', label: 'Default' },
    { value: 'filled', label: 'Filled' },
  ],
  initialValue: 'default',
  libraryValue: 'default',
}
```

**Select (Dropdown):**
```tsx
{
  prop: 'size',
  type: 'select',
  data: [
    { value: 'xs', label: 'Extra small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
  ],
  initialValue: 'md',
  libraryValue: 'md',
}
```

**Boolean (Toggle):**
```tsx
{
  prop: 'disabled',
  type: 'boolean',
  initialValue: false,
  libraryValue: false,
}
```

**Color (Color picker):**
```tsx
{
  prop: 'color',
  type: 'color',
  initialValue: 'blue',
  libraryValue: 'blue',
}
```

**Number (Number input):**
```tsx
{
  prop: 'radius',
  type: 'number',
  min: 0,
  max: 50,
  step: 1,
  initialValue: 4,
  libraryValue: 4,
}
```

**String (Text input):**
```tsx
{
  prop: 'placeholder',
  type: 'string',
  initialValue: 'Enter text...',
}
```

### Code Generation

The `code` template uses placeholders:

- **`{{props}}`** - Replaced with selected props
- **`{{children}}`** - Replaced with children value

Example:
```tsx
const code = `
import { Component } from '@package/name';

function Demo() {
  return (
    <Component{{props}}>
      {{children}}
    </Component>
  );
}
`;
```

Generates:
```tsx
import { Component } from '@package/name';

function Demo() {
  return (
    <Component variant="filled" size="md">
      Hello World
    </Component>
  );
}
```

---

## Best Practices

### 1. Keep Demos Focused

**Good:**
```tsx
// Single purpose: Show variant options
function Demo() {
  return (
    <>
      <Button variant="default">Default</Button>
      <Button variant="filled">Filled</Button>
    </>
  );
}
```

**Bad:**
```tsx
// Too much: Variants, sizes, states all at once
function Demo() {
  return (
    <>
      <Button variant="default" size="sm">Small Default</Button>
      <Button variant="filled" size="md" disabled>Medium Filled Disabled</Button>
      {/* Too many combinations */}
    </>
  );
}
```

### 2. Use Realistic Data

**Good:**
```tsx
const items = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];
```

**Bad:**
```tsx
const items = [
  { id: '1', name: 'Test 1', email: 'test1' },
  { id: '2', name: 'Test 2', email: 'test2' },
];
```

### 3. Add Visual Context

Use Mantine components for better presentation:

```tsx
import { Stack, Group, Paper, Text } from '@mantine/core';

function Demo() {
  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Example demonstration
        </Text>
        <YourComponent />
      </Stack>
    </Paper>
  );
}
```

### 4. Handle Edge Cases

Show loading, error, and empty states:

```tsx
function Demo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <YourComponent
      loading={loading}
      error={error}
      onRetry={() => setError(null)}
    />
  );
}
```

### 5. Provide Clear Labels

```tsx
export const configurator: MantineDemo = {
  // ...
  controls: [
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'default', label: 'Default' }, // Clear label
        { value: 'filled', label: 'Filled' },
      ],
    },
  ],
};
```

---

## Organizing Demo Files

### File Naming Convention

```
docs/demos/
├── ComponentName.demo.basic.tsx           # Simple usage
├── ComponentName.demo.variants.tsx        # Different variants
├── ComponentName.demo.sizes.tsx           # Size options
├── ComponentName.demo.configurator.tsx    # Main configurator
├── ComponentName.demo.states.tsx          # Loading/error states
├── ComponentName.demo.advanced.tsx        # Complex usage
└── data/
    ├── component-data.ts                  # Mock data
    └── component-columns.tsx              # Column definitions
```

### Demo Index

Create an index file to export all demos:

```tsx
// demos/index.ts
export { basic } from './ComponentName.demo.basic';
export { variants } from './ComponentName.demo.variants';
export { configurator } from './ComponentName.demo.configurator';
export { advanced } from './ComponentName.demo.advanced';
```

### Data Organization

Keep data separate and reusable:

```tsx
// demos/data/users.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
];

// demos/ComponentName.demo.users.tsx
import { users } from './data/users';

function Demo() {
  return <UserTable data={users} />;
}
```

---

## Demo Documentation

### In MDX Files

Reference demos in your documentation:

```mdx
# Component Name

Description of the component.

## Basic Usage

<Demo data={demos.basic} />

## Configurator

<Demo data={demos.configurator} />

## Advanced Examples

<Demo data={demos.advanced} />
```

### With Explanations

Add context before each demo:

```mdx
## Variants

The component supports three visual variants:

<Demo data={demos.variants} />

The `variant` prop controls the visual style...
```

---

## Templates Reference

Use these templates as starting points:

- **[demo-simple.tsx](../assets/templates/demo-simple.tsx)** - Basic static demo
- **[demo-interactive.tsx](../assets/templates/demo-interactive.tsx)** - Demo with state
- **[demo-configurator.tsx](../assets/templates/demo-configurator.tsx)** - Basic configurator
- **[demo-configurator-advanced.tsx](../assets/templates/demo-configurator-advanced.tsx)** - All control types
- **[demo-with-data.tsx](../assets/templates/demo-with-data.tsx)** - External data usage
- **[demo-data.ts](../assets/templates/demo-data.ts)** - Mock data structure

---

## Additional Resources

- [Mantine Demo Documentation](https://mantine.dev/guides/demo/)
- [MDX Documentation](https://mdxjs.com/)
- [React Documentation](https://react.dev/)
