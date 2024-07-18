'use client'
import React from "react"
import { useRef } from "react"
import { useState } from "react"

const AudioTesting = () => {
    const [RecordingAudio, setRecordingAudio] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
            //Cơ bản, đây là quá trình thu thập data từ event vào audioChunksRef, event chính là khi chúng ta ấn ghi âm.
        };

        mediaRecorderRef.current.onstop = () =>{
            const audioblob = new Blob(audioChunksRef.current, {type: 'audio/mp3'});
            //Tạo một blob lưu giữ âm thanh vừa ghi nhận vào audioChunksRef.
            const url = URL.createObjectURL(audioblob);
            setAudioURL(url); //Đường dẫn phát lại audio.
        };

        mediaRecorderRef.current.start();
        setRecordingAudio(true);
        
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecordingAudio(false);
    };

    return (
        <div className={styles['audio-check']}> 
            <h2>Kiểm tra tai nghe</h2>
            <p>Bước 1: Đeo tai nghe và nghe một đoạn âm thanh phía dưới</p>
            <audio controls>
                <source src="/audio/Tiếng bocchi mhu mhu lofi cực chill.mp3" type="audio/mp3"   />
            </audio>
            <p>Bước 2: Để mic sát miệng</p>
            <p>Bước 3: Nhấn vào nút "thu âm" để thu âm</p>
            <div>
                <button onClick={handleStartRecording} disabled = {RecordingAudio}>Ghi âm</button>
                //Nút ghi âm sẽ bị disable khi state của RecordingAudio là true.
                <button onclick={handleStopRecording} disabled = {!RecordingAudio}>Dừng</button>
                //Nút dừng sẽ bị disable khi state của RecordingAudio là false.
            </div> 
            <div>
                {audioURL && (
                    <div>
                        <p>Bước 4: Nghe lại giọng nói của bạn</p> 
                        <audio controls src = {audioURL}></audio>   
                    </div>
                )}
            </div>
            <p>Bước 5: Nếu không nghe được giọng nói của mình vui lòng thông báo cho giám thị.</p>
        </div>
    );
};
export default  AudioTesting;
