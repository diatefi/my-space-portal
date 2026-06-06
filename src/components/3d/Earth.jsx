import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// Додаємо Line до імпорту з drei
import { useTexture, Line } from '@react-three/drei';

export default function Earth({ isPaused, onSelect, onSelectMoon }) {
  const systemRef = useRef(); 
  const earthRef = useRef();  
  const moonRef = useRef();
  const timeRef = useRef(0);
   

  const earthMap = useTexture('/textures/earth.jpg');
  const moonMap = useTexture('/textures/moon.jpg'); 

  // Параметри орбіт
  const earthOrbitRadius = 35;
  const earthOrbitSpeed = 0.5;

  const moonOrbitRadius = 4; 
  const moonOrbitSpeed = 1.5; 

  // Генеруємо точки для кола орбіти Місяця (навколо локального центру 0,0,0)
  const moonOrbitPoints = [];
  const segments = 64; // Для маленького кола 64 сегментів цілком достатньо
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    moonOrbitPoints.push([
      moonOrbitRadius * Math.cos(angle), 
      0, 
      moonOrbitRadius * Math.sin(angle)
    ]);
  }

 // Зверніть увагу: тепер ми приймаємо state і delta
  useFrame((state, delta) => {
    // Якщо пауза натиснута — просто виходимо з функції, нічого не обчислюючи!
    if (isPaused) return;

    // Якщо паузи немає, додаємо час, що минув з минулого кадру (звичайні долі секунди)
    timeRef.current += delta;
    const time = timeRef.current; // Використовуємо НАШ час замість state.clock
    
    // 1. Рух усієї системи навколо Сонця
    if (systemRef.current) {
      systemRef.current.position.x = earthOrbitRadius * Math.cos(time * earthOrbitSpeed);
      systemRef.current.position.z = earthOrbitRadius * Math.sin(time * earthOrbitSpeed);
    }

    // 2. Обертання Землі
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }

    // 3. Рух Місяця навколо Землі
    if (moonRef.current) {
      moonRef.current.position.x = moonOrbitRadius * Math.cos(time * moonOrbitSpeed);
      moonRef.current.position.z = moonOrbitRadius * Math.sin(time * moonOrbitSpeed);
      moonRef.current.rotation.y += 0.005;
    }
  });

 return (
    <group ref={systemRef}>
      
      {/* Земля */}
      <mesh 
        ref={earthRef}
        // ДОДАЄМО КЛІК:
        onClick={(e) => {
          e.stopPropagation(); // Зупиняє подію, щоб клік не летів крізь планету далі
          onSelect();          // Викликає функцію вибору
        }}
        // ДОДАЄМО ЗМІНУ КУРСОРУ:
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer'; // Стає ручкою при наведенні
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'; // Повертається назад
        }}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthMap} />
      </mesh>

      <Line points={moonOrbitPoints} color="#ffffff" lineWidth={1} transparent opacity={0.25} />

      {/* Місяць (його теж можна зробити клікабельним за бажанням) */}
      <mesh ref={moonRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectMoon(); // Викликаємо функцію для Місяця
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial map={moonMap} />
      </mesh>
      
    </group>
  );
}