import { useState, useEffect } from 'react';

export default function NewsPanel({ isOpen, onClose }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect запустить завантаження лише тоді, коли панель відкриється
  useEffect(() => {
    if (isOpen && news.length === 0) {
      // Звертаємося до реального API для отримання космічних новин
      fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=5')
        .then((response) => response.json())
        .then((data) => {
          setNews(data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Помилка при завантаженні новин:", error);
          setLoading(false);
        });
    }
  }, [isOpen, news.length]);

  if (!isOpen) return null; // Якщо панель закрита, не рендеримо нічого

  return (
    <div className="news-panel animate-slide-left">
      <button className="close-btn" onClick={onClose}>✕</button>
      <h2>🚀 Актуальні новини</h2>
      
      <div className="news-list">
        {loading ? (
          <p className="loading-text">Встановлюємо зв'язок із Землею... 📡</p>
        ) : (
          news.map((article) => (
            <div key={article.id} className="news-card">
              {/* Картинка новини */}
              <div 
                className="news-img" 
                style={{ backgroundImage: `url(${article.image_url})` }}
              ></div>
              <div className="news-text">
                <h3>{article.title}</h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Читати джерело ➔
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}