import { createStore } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const defaultInitState = {
  avatar: "/images/default-avatar.svg",
  currentSkill: "speaking",
  currentTimeRemain: "",
  listeningAnswers1: {},
  listeningAnswers2: {},
  listeningAnswers3: {},
  readingAnswers1: {},
  readingAnswers2: {},
  readingAnswers3: {},
  readingAnswers4: {},
  writingAnswers1: {},
  writingAnswers2: {},
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
    reset: () => set(defaultInitState)
  }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  ))
}
