import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Saturn({ isPaused, onSelect }) {
  const saturnGroupRef = useRef();
  const timeRef = useRef(0);
  
  const radius = 82;
  const speed = 0.08; 

  const planetMap = useTexture('/textures/saturn.jpg');
  const ringMap = useTexture('/textures/saturn_ring.png');

  useFrame((state, delta) => {
    if (isPaused) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    if (saturnGroupRef.current) {
      saturnGroupRef.current.position.x = radius * Math.cos(time * speed);
      saturnGroupRef.current.position.z = radius * Math.sin(time * speed);
      saturnGroupRef.current.rotation.y += 0.003; 
    }
  });

  return (
    <group 
      ref={saturnGroupRef} 
      rotation={[0.45, 0, 0]}
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
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial map={planetMap} /> 
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 6, 64]} />
        <meshBasicMaterial 
          map={ringMap} 
          transparent={true} 
          opacity={0.8} 
          side={2} 
          depthWrite={false} /* <--- ОСЬ ЦЕЙ РЯДОК ПРИБЕРЕ ЧОРНИЙ КВАДРАТ */
        />
      </mesh>
    </group>
  );
}