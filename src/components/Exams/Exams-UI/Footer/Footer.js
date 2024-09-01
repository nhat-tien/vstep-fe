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

  // Danh sách các phase và số lượng part cho từng phase
  const skills = {
    listening: 3,
    speaking: 1,
    reading: 4,
    writing: 2
  };

  // Kiểm tra xem skill có phải là currentSkill không
  const isSkillUnlocked = (index) => {
    return index === currentSkillIndex;
  };

  return (
    <footer className={styles["footer"]}>
      <div className={styles["skills-container"]}>
        {Object.keys(skills).map((skill, index) => (
          <div key={skill} className={`${styles["skill-section"]} ${isSkillUnlocked(index) ? '' : styles['disabled']}`}>
            <div className={styles["phase-header"]}>
              <h1 className={styles["phase-title"]}>
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </h1>
            </div>
            <div className={styles["button-row"]}>
              {Array.from({ length: skills[skill] }, (_, i) => i + 1).map(part => (
                <button
                  key={part}
                  className={`${styles['toggle-button']} ${isSkillUnlocked(index) && activeButton === part ? styles['active'] : ''} ${!isSkillUnlocked(index) ? styles['disabled-button'] : ''}`}
                  onClick={() => isSkillUnlocked(index) && navigateToPart(skill, part)}
                  onMouseDown={() => handleClick(part)} // Chắc chắn rằng handleClick được gọi khi nhấn chuột
                  disabled={!isSkillUnlocked(index)} // Thêm thuộc tính disabled cho nút không thể nhấn
                >
                  PART {part}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
