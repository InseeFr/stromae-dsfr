import { useEffect, useRef } from "react";
import equal from "fast-deep-equal";
import { useRefSync } from '@/components/orchestrator/hooks/useRefSync.ts'

export function useValueChanged<T>(value: T, callback: (newValue: T) => void) {
  const prevValueRef = useRef<T>(value);
  const isFirstRender = useRef(true);
  const callbackRef = useRefSync(callback)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first run
      prevValueRef.current = value;
      return;
    }

    if (!equal(prevValueRef.current, value)) {
      callbackRef.current(value);
      prevValueRef.current = value;
    }
  }, [value]);
}
