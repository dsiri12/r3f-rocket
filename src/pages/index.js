import React, { useState, useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, extend, useThree , useFrame} from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

import './style.css'

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls 
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}

const Plane = () => (
  <mesh>
    <planeBufferGeometry attach="geometry" args={[100, 100, 1]} />
    <meshPhysicalMaterial attach="material" color="white" />
  </mesh>
)

const Box = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ?  "hotpink" : "gray",
  })

  useFrame(() => {
    meshRef.current.rotation.y += 0.01
  })

  return (
  <a.mesh 
    ref={meshRef}
    onPointerOver={() => setHovered(true)} 
    onPointerOut={() => setHovered(false)}
    onClick={() => setActive(!active)}
    scale={props.scale}
  >
      <ambientLight />
      <spotLight position={[0, 5, 10]} />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
}

export default () => (
  <Canvas>
    <Controls />
    <Box />
    <Plane />
  </Canvas>
)
