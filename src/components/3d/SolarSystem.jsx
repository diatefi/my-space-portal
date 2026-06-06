import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three'; // Імпортуємо базовий Three.js для векторів математики

import Sun from './Sun.jsx';
import Mercury from './Mercury.jsx';
import Venus from './Venus.jsx';
import Earth from './Earth.jsx';
import Mars from './Mars.jsx';
import Jupiter from './Jupiter.jsx';
import Saturn from './Saturn.jsx';
import Uranus from './Uranus.jsx';
import Neptune from './Neptune.jsx';

// Словник параметрів орбіт для розрахунку позиції камери
const PLANET_CONFIGS = {
  mercury: { radius: 22, speed: 1.2, size: 0.8 },
  venus: { radius: 28, speed: 0.7, size: 1.9 },
  earth: { radius: 35, speed: 0.5, size: 2 },
  mars: { radius: 44, speed: 0.35, size: 1 },
  jupiter: { radius: 62, speed: 0.15, size: 3.5 },
  saturn: { radius: 82, speed: 0.08, size: 3 },
  uranus: { radius: 102, speed: 0.04, size: 2.2 },
  neptune: { radius: 122, speed: 0.02, size: 2.1 },
};

function OrbitLine({ radius }) {
  const points = [];
  const segments = 128; 
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push([radius * Math.cos(angle), 0, radius * Math.sin(angle)]);
  }
  return <Line points={points} color="#ffffff" lineWidth={1.5} transparent opacity={0.3} />;
}

export default function SolarSystem({ isPaused, selectedPlanet, setSelectedPlanet }) {
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!isPaused) timeRef.current += delta;
    const time = timeRef.current;

    if (state.controls) {
      if (selectedPlanet) {
        let targetX;
        let targetZ;
        let cameraOffset;

        if (selectedPlanet === 'sun') {
          // Сонце стоїть у центрі (0,0,0)
          targetX = 0;
          targetZ = 0;
          // Камера відлітає трохи далі, бо Сонце велике (радіус 15)
          cameraOffset = new THREE.Vector3(0, 25, 55); 
        } 
        else if (selectedPlanet === 'moon') {
          // Обчислюємо позицію Землі
          const earthConfig = PLANET_CONFIGS['earth'];
          const earthX = earthConfig.radius * Math.cos(time * earthConfig.speed);
          const earthZ = earthConfig.radius * Math.sin(time * earthConfig.speed);
          
          // Обчислюємо локальну орбіту Місяця (радіус 4, швидкість 1.5)
          const moonLocalX = 4 * Math.cos(time * 1.5);
          const moonLocalZ = 4 * Math.sin(time * 1.5);
          
          // Абсолютна позиція Місяця в просторі
          targetX = earthX + moonLocalX;
          targetZ = earthZ + moonLocalZ;
          
          // Камера підлітає дуже близько, бо Місяць маленький (радіус 0.5)
          cameraOffset = new THREE.Vector3(targetX, 2, targetZ + 6);
        } 
        else {
          // Стандартна логіка для всіх інших планет
          const config = PLANET_CONFIGS[selectedPlanet];
          targetX = config.radius * Math.cos(time * config.speed);
          targetZ = config.radius * Math.sin(time * config.speed);
          cameraOffset = new THREE.Vector3(targetX, config.size * 3 + 4, targetZ + config.size * 4 + 6);
        }

        const targetPlanetPos = new THREE.Vector3(targetX, 0, targetZ);
        state.controls.target.lerp(targetPlanetPos, 0.05);
        state.camera.position.lerp(cameraOffset, 0.05);
      } else {
        const center = new THREE.Vector3(0, 0, 0);
        state.controls.target.lerp(center, 0.05);
        const defaultCameraPos = new THREE.Vector3(0, 60, 150);
        if (state.camera.position.distanceTo(center) < 80) {
          state.camera.position.lerp(defaultCameraPos, 0.03);
        }
      }
    }
  });

  return (
    <>
      <OrbitControls makeDefault minDistance={5} maxDistance={300} />
      <ambientLight intensity={1.5} color="#ffffff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Sun isPaused={isPaused} onSelect={() => setSelectedPlanet('sun')} />

      {Object.values(PLANET_CONFIGS).map((p, idx) => (
        <OrbitLine key={idx} radius={p.radius} />
      ))}

      <Suspense fallback={null}>
        {/* Передаємо функцію вибору у кожну планету */}
        <Mercury isPaused={isPaused} onSelect={() => setSelectedPlanet('mercury')} />
        <Venus isPaused={isPaused} onSelect={() => setSelectedPlanet('venus')} />
        <Earth  isPaused={isPaused} onSelect={() => setSelectedPlanet('earth')} onSelectMoon={() => setSelectedPlanet('moon')} />
        <Mars isPaused={isPaused} onSelect={() => setSelectedPlanet('mars')} />
        <Jupiter isPaused={isPaused} onSelect={() => setSelectedPlanet('jupiter')} />
        <Saturn isPaused={isPaused} onSelect={() => setSelectedPlanet('saturn')} />
        <Uranus isPaused={isPaused} onSelect={() => setSelectedPlanet('uranus')} />
        <Neptune isPaused={isPaused} onSelect={() => setSelectedPlanet('neptune')} />
      </Suspense>
    </>
  );
}