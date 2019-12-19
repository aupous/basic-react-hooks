import { useEffect, useRef } from "react";
export function useInterval(callback, delay, active) {
  const savedCallback = useRef();
  const timerRef = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (typeof delay === "number" && delay > 0 && active) {
      timerRef.current = setInterval(tick, delay);
      return () => clearInterval(timerRef.current);
    }
  }, [delay, active]);
}
