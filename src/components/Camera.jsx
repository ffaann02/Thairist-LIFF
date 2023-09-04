import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [videoConstraints,setVideoConstraints] = useState("environment");
  const toggleCamera = () => {
    setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Do something with the captured image, e.g., send it to the server or display it.
      console.log('Captured image:', imageSrc);
    }
  };

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const videoConstraints = {
      facingMode: "environment", 
      width: 270,
      height: 480
    };
    if (isMobile) {
      alert("hello girl");
    }
    navigator.mediaDevices.getUserMedia({ videoConstraints })
      .then((stream) => {
        webcamRef.current.srcObject = stream;
        setIsCameraOn(true);
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8 text-center">
      {isCameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          className="w-full h-auto"
        />
      )}
      <button
        onClick={toggleCamera}
        className={`mt-4 px-4 py-2 ${isCameraOn ? 'bg-red-500' : 'bg-green-500'
          } text-white rounded-full hover:bg-red-600`}
      >
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>
      {isCameraOn && (
        <button
          onClick={capture}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Capture Photo
        </button>
      )}
    </div>
  );
};

export default CameraComponent;
