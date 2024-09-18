"use client"
import { useEffect } from "react";
import styles from "./styles.module.css";
import { useAppStore } from "@/stores/app-store-provider";


const Page = () => {
  const answers1 = useAppStore(state => state.speakingAnswers1);
  const answers2 = useAppStore(state => state.speakingAnswers2);
  const answers3 = useAppStore(state => state.speakingAnswers3);

  useEffect(() => {

  })

    return (
        <div className={styles['submit-page']}>
            <div>
                <h1>Bạn đã kết thúc phần thi thử Vstep</h1>
                <p>-Vui lòng nghe lại đoạn thu âm của phần thi Speaking</p>
                <p>-Nếu không có âm thanh, hoặc âm thanh lỗi, vui lòng báo cho giáo viên.</p>
            </div>
        </div>
    );
};

export default Page;
