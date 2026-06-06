import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Neptune({ isPaused, onSelect }) {
  const neptuneRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 122;
  const speed = 0.02;
  const colorMap = useTexture('/textures/neptune.jpg');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (neptuneRef.current) {
      neptuneRef.current.position.x = radius * Math.cos(time * speed);
      neptuneRef.current.position.z = radius * Math.sin(time * speed);
      neptuneRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={neptuneRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[2.1, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}