"use client";

import { useEffect, useState } from "react";

export default function useDebounce(text, delay = 3000) {
  const [value, setValue] = useState(text);
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return value;
}
