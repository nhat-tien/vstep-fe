import styles from "./page.module.css";
import Image from "next/image";
import { logout } from "@/services/auth";
import getProfile from "@/services/getProfile";
import WebcamStreaming from "@/components/UserInfo/WebcamStreaming/WebcamStreaming";
import AudioTesting from "@/components/UserInfo/AudioTesting/AudioTesting";
import Link from "next/link";

const CheckingPage = async () => {
  const { data } = await getProfile();

  async function handleLogout() {
    "use server";
    logout();
  }

  return (
    <div className={styles["body"]}>
      <div className={styles["checking"]}>
        <div className={styles["user-info"]}>
          <div className={styles["profile-checking"]}>
            <WebcamStreaming />
            <div className={styles["info"]}>
              <p>
                <span className={styles["boldFirstPart"]}>Họ và tên:</span>{" "}
                {data ? data.name : "Nguyễn Văn A"}
              </p>
              <p>
                <span className={styles["boldFirstPart"]}>Giới tính:</span>{" "}
                {data ? data.sex : "Nam"}
              </p>
              <p>
                <span className={styles["boldFirstPart"]}>Tài khoản:</span>{" "}
                {data ? data.email : "BanTraiTien@gmail.com"}
              </p>
              <p>
                <span className={styles["boldFirstPart"]}>SBD:</span>{" "}
                {data ? data.phoneNumber : "LNT2032320"}
              </p>
            </div>
            <div className={styles["action-btn-group"]}>
              <Link
                className={styles["receive-exam-button"]}
                href={"/exam/listening/1"}
              >
                Nhận đề
              </Link>
              <button
                onClick={handleLogout}
                className={styles["logout-button"]}
              >
                Đăng xuất
              </button>
            </div>
        </div>
        <div className={styles["info-container"]}>
          <div className={styles["exam-info"]}>
            <Image
              src="/images/Group 8.svg"
              alt="Bước 1"
              width={270}
              height={40}
            />
            <p>
              <span className={styles["SecondboldFirstPart"]}>Listening:</span>{" "}
              3 parts - 45 minutes
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
          <AudioTesting />
          <div className={styles["note"]}>
            <Image
              className={styles["step-three"]}
              src="/images/Group 9.svg"
              alt="Bước 1"
              width={270}
              height={40}
            />
            <p>
              Khi hết thời gian của từng kỹ năng, hệ thống sẽ tự động chuyển
              sang kỹ năng tiếp theo. Thí sinh không thể thao tác được với kỹ
              năng đã làm trước đó.
            </p>
            <p>
              Thí sinh phải click nút “LƯU BÀI” sau khi hoàn thành mỗi part.
            </p>
            <p>
              Để chuyển part hay kỹ năng, thí sinh click vào nút “TIẾP TỤC”.
            </p>
          </div>
        </div>
          </div>
        </div>
      </div>
  );
};

export default CheckingPage;
