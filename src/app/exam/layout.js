"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Exams/Exams-UI/Header/Header';
import Footer from '@/components/Exams/Exams-UI/Footer/Footer';
import { useRouter } from 'next/navigation';
import styles from '@/app/exam/styles.module.css'

const MainLayout = ({ children }) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const skillOrder = ['listening', 'reading', 'writing', 'speaking'];
  const skillConfig = {
    //Phần chỉnh time và số lượng part.
    listening: { partNumber: 3, totalDurationExamTime: 1},
    reading: { partNumber: 4, totalDurationExamTime: 10*60 },
    writing: { partNumber: 2, totalDurationExamTime: 10  },
    speaking: { partNumber: 1, totalDurationExamTime: 10  },
  };

  useEffect(() => {
    const currentSkill = skillOrder[currentSkillIndex];
    const totalDurationExamTime = skillConfig[currentSkill].totalDurationExamTime;

    setTimeRemaining(totalDurationExamTime);

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (currentSkillIndex === skillOrder.length - 1) {
            router.push('/submit');
          } else {
            const nextSkillIndex = (currentSkillIndex + 1) % skillOrder.length;
            setCurrentSkillIndex(nextSkillIndex);
            const nextSkill = skillOrder[nextSkillIndex];
            setTimeRemaining(skillConfig[nextSkill].totalDurationExamTime);
            router.push(`/exam/${nextSkill}/1`);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSkillIndex, router]);

  useEffect(() => {
    if (router.asPath) {
      const pathSegments = router.asPath.split('/');
      if (pathSegments.length > 2) {
        const skillFromUrl = pathSegments[2];
        const newSkillIndex = skillOrder.indexOf(skillFromUrl);

        if (newSkillIndex !== -1 && newSkillIndex !== currentSkillIndex) {
          setCurrentSkillIndex(newSkillIndex);
        }
      }
    }
  }, [router.asPath]);

  return (
    <div className={styles["layout"]}>
      <Header timeRemaining={timeRemaining} />
      <main>{children}</main>
      <Footer 
        currentSkill={skillOrder[currentSkillIndex]} 
        partNumber={skillConfig[skillOrder[currentSkillIndex]].partNumber}
        currentSkillIndex={currentSkillIndex}
      />
    </div>
  );
};

export default MainLayout;
