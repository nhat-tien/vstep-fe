"use client";
import { useState, useRef, useCallback } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Webcam from "react-webcam";
import CameraButton from "./CameraButton";
import toast from "react-hot-toast";
import { useAppStore } from "@/stores/app-store-provider";

const WebcamStreaming = () => {
  const avatar = useAppStore(state => state.avatar);
  const setAvatar = useAppStore(state => state.setAvatar);
  const [camera, setCamera] = useState("close");
  const webcamRef = useRef(null);

  const handleTakePicture = useCallback(() => {
    if(webcamRef.current.state.hasUserMedia) {
      setCamera("retake");
      const imageSrc = webcamRef.current.getScreenshot();
      if(imageSrc != null) {
        setAvatar(imageSrc);
      }
    }
  }, [webcamRef]);

  const handleError = () => {
    toast.error("Camera not found");
    setCamera("close")
  };

  return (
    <div className={styles['avatar']}>
      <div className={styles["avatar-container"]}>
        {camera == "close" || camera == "retake" ? (
          <Image src={avatar} height={150} width={150} alt="avatar" />
        ) : (
          <Webcam
            height={150}
            ref={webcamRef}
            onUserMediaError={handleError}
            videoConstraints={{
                width: 150,
                height: 150,
                facingMode: "user"
              }}
            screenshotFormat="image/jpeg"
          />
        )}
      </div>
      <CameraButton
        camera={camera}
        setCamera={setCamera}
        handleTakePicture={handleTakePicture}
      />
    </div>
  );
};

export default WebcamStreaming;
