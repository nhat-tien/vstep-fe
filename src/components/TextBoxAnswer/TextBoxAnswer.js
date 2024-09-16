"use client";
import { useAppStore } from "@/stores/app-store-provider";
import styles from "./styles.module.css";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export default function TextBoxAnswer({ questionId, part}) {
  const [currentText, setCurrentText] = useState("");
  const setWritingAnswers = useAppStore(state => state.setWritingAnswers);
  const debounceValue = useDebounce(currentText, 1000);

  useEffect(() => {
    setWritingAnswers(questionId, debounceValue, part) 
  },[debounceValue])

  return (
      <textarea
        rows="60"
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        placeholder="Write your essay here..."
        className={styles["textarea"]}
      />
  );
}
