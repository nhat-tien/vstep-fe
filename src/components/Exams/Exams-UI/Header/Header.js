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
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () =>
    {
      try {
        const {data} = await getProfile();
        setUser(data);
      } catch (error)
      {
        console.error('Lỗi khi nhận tên người dùng: ', error);
      }
    };
  fetchUserProfile();
}, []);

  return (
    <header className={styles['header']}>
      <h1 className={styles['user-name']}>{user ? user.name : 'Nguyễn Văn A'}</h1>
      <div className={styles['timer']}>
        {formattedTime}
      </div>
    </header>
  );
};

export default Header;
