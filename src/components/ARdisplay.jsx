import { ZapparCamera, ZapparCanvas } from "@zappar/zappar-react-three-fiber";
const ARdisplay = () => {
  return (
    <div className="bg-red-200 w-full h-full min-h-screen">
      <ZapparCanvas>
        <ZapparCamera />
      </ZapparCanvas>
    </div>
  )
}
export default ARdisplay