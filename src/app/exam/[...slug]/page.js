"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ContainerListen from "@/components/Exams/ContainerSkill/Listening/ContainerListen";
import ContainerReading from "@/components/Exams/ContainerSkill/Reading/ContainerReading";
import ContainerSpeaking from "@/components/Exams/ContainerSkill/Speaking/ContainerSpeaking";
import ContainerWriting from "@/components/Exams/ContainerSkill/Writing/ContainerWriting";
import getQuestions from "@/services/getQuestion";

const PartPage = ({ params }) => {
  const [questions, setQuestions] = useState(null);
  const [partAnswer, setPartAnswer] = useState({});
  const slug = params.slug;

  useEffect(() => {
    const loadQuestions = async () => {
      const questionsData = await getQuestions();
      setQuestions(questionsData);
    };

    const loadSavedAnswers = () => {
      const savedAnswers = localStorage.getItem(`answers-${slug[0]}-${slug[1]}`);
      if (savedAnswers) {
        setPartAnswer(JSON.parse(savedAnswers));
      }
    };

    loadQuestions();
    loadSavedAnswers();
  }, [slug[0], slug[1]]);

  const handleSave = () => {
    localStorage.setItem(`answers-${slug[0]}-${slug[1]}`, JSON.stringify(partAnswer));
  };

  const handleAnswerChange = (questionId, answer) => {
    setPartAnswer((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const renderContainerSkill = () => {
    const skill = slug[0];
    switch (skill) {
      case "listen":
        return (
          <ContainerListen 
            questions={questions} 
            handleAnswerChange={handleAnswerChange} 
          />
        );
      case "writing":
        return (
          <ContainerWriting 
            questions={questions} 
            handleAnswerChange={handleAnswerChange} 
          />
        );
      case "reading":
        return (
          <ContainerReading 
            questions={questions} 
            handleAnswerChange={handleAnswerChange} 
          />
        );
      case "speaking":
        return (
          <ContainerSpeaking 
            questions={questions} 
            handleAnswerChange={handleAnswerChange} 
          />
        );
      default:
        return <div>Skill not supported</div>;
    }
  };

  return (
    <div>
      <h1>{slug[0]} - Part {slug[1]}</h1>
      {questions ? renderContainerSkill() : <p>Loading...</p>}
    </div>
  );
};

export default PartPage;
