import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Jupiter({ isPaused, onSelect }) {
  const jupiterRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 62;
  const speed = 0.15;
  const colorMap = useTexture('/textures/jupiter.jpg');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (jupiterRef.current) {
      jupiterRef.current.position.x = radius * Math.cos(time * speed);
      jupiterRef.current.position.z = radius * Math.sin(time * speed);
      jupiterRef.current.rotation.y += 0.004;
    }
  });

  return (
    <mesh 
      ref={jupiterRef}
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
      <sphereGeometry args={[3.5, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}