"use client"
import getQuestion from "@/services/getQuestion";
import { useState, useEffect } from "react";

export default function useSpeakingQuestions({ part }) {
  const skill = "speaking";
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const loadQuestions = async () => {
        const questionsData = await getQuestion(skill,part);
        if(questionsData) {
        setQuestions(questionsData);
        }
    };
    loadQuestions();
  }, [skill, part]);

  return { questions, skill, part };
}
