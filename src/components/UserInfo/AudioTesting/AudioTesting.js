"use client";
import React, { useRef, useState } from "react";
import styles from "@/components/UserInfo/AudioTesting/styles.module.css";

const AudioTesting = () => {
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    mediaRecorderRef.current.start();
    setRecordingAudio(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecordingAudio(false);
  };

  return (
    <div className={styles["audio-testing"]}>
      <img
        className={styles["step-two"]}
        src="/images/Group 10.svg"
        alt="Bước 2"
        width={400}
        height={40.25}
      />
      <p className={styles["p1"]}>
        - Bước 1: Đeo tai nghe và nghe một đoạn âm thanh phía dưới.
      </p>
      <audio controls className={styles["audio"]}>
        <source
          src="/audio/Tiếng bocchi mhu mhu lofi cực chill.mp3"
          type="audio/mp3"
        />
      </audio>
      <p>- Bước 2: Để mic sát miệng.</p>
      <p>- Bước 3: Nhấn vào nút "thu âm" để thu âm.</p>
      <div className={styles["mic-check"]}>
        <div className={styles["mic-check-start"]}>
          <button onClick={handleStartRecording} disabled={recordingAudio}>
            Ghi âm
          </button>
        </div>
        <div className={styles["mic-check-end"]}>
          <button onClick={handleStopRecording} disabled={!recordingAudio}>
            Nghe lại
          </button>
        </div>
      </div>
      <div className={styles["audio-check"]}>
        <div>
          <audio controls src={audioURL}></audio>
        </div>
      </div>
      <p>
        - Bước 4: Nếu không nghe được giọng nói của mình vui lòng thông báo cho
        giám thị.
      </p>
    </div>
  );
};

export default AudioTesting;
