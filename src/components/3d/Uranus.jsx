import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Uranus({ isPaused, onSelect }) {
  const uranusRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 102;
  const speed = 0.04;
  const colorMap = useTexture('/textures/uranus.jpg');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (uranusRef.current) {
      uranusRef.current.position.x = radius * Math.cos(time * speed);
      uranusRef.current.position.z = radius * Math.sin(time * speed);
      uranusRef.current.rotation.x += 0.002; 
    }
  });

  return (
    <mesh 
      ref={uranusRef} 
      rotation={[0, 0, Math.PI / 2]}
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
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}