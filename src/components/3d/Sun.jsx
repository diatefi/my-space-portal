import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Sun({ isPaused, onSelect }) { // Додали onSelect
  const sunRef = useRef();
  const sunMap = useTexture('/textures/sun.jpg');

  useFrame(() => {
    if (isPaused) return;
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh 
      ref={sunRef}
      // Додаємо обробники подій
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
      <sphereGeometry args={[15, 64, 64]} />
      <meshBasicMaterial map={sunMap} />
      <pointLight intensity={200} color="#ffffff" distance={300} decay={1.5} />
    </mesh>
  );
}