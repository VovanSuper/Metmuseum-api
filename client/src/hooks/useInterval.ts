import { useEffect, useRef } from 'react';
import { start } from 'repl';

export default function useInterval(delay = 1000, callback: Function) {
  console.log('useInterval created ...!');
  const savedCallback = useRef<Function>();
  const timer = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  function tick() {
    console.log('useInterval TICK...!');
    savedCallback.current && savedCallback.current();
  }

  const createTimer = () => {
    timer.current = setInterval(tick, delay);
  };

  const dismissTimer = () => {
    clearInterval(timer.current);
  };
  // useEffect(() => {
  //   if (!!delay) {
  //     let timerId = setInterval(tick, delay);
  //     return () => {
  //       clearInterval(timerId);
  //       console.log('useInterval clear ...!');
  //       return;
  //     };
  //   }
  //
  // }, [delay]);

  const startTimer = () => {
    createTimer();
  };
  const stopTimer = () => {
    dismissTimer();
  };

  return { startTimer, stopTimer };
}
