"use client";
import React, { useState } from 'react';
import styles from '@/components/Exams/Exams-UI/Header/styles.module.css'; // Đảm bảo rằng bạn đã tạo tệp CSS này
import getProfile from '@/services/getProfile';
import { useEffect } from 'react';

const Header = ({ timeRemaining }) => {
  // Chuyển đổi thời gian còn lại thành định dạng phút:giây
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const {name, setName} = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () =>
    {
      try {
        const userData = await getProfile();
        setName(userData.name);
      } catch (error)
      {
        console.error('Lỗi khi nhận thông tin người dùng: ', error);
      }
    };
  fetchUserProfile();
}, []);

  return (
    <header className={styles['header']}>
      <h1 className={styles['user-name']}>{name ? name : 'Nguyễn Văn A'}</h1>
      <h1 className={styles['title']}>Time Remaining</h1>
      <div className={styles['timer']}>
        {formattedTime}
      </div>
    </header>
  );
};

export default Header;
