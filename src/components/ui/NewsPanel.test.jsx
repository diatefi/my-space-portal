// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NewsPanel from './NewsPanel'

describe('Тестування компонента NewsPanel', () => {
  test('показує статус "Встановлюємо зв\'язок..." під час завантаження даних', () => {
    // 1. Рендеримо компонент у віртуальному браузері (передаємо стан, що він відкритий і вантажиться)
    render(<NewsPanel isOpen={true} isLoading={true} news={[]} />);
    
    // 2. Шукаємо текст на екрані
    const loadingText = screen.getByText(/Встановлюємо зв'язок/i);
    
    // 3. Перевіряємо (expect), що цей текст дійсно з'явився в документі
    expect(loadingText).toBeInTheDocument();
  });
});