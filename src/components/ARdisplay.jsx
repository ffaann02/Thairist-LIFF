const ARdisplay = () => {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/gh/aframevr/aframe@1c2407b26c61958baa93967b5412487cd94b290b/dist/aframe-master.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
      <div className="pt-10">
        {/* Add any loading logic here if necessary */}
        <div className="text-black">
          <div>Loading, please wait...</div>
        </div>

        {/* A-Frame scene */}
        <a-scene
          vr-mode-ui="enabled: false;"
          renderer="logarithmicDepthBuffer: true;"
          embedded
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        >
          {/* NFT marker */}
          <a-nft
            type="nft"
            url="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/trex-image/trex"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
          >
            {/* 3D model */}
            <a-entity
              gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
              scale="5 5 5"
              position="50 150 0"
            ></a-entity>
          </a-nft>

          {/* Camera entity */}
          <a-entity camera></a-entity>
        </a-scene>
      </div>
    </>
  )
}
export default ARdisplay