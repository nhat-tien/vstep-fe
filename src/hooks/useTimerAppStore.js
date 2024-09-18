"use client"
import { useCallback, useEffect, useState } from "react";
import { useAppStore } from "@/stores/app-store-provider";

export default function useTimerAppStore({
  time, 
  onProgress = (prev) => {},
  onEnd = () => {},
}) {
  const timeRemain = useAppStore(state => state.currentTimeRemain);
  const setTimeRemain = useAppStore(state => state.setTimeRemain);
  const [isPause, setIsPause] = useState(false);

  useEffect(() => { setTimeRemain(time)},[])

  useEffect(() => {
    if(isPause) return;
    if(timeRemain < 0) {
      onEnd()
      return;
    };
    const timer = setInterval(() => {
      onProgress(timeRemain);
      setTimeRemain(timeRemain-1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemain, isPause]);

  const pause = useCallback(() => setIsPause(true));

  const restart = useCallback(() => setIsPause(false))

  const reset = useCallback((time) => setTimeRemain(time));

  return { timeRemain, pause, reset, restart};
}
