"use client"
import getQuestion from "@/services/getQuestion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function useQuestions() {
  const { skill, part } = useParams();
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
