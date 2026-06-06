import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from './components/3d/SolarSystem.jsx';
import Header from './components/ui/Header.jsx';
import NewsPanel from './components/ui/NewsPanel.jsx';
import AboutModal from './components/ui/AboutModal.jsx';
import Footer from './components/ui/Footer.jsx';
import './App.css'; // Переконайтеся, що файл стилів підключений


// База даних планет для інформаційної панелі
const PLANET_DATA = {
  sun: { title: "Сонце", Type: "Жовтий карлик", dist: "Центр системи", fact: "Зоря, навколо якої обертаються всі об'єкти Сонячної системи. Складається переважно з водню та гелію." },
  mercury: { title: "Меркурій", Type: "Планета земної групи", dist: "57.9 млн км від Сонця", fact: "Найменша і найближча до Сонця планета. Рік тут триває всього 88 земних діб." },
  venus: { title: "Венера", Type: "Планета земної групи", dist: "108.2 млн км від Сонця", fact: "Найгарячіша планета Сонячної системи через потужний парниковий ефект. Обертається у зворотний бік." },
  earth: { title: "Земля", Type: "Планета земної групи", dist: "149.6 млн км від Сонця", fact: "Єдина відома планета, на якій існує життя та рідка вода на поверхні." },
  mars: { title: "Марс", Type: "Планета земної групи", dist: "227.9 млн км від Сонця", fact: "Червона планета. Тут розташований Олімп — найвищий згаслий вулкан у Сонячній системі (26 км)." },
  jupiter: { title: "Юпітер", Type: "Газовий гігант", dist: "778.5 млн км від Сонця", fact: "Найбільша планета системи. Його Велика червона пляма — це гігантський шторм, що вирує сотні років." },
  saturn: { title: "Сатурн", Type: "Газовий гігант", dist: "1.43 млрд км від Сонця", fact: "Відомий своєю дивовижною системою кілець, що складаються з мільярдів частинок льоду та пилу." },
  uranus: { title: "Уран", Type: "Крижаний гіган", dist: "2.87 млрд км від Сонця", fact: "Єдина планета, яка обертається навколо Сонця, «лежачи на боці». Має блідо-блакитний колір." },
  neptune: { title: "Нептун", Type: "Крижаний гігант", dist: "4.5 млрд км від Сонця", fact: "Найделіша планета системи. Тут дмуть найсильніші вітри в Сонячній системі — до 2100 км/год." },
  moon: { title: "Місяць", Type: "Природний супутник", dist: "384 400 км від Землі", fact: "Єдиний природний супутник Землі та перше і поки єдине позаземне тіло, на якому побувала людина." }
};

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  
  // Новий стан для панелі новин
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#000' }}>
      
      {/* 3. Передаємо керування у Header */}
      <Header 
        isPaused={isPaused} 
        setIsPaused={setIsPaused} 
        setIsNewsOpen={setIsNewsOpen} 
        setIsAboutOpen={setIsAboutOpen} 
      />

      <NewsPanel isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
      
      {/* 4. Виводимо модальне вікно */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {selectedPlanet && (
    <div className="info-panel animate-slide">
      <button className="close-btn" onClick={() => setSelectedPlanet(null)}>✕</button>
      <h2>{PLANET_DATA[selectedPlanet].title || PLANET_DATA[selectedPlanet].title2}</h2>
      <div className="planet-badge">{PLANET_DATA[selectedPlanet].Type}</div>
      <p><strong>Відстань:</strong> {PLANET_DATA[selectedPlanet].dist}</p>
      <p className="planet-fact">{PLANET_DATA[selectedPlanet].fact}</p>
    </div>
  )}

      <Canvas camera={{ position: [0, 60, 150], fov: 60 }}>
        <SolarSystem isPaused={isPaused} selectedPlanet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} />
      </Canvas>
      <Footer />
    </div>
  );
}

export default App;