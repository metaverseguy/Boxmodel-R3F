import { memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector2, Vector3 } from 'three'
import { easing } from 'maath'
import { useRef, useState } from 'react'
import { useStore } from '../serve/store'

const num = new Vector3()
const num1 = new Vector2()

const Box = ({ color, pos, id }) => {
  const store = useStore()
  const ref = useRef()
  const refRot = useRef()
  const [statePosition, setStatePosition] = useState(0)

  useFrame((state, delta) => {
    easing.dampC(ref.current.color, color, 0.2, delta)
    easing.damp3(refRot.current.scale, store.selectedID === id ? num.set(0.5, 0.5, 0.5) : num.set(0.3, 0.3, 0.3), 0.5, delta)
    easing.damp2(refRot.current.position, num1.set(pos, pos + statePosition, 0), 0.3, delta)
    if (store.selectedID !== id) {
      refRot.current.rotation.y += 0.02
      refRot.current.rotation.x += 0.02
    }
  })

  return (
    <mesh
      position={[0, 0, pos]}
      scale={0.3}
      ref={refRot}
      onPointerOver={() => {
        // setStateScale(0.4)
        setStatePosition(0)
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        store.setselectedID(id)
      }}
      onPointerOut={() => {
        // setStateScale(0.3)
        setStatePosition(0)
      }}>
      <boxGeometry />
      <meshStandardMaterial ref={ref} />
    </mesh>
  )
}

export default memo(Box)
