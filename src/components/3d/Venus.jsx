import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Venus({ isPaused, onSelect }) {
  const venusRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 28;
  const speed = 0.7;
  const colorMap = useTexture('/textures/venus.jpg');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (venusRef.current) {
      venusRef.current.position.x = radius * Math.cos(time * speed);
      venusRef.current.position.z = radius * Math.sin(time * speed);
      venusRef.current.rotation.y -= 0.0015;
    }
  });

  return (
    <mesh 
      ref={venusRef}
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
      <sphereGeometry args={[1.9, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}