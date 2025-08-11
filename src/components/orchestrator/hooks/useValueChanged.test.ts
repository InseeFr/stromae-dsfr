import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useValueChanged } from './useValueChanged'

describe("useValueChanged", () => {
  it("should not trigger on initial render", () => {
    const callback = vi.fn();

    renderHook(() => useValueChanged({ a: 1 }, callback));

    expect(callback).not.toHaveBeenCalled();
  });

  it("should trigger when value changes", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ value }) => useValueChanged(value, callback),
      { initialProps: { value: { a: 1 } } }
    );

    rerender({ value: { a: 2 } });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ a: 2 });
  });

  it("should not trigger when value stays the same", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ value }) => useValueChanged(value, callback),
      { initialProps: { value: { a: 1 } } }
    );

    rerender({ value: { a: 1 } }); // deep equal

    expect(callback).not.toHaveBeenCalled();
  });

  it("should handle nested object changes", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ value }) => useValueChanged(value, callback),
      { initialProps: { value: { a: { b: 1 } } } }
    );

    rerender({ value: { a: { b: 2 } } });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ a: { b: 2 } });
  });

  it("should work with primitive values", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ value }) => useValueChanged(value, callback),
      { initialProps: { value: 1 } }
    );

    rerender({ value: 2 });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });
});
