import { memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { easing } from "maath";
import { useRef, useState } from "react";
import { useStore } from "../serve/store";

const num = new Vector3();
const num1 = new Vector2();

type Props = {
  color: string;
  pos: number;
  id: number;
};

const Box = ({ color, pos, id }: Props) => {
  const store = useStore();
  const material_ref = useRef<any>();
  const mesh_ref = useRef<any>();
  const [statePosition, setStatePosition] = useState<number>(0);

  useFrame((state, delta) => {
    if (material_ref.current)
      easing.dampC(material_ref.current.color, color, 0.2, delta);
    if (mesh_ref.current) {
      easing.damp3(
        mesh_ref.current.scale,
        store.selected_id === id
          ? num.set(0.5, 0.5, 0.5)
          : num.set(0.3, 0.3, 0.3),
        0.5,
        delta
      );
      easing.damp2(
        mesh_ref.current.position,
        num1.set(pos, pos + statePosition),
        0.3,
        delta
      );
    }
    if (store.selected_id !== id) {
      mesh_ref.current.rotation.y += 0.02;
      mesh_ref.current.rotation.x += 0.02;
    }
  });

  return (
    <mesh
      position={[0, 0, pos]}
      scale={0.3}
      ref={mesh_ref}
      onPointerOver={() => {
        // setStateScale(0.4)
        setStatePosition(0);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        store.setSelectedId(id);
      }}
      onPointerOut={() => {
        // setStateScale(0.3)
        setStatePosition(0);
      }}
    >
      <boxGeometry />
      <meshStandardMaterial ref={material_ref} color={"orange"} />
    </mesh>
  );
};

export default memo(Box);
