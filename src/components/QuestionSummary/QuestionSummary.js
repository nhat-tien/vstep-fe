"use client";
import styles from "./styles.module.css";
import { useAppStore } from "@/stores/app-store-provider";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useMemo } from "react";

export default function QuestionSummary({ skill, part }) {
  const answers = useAppStore((state) => state[`${skill}Answers${part}`]);
  const total = useAppStore(
    (state) => state[`count${capitalizeFirstLetter(skill)}${part}`],
  );
  const answeredQuestionsCount = useMemo(
    () => Object.keys(answers ?? {}).length,
    [answers],
  );

  return skill == "listening" || skill == "reading" ? (
    <div className={styles["question-summary"]}>
      <p>
        Đã chọn: {answeredQuestionsCount} / {total} câu
      </p>
    </div>
  ) : (
    <div></div>
  );
}
