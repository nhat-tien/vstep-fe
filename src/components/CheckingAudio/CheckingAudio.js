"use client"
import styles from "./style.module.css";
import useWavesurfer from "@/hooks/useWavesurfer";

export default function CheckingAudio() {
  const {
    waveformRef,
    audioUrl,
    isRecording,
    stopRecording,
    startRecording,
  } =
    useWavesurfer({
    width: 250,
    height: 50
  });

  return (
    <>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginTop: "1rem",
            display: isRecording ? "block" : "none"
          }}
          ref={waveformRef}
        ></div>
      <audio controls src={audioUrl} style={{ display: isRecording ? "none": 'block'}} />
      <div className={styles["mic-check"]}>
        <div className={styles["mic-check-start"]}>
          <button onClick={startRecording} disabled={isRecording}>
            Ghi âm
          </button>
        </div>
        <div className={styles["mic-check-end"]}>
          <button onClick={stopRecording} disabled={!isRecording}>
            Dừng
          </button>
        </div>
      </div>
    </>
  );
}
