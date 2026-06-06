// @vitest-environment jsdom
import { describe, test, expect } from 'vitest';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import Saturn from './Saturn'; // Додали .jsx для надійності

describe('Тестування 3D-моделі Сатурна', () => {
  test('Компонент успішно монтується у віртуальній сцені без помилок', async () => {
    let renderer;
    
    await ReactThreeTestRenderer.act(async () => {
      renderer = await ReactThreeTestRenderer.create(<Saturn />);
    });
    
    // Просто перевіряємо, що віртуальна сцена успішно створилася
    expect(renderer.scene).toBeDefined();
  });
});