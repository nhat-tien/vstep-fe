"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import { TIMELINE } from "@/utils/config/speakingConfig";
import useTimerAppStore from "@/hooks/useTimerAppStore";
import useSpeakingQuestions from "@/hooks/useSpeakingQuestions";
import Audio from "@/components/Exams/QuestionType/AudioType/Audio";
import Picture from "../../QuestionType/ImageType/Image";
import Image from "next/image";
import useWavesurfer from "@/hooks/useWavesurfer";
import { useAppStore } from "@/stores/app-store-provider";
import { useRouter } from "next/navigation";
import postAudioAnswers from "@/services/postAudioAnswers";
import toast from "react-hot-toast";
import getFileFromUrl from "@/services/getFilesFromUrl";

const ContainerSpeaking = () => {
  const router = useRouter();
  const [currentPhase, setCurrentPhase] = useState(0);
  const currentPhaseType = useMemo(() => TIMELINE[currentPhase]?.type, [currentPhase]);
  const setSpeakingAnswers = useAppStore((state) => state.setSpeakingAnswers);
  const setAudioSpeaking = useAppStore(state => state.setAudioSpeaking);
  const { waveformRef, startRecording, stopRecording, audioUrl, isRecording } =
  useWavesurfer({
    width: 300,
    height: 100,
  });
  const [part, setPart] = useState(1);
  const { questions } = useSpeakingQuestions({ part });

  const { timeRemain, reset, pause, restart } = useTimerAppStore({
    time: TIMELINE[0].duration,
    onEnd: () => {
    if (TIMELINE[currentPhase].type === "question") {
      pause();
      reset(0);
      return;
    }
      handleChangePhase();
    },
  });

  useEffect(() => {
    if (currentPhaseType == "recording") {
      startRecording();
    }
  }, [currentPhase]);

  useEffect(() => {
    const handleSaveQuestion = async () => {
      if(questions[0]) {
        setSpeakingAnswers(questions[0].questionId, audioUrl, part);
        const data = await getFileFromUrl(audioUrl);
        const res = await postAudioAnswers(questions[0].questionId, data);
        if(res.status) {
          await setAudioSpeaking(res.url,part);
        } else {
          toast.error(res.message)
        }
      }
    }
    handleSaveQuestion()
  }, [audioUrl])

  const handleChangePhase = () => {
    if (currentPhase < TIMELINE.length - 1) {
      reset(TIMELINE[currentPhase + 1].duration);
      setCurrentPhase(prev => prev+1);

      if (currentPhaseType == "recording") {
        stopRecording()
      }

      if(currentPhaseType == "prepare") {
        setPart(prev => prev+1);
      }

    } else {
      pause();
      reset(0);
      stopRecording()
      router.push('/submit');
    }
  };

  const handleWhenAudioEnd = () => {
    handleChangePhase();
    restart();
  };

  return (
    <div className={styles["container-Speaking-Wrapper"]}>
      {currentPhaseType == "prepare-mic" && (
        <div className={styles["micCheckModal"]}>
          <div className={styles["micCheckContent"]}>
            <Image
              width={180}
              height={180}
              alt="person with headphone"
              src={"/images/person-with-headphone.png"}
            />
            <h3>Bạn đeo tai nghe để làm bài thi nói</h3>
            <p>Bạn có <strong>60s</strong> để chuẩn bị</p>
            <p className={styles['micCheckContent__time-remain']}>{timeRemain}s</p>
            <p>Bài làm sẽ được thu âm trực tiếp</p>
            <p>Trong lúc thu âm không tương tác với hệ thống</p>
          </div>
        </div>
      )}
      {(currentPhaseType == "question" || 
        currentPhaseType == "recording" ||
        currentPhaseType == "prepare-record") && (
        <div className={styles["question-container"]}>
          <Audio
            question={questions[0]}
            onEnd={handleWhenAudioEnd}
            autoPlay={currentPhaseType == "question"}
            disable={true}
          />
          <Picture question={questions[1]} />
        </div>
      )}
      {currentPhaseType == "prepare" && (
        <div className={styles["micCheckModal"]}>
          <div className={styles["micCheckContent"]}>
            <h2>Thời gian chuẩn bị còn</h2>
            <p>{timeRemain}<small>s</small></p>
          </div>
        </div>
      )}
      {currentPhaseType == "prepare-record" && (
        <div className={styles["micCheckModal"]}>
          <div className={styles["micCheckContent"]}>
            <h2>Ghi âm sau</h2>
            <p>{timeRemain}<small>s</small></p>
          </div>
        </div>
      )}

      <div
        className={styles["record-container"]}
        style={{
          display:
            isRecording ? "block" : "none",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginTop: "1rem",
            width: "300px"
          }}
          ref={waveformRef}
        />
        <div className={styles["record-container__desc"]}>
          <p>BÀI NÓI ĐANG ĐƯỢC THU ÂM TRỰC TIẾP</p>
          <p>TRONG QUÁ TRÌNH THU ÂM KHÔNG ĐƯỢC THAO TÁC VỚI HỆ THỐNG</p>
        </div>
      </div>
    </div>
  );
};

export default ContainerSpeaking;
