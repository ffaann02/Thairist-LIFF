import React, { useEffect, useRef, useState } from 'react';
import { getURLParameters } from './url_decode.js';
import { calculateDistance } from './calculate_distance.js';

const AFrameSceneComponent = () => {
  const [testEntityAdded, setTestEntityAdded] = useState(false);
  const objectLatLong = [13.649786076060431, 100.48939159652987];
  const [entities, setEntities] = useState([]);
  const aframeRef = useRef(null);

  const addEntity = (geometry, material, scale, place) => {
    const entity = (
      <a-entity
        key={entities.length + 1}
        geometry={geometry}
        material={material}
        scale={scale}
        gps-new-entity-place={place}
      ></a-entity>
    );

    setEntities((prevEntities) => [...prevEntities, entity]);
  };

  useEffect(() => {
    const el = document.querySelector("[gps-new-camera]");
    const handleUpdatePosition = (e) => {
      const initialLat = e.detail.position.latitude;
      const initialLon = e.detail.position.longitude;

      if (!testEntityAdded) {
        const distance = calculateDistance(
          e.detail.position.latitude,
          e.detail.position.longitude,
          objectLatLong[0],
          objectLatLong[1]
        );

        console.log(distance);

        // Add entities based on the distance
        if (distance > 0 && distance <= 50) {
        //   addEntity(
        //     'primitive: box;',
        //     { src: 'https://fastly.picsum.photos/id/200/400/400.jpg?hmac=0WDd9kCBVyEsjSb4-mOMUiZBmJiAxVOmXyZVXBAB5Hk' },
        //     { x: 30, y: 30, z: 30 },
        //     { latitude: objectLatLong[0] + 0.001, longitude: objectLatLong[1] }
        //   );

        //   const entity2 = document.createElement("a-box");
        //     entity2.setAttribute("scale", {
        //         x: 50,
        //         y: 50,
        //         z: 50,
        //     });
        //     entity2.setAttribute("material", { color: "blue" });
        //     entity2.setAttribute("gps-new-entity-place", {
        //         latitude: objectLatLong[0],
        //         longitude: objectLatLong[1] + 0.001,
        //     });
        addEntity(
                'primitive: box;',
                { color: "blue" },
                { x: 50, y: 50, z: 50 },
                { latitude: objectLatLong[0], longitude: objectLatLong[1]+ 0.001}
              );

          // Set the flag to true to avoid adding entities repeatedly
          setTestEntityAdded(true);
        }
      }
    };

    el.addEventListener('gps-camera-update-position', handleUpdatePosition);

    return () => {
      el.removeEventListener('gps-camera-update-position', handleUpdatePosition);
    };
  }, [testEntityAdded, entities]);

  useEffect(()=>{
    const parameters = getURLParameters();
    console.log('Extracted Parameters:', parameters);
  },[])

  return (
    <a-scene
      ref={aframeRef}
      vr-mode-ui='enabled: false'
      arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false'
      renderer='antialias: true; alpha: true'
    >
      <a-camera gps-new-camera='gpsMinDistance: 5;'></a-camera>
      {entities!==null && entities}
    </a-scene>
  );
};

export default AFrameSceneComponent;
