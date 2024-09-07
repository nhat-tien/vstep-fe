"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ContainerListen from "@/components/Exams/ContainerSkill/Listening/ContainerListen";
import ContainerReading from "@/components/Exams/ContainerSkill/Reading/ContainerReading";
import ContainerSpeaking from "@/components/Exams/ContainerSkill/Speaking/ContainerSpeaking";
import ContainerWriting from "@/components/Exams/ContainerSkill/Writing/ContainerWriting";
import getQuestion from "@/services/getQuestion";
import styles from "@/app/exam/[...slug]/stytes.module.css"

const PartPage = () => {
  const params = useParams();
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const slug = params.slug;

  useEffect(() => {
    const loadQuestions = async () => {
        const questionsData = await getQuestion(slug[0], slug[1]);
        console.log("Đây là của QuestionData:", questionsData);
        setQuestions(questionsData);
    };
    console.log("Đây là của questions: ", questions);
    loadQuestions();
    
  }, [slug]);

  const handleSaveAnswers = () => {
    try {
          localStorage.setItem(`answered-${slug[0]}-${slug[1]}`, JSON.stringify(answers))
          const test = localStorage.getItem(`answered-${slug[0]}-${slug[1]}`);
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
    const skill = slug[0];
    switch (skill) {
      case "listening":
        return (
          <ContainerListen
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
            skill={slug[0]}
            part={slug[1]}
          />
        );
      case "writing":
        return (
          <ContainerWriting
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "reading":
        return (
          <ContainerReading
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "speaking":
        return (
          <ContainerSpeaking
            questions={questions || []}
            handleAnswerChange={handleAnswerChange}
          />
        );
      default:
        return <div>Skill not supported</div>;
    }
  };

  return (
    <div>
      {questions ? renderContainerSkill() : <p>Loading...</p>}
      <button className={styles['save-bottom']} onClick={handleSaveAnswers}>Lưu Part</button>
    </div>
  );
};

export default PartPage;
