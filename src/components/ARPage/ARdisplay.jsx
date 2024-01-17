import { ZapparCamera, ZapparCanvas, Loader, BrowserCompatibility, InstantTracker } from "@zappar/zappar-react-three-fiber";
import "./ar.css"
import { useState } from "react";
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const ARdisplay = () => {
  const [placementMode, setPlacementMode] = useState(false);
  const [cubePosition, setCubePosition] = useState([1, 1, -5]);
  return (
    <>
      <BrowserCompatibility />
      <div className="bg-red-200 w-full h-full min-h-screen flex flex-grow">
        <ZapparCanvas className="w-full min-h-screen bg-blue-200">
          <ZapparCamera userCameraMirrorMode="poses" poseMode={"attitude"} environmentMap/>
          <InstantTracker placementMode={placementMode}>
            <mesh
              geometry={geometry}
              material={material} 
              position={cubePosition}
              onUpdate={(self) => {
                // Access the position of the cube from the Three.js object
                const newPosition = self.position.toArray();
                console.log("Cube Position:", newPosition);

                // Update the state with the new position
                setCubePosition(newPosition);
              }}/>
          </InstantTracker>
          <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
          <Loader />
        </ZapparCanvas>
        <div className="absolute top-20 w-full flex">
            <p className="mx-auto text-xl">{cubePosition[0]},{cubePosition[1]},{cubePosition[2]}</p>
        </div>
        <div
          className="absolute bottom-48 w-full"

        >
          <button className="mx-auto flex border-2 p-2 rounded-lg bg-slate-600 text-white"
            onClick={() => {
              setPlacementMode((currentPlacementMode) => !currentPlacementMode);
            }}>
            Tap here to
            {placementMode ? " place " : " pick up "}
            the object
          </button>
        </div>
      </div>
    </>
  )
}
export default ARdisplay