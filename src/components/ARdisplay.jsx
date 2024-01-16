import { ZapparCamera, ZapparCanvas, Loader} from "@zappar/zappar-react-three-fiber";
const ARdisplay = () => {
  return (
    <div className="bg-red-200 w-full h-full min-h-screen flex flex-grow">
      <ZapparCanvas className="w-full min-h-screen bg-blue-200">
        <ZapparCamera rearCameraMirrorMode="css" />
        <Loader />
      </ZapparCanvas>
    </div>
  )
}
export default ARdisplay