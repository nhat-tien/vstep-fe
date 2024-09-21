"use client";
import RecordPlugin from "wavesurfer.js/dist/plugins/record";
import WaveSurfer from "wavesurfer.js";
import { useRef, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function useWavesurfer({
  width = 200,
  height = 100,
  waveColor = "#cc8f23",
}) {
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);
  const recordRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const initializeWaveSurferWithMicrophone = () => {
      navigator.getUserMedia(
        { audio: true },
        () => {
          if (waveformRef.current) {
            wavesurferRef.current = WaveSurfer.create({
              container: waveformRef.current,
              waveColor: waveColor,
              progressColor: waveColor,
              width: width,
              height: height,
              barWidth: 4,
              barGap: 1,
              barRadius: 2,
            });
            recordRef.current = wavesurferRef.current.registerPlugin(
              RecordPlugin.create({
                scrollingWaveform: false,
                renderRecordedAudio: false,
              }),
            );
            recordRef.current.on("record-end", (blob) => {
              const recordedUrl = URL.createObjectURL(blob);
              setAudioUrl(recordedUrl);
            });
          }
        },
        (error) => {
          console.log(error);
          toast.error("No microphone found");
        },
      );
    };
    initializeWaveSurferWithMicrophone();
  }, []);

  const startRecording = () => {
    if (recordRef.current == null) {
      toast.error("Micro Error");
      return;
    }
    if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
      recordRef.current.stopRecording();
      return;
    }
    recordRef.current.startRecording({});
    setIsRecording(true);
  };

  const pauseRecording = () => {
    if (recordRef.current.isPaused()) {
      recordRef.current.resumeRecording();
      return;
    }
    recordRef.current.pauseRecording();
    setIsRecording(false);
  };

  const stopRecording = () => {
    if (recordRef.current == null) {
      toast.error("Recording Error");
      return;
    }
    recordRef.current.stopRecording();
    setIsRecording(false);
  };

  return {
    waveformRef,
    isRecording,
    audioUrl,
    startRecording,
    pauseRecording,
    stopRecording,
  };
}
