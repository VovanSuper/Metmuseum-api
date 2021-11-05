import { useCallback, useEffect, useRef } from 'react';

export default function useInterval(delay = 1000, callback: Function) {
  const savedCallback = useRef<Function>();
  const timer = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  function tick(): void {
    console.log('useInterval TICK...!');
    savedCallback.current && savedCallback.current();
  }
  function createTimer() {
    timer.current = setInterval(tick, delay);
  }
  function dismissTimer() {
    clearInterval(timer.current);
  }

  const startTimer = useCallback(createTimer, [delay]);
  const stopTimer = useCallback(dismissTimer, []);

  return { startTimer, stopTimer };
}
