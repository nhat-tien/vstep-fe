"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/components/Exams/Exams-UI/Footer/styles.module.css';
import SubmitButton from '@/components/SubmitButton/SubmitButton';

const Footer = ({ currentSkill, currentSkillIndex, setCurrentSkillIndex, skillOrder }) => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const skills = {
    listening: [1, 2, 3], 
    reading: [1, 2, 3, 4],
    writing: [1, 2],
    speaking: [1]
  };

  const skillTimes = {
    listening: 45,
    speaking: 12,
    reading: 60,
    writing: 50,
  };

  // Khi skill thay đổi, reset activeButton về part 1 của skill hiện tại
  useEffect(() => {
    const firstPart = skills[currentSkill][0];
    setActiveButton(firstPart); // Đặt nút đầu tiên của skill hiện tại là active
    navigateToPart(currentSkill, firstPart); // Điều hướng đến phần đầu tiên khi skill load
  }, [currentSkill]);

  const handleClick = (partNumber) => {
    setActiveButton(partNumber); // Chỉ thay đổi activeButton khi part trong skill hiện tại
  };

  const navigateToPart = (skill, partNumber) => {
    router.push(`/exam/${skill}/${partNumber}`);
  };

  const isSkillUnlocked = (index) => {
    return index <= currentSkillIndex; // Unlock các skill từ đầu đến skill hiện tại
  };

  const handleNextSkill = () => {
    if (currentSkillIndex < skillOrder.length - 1) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    if (currentSkillIndex < skillOrder.length - 1) {
      const nextSkillIndex = currentSkillIndex + 1;
      const nextSkill = skillOrder[nextSkillIndex];
      setCurrentSkillIndex(nextSkillIndex);
      setActiveButton(skills[nextSkill][0]); // Đặt nút part 1 của skill tiếp theo là active
      navigateToPart(nextSkill, 1); // Điều hướng đến part 1 của skill tiếp theo
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer"]}>
        <div className={styles["skills-container"]}>
          {Object.keys(skills).map((skill, index) => (
            <div key={skill} className={`${styles["skill-section"]} ${index < currentSkillIndex ? styles['disabled'] : ''}`}>
              <div className={styles["button-row"]}>
                {skills[skill].map(part => (
                  <button
                    key={part}
                    className={`${styles['toggle-button']} ${activeButton === part && currentSkill === skill ? styles['active'] : ''} ${index < currentSkillIndex ? styles['disabled-button'] : ''}`}
                    onClick={() => index <= currentSkillIndex && navigateToPart(skill, part)}
                    onMouseDown={() => handleClick(part)}
                    disabled={index > currentSkillIndex}
                  >
                    PART {part}
                  </button>
                ))}
              </div>
              <div className={styles["phase-header"]}>
                <h1 className={styles["phase-title"]}>
                  {`${skill.toUpperCase()} - ${skillTimes[skill]}`}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <SubmitButton />
        <div className={styles['next-skill-container']}>
        <button 
          className={styles["next-skill-button"]} 
          onClick={handleNextSkill} 
          disabled={currentSkillIndex >= skillOrder.length - 1}
        >
          Tiếp tục
        </button>
        
        {showConfirmation && (
          <>
          <div className={`${styles['modal-overlay']} ${styles['show']}`} />
          <div className={`${styles['confirmation-modal']} ${styles['show']}`}>
              <p>Ấn tiếp tục đồng nghĩa bạn sẽ kết thúc phần thi này và không thể quay lại.</p>
              <p>Bạn có chắc chắn muốn tiếp tục?</p>
              <p>Lưu ý, hãy chắc chắn bản thân đã lưu phần thi hiện tại.</p>
              <button className={styles['confirm-button']} onClick={handleConfirmSubmit}>
                Có
              </button>
              <button className={styles['cancel-button']} onClick={handleCancelSubmit}>
                Không
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </footer>
  );
};

export default Footer;
