import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from 'axios';

export default function WebcamVideo() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    let segmentNumber = 1;
    let chunks = [];

    const handleDataAvailable = useCallback(
        async ({ data }) => {
            if (data.size > 0) {
                console.log("inside handleDataAvailable. data is - ", data);
                chunks.push(data);

                //Now stopping recorder
                // handleStopCaptureInBetween();

                // console.log("inside handleDataAvailable. data is - ", data.data);
                //download blob
                // const url = URL.createObjectURL(data);
                // const a = document.createElement("a");
                // document.body.appendChild(a);
                // a.style = "display: none";
                // a.href = url;
                // a.download = "react-webcam-stream-capture.mp4";
                // a.click();
                // window.URL.revokeObjectURL(url);

                console.log("Directly calling upload to server");
                await uploadToServer(data);
            }
        },
        [setRecordedChunks]
    );

    // function handleStopCaptureInBetween() {
    //     console.log("Inside stop function");
    //     mediaRecorderRef.current.stop();
    //     setCapturing(false);

    //     // sendAsyncToServer();
    //     uploadToServer();
    //     //start recroding
    //     // handleStartCaptureClick();
    // }

    // async function sendAsyncToServer() {
    //     console.log("Async upload function called");
    //     console.log("Uploading....");

    //     var formData = new FormData();

    //     chunks.forEach(function (chunk, index) {
    //         var blob = new Blob([chunk], { type: 'video/mp4' });
    //         formData.append('chunk-' + index, blob, 'chunk-' + index + '.mp4');
    //     });

    //     chunks = [];
    // }

    const uploadToServer = async function (data) {
        console.log("Uploading to server");
        console.log("Chuinks are - ", chunks);
        const serverUrl = 'http://localhost:3000/upload';

        var formData = new FormData();
        var blob = new Blob([data], { type: 'video/mp4' });
        formData.append('file', blob, `segment-${segmentNumber}.webm`);
        segmentNumber = segmentNumber + 1;
        try {
            const response = await fetch(serverUrl, {
                method: 'POST',
                body: formData
            });

            // const result = await response;
            console.log("Uploaded now the response that we got is " + response);
        } catch (error) {
            console.error(error);
        }

    }

    const handleStartCaptureClick = useCallback(() => {
        console.log("Capturing....");
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
            codecs: 'avc1.42E01E',
            bitsPerSecond: "5000000",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start(3000);

    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    


    const videoConstraints = {
        width: 480,
        height: 480,
        facingMode: "user",
        frameRate: 30,
    };

    return (
        <div className="Container">
            <Webcam
                height={480}
                width={480}
                audio={false}
                mirrored={true}
                ref={webcamRef}
                videoConstraints={videoConstraints}
            />
            { }
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {/* {recordedChunks.length > 0 && (
                <button onClick={handleDownload}>Download</button>
            ) && (
                    <button onClick={handleUpload}>Upload to the Server</button>
                )

            } */}
        </div>
    );
}