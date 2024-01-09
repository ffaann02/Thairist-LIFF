const ARdisplay = () => {
  return (
    <>
      {/* <div className="w-full min-h-screen bg-green-200 absolute z-[1000]">
        <h1 style={{ margin: 0, zIndex: 10, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', color: 'antiquewhite' }}>Marker</h1>
        <button style={{ margin: 0, overflow: 'hidden', zIndex: 10, position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)' }}>
          <a href="location.html">
            To Location
          </a>
        </button>
        <div className="w-fit">
          <a-scene
            vr-mode-ui="enabled: false;"
            loading-screen="enabled: true;"
            arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
            id="scene"
            embedded
            gesture-detector
          >
            <a-assets>
              <a-asset-item
                id="animated-asset"
                src="/ar_assets/dog.gltf"
              ></a-asset-item>
            </a-assets>
            <a-marker
              // id="animated-marker"
              type="pattern"
              preset="custom"
              url="/ar_assets/marker.patt"
              raycaster="objects: .clickable"
              emitevents="true"
              cursor="fuse: false; rayOrigin: mouse;"
              id="markerA"
            >
              {/* <!-- <a-image
              src="https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/416878056_6956808604403836_2727839039767690026_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=E5DMoPTVwgoAX-Nj1sq&_nc_ht=scontent-sin6-2.xx&oh=00_AfB6ouUdgY7evyVhpFj-HiAsTK0kRXukf91jPlvYG-0mJw&oe=65A2034F"
              scale="1 1 1"
              class="clickable"
              rotation="-90 0 0"
              gesture-handler
            ></a-image> -->
              <a-entity
                id="bowser-model"
                scale="1 1 1"
                animation-mixer="loop:pingpong"
                gltf-model="#animated-asset"
                class="clickable"
                gesture-handler
                rotation="-90 180 180"
              ></a-entity>
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        </div>
      </div> */}
    </>
  )
}
export default ARdisplay