import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaLocationDot, FaCameraRotate } from 'react-icons/fa6';
import { AiFillCamera, AiOutlineStar } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import Flicking from '@egjs/react-flicking';
import { saveAs } from 'file-saver'; // Import file-saver to save the image
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';
import { Link } from 'react-router-dom';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export default function WebcamCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState('');
  const [currentPoints, setCurrentPoints] = useState([
    {
      id: 1,
      name: "กลุ่มแม่บ้านเจ๊ะบิลัง ขนมผูกรัก",
      time: "50 คะแนน | ส่วนลด 10%",
      imageUrl: "https://sv1.picz.in.th/images/2023/09/02/dW5yIbR.jpeg",
    },
    {
      id: 2,
      name: "ร้านแม่ทิพย์ โรตีกรอบไร้น้ำตาล",
      time: "50 คะแนน | แถมฟรี 1 กล่อง",
      imageUrl: "https://sv1.picz.in.th/images/2023/09/02/dW5yF38.jpeg",
    },
    {
      id: 2,
      name: "น้ำตกวังสายทอง",
      time: "8:30 น.",
      imageUrl: "https://thailandtourismdirectory.go.th/assets/upload/2017/11/02/2017110227f237e6b7f96587b6202ff3607ad88a153922.JPG",
    },
  ]);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  let videoConstraints = {
    facingMode: facingMode,
    width: 300,
    height: 300,
  };

  useEffect(() => {
    setFacingMode(FACING_MODE_USER);
  }, []);

  const handleClick = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  // Function to capture and save the image
  // Function to capture and save the image
const handleCaptureAndSave = () => {
  if (webcamRef.current) {
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert the base64 image to a Blob
    const byteCharacters = atob(imageSrc.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Generate a unique file name (you can customize this)
    const fileName = `captured_image_${Date.now()}.jpeg`;

    // Create a Blob object URL and trigger a download
    const blobUrl = URL.createObjectURL(blob);
    saveAs(blobUrl, fileName);
  }
};


  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute w-full z-[100]">
          <div className="bg-white flex mx-auto w-fit px-2 py-2 rounded-lg mt-3">
            <p>
              <FaLocationDot className="text-2xl text-red-600" />
            </p>
            <p className="ml-1"> น้ำตกวังสายทอง, สตูล</p>
          </div>
        </div>
        <div className="absolute left-2 top-4">
          <IoIosArrowBack className="text-2xl text-white" />
        </div>
        <div className="w-full flex relative">
          <div className="w-full flex justify-between absolute bottom-4 z-[120]">
            <div className="ml-4">
              <button
                onClick={handleCaptureAndSave}
                className="bg-blue-100 border-[2px] border-blue-600 rounded-lg px-1 py-1 
          mt-2 tracking-wider text-white drop-shadow-md font-bold mx-1"
              >
                <AiFillCamera className="text-2xl text-blue-800" />
              </button>
              <button
                onClick={handleClick}
                className="bg-blue-100 border-[2px] border-blue-600 rounded-lg px-1 py-1 
          mt-2 tracking-wider text-white drop-shadow-md font-bold mx-1"
              >
                <FaCameraRotate className="text-2xl text-blue-800" />
              </button>
            </div>
            <div className="flex mr-2 bg-white rounded-lg px-2">
              <AiOutlineStar className="my-auto mr-1 text-orange-600" />
              <p className="my-auto">รับคะแนน</p>
            </div>
          </div>
          {image === '' ? (
            <Webcam
              className="mx-auto w-full h-full"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              screenshotQuality={1}
            />
          ) : (
            <div className="w-full h-[60vh]"></div>
          )}
        </div>
        <div className="w-full pl-3">
          <div className="mt-4 flex">
            <p className="text-lg">ภารกิจเก็บคะแนน</p>
            <FaLocationDot className="my-auto text-xl text-blue-800 ml-2" />
            <p className="my-auto ml-1">สตูล</p>
          </div>
          <div className="w-[105%] h-full mt-2 -ml-[5%]">
            <Flicking renderOnlyVisible={true}>
              {currentPoints.map((trip) => (
                <div className="h-56 w-[90%] rounded-xl pr-4 relative" key={trip.id}>
                  <div className="flex w-full h-full absolute z-[20]">
                    <img src={'https://sv1.picz.in.th/images/2023/09/02/dWEWpGz.png'} className="mx-auto h-3/4 mt-6" />
                  </div>
                  <img src={trip.imageUrl} className="rounded-xl opacity-75 h-full w-full" />
                  <div className="absolute left-2 top-2 bg-white px-2 py-1 rounded-lg flex">
                    <AiOutlineStar className="text-xl my-auto mr-1 text-orange-600" />
                    <p>100 คะแนน</p>
                  </div>
                </div>
              ))}
            </Flicking>
          </div>
        </div>
      </div>
    </>
  );
}
