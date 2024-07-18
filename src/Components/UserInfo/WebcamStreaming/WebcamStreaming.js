'use client'
import { useRef } from "react";
import React from "react";
import Webcam from "react-webcam";

const WebcamStreaming = () => {
    const WebcamRef = useRef(null);

    return (
        <div>
            <Webcam
                audio= {false}
                ref={WebcamRef}
                screenshotFormat="image/jpeg"
                width={200}
                height={200}
            />
        </div>
    );
};

export default WebcamStreaming;