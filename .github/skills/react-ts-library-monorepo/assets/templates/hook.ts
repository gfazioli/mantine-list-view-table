import { act, renderHook } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCustomHook(false));

    expect(result.current.value).toBe(false);
  });

  it('toggles value correctly', () => {
    const { result } = renderHook(() => useCustomHook(false));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
  });

  it('sets value directly', () => {
    const { result } = renderHook(() => useCustomHook(false));

    act(() => {
      result.current.setValue(true);
    });

    expect(result.current.value).toBe(true);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCustomHook(false));

    act(() => {
      result.current.setValue(true);
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(false);
  });

  it('updates when initial value changes', () => {
    const { result, rerender } = renderHook(({ initialValue }) => useCustomHook(initialValue), {
      initialProps: { initialValue: false },
    });

    expect(result.current.value).toBe(false);

    rerender({ initialValue: true });

    expect(result.current.value).toBe(true);
  });
});
