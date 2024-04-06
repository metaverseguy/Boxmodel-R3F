import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Box from "../componentsForThree/Box";
import { useStore } from "../serve/store";
import { Sphere } from "../componentsForThree/Sphere";
export function App() {
  const store = useStore();
  return (
    <Canvas
      shadows
      camera={{ position: [5, 4, 2], fov: 45 }}
      eventSource={document.getElementById("root")!}
      eventPrefix="client"
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {/* <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/buikslotermeerplein_1k.hdr"
        ground={{ height: 5, radius: 40, scale: 20 }}
      /> */}
      {store.boxs.map((item, index) => {
        return (
          <Box key={index} id={item.id} color={item.color} pos={item.id / 2} />
        );
      })}
      {/* <Sphere /> */}
      <OrbitControls enablePan={false} enableZoom={true} makeDefault />
    </Canvas>
  );
}
