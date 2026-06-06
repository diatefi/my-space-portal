import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Mercury({ isPaused, onSelect }) {
  const mercuryRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 22;
  const speed = 1.2;
  const colorMap = useTexture('/textures/mercury.jpg');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (mercuryRef.current) {
      mercuryRef.current.position.x = radius * Math.cos(time * speed);
      mercuryRef.current.position.z = radius * Math.sin(time * speed);
      mercuryRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh 
      ref={mercuryRef}
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
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}