"use client"
import React, { useState, useEffect } from "react";
import ContainerListen from "@/components/Exams/ContainerSkill/Listening/ContainerListen";
import ContainerReading from "@/components/Exams/ContainerSkill/Reading/ContainerReading";
import ContainerSpeaking from "@/components/Exams/ContainerSkill/Speaking/ContainerSpeaking";
import ContainerWriting from "@/components/Exams/ContainerSkill/Writing/ContainerWriting";
import getQuestion from "@/services/getQuestion";
import { useAppStore } from "@/stores/app-store-provider";
import getCountSelectQuestion from "@/services/getCountSelectQuestion";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const PartPage = ({params}) => {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const skill = params.skill;
  const part = params.part;
  const count = useAppStore(state => state[`count${capitalizeFirstLetter(skill)}${part}`]);
  const setCount = useAppStore(state => state.setCount);
  

  useEffect(() => {
    const loadQuestions = async () => {
        const questionsData = await getQuestion(skill,part);
        console.log("Đây là của QuestionData:", questionsData);
        setQuestions(questionsData);
        if(count == 0 && (skill == "listening" || skill == "reading" )) {
          const count = await getCountSelectQuestion(skill, part);
          setCount(capitalizeFirstLetter(skill), part, count);
        }
    };
    console.log("Đây là của questions: ", questions);
    loadQuestions();
    
  }, [params]);

  const handleSaveAnswers = () => {
    try {
          localStorage.setItem(`answered-${skill}-${part}`, JSON.stringify(answers))
          const test = localStorage.getItem(`answered-${skill}-${part}`);
          console.log("Trước khi ấn nút lưu: ", test)
    } catch (error) {
      console.error('Lỗi khi lưu file Json:', error)
    }
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const renderContainerSkill = () => {
    switch (skill) {
      case "listening":
        return (
          <ContainerListen
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
            skill={skill}
            part={part}
          />
        );
      case "writing":
        return (
          <ContainerWriting
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
            part={part}
          />
        );
      case "reading":
        return (
          <ContainerReading
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
            part={part}
          />
        );
      case "speaking":
        return (
          <ContainerSpeaking
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
            part={part}
          />
        );
      default:
        return <div>Skill not supported</div>;
    }
  };

  return (
    <div>
      {questions ? renderContainerSkill() : <p>Loading...</p>}
    </div>
  );
};

export default PartPage;
