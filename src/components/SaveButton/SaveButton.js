"use client"
import postAnswers from "@/services/postAnswers";
import styles from "./styles.module.css";
import { useAppStore } from "@/stores/app-store-provider";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useMemo } from "react";
import Button from "../Button/Button";

export default function SaveButton() {
  const { skill, part} = useParams();
  const answers = useAppStore((state) => state[`${skill}Answers${part}`]);
  const isWriting = useMemo(() => skill == "writing", [skill]);

  const handleSubmit = async () => {
    const res = await postAnswers(answers, isWriting);
    if(res.status) {
      toast.success("Lưu bài thành công")
    }
  }

  return (
    <div className={styles["submit-btn-container"]}>
      <Button onClick={handleSubmit}>Lưu bài</Button>
    </div>
  );
}
