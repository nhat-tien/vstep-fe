import Image from "next/image";
import styles from "@/components/UserInfo/AudioTesting/styles.module.css";
import CheckingAudio from "@/components/CheckingAudio/CheckingAudio";

const AudioTesting = () => {

  return (
    <div className={styles["audio-testing"]}>
      <Image
        className={styles["step-two"]}
        src="/images/Group 10.svg"
        alt="Bước 2"
        width={270}
        height={40}
      />

      <p className={styles["p1"]}>
        Bước 1: Đeo tai nghe và nghe một đoạn âm thanh phía dưới.
      </p>
      <div className={styles["audio"]}>
        <audio controls>
          <source
            src="/audio/sample.wav"
          />
        </audio>
      </div>
      <p className={styles["p2"]}>Bước 2: Để mic sát miệng.</p>
      <p className={styles["p3"]}>Bước 3: Nhấn vào nút "thu âm" để thu âm.</p>
      <CheckingAudio />
      <p className={styles["p4"]}>
        Bước 4: Nếu không nghe được giọng nói của mình vui lòng thông báo cho
        giám thị.
      </p>
    </div>
  );
};

export default AudioTesting;
