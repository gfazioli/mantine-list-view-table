# Coding Standards

Comprehensive coding standards for React + TypeScript library development.

## Table of Contents

- [TypeScript Patterns](#typescript-patterns)
- [React Component Patterns](#react-component-patterns)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Testing Patterns](#testing-patterns)
- [CSS/Styling Guidelines](#cssstyling-guidelines)
- [File Naming Conventions](#file-naming-conventions)

---

## TypeScript Patterns

### Type Safety

**DO:**
- Enable `strict` mode in `tsconfig.json`
- Use explicit return types for exported functions
- Prefer `unknown` over `any` for dynamic data
- Use type guards for runtime type checking

```typescript
// ✅ Good: Explicit types and type guards
export function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  throw new Error('Invalid data type');
}

// ✅ Good: Explicit return type
export function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**DON'T:**
- Use `any` type (use `unknown` + type guards instead)
- Suppress errors with `@ts-ignore` without explanation
- Use type assertions (`as`) without validation

```typescript
// ❌ Bad: any type
function processData(data: any) {
  return data.toUpperCase();
}

// ❌ Bad: Unsafe type assertion
const value = data as string; // No runtime check!
```

---

### Interface vs Type

**Use `interface` for:**
- Object shapes that may be extended
- React component props
- Public API definitions

**Use `type` for:**
- Union types
- Intersection types
- Utility types
- Mapped types

```typescript
// ✅ Good: Interface for component props
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// ✅ Good: Type for unions
export type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ Good: Type for complex combinations
export type ButtonState = Pick<ButtonProps, 'variant'> & {
  isDisabled: boolean;
};
```

---

### Prop Types

**DO:**
- Document all props with JSDoc comments
- Mark optional props with `?`
- Provide sensible defaults in destructuring
- Use discriminated unions for variant props

```typescript
export interface ComponentProps {
  /** Primary content */
  children: React.ReactNode;

  /** Visual variant */
  variant?: 'default' | 'filled' | 'outline';

  /** Size of the component */
  size?: 'sm' | 'md' | 'lg';

  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Disables interaction */
  disabled?: boolean;
}

export function Component({
  children,
  variant = 'default',
  size = 'md',
  onClick,
  disabled = false,
}: ComponentProps) {
  // Implementation
}
```

---

### Generics

Use generics for reusable components with type safety:

```typescript
// ✅ Good: Generic list component
export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage maintains type safety
<List<User>
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  keyExtractor={(user) => user.id}
/>
```

---

## React Component Patterns

### Functional Components

**DO:**
- Use function declarations for named components
- Use arrow functions for inline callbacks
- Keep components focused and single-purpose
- Extract custom hooks for reusable logic

```typescript
// ✅ Good: Function declaration
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ✅ Good: Custom hook
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
}
```

---

### Props Destructuring

**DO:**
- Destructure props in function signature
- Provide defaults in destructuring
- Use rest operator for spreading DOM props

```typescript
export function Input({
  value,
  onChange,
  placeholder = 'Enter text...',
  disabled = false,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      {...rest}
    />
  );
}
```

---

### Event Handlers

**DO:**
- Use specific event types
- Use `useCallback` for memoization when needed
- Name handlers with `handle` prefix

```typescript
export function Form({ onSubmit }: FormProps) {
  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      onSubmit?.(Object.fromEntries(formData));
    },
    [onSubmit]
  );

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

---

### Refs and ForwardRef

**DO:**
- Use `forwardRef` for components that need ref access
- Type refs properly with `React.Ref<T>`
- Combine ref forwarding with `useImperativeHandle` sparingly

```typescript
export interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
);

Input.displayName = 'Input';
```

---

## Accessibility Guidelines

### ARIA and Semantic HTML

**DO:**
- Use semantic HTML elements first
- Add ARIA attributes only when necessary
- Ensure keyboard navigation works
- Provide text alternatives for non-text content

```typescript
// ✅ Good: Semantic HTML + ARIA when needed
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      hidden={!isOpen}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  );
}
```

---

### Keyboard Navigation

**DO:**
- Support standard keyboard shortcuts (Tab, Enter, Escape, Arrow keys)
- Manage focus appropriately
- Use `tabIndex` carefully

```typescript
export function Dropdown({ items, onSelect }: DropdownProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        onSelect(items[activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        // Close dropdown
        break;
    }
  };

  return (
    <ul role="listbox" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          key={item.id}
          role="option"
          aria-selected={index === activeIndex}
          tabIndex={index === activeIndex ? 0 : -1}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
```

---

### Labels and Descriptions

**DO:**
- Always label form inputs
- Use `aria-describedby` for additional context
- Provide error messages accessibly

```typescript
export function FormField({
  label,
  error,
  helperText,
  ...inputProps
}: FormFieldProps) {
  const id = React.useId();
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ')}
        {...inputProps}
      />
      {helperText && <span id={helperId}>{helperText}</span>}
      {error && (
        <span id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
```

---

## Testing Patterns

### Query Priorities

**Priority order:**
1. `getByRole` - Best for accessibility
2. `getByLabelText` - Good for form inputs
3. `getByPlaceholderText` - Acceptable for inputs
4. `getByText` - Good for non-interactive content
5. `getByDisplayValue` - For form inputs with values
6. `getByAltText` - For images
7. `getByTitle` - For title attributes
8. `getByTestId` - Last resort for dynamic content

```typescript
// ✅ Good: Role-based queries
test('renders button correctly', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});

// ✅ Good: Label-based for forms
test('renders input with label', () => {
  render(<FormField label="Email" />);
  const input = screen.getByLabelText(/email/i);
  expect(input).toBeInTheDocument();
});

// ⚠️ Acceptable: Test ID for dynamic content
test('renders dynamic list item', () => {
  render(<ListItem data-testid="item-123" />);
  const item = screen.getByTestId('item-123');
  expect(item).toBeInTheDocument();
});
```

---

### User Interactions

**DO:**
- Use `@testing-library/user-event` for realistic interactions
- Test keyboard navigation
- Verify focus management

```typescript
import userEvent from '@testing-library/user-event';

test('handles user interactions', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<Form onSubmit={handleSubmit} />);

  const input = screen.getByLabelText(/name/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Type into input
  await user.type(input, 'John Doe');
  expect(input).toHaveValue('John Doe');

  // Click button
  await user.click(submitButton);
  expect(handleSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
});
```

---

### Accessibility Testing

**DO:**
- Use `jest-axe` for automated a11y checks
- Test with screen readers (manual)
- Verify color contrast

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## CSS/Styling Guidelines

### CSS Modules

**DO:**
- Use CSS Modules for component styles
- Use semantic class names
- Avoid inline styles for static values
- Use CSS custom properties for theming

```css
/* Component.module.css */
.root {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.button {
  composes: root;
  background-color: var(--color-primary);
  border-radius: var(--radius-sm);
}
```

```typescript
import classes from './Component.module.css';

export function Component({ title }: ComponentProps) {
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{title}</h2>
      <button className={classes.button}>Action</button>
    </div>
  );
}
```

---

### Conditional Classes

**DO:**
- Use template literals for combining classes
- Create utility for complex class logic

```typescript
// ✅ Good: Simple conditional classes
<button
  className={`${classes.button} ${active ? classes.active : ''}`}
/>

// ✅ Good: Utility function
function cx(...classNames: (string | undefined | false)[]) {
  return classNames.filter(Boolean).join(' ');
}

<button
  className={cx(
    classes.button,
    active && classes.active,
    disabled && classes.disabled
  )}
/>
```

---

## File Naming Conventions

### Component Files

- **Components:** `PascalCase.tsx` (e.g., `Button.tsx`)
- **CSS Modules:** `PascalCase.module.css` (e.g., `Button.module.css`)
- **Tests:** `PascalCase.test.tsx` (e.g., `Button.test.tsx`)
- **Stories:** `PascalCase.story.tsx` (e.g., `Button.story.tsx`)
- **Hooks:** `useCamelCase.ts` (e.g., `useToggle.ts`)
- **Utils:** `kebab-case.ts` (e.g., `format-date.ts`)

### Directory Structure

```
package/src/
├── index.ts                 # Public exports
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.test.tsx
│   └── Button.story.tsx
├── hooks/
│   ├── useToggle.ts
│   └── useMediaQuery.ts
└── utils/
    ├── format-date.ts
    └── validate-email.ts
```

---

## Code Review Checklist

Before submitting:
- [ ] Types are explicit and correct
- [ ] No `any` types used
- [ ] Components are accessible (ARIA, keyboard nav)
- [ ] Tests cover main functionality
- [ ] No accessibility violations (jest-axe)
- [ ] Code is formatted (Prettier)
- [ ] No ESLint errors
- [ ] Props are documented with JSDoc
- [ ] CSS classes use modules
- [ ] No hardcoded strings (use constants/i18n)

---

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about/#priority)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Accessibility Guidelines](https://webaim.org/standards/wcag/checklist)
