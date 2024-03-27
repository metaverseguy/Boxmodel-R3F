import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { state } from '../serve/store'
import { useSnapshot } from 'valtio'
import Box from '../componentsForThree/Box'

export function App(props) {
  const position = [-2, 0, 10]
  const fov = 25
  const snap = useSnapshot(state)
  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
      <ambientLight intensity={0.5} />
      <Environment files="sand.hdr" />
      {snap.boxs.map((item, index) => {
        return <Box key={index} id={item.id} color={item.color} pos={item.id / 2} />
      })}
      <OrbitControls enablePan={false} enableZoom={false} makeDefault />
    </Canvas>
  )
}
