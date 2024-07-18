'use client'
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AudioTesting from "@/components/UserInfo/Audio Testing/AudioTesting";
import styles from "@/components/Userinfo/UserInfo/Styles.module.css";

const WebcamStreaming = dynamic(() => import("@/components/UserInfo/WebcamStreaming/WebcamStreaming"), { ssr: false});
//Dùng dynamic import để chỉ import một component khi nó cần được sử dụng. 
//Ssr: false tức quá trình render của component chỉ được thực hiện trên client side.

const UserInfor = () =>
{
    const [avatar, setAvatar] = useState('/image/Group 4.svg'); 
    const [showWebcam, setShơWebcam] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState(Null);
            //Biến lưu thông tin, thay đổi thông qua setUser.
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); //Lấy thông tin từ Item user ra.
        setUser(storedUser);
    }, []);

    if (!user)
    {
        return <p>loading...</p>;
    }

    const handlelogout = () => {
        localStorage.removeItem('user');
        router.replace('/');    
        //Hàm logout.
    };

    const handleDisplayWebcam = () =>{
        setShơWebcam(true);
    };

    return (
        <div className={styles['user-infor']}>
            <div className={styles['Avatar']}>
                    <image 
                    src={avatar}
                    alt = "Avatar"
                    width={200}
                    height={200}
                    />
                    <button onClick={handleDisplayWebcam}>Tìm webcam</button>
                    {showWebcam && <WebcamStreaming/>};
                <div className={styles['infor']}>
                    <p>Họ và tên: {user.name}</p>
                    <p>Giới tính: {user.gender}</p>
                    <p>Tài khoảng: {user.account}</p>
                    <p>SPD: {user.sbd}</p>
                    <button onClick={handlelogout}>Đăng xuất</button>
                </div>
                <div className={styles['examInfo']}>
                    <h2>Bài thi gồm 4 kỹ năng</h2>
                    <p>Listening: 3 parts - 45 minutes</p>
                    <p>Reading: 4 parts - 40 minutes</p>
                    <p>Writing: 2 parts - 60 minutes</p>
                    <p>Speaking: 1 part - 12 minutes</p>
                </div>
                <div className={styles['audio-testing']}>
                    <AudioTesting />
                </div>
                <div className={styles['note']}>
                    <h2>Các lưu ý</h2>
                    <p>- Khi hết thời gian của từng kỹ năng, hệ thống sẽ tự động chuyển sang kỹ năng tiếp theo. Thí sinh không thể thao tác được với kỹ năng đã làm trước đó.</p>
                    <p>- Thí sinh phải click nút “LƯU BÀI” sau khi hoàn thành mỗi part.</p>
                    <p>- Để chuyển part hay kỹ năng, thí sinh click vào nút “TIẾP TỤC”.</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfor;
