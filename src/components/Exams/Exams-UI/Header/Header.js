"use client";
import React from 'react';
import styles from '@/components/Exams/Exams-UI/Header/styles.module.css'; // Đảm bảo rằng bạn đã tạo tệp CSS này

const Header = ({ timeRemaining }) => {
  // Chuyển đổi thời gian còn lại thành định dạng phút:giây
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <header className={styles['header']}>
      <h1 className={styles['title']}>Time Remaining</h1>
      <div className={styles['timer']}>
        {formattedTime}
      </div>
    </header>
  );
};

export default Header;
