import React, {useEffect} from "react"
import { useUser,UserProvider } from "../UserContext";
const TestAR = () => {
    const {isOpenAR,setIsOpenAR} = useUser();
    
    useEffect(() => {
        setIsOpenAR(true);
        // Function to dynamically load scripts
        const loadScript = (src, type) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.type = type;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        };
    
        // Load AR-related scripts
        Promise.all([
          loadScript('https://aframe.io/releases/1.0.4/aframe.min.js', 'text/javascript'),
          loadScript('https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js', 'text/javascript'),
          loadScript('https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js', 'text/javascript'),
          loadScript('https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-detector.js', 'text/javascript'),
          loadScript('https://raw.githack.com/AR-js-org/studio-backend/master/src/modules/marker/tools/gesture-handler.js', 'text/javascript'),
        ])
        .then(() => {
          console.log('AR scripts loaded successfully');
        })
        .catch((error) => {
          console.error('Error loading AR scripts:', error);
        });
    
        // Cleanup function (optional)
        return () => {
          // You can do cleanup tasks here if needed
        };
      }, []);

    return (
        <>
            <h1 style={{ margin: 0, zIndex: 10, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', color: 'antiquewhite' }}>
                Marker
            </h1>
            <button style={{ margin: 0, overflow: 'hidden', zIndex: 10, position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)' }}>
                <a href="location.html" style={{ textDecoration: 'none', color: 'inherit' }}>
                    To Location
                </a>
            </button>
            <p style={{ fontSize: '30px', margin: 0, zIndex: 10, position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', color: 'antiquewhite' }}>
                Hello
            </p>
            <a-scene vr-mode-ui="enabled: true;" loading-screen="enabled: false;"
                arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;" id="scene" embedded gesture-detector>
                <a-assets>
                    <a-asset-item id="animated-asset" src="/ar_assets/dog.gltf"></a-asset-item>
                </a-assets>
                <a-marker id="animated-marker" type="pattern" preset="custom" url="/ar_assets/marker.patt"
                    raycaster="objects: .clickable" emitevents="true" cursor="fuse: false; rayOrigin: mouse;">
                    <a-entity id="bowser-model" scale="1 1 1" animation-mixer="loop:pingpong" gltf-model="#animated-asset"
                        class="clickable" gesture-handler rotation="-90 180 180"></a-entity>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
        </>
    )
}
export default TestAR