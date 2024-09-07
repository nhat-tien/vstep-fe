"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '@/components/Exams/Exams-UI/Footer/styles.module.css';


const Footer = ({ currentSkill, currentSkillIndex }) => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    // Reset activeButton khi skill thay đổi
    setActiveButton(null);
  }, [currentSkill]);

  const handleClick = (partNumber) => {
    setActiveButton(partNumber);
  };

  const navigateToPart = (skill, partNumber) => {
    router.push(`/exam/${skill}/${partNumber}`);
  };

  const handleSave = () => {

  };


  const skills = {
    listening: 3,
    reading: 4,
    writing: 2,
    speaking: 1,
  };

  const skillTimes = {
    listening: 45,
    speaking: 30,
    reading: 60,
    writing: 50,
  };

  // Kiểm tra xem skill có phải là currentSkill không
  const isSkillUnlocked = (index) => {
    return index === currentSkillIndex;
  };

  return (
    <footer className={styles["footer-container"]}>
  <div className={styles["footer"]}>
    <div className={styles["skills-container"]}>
      {Object.keys(skills).map((skill, index) => (
        <div key={skill} className={`${styles["skill-section"]} ${isSkillUnlocked(index) ? '' : styles['disabled']}`}>
          {/* Danh sách các nút Part lên trên */}
          <div className={styles["button-row"]}>
            {Array.from({ length: skills[skill] }, (_, i) => i + 1).map(part => (
              <button
                key={part}
                className={`${styles['toggle-button']} ${isSkillUnlocked(index) && activeButton === part ? styles['active'] : ''} ${!isSkillUnlocked(index) ? styles['disabled-button'] : ''}`}
                onClick={() => isSkillUnlocked(index) && navigateToPart(skill, part)}
                onMouseDown={() => handleClick(part)}
                disabled={!isSkillUnlocked(index)}
              >
                PART {part}
              </button>
            ))}
          </div>
          {/* Tiêu đề Skill xuống dưới */}
          <div className={styles["phase-header"]}>
            <h1 className={styles["phase-title"]}>
              {`${skill.toUpperCase()} - ${skillTimes[skill]}`}
            </h1>
          </div>
        </div>
      ))}
    </div>
    <button className={styles['saved-button']}
            onClick={handleSave}
            >Lưu</button>
  </div>
</footer>
  );
};

export default Footer;
