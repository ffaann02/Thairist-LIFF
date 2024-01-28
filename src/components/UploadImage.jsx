import React, { useState } from 'react';
import { imageFirebase } from '../../firebaseConfig';
import { ref, uploadBytes } from "firebase/storage";

const UploadImage = () => {

    const [image, setImage] = useState('');

    const handleClick = () => {
        const imageRef = ref(imageFirebase, `files/test02`);
        uploadBytes(imageRef, image);
    }

    return (
        <div className='pt-16'>
            <input type='file' onChange={(e) => setImage(e.target.files[0])}/>
            <button onClick={handleClick}>Upload</button>
        </div>
    )
}

export default UploadImage;