import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Box from '../componentsForThree/Box'
import { useStore } from '../serve/store'
import { Sphere } from "../componentsForThree/Sphere";
export function App() {
  const store = useStore()
  return (
    <Canvas shadows camera={{ position: [5,4,2], fov: 45 }} eventSource={document.getElementById('root')} eventPrefix="client">
      <ambientLight intensity={0.5} />
      <Environment files="sand.hdr" />
      {store.boxs.map((item, index) => {
        return <Box key={index} id={item.id} color={item.color} pos={item.id / 2} />
      })}
      <Sphere />
      <OrbitControls enablePan={false} enableZoom={false} makeDefault />
    </Canvas>
  )
}
