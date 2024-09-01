"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AudioTesting from "@/components/UserInfo/AudioTesting/AudioTesting";
import styles from "@/components/UserInfo/UserInfo/styles.module.css";
import getProfile from "@/services/getProfile";
import { logout } from "@/services/auth";

const WebcamStreaming = dynamic(
  () => import("@/components/UserInfo/WebcamStreaming/WebcamStreaming"),
  { ssr: false },
);

const UserInfo = () => {
  const [avatar, setAvatar] = useState("/images/Group 4.svg");
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamAvailable, setWebcamAvailable] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () =>
    {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error)
      {
        console.error('Lỗi khi nhận thông tin người dùng: ', error);
      }
    };
  fetchUserProfile();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    router.push("/");
  };

  const handleDisplayWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setWebcamAvailable(true);
      }
    } catch (err) {
      console.error("Không thể truy cập webcam: ", err);
      setWebcamAvailable(false);
    }
    setShowWebcam(true);
  };

  const handleReceiveExam = () => {
    router.push("/exam/listening/1");
  };

  return (
    <div className={styles["user-info"]}>
      <div className={styles["profile-checking"]}>
        <div className={styles["avatar-container"]}>
          <img src={avatar} alt="Avatar" className={styles.avatar} />
          {showWebcam && webcamAvailable && (
            <WebcamStreaming className={styles["avatar-webcam"]} />
          )}
        </div>
        <button
          onClick={handleDisplayWebcam}
          className={styles["avatar-button"]}
        >
          Tìm webcam
        </button>
        <div className={styles["info"]}>
          <p>
            <span className={styles["boldFirstPart"]}>Họ và tên:</span>{" "}
            {user ? user.name : "Nguyễn Văn A"}
          </p>
          <p>
            <span className={styles["boldFirstPart"]}>Giới tính:</span>{" "}
            {user ? user.gender : "Nam"}
          </p>
          <p>
            <span className={styles["boldFirstPart"]}>Tài khoản:</span>{" "}
            {user ? user.account : "BanTraiTien@gmail.com"}
          </p>
          <p>
            <span className={styles["boldFirstPart"]}>SBD:</span>{" "}
            {user ? user.sbd : "LNT2032320"}
          </p>
          <button onClick={handleLogout} className={styles["logout-button"]}>
            Đăng xuất
          </button>
          <button
            onClick={handleReceiveExam}
            className={styles["receive-exam-button"]}
          >
            Nhận đề
          </button>
        </div>
      </div>
      <div className={styles["exam-info"]}>
        <img
          className={styles["step-one"]}
          src="/images/Group 8.svg"
          alt="Bước 1"
          width={400}
          height={39.5}
        />
        <p>
          <span className={styles["SecondboldFirstPart"]}>Listening:</span> 3
          parts - 45 minutes
        </p>
        <p>
          <span className={styles["SecondboldFirstPart"]}>Reading:</span> 4
          parts - 40 minutes
        </p>
        <p>
          <span className={styles["SecondboldFirstPart"]}>Writing:</span> 2
          parts - 60 minutes
        </p>
        <p>
          <span className={styles["SecondboldFirstPart"]}>Speaking:</span> 1
          part - 12 minutes
        </p>
      </div>
      <div className={styles["audio-testing"]}>
        <AudioTesting />
      </div>
      <div className={styles["note"]}>
        <img
          className={styles["step-three"]}
          src="/images/Group 9.svg"
          alt="Bước 1"
          width={400}
          height={40}
        />
        <p>
          - Khi hết thời gian của từng kỹ năng, hệ thống sẽ tự động chuyển sang
          kỹ năng tiếp theo. Thí sinh không thể thao tác được với kỹ năng đã làm
          trước đó.
        </p>
        <p>- Thí sinh phải click nút “LƯU BÀI” sau khi hoàn thành mỗi part.</p>
        <p>- Để chuyển part hay kỹ năng, thí sinh click vào nút “TIẾP TỤC”.</p>
      </div>
    </div>
  );
};

export default UserInfo;
