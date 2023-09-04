import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  // Function to toggle camera on/off
  const toggleCamera = () => {
    setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
  };

  // Function to switch between available cameras
  const switchCamera = () => {
    if (cameraDevices.length > 1) {
      const currentIndex = cameraDevices.findIndex((device) => device.deviceId === selectedDeviceId);
      const nextIndex = (currentIndex + 1) % cameraDevices.length;
      setSelectedDeviceId(cameraDevices[nextIndex].deviceId);
    }
  };

  useEffect(() => {
    // Get the list of available video devices when the component mounts
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        setCameraDevices(videoDevices);
        // Set the default camera (usually the first one) as the selected camera
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      })
      .catch((error) => {
        console.error('Error enumerating devices:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8 text-center">
      {selectedDeviceId && isCameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            deviceId: selectedDeviceId,
          }}
          className="w-full h-auto"
        />
      )}
      <button
        onClick={toggleCamera}
        className={`mt-4 px-4 py-2 ${
          isCameraOn ? 'bg-red-500' : 'bg-green-500'
        } text-white rounded-full hover:bg-red-600`}
      >
        {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </button>
      {cameraDevices.length > 1 && (
        <button
          onClick={switchCamera}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Switch Camera
        </button>
      )}
    </div>
  );
};

export default CameraComponent;
