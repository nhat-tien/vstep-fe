"use client"
import postAnswers from "@/services/postAnswers";
import styles from "./styles.module.css";
import { useAppStore } from "@/stores/app-store-provider";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SubmitButton() {
  const params = useParams();
  const skill = params.skill;
  const part = params.part;
  const answers = useAppStore((state) => state[`${skill}Answers${part}`]);

  const handleSubmit = async () => {
    const res = await postAnswers(answers);
    if(res.status) {
      toast.success("Lưu bài thành công")
    }
  }

  return (
    <div className={styles["submit-btn-container"]}>
      <button className={styles["submit-btn"]} onClick={handleSubmit}>lưu bài</button>
    </div>
  );
}
