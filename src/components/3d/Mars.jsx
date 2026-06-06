import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Mars({ isPaused, onSelect }) {
  const marsRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 44;
  const speed = 0.35;
  const colorMap = useTexture('/textures/mars.jpg');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (marsRef.current) {
      marsRef.current.position.x = radius * Math.cos(time * speed);
      marsRef.current.position.z = radius * Math.sin(time * speed);
      marsRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh 
      ref={marsRef}
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
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}