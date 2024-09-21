import { createStore } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const defaultInitState = {
  avatar: "/images/default-avatar.svg",
  currentSkill: "speaking",
  currentTimeRemain: 0,
  listeningAnswers1: {},
  listeningAnswers2: {},
  listeningAnswers3: {},
  readingAnswers1: {},
  readingAnswers2: {},
  readingAnswers3: {},
  readingAnswers4: {},
  writingAnswers1: {},
  writingAnswers2: {},
  speakingAnswers1: {},
  speakingAnswers2: {},
  speakingAnswers3: {},
  audioSpeaking1:"",
  audioSpeaking2:"",
  audioSpeaking2:"",
}

export function createAppStore(initState = defaultInitState) {
  return createStore()(persist(set => ({
    ...initState,
    setAvatar: (url) => set(() => ({ avatar: url})),
    setListeningAnswers: (questionId, answer, part) => 
      set(state => ({
        [`listeningAnswers${part}`]: {...state[`listeningAnswers${part}`], [questionId]: answer}
      })),
    setReadingAnswers: (questionId, answer, part) => 
      set(state => ({
        [`readingAnswers${part}`]: {...state[`readingAnswers${part}`], [questionId]: answer}
      })),
    setWritingAnswers: (questionId, answer, part) => 
      set(state => ({
        [`writingAnswers${part}`]: {...state[`writingAnswers${part}`], [questionId]: answer}
      })),
    setSpeakingAnswers: (questionId, audioUrl, part) => 
    set(state => ({
        [`speakingAnswers${part}`]: {...state[`speakingAnswers${part}`], [questionId]: audioUrl}
      })),
    setAudioSpeaking: (audioUrl, part) => 
    set(() => ({
        [`audioSpeaking${part}`]: audioUrl
      })),
    setTimeRemain: (timeRemain) => 
    set(() => ({
          currentTimeRemain: timeRemain
      })),
    reset: () => set(defaultInitState)
  }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  ))
}
