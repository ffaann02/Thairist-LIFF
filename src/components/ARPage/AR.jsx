import { ZapparCanvas, ZapparCamera } from "@zappar/zappar-react-three-fiber";

const AR = () => {
  return (
    <ZapparCanvas className="absolute z-[1000]">
      <ZapparCamera onFirstFrame={() => {
    console.log("first frame");
  }}/>
    </ZapparCanvas>
  )
}

export default AR;
