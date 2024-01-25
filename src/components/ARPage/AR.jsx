import { ZapparCanvas, ZapparCamera, ImageTracker } from "@zappar/zappar-react-three-fiber";
import targetImage from "/example-tracking-image.zpt";
const AR = () => {
  return (
    <ZapparCanvas className="absolute z-[1000]">
      <ZapparCamera onFirstFrame={() => {
        console.log("first frame");
      }} />
      <ImageTracker targetImage={targetImage}
        onVisible={(anchor) => {
          console.log(`Visible ${anchor.id}`);
          alert("hello");
          }}>
        <img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" />
      </ImageTracker>
    </ZapparCanvas>
  )
}

export default AR;
