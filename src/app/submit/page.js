"use client";
import { useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import { useAppStore } from "@/stores/app-store-provider";

const Page = () => {
  const answers1 = useAppStore((state) => state.audioSpeaking1);
  const answers2 = useAppStore((state) => state.audioSpeaking2);
  const answers3 = useAppStore((state) => state.audioSpeaking3);

  return (
    <div className={styles["submit-page"]}>
      <div>
        <h1>Bạn đã kết thúc phần thi thử Vstep</h1>
        <p>-Vui lòng nghe lại đoạn thu âm của phần thi Speaking</p>
        <p>
          -Nếu không có âm thanh, hoặc âm thanh lỗi, vui lòng báo cho giáo viên.
        </p>
        <h3>Audio 1</h3>
        <audio controls src={answers1} />
        <h3>Audio 2</h3>
        <audio controls src={answers2} />
        <h3>Audio 3</h3>
        <audio controls src={answers3} />
      </div>
    </div>
  );
};

export default Page;
