import './Header.css';

// Приймаємо setIsAboutOpen
export default function Header({ isPaused, setIsPaused, setIsNewsOpen, setIsAboutOpen }) {
  return (
    <header className="main-header">
    
      <div className="logo">
        <span className="logo-icon">🚀</span> SPACE PORTAL
      </div>
      
      <nav className="nav-links">
        <a href="#solar-system" className="active">Сонячна система</a>
        
        <a href="#news" onClick={(e) => {
          e.preventDefault();
          setIsNewsOpen(true);
        }}>
          Новини космосу
        </a>
        
        {/* Додаємо onClick сюди */}
        <a href="#about" onClick={(e) => {
          e.preventDefault();
          setIsAboutOpen(true);
        }}>
          Про проєкт
        </a>
       
        <button className="pause-btn" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? '▶ Відновити час' : '⏸ Зупинити час'}
        </button>
         
      </nav>
      
    </header>
     
  );
}