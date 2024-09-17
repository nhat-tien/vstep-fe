"use client"
import { useCallback, useEffect, useState } from "react";

export default function useTimer({
  time,
  onProgress = (prev) => {},
  onEnd = () => {},
}) {
  const [isPause, setIsPause] = useState(false);
  const [timeRemain, setTimeRemain] = useState(time);

  useEffect(() => {
    if(isPause) return;
    if(!timeRemain) {
      onEnd()
      return;
    };
    const timer = setInterval(() => {
      setTimeRemain(prev => {
        onProgress(prev);
        return prev-1;
      })
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemain, isPause]);

  const pause = useCallback(() => setIsPause(!isPause));

  const reset = useCallback((time) => setTimeRemain(time));

  return { timeRemain, pause, reset};
}
