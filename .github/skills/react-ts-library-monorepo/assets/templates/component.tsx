import React from 'react';
import classes from './ComponentTemplate.module.css';

export interface ComponentTemplateProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Visual variant of the component */
  variant?: 'default' | 'filled' | 'outline';

  /** Size of the component */
  size?: 'sm' | 'md' | 'lg';

  /** Additional CSS class names */
  className?: string;

  /** Custom inline styles */
  style?: React.CSSProperties;

  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /** Disables all interactions */
  disabled?: boolean;

  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * ComponentTemplate provides a reusable pattern for building UI components
 *
 * @example
 * Basic usage:
 * ```tsx
 * <ComponentTemplate variant="filled" size="md">
 *   Content here
 * </ComponentTemplate>
 * ```
 *
 * @example
 * With event handlers:
 * ```tsx
 * <ComponentTemplate
 *   variant="outline"
 *   onClick={(e) => console.log('Clicked!', e)}
 * >
 *   Click me
 * </ComponentTemplate>
 * ```
 */
export function ComponentTemplate({
  children,
  variant = 'default',
  size = 'md',
  className,
  style,
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
  ...rest
}: ComponentTemplateProps) {
  // Combine class names based on props
  const combinedClassName = [
    classes.root,
    classes[variant],
    classes[size],
    disabled && classes.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle click with disabled check
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <div
      className={combinedClassName}
      style={style}
      onClick={handleClick}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

ComponentTemplate.displayName = 'ComponentTemplate';
