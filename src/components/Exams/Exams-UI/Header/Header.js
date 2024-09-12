"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/components/Exams/Exams-UI/Header/styles.module.css'; 
import getProfile from '@/services/getProfile';
import Image from "next/image"
import { useRouter } from 'next/navigation';

const Header = ({ timeRemaining }) => {
  // Chuyển đổi thời gian còn lại thành định dạng phút:giây
  const [avatar, setAvatar] = useState("/images/Group 4.svg");
  const router = useRouter();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.error('Lỗi khi nhận tên người dùng: ', error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <header className={styles['header']}>
      <div className={styles["avatar-container"]}>
        <Image src={avatar} alt="Avatar" width={50} height={50} />
      </div>
      <h1 className={styles['user-name']}>{user ? user.name : 'Nguyễn Văn A'}</h1>
      <div className={styles['timer-container']}>
        <div className={styles['timer']}>
          <span>{formattedTime.minutes[0]}</span>
          <span>{formattedTime.minutes[1]}</span>
          <span className={styles['colon']}>:</span>
          <span>{formattedTime.seconds[0]}</span>
          <span>{formattedTime.seconds[1]}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
