import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentTemplate } from './ComponentTemplate';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('ComponentTemplate', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<ComponentTemplate>Test content</ComponentTemplate>);

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <ComponentTemplate className="custom-class">Content</ComponentTemplate>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies custom styles', () => {
      const { container } = render(
        <ComponentTemplate style={{ color: 'red' }}>Content</ComponentTemplate>
      );

      expect(container.firstChild).toHaveStyle({ color: 'red' });
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<ComponentTemplate>Content</ComponentTemplate>);

      // Check for default variant class
      expect(container.firstChild).toHaveClass('default');
    });

    it('renders filled variant', () => {
      const { container } = render(<ComponentTemplate variant="filled">Content</ComponentTemplate>);

      expect(container.firstChild).toHaveClass('filled');
    });

    it('renders outline variant', () => {
      const { container } = render(
        <ComponentTemplate variant="outline">Content</ComponentTemplate>
      );

      expect(container.firstChild).toHaveClass('outline');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      const { container } = render(<ComponentTemplate>Content</ComponentTemplate>);

      expect(container.firstChild).toHaveClass('md');
    });

    it('renders small size', () => {
      const { container } = render(<ComponentTemplate size="sm">Content</ComponentTemplate>);

      expect(container.firstChild).toHaveClass('sm');
    });

    it('renders large size', () => {
      const { container } = render(<ComponentTemplate size="lg">Content</ComponentTemplate>);

      expect(container.firstChild).toHaveClass('lg');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<ComponentTemplate onClick={handleClick}>Click me</ComponentTemplate>);

      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <ComponentTemplate onClick={handleClick} disabled>
          Click me
        </ComponentTemplate>
      );

      const button = screen.getByText('Click me');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard interaction', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<ComponentTemplate onClick={handleClick}>Press Enter</ComponentTemplate>);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Disabled state', () => {
    it('adds disabled class when disabled', () => {
      const { container } = render(<ComponentTemplate disabled>Content</ComponentTemplate>);

      expect(container.firstChild).toHaveClass('disabled');
    });

    it('sets aria-disabled attribute', () => {
      render(<ComponentTemplate disabled>Content</ComponentTemplate>);

      expect(screen.getByText('Content')).toHaveAttribute('aria-disabled', 'true');
    });

    it('removes tabIndex when disabled', () => {
      render(
        <ComponentTemplate onClick={jest.fn()} disabled>
          Content
        </ComponentTemplate>
      );

      expect(screen.getByText('Content')).not.toHaveAttribute('tabindex');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ComponentTemplate aria-label="Test component">Content</ComponentTemplate>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('applies aria-label correctly', () => {
      render(<ComponentTemplate aria-label="Custom label">Content</ComponentTemplate>);

      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('is keyboard accessible when clickable', () => {
      render(<ComponentTemplate onClick={jest.fn()}>Click me</ComponentTemplate>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Edge cases', () => {
    it('handles undefined children', () => {
      const { container } = render(<ComponentTemplate />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles multiple children', () => {
      render(
        <ComponentTemplate>
          <span>First</span>
          <span>Second</span>
        </ComponentTemplate>
      );

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('forwards additional props', () => {
      render(<ComponentTemplate data-testid="custom-test-id">Content</ComponentTemplate>);

      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
    });
  });
});
