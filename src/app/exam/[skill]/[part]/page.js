"use client"
import React, { useState, useEffect } from "react";
import ContainerListen from "@/components/Exams/ContainerSkill/Listening/ContainerListen";
import ContainerReading from "@/components/Exams/ContainerSkill/Reading/ContainerReading";
import ContainerSpeaking from "@/components/Exams/ContainerSkill/Speaking/ContainerSpeaking";
import ContainerWriting from "@/components/Exams/ContainerSkill/Writing/ContainerWriting";
import getQuestion from "@/services/getQuestion";
import { useParams } from "next/navigation";

const PartPage = () => {
  const {skill, part} = useParams();
  const [questions, setQuestions] = useState(null);
  

  useEffect(() => {
    const loadQuestions = async () => {
        const questionsData = await getQuestion(skill,part);
        setQuestions(questionsData);
    };
    loadQuestions();
  }, [skill, part]);


  const renderContainerSkill = () => {
    switch (skill) {
      case "listening":
        return (
          <ContainerListen
            questions={questions || []}
            skill={skill}
            part={part}
          />
        );
      case "reading":
        return (
          <ContainerReading
            questions={questions || []}
            part={part}
          />
        );
      case "writing":
        return (
          <ContainerWriting
            questions={questions || []}
            part={part}
          />
        );
      case "speaking":
        return (
          <ContainerSpeaking
            questions={questions || []}
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
