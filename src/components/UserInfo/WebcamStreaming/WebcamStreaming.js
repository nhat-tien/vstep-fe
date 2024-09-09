"use client"
import { useState, useEffect, useRef } from "react"
import styles from "./styles.module.css"
import Image from "next/image"

const WebcamStreaming = ({ className }) => {
  const [avatar, setAvatar] = useState("/images/Group 4.svg");
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamAvailable, setWebcamAvailable] = useState(false);
  const videoRef = useRef(null);

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

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className={styles.avatar}>
      <div className={styles["avatar-container"]}>
        <Image src={avatar} alt="Avatar" width={120} height={120} />
        {showWebcam && webcamAvailable && (
          <div className={styles["webcam-container"]}>
            <video ref={videoRef} className={styles["avatar-webcam"]} autoPlay muted />;
          </div>
        )}
      </div>
      <button onClick={handleDisplayWebcam} className={styles["avatar-button"]}>
        Tìm webcam
      </button>
    </div>
  );
};

export default WebcamStreaming;
