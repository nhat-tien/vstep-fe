"use client";
import getCountSelectQuestion from "@/services/getCountSelectQuestion";
import styles from "./styles.module.css";
import { useAppStore } from "@/stores/app-store-provider";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function QuestionSummary() {
  const { skill, part } = useParams();
  const answers = useAppStore((state) => state[`${skill}Answers${part}`]);
  const [total, setTotal] = useState(0);

  const answeredQuestionsCount = useMemo(
    () => Object.keys(answers ?? {}).length,
    [answers],
  );
  
  useEffect(() => {
    const getCountQuestion = async () => {
      const count = await getCountSelectQuestion(skill, part);
      setTotal(count);
    };
    getCountQuestion();
  },[skill, part]);

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
