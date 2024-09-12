"use client";

import { useCounterStore } from "@/stores/counter-store-provider";

export default function TestPage() {
  const count = useCounterStore((state) => state.count);
  const incr = useCounterStore((state) => state.increment);
  return (
    <>
      <div>Test page</div>
      <div>{count}</div>
      <button onClick={incr}>click</button>
    </>
  );
}
