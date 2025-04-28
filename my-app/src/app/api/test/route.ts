import { NextResponse } from 'next/server';
import { Task } from '@/models/Task';


import { sequelize } from '@/lib/db'; // Наше підключення до БД

// Функція для перевірки підключення до бази
export async function GET() {
  try {
    // Перевіряємо підключення
    await sequelize.authenticate();
    return NextResponse.json({ message: '✅ База даних підключена успішно!' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Не вдалося підключитися до бази';
    return NextResponse.json({ message: '❌ Помилка підключення до бази!', error: errorMessage });
  }
}
