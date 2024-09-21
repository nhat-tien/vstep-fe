"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/Exams/Exams-UI/Header/styles.module.css";
import getProfile from "@/services/getProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/app-store-provider";
import QuestionSummary from "@/components/QuestionSummary/QuestionSummary";
import Button from "@/components/Button/Button";

const Header = () => {
  const timeRemain = useAppStore((state) => state.currentTimeRemain);
  const avatar = useAppStore((state) => state.avatar);
  const router = useRouter();

  const minutes = Math.floor(timeRemain / 60);
  const seconds = timeRemain % 60;
  const formattedTime = {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
  const [user, setUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi nhận tên người dùng: ", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    router.push("/submit");
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <header className={styles["header"]}>
      <div className={styles['user-info']}>
        <div className={styles["avatar-container"]}>
          <Image src={avatar} alt="Avatar" width={50} height={50} />
        </div>
        <h1 className={styles["user-name"]}>
          {user ? user.name : "Nguyễn Văn A"}
        </h1>
      </div>
      <div className={styles["timer-container"]}>
        <div className={styles["timer"]}>
          <span>{formattedTime.minutes[0]}</span>
          <span>{formattedTime.minutes[1]}</span>
          <span className={styles["colon"]}>:</span>
          <span>{formattedTime.seconds[0]}</span>
          <span>{formattedTime.seconds[1]}</span>
        </div>
      </div>
      <div>
        <div className={styles["summary"]}>
          <QuestionSummary />
        </div>
        <Button onClick={handleSubmit} backgroundColor={"#f71400"}>
          Nộp Bài
        </Button>
      </div>

      {showConfirmation && (
        <>
          <div className={`${styles["modal-overlay"]} ${styles["show"]}`} />
          <div className={`${styles["confirmation-modal"]} ${styles["show"]}`}>
            <p>Nộp bài đồng nghĩa với kết thúc bài thi!</p>
            <p>Bạn có chắc chắn muốn nộp bài?</p>
            <button
              className={styles["confirm-button"]}
              onClick={handleConfirmSubmit}
            >
              Có
            </button>
            <button
              className={styles["cancel-button"]}
              onClick={handleCancelSubmit}
            >
              Không
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
