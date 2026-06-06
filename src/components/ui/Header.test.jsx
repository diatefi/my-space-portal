// @vitest-environment jsdom
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Header from './Header';

describe('Тестування компонента Header', () => {
  test('клік по кнопці "Новини космосу" викликає функцію відкриття панелі', () => {
    // 1. Створюємо "фейкову" (mock) функцію для імітації зміни стану
const mockToggleNews = vi.fn();
    
    // 2. Рендеримо шапку сайту і передаємо їй цю функцію
    render(<Header setIsNewsOpen={mockToggleNews} />);
    
    // 3. Знаходимо кнопку за її текстом
    const newsButton = screen.getByText('Новини космосу');
    
    // 4. Імітуємо клік користувача по цій кнопці
    fireEvent.click(newsButton);
    
    // 5. Перевіряємо, чи була викликана наша функція рівно 1 раз
    expect(mockToggleNews).toHaveBeenCalledTimes(1);
  });
});