"use client"
import React, { useRef, useEffect } from "react";

const WebcamStreaming = ({ className }) => {
  const videoRef = useRef(null);

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

  return <video ref={videoRef} autoPlay />;
};

export default WebcamStreaming;
