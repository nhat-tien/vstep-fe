"use client"
import styles from "./styles.module.css";
import Button from "../Button/Button";
import useSaveAnswers from "@/hooks/useSaveAnswers";

export default function SaveButton() {
  const { handleSubmit } = useSaveAnswers();

  return (
    <div className={styles["submit-btn-container"]}>
      <Button onClick={handleSubmit}>Lưu bài</Button>
    </div>
  );
}
