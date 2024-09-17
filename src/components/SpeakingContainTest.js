"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./styles.module.css";
import { TIMELINE } from "@/utils/config/speakingConfig";
import useTimerAppStore from "@/hooks/useTimerAppStore";
import useQuestions from "@/hooks/useQuestions";

const ContainerSpeaking = () => {
  const { questions, skill, part } = useQuestions();
  const [currentPhase, setCurrentPhase] = useState(0);
  const { timeRemain, reset, pause } = useTimerAppStore({
    time: TIMELINE[0].duration,
    onEnd: () => {
      if (TIMELINE[currentPhase].type === "question") {
        pause();
        reset(0);
        return;
      }
      if (currentPhase < TIMELINE.length - 1) {
        reset(TIMELINE[currentPhase + 1].duration);
        setCurrentPhase((prev) => prev + 1);
      } else {
        pause();
      }
    },
  });

  return (
    <div className={styles["container-Speaking-Wrapper"]}>
      {
        TIMELINE[currentPhase]?.type == "prepare-mic" && (
        <div className={styles['micCheckModal']}>
          <div className={styles['micCheckContent']}>
            <h2>Vui lòng kiểm tra và đeo mic</h2>
            <p>Bài thi nói bắt đầu sau: {timeRemain} giây</p>
          </div>
        </div>
      )}
      {TIMELINE[currentPhase]?.type == "question" && (
        <div>
          <h1>Question</h1>
          <div>{TIMELINE[currentPhase].name}</div>
        </div>
      )}
      {TIMELINE[currentPhase]?.type == "prepare" && (
        <div>
          <h1>Prepare</h1>
          <div>{TIMELINE[currentPhase].name}</div>
        </div>
      )}
      {TIMELINE[currentPhase]?.type == "recording" && (
        <div>
          <h1>Recording</h1>
          <div>{TIMELINE[currentPhase].name}</div>
        </div>
      )}
    </div>
  );
};

export default ContainerSpeaking;
