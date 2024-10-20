import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import WebcamVideo from "./capture/WebcamVideo";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = () => {
    setCapturing(true);
    setRecordedChunks([]);
  };

  const handleStopCaptureClick = () => {
    setCapturing(false);
  };

  const handleDataAvailable = (data) => {
    console.log("Inside handle data");
    if (data && data.size > 0) {
      console.log("Data size is 0");
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleDownload = () => {
    const blob = new Blob(recordedChunks, {
      type: "video/mp4",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "react-webcam-stream.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  function handleEncodedData(data) {
    console.log("Encoded data is - ",data);
  }
  

  const handleUploadToServer = () => {
    console.log("REcorded chubnks are - ");
    console.log(recordedChunks);
    // const options = { mimeType: 'video/webm; codecs=vp9' };
    // const recorder = new MediaRecorder(recordedChunks, options);

    // const encoder = new VideoEncoder({
    //   output: handleEncodedData,
    //   codec: 'vp9',
    //   width: 1280,
    //   height: 720,
    //   frameRate: 30,
    // });

    // recorder.addEventListener('dataavailable', async event => {
    //   await encoder.encode(event.data);
    // });
    
    

  }

  return (

    <div className="App">
      <WebcamVideo/>
    </div>
    // <div>
    //   <button onClick={handleStartCaptureClick}>Start Capture</button>
    //   <button onClick={handleStopCaptureClick}>Stop Capture</button>
    //   <button onClick={handleDownload}>Download</button>
    //   <button onClick={handleUploadToServer}>Upload to server</button>
    //   {capturing && (
    //     <Webcam
    //       audio={false}
    //       ref={webcamRef}
    //       screenshotFormat="image/jpeg"
    //       videoConstraints={{
    //         width: 1280,
    //         height: 720,
    //         facingMode: "user",
    //         frameRate: 30,
    //       }}
    //       onUserMediaError={() => console.log("Error")}
    //       onUserMedia={() => console.log("Success")}
    //       onDataAvailable={handleDataAvailable}
    //     />
    //   )}
    // </div>
  );
}

export default App;