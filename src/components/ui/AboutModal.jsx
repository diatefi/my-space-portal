export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    // Темний фон, який перекриває весь екран
    <div className="modal-overlay" onClick={onClose}>
      
       
      <div className="about-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <h2>Про портал</h2>
        
        <div className="about-content">
          <p>Цей інтерактивний космічний вебпортал розроблено як кваліфікаційний проєкт.</p>
          <p>Головна мета - візуалізація Сонячної системи у 3D-просторі з використанням реальних текстур та надання актуальних новин у сфері дослідження космосу.</p>

          <h3>Використані технології:</h3>
          <ul className="tech-list">
            <li><strong>React</strong> - побудова інтерфейсу та управління станами.</li>
            <li><strong>Three.js & React Three Fiber</strong> - 3D-графіка, математика орбіт та анімація.</li>
            <li><strong>Spaceflight News API</strong> - інтеграція стрічки новин у реальному часі.</li>
          </ul>

          <div className="author-info">
            <p>Розробник: <strong>Овчаренко Діана</strong></p>
            <p>2026 рік</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}